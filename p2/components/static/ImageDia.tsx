import { Image, View, StyleSheet, Text } from "react-native";

export default function ImagemDia(props: {
  data: string;
  src: string;
  titulo: string;
}) {
  return (
    <View>
      <Image style={styles.image} source={{ uri: props.src }}></Image>
      <Text style = {styles.data}>{props.data}</Text>
      <Text style = {styles.titulo}>{props.titulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 140,
    height: 140,
    resizeMode: "cover",
    borderRadius: 8,
    marginVertical: 8,
  },
  data: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#66f612ff",
  },
  titulo: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#1E9435",
    
  
  }
});
