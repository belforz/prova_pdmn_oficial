import { View, StyleSheet, Text } from "react-native";

export default function AnoCampo(props: {
  ano: string;
}) {
  return (
    <View>
      <Text style = {styles.data}>{props.ano}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  data: {
    fontSize: 20,
    fontWeight: "bold",
  }
});
