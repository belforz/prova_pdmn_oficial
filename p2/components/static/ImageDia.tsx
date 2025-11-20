import { Image, View, StyleSheet, Text } from "react-native";

export default function ImagemDia(props: {
  data: string;
  src: string;
}) {
  return (
    <View>
      <Image style={styles.image} source={{ uri: props.src }}></Image>
      <Text style = {styles.data}>{props.data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  data: {
    fontSize: 20,
    fontWeight: "bold",
  }
});
