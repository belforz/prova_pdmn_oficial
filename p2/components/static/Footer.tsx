import { Image, View, StyleSheet, Text, Linking, Pressable, } from "react-native";
import Figura from "./Figura";

export default function Footer(props: { nome: string; }) {
  return (
    <View style={styles.footer}>
      <View style={styles.imagens}>
      <Image style ={styles.imagemAnimal}source={require("./../../assets/octupus.png")} />
      <Image style ={styles.imagem}source={require("./../../assets/iconleo.png")} />
      <Image style ={styles.imagemAnimal}source={require("./../../assets/octupus.png")} />
        </View>  
      <Text style={styles.titulo}> Desenvolvido por <Text style={styles.nome}>{props.nome}</Text></Text>
      <View style={styles.icones}>
        <Pressable onPress={() => Linking.openURL("https://www.linkedin.com/in/leandro-belfor-ba3640143")}>
          <Figura
            tipo={"solid"}
            cor={"#49eebb"}
            nome={"linkedin"}
            tamanho={32}
            flip={false}
          />
        </Pressable>
        <Pressable onPress={() => Linking.openURL("https://belforzphotography.vercel.app/")}>
        <Figura
          tipo={"solid"}
          cor={"#49eebb"}
          nome={"link"}
          tamanho={32}
          flip={false}
        />
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  footer: {
    borderColor: "#DDD",
    borderWidth: 1,
    width: "80%",
    alignItems: "center",
    padding: 12,
    marginTop: 8,
    borderRadius: 4,
    display: "flex",
    justifyContent: "center"
  },
  imagens: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
    marginBottom: 8,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333333ff",
  },
  nome: {
    color: "#18cf2aff",
  },
  imagem: {
    width: 80,
    height: 80,
    marginTop: 2,
    marginBottom: 3,
    borderColor: "#8BEB78",
    borderWidth: 2,
    borderRadius: 40,
  },
  icones: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
  },
  imagemAnimal: {
    width: 80,
    height: 80,
    marginTop: 2,
    marginBottom: 3,
    
  },

});
