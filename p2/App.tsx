import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Button, Pressable, Image } from 'react-native';
import Figura from './components/static/Figura';
import FotosDia from './components/FotosDia';
import BuscaFotos from './components/BuscaFotos';
import React, { Component } from 'react';
import Footer from './components/static/Footer';
import nasaClient from './utils/nasaClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loading } from './components/static/Loading';

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
  buscarFotos: { titulo: string; descricao: string; src: string }[];
  anoAtual: string;
  textoBusca: string; 
  loadingDia: boolean;
  loadingBusca: boolean;
}


export default class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      texto: "",
      imagem: [],
      historico: [],
      buscarFotos: [],
      anoAtual: new Date().getFullYear().toString(),
      textoBusca: "",
      loadingDia: false,
      loadingBusca: false
    };
  }

  componentDidMount() {
    this.carregarDados();
  }

  carregarDados = async () => {
    await this.carregarHistorico();
    await this.trazerDoBackImagens();
    await this.trazerFotosBusca(this.state.textoBusca, this.state.anoAtual);
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
      this.setState({ loadingDia: true });
      try {
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
      } catch (error) {
        console.error('Erro ao buscar imagens:', error);
      } finally {
        this.setState({ loadingDia: false });
      }
  }

  trazerFotosBusca = async (query: string, year: string) => {
      this.setState({ loadingBusca: true });
      try {
        const response = await nasaClient.get(`/search?q=${query}&year_start=${year}&year_end=${year}`);
        const data = response.data.collection.items.slice(0, 10);
        
        const fotosBusca: { titulo: string; descricao: string; src: string }[] = [];
        data.forEach((item: any) => {
          fotosBusca.push({
            titulo: item.data[0].title,
            descricao: item.data[0].description,
            src: item.links[0].href
          });
        })
        this.setState({ buscarFotos: fotosBusca });
      } catch (error) {
        console.error('Erro ao buscar fotos:', error);
      } finally {
        this.setState({ loadingBusca: false });
      }
  }

  // eventos
  
  eventoDeMudanca = (evento: any) => {
    this.setState({ texto: evento.nativeEvent.text });
  }

  


  render() {

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.containerDosAnimais}>
        <Figura
              tipo={"solid"}
              nome={"hippo"}
              cor={"#49eebb"}
              tamanho={60}
              flip={false}
            />
           <Text style={styles.tituloTrabalho}> Aplicativo de Imagens em <Figura tipo={"brands"} nome={"react"} cor={"#49eebb"} tamanho={60} flip={false} /></Text>
            <Figura
              tipo={"solid"}
              nome={"hippo"}
              cor={"#49eebb"}
              tamanho={60}
              flip={true}
            />

        </View>
        <FotosDia imagem={this.state.imagem.map(img => ({ data: img.date, src: img.url , titulo: img.title }))} loading={this.state.loadingDia}/>
          <Image style ={styles.imagem}source={require("./assets/gatoespaco_fundo.png")} />
          
        <BuscaFotos buscaFotos={{
          textoBusca: this.state.textoBusca,
          setTextoBusca:(text: string) => this.setState({ textoBusca: text }),
          anoAtual: this.state.anoAtual,
          buscarFotos: this.state.buscarFotos,
          eventoDeMudanca: this.eventoDeMudanca,
          onBuscar: (query: string, year: string) => { this.trazerFotosBusca(query, year);
          
           },
          loading: this.state.loadingBusca
           }}/>
           
        <Footer nome={"Leandro Belfor"} />
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
  containerDosAnimais: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 10,
  },
  buscarTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
  imagem: {
    width: 150,
    height: 150,
    marginTop: 2,
    marginBottom: 3,
    
  },
  tituloTrabalho: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#073b0bff",
    textAlign: "center",
    marginBottom: 10,
  }
});
