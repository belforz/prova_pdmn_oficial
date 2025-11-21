import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

interface Props {
  texto: string;
}

export class Loading extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#28c63dff" />
        <Text style={styles.text}>{this.props.texto}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
  },
  text: {
    marginTop: 10,
    fontSize: 20,
    textAlign: 'center',
    color: '#54a95dff',
  },
});
