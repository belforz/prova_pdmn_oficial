import { View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

export default function Figura(props: {
  tipo: string;
  cor: string;
  nome: string;
  tamanho: number;
  sentido: string;
}) {
  return (
    <View>
      <FontAwesome6
        name={props.nome}
        size={props.tamanho}
        color={props.cor}
        style={{ transform: [{ rotate: props.sentido }] }}
      />
    </View>
  );
}
