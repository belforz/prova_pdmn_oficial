import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Button, Pressable } from 'react-native';
import Figura from './components/static/Figura';
import FotosDia from './components/FotosDia';
import BuscaFotos from './components/BuscaFotos';
import React, { Component } from 'react';
import Footer from './components/static/Footer';
import nasaClient from './utils/nasaClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface fotoDia {
  date: string;
  url: string;
  title: string;
}

interface ApodHistoricoItem extends fotoDia {
}

interface State {
  texto: string;
  imagem: fotoDia[];
  historico: ApodHistoricoItem[];
}


export default class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      texto: "",
      imagem: [],
      historico: []
    };
  }

  componentDidMount() {
    this.carregarDados();
  }

  carregarDados = async () => {
    await this.carregarHistorico();
    await this.trazerDoBackImagens();
  }

  carregarHistorico = async () => {
      const historicoSalvo = await AsyncStorage.getItem('apodHistorico')
      if (historicoSalvo) {
        const parsed = JSON.parse(historicoSalvo)
        this.setState({ historico: parsed })
      }
  }

  salvarHistorico = async (novoHistorico: ApodHistoricoItem[]) => {
    await AsyncStorage.setItem('apodHistorico', JSON.stringify(novoHistorico))
    console.log('Historico salvo com sucesso.')
  }

  atualizarHistorico = (novaFoto: fotoDia) => {
    this.setState(antigoEstado => {
    
      const jaExiste = antigoEstado.historico.filter(item => item.date === novaFoto.date);
      if (jaExiste && jaExiste.length > 0) {
        console.log('Fotos ja existe no histórico, não adicionando nenhuma nova foto');
        return null;
      }

      const novoHistorico: ApodHistoricoItem[] = [
        {
          date: novaFoto.date,
          url: novaFoto.url,
          title: novaFoto.title 
        },
        ...antigoEstado.historico
      ].slice(0, 6);

      this.salvarHistorico(novoHistorico);
      return { historico: novoHistorico };
    });
  }

  obterDataAtual = (): Date => {
    return new Date();
  }

  trazerDoBackImagens = async () => {
      const hoje = this.obterDataAtual();
      const anteanteontem = new Date(hoje);
      anteanteontem.setDate(hoje.getDate() - 6);
      
      const start_date = anteanteontem.toISOString().split('T')[0];
      const end_date = hoje.toISOString().split('T')[0];
      
      const response = await nasaClient.get(`/apod?start_date=${start_date}&end_date=${end_date}`);
      const data = response.data;
      console.log('Fotos buscadas:', data);

      const fotosDoDia: fotoDia[] = [];
      data.forEach((item: any) => {
        fotosDoDia.push({
          date: item.date,
          url: item.url,
          title: item.title
        });
      });
      
      this.setState({ imagem: fotosDoDia });

      if (fotosDoDia.length > 0) {
        const fotoHoje = fotosDoDia[fotosDoDia.length - 1];
        this.atualizarHistorico(fotoHoje);
      }
  }

  render() {
    const dataMockups = {
      fotosBusca: [
        { titulo: "titulo1", descricao: "alguma descricaos", src: "alguma url" },
        { titulo: "titulo2", descricao: "alguma descricaos", src: "alguma url" },
        { titulo: "titulo3", descricao: "alguma descricaos", src: "alguma url" },
        { titulo: "titulo4", descricao: "alguma descricaos", src: "alguma url" }
      ],
      diasAno: ["2021","2022", "2023", "2024"],
      anoAtual: "2025",
      footerData: {nome: "Leandro Belfor"}
    };

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Figura
              tipo={"solid"}
              nome={"hippo"}
              cor={"#49eebb"}
              tamanho={24}
              sentido="horizontal"
            />
            <Figura
              tipo={"solid"}
              nome={"hippo"}
              cor={"#49eebb"}
              tamanho={24}
              sentido="horizontal"
            />
        <FotosDia imagem={this.state.imagem.map(img => ({ data: img.date, src: img.url , titulo: img.title }))}/>
        <BuscaFotos buscaFotos={{
          textoBusca: this.state.texto,
          setTextoBusca: (texto: string) => this.setState({ texto }),
          ano: dataMockups.diasAno,
          anoAtual: dataMockups.anoAtual,
          buscarFotos: dataMockups.fotosBusca
        }} />
        <Footer nome={dataMockups.footerData.nome} />
        {/* <Figura tipo="solid" nome="hippo" cor="#49eebb" tamanho={50} sentido="horizontal"/> */}
        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 20,
  },
   buscarBotao: {
    width: "20%",
    backgroundColor: "#1E9435",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buscarTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
});
