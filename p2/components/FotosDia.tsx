import { View, StyleSheet, Text, FlatList } from "react-native";
import ImagemDia from "./static/ImageDia";

export default function FotosDia(props: {
  imagem: { data: string; src: string }[];
}) {
  return (
    <View style={styles.componentFotosDia}>
      <Text style={styles.texto}> Fotos do dia</Text>
      <View style={styles.listaDia}>
        <FlatList
          data={props.imagem}
          numColumns={3}
          columnWrapperStyle={styles.wrapperColuna}
          renderItem={({ item }) => (
            <View style={styles.itemLista}>
              <ImagemDia data={item.data} src={item.src} />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  componentFotosDia: {
    width: "80%",
    alignItems: "center",
    padding: 12,
    marginTop: 8,
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
    borderColor: "#DDD",
    borderWidth: 1,
  },
  texto: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#173B80",
    textAlign: "center",
  },
  itemLista: {
    width: "30%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
  },
  listaDia: {
    width: "100%",
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 12,
    padding: 16,
  },
  wrapperColuna: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
});
