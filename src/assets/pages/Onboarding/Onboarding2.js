import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function Onboarding2({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>RogerNutri</Text>

      <Image
        source={require("../../Images/TelaInicial2.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Se Alimente Bem</Text>
      <Text style={styles.subtitle}>
        Manter uma boa saúde deveria ser o foco primário de todo mundo
      </Text>

      {/* BOTÃO → vai para Onboarding3 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Onboarding3")} // Alterado aqui
      >
        <Text style={styles.buttonText}>Próximo</Text>
      </TouchableOpacity>

      {/* LINK PARA LOGIN */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.footer}>
          Já possui uma conta? <Text style={styles.link}>Login aqui</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF9800",
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    width: 260,
    height: 260,
    alignSelf: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
  },
  subtitle: {
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 10,
    color: "#444",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#FF9800",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 40,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    color: "#777",
  },
  link: {
    color: "#FF9800",
    fontWeight: "600",
  }
});