// src/pages/Onboarding/Onboarding1.js

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function Onboarding1({ navigation }) {
  return (
    <View style={styles.container}>

      <Text style={styles.logo}>RogerNutri</Text>

            {/* Imagem da Tela */}
      <Image
        source={require("../../Images/TelaInicial1.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Monitore sua saúde</Text>
      <Text style={styles.subtitle}>
        Com ferramentas incríveis você pode monitorar seu progresso
      </Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate("Onboarding2")}
      >
        <Text style={styles.buttonText}>Próximo</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Já possui uma conta? <Text style={styles.link}>Login aqui</Text>
      </Text>

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
