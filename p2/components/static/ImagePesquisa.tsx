import { Image, View, StyleSheet, Text } from "react-native";

export default function ImagemPesquisa(props: {
  titulo: string;
  descricao: string;
  src: string;
}) {
  return (
    <View style={styles.imagemContainer}>
      <Text style={styles.titulo}>{props.titulo}</Text>
      <Image style={styles.imagem} source={{ uri: props.src }} />
      <Text style={styles.descricao}>{props.descricao}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  imagem: {
    width: 140,
    height: 140,
    resizeMode: "cover",
    borderRadius: 8,
    marginVertical: 8,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    color:"#087e4bff",
  },
  descricao: {
    fontSize: 15,
    fontStyle: "italic",
    textAlign: "center",
    color: "#057333ff",
  }
  ,
  imagemContainer: {
    alignItems: "center",
    justifyContent: "center",
  }
});
