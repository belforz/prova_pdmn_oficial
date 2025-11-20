import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Figura from './components/static/Figura';
import FotosDia from './components/FotosDia';
import BuscaFotos from './components/BuscaFotos';
import { useState } from 'react';
import Footer from './components/static/Footer';

export default function App() {
  const [texto, setTexto] = useState("");
  const dataMockups = {
    fotosDia: [
      { data: "18/11/2025", src: "alguma url" },
      { data: "19/11/2025", src: "alguma url" },
      { data: "20/11/2025", src: "alguma url" }
    ],
    fotosBusca: [
      { titulo: "titulo1", descricao: "alguma descricaos", src: "alguma url" },
      { titulo: "titulo2", descricao: "alguma descricaos", src: "alguma url" },
      { titulo: "titulo3", descricao: "alguma descricaos", src: "alguma url" },
      { titulo: "titulo4", descricao: "alguma descricaos", src: "alguma url" }
    ],
    diasAno: ["2021","2022", "2023", "2024"],
    anoAtual: "2025",
    footerData: {nome: "Leandro Belfor"}

  }
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
      <FotosDia imagem={dataMockups.fotosDia}/>
      <BuscaFotos buscaFotos={{
        textoBusca: texto,
        setTextoBusca: setTexto,
        ano: dataMockups.diasAno,
        anoAtual: dataMockups.anoAtual,
        buscarFotos: dataMockups.fotosBusca
      }} />
      <Footer nome={dataMockups.footerData.nome} />
      {/* <Figura tipo="solid" nome="hippo" cor="#49eebb" tamanho={50} sentido="horizontal"/> */}
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 20,
  },
});
