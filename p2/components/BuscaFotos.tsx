import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import { useState } from "react";
import ImagemPesquisa from "./static/ImagePesquisa";
import Figura from "./static/Figura";

export default function BuscaFotos(props: {
  buscaFotos: {
    textoBusca: string;
    setTextoBusca: (text: string) => void;
    anoAtual: string;
    buscarFotos: { titulo: string; descricao: string; src: string }[];
    eventoDeMudanca: (evento: any) => void;
    onBuscar: (query: string, year: string) => void
  };
}) {
  const [anoSelecionado, setAnoSelecionado] = useState<string | null>(null);
  const anos = Array.from({ length: 4}, (_, i) => (parseInt(props.buscaFotos.anoAtual) - 4 + i).toString())
  
  return (
    <>
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={props.buscaFotos.textoBusca}
        onChangeText={props.buscaFotos.setTextoBusca}
        onChange={props.buscaFotos.eventoDeMudanca}
        placeholder="Digite o que deseja buscar (ex: moon, earth)"
      />


      <FlatList
        data={anos}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.anosLista}
        renderItem={({ item }) => {
          const selected = anoSelecionado === item;
          return (
            <Pressable
              onPress={() => setAnoSelecionado(item)}
              style={[
                styles.anosBotoes,
                selected ? styles.anosBotoesSelected : null,
              ]}
            >
              <Text style={styles.anosTexto}>{item}</Text>
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.toString()}
      />

      <Pressable style={[styles.anoAtualBotao, anoSelecionado === props.buscaFotos.anoAtual ? styles.anoAtualBotaoSelected : null]} onPress={() => setAnoSelecionado(anoSelecionado === props.buscaFotos.anoAtual ? null : props.buscaFotos.anoAtual)}>
        <Text style={styles.anoAtualTexto}>{props.buscaFotos.anoAtual}</Text>
      </Pressable>

       <Pressable style={styles.buscarBotao} onPress={() => {
         props.buscaFotos.onBuscar(props.buscaFotos.textoBusca, anoSelecionado || props.buscaFotos.anoAtual);
         setAnoSelecionado(null);
       }}>
        <Text style={styles.buscarTexto}>BUSCAR</Text>
      </Pressable>
    
    </View>
    <View style={{alignItems: "center", margin: 15}}>
    <Figura
                  tipo={"solid"}
                  nome={"bugs"}
                  cor={"#49eebb"}
                  tamanho={70}
                  flip={true}
                />

    </View>
    <View style={styles.listaImagensContainer}>
      <FlatList
        data={props.buscaFotos.buscarFotos}
        numColumns={2}
        columnWrapperStyle={styles.wrapperColuna}
        contentContainerStyle={styles.imagemConteudo}
        renderItem={({ item }) => (
          <View style={styles.itemImagem}>
            <ImagemPesquisa
              src={item.src}
              titulo={item.titulo}
              descricao={item.descricao}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

    </View>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "#DDD",
    borderWidth: 1,
    width: "80%",
    alignItems: "center",
    padding: 16,
    marginTop: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 2,
    alignSelf: "center",
    flexDirection: "column",
  },
  buscarBotao: {
    width: "100%",
    backgroundColor: "#1E9435",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    width: "100%",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#fafafa",
  },
  buscarTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
  anosContainer: {
    width: "100%",
    marginBottom: 12,
  },
  anosLista: {
    paddingVertical: 4,
  },
  anosBotoes: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#cfcfcf",
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  anosBotoesSelected: {
    backgroundColor: "#aaf5bdff",
    borderColor: "#9ad5dfff",
  },
  anosTexto: {
    fontWeight: "600",
  },
  anoAtualBotao: {
    width: "100%",
    backgroundColor: "#1E9435",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  anoAtualTexto:{
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  anoAtualBotaoSelected: {
   width: "100%",
   paddingVertical: 12,
   borderRadius: 8,
  alignItems: "center",
   backgroundColor: "#aaf5bdff",
   borderColor: "#9ad5dfff",
  },
  itemLista: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#cfcfcf",
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  listaDia: {
    width: "100%",
    minWidth: 64,
    height: 56,
    borderWidth: 1,
    borderColor: "#cfcfcf",
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  listaAnoSelecionado: {
    backgroundColor: "#eef4ff",
    borderColor: "#96b9ff",
  },
  botao: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    height: 40,
    backgroundColor: "#49eebb",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  listaImagensContainer: {
    marginTop: 20,
    borderRadius: 8,
    borderColor: "#DDD",
    borderWidth: 1,
    width: "80%",
    padding: 16,
    alignItems: "stretch",
  },
  wrapperColuna: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  imagemConteudo: {
    paddingBottom: 12,
  },
  itemImagem: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
