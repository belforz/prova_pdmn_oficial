import { View, StyleSheet, Text, FlatList } from "react-native";
import ImagemDia from "./static/ImageDia";
import { Loading } from "./static/Loading";
import Figura from "./static/Figura";

interface Props {
  imagem: { data: string; src: string, titulo: string }[];
  loading: boolean;
}

export default function FotosDia(props: Props) {
  return (
    <View style={styles.componentFotosDia}>
      <Text style={styles.texto}>Fotos do <Figura tipo={"solid"} nome={"sun"} cor={"#087e4bff"} tamanho={20} flip={false} /></Text>
      <View style={styles.listaDia}>
        {props.loading ? (
          <Loading texto="Carregando fotos do dia..." />
        ) : (
          <FlatList
            data={props.imagem}
            numColumns={3}
            columnWrapperStyle={styles.wrapperColuna}
            renderItem={({ item }) => (
              <View style={styles.itemLista}>
                <ImagemDia data={item.data} src={item.src} titulo={item.titulo} />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
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
    textAlign: "center",
    color:"#087e4bff",
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
    marginLeft: 10
  },
  wrapperColuna: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
});
