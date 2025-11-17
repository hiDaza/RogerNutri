import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
} from "react-native";

export default function DetalhesAlimento({ route, navigation }) {
  const { alimento } = route.params || {};
  const [mostrarMais, setMostrarMais] = useState(false);

  const textoCompleto =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";

  const textoResumido =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";

  return (
    <Modal
      visible={true}
      animationType="slide"
      transparent={true}
      onRequestClose={() => navigation.goBack()}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Botão fechar */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Imagem */}
            <View style={styles.imageContainer}>
              <Image
                source={
                  alimento?.imagem || require("../../Images/TelaInicial1.png")
                }
                style={styles.image}
              />
              <TouchableOpacity style={styles.zoomButton}>
                <Text style={styles.zoomIcon}>⊕</Text>
              </TouchableOpacity>
            </View>

            {/* Informações Nutricionais */}
            <View style={styles.nutritionContainer}>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionLabel}>Proteína</Text>
                <Text style={styles.nutritionValue}>450G</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionLabel}>Calorias</Text>
                <Text style={styles.nutritionValue}>220g</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionLabel}>Gordura</Text>
                <Text style={styles.nutritionValue}>100g</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionLabel}>Carboidrato</Text>
                <Text style={styles.nutritionValue}>30g</Text>
              </View>
            </View>

            {/* Detalhes */}
            <View style={styles.detailsSection}>
              <Text style={styles.sectionTitle}>Detalhes</Text>
              <Text style={styles.detailsText}>
                {mostrarMais ? textoCompleto : textoResumido}
              </Text>
              <TouchableOpacity onPress={() => setMostrarMais(!mostrarMais)}>
                <Text style={styles.lerMaisLink}>
                  {mostrarMais ? "ler menos..." : "ler mais..."}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Ingredientes */}
            <View style={styles.ingredientesSection}>
              <Text style={styles.sectionTitle}>Ingredientes</Text>
              <View style={styles.ingredientesGrid}>
                <View style={styles.ingredienteCard}>
                  <Text style={styles.ingredienteEmoji}>🥬</Text>
                </View>
                <View style={styles.ingredienteCard}>
                  <Text style={styles.ingredienteEmoji}>🧀</Text>
                </View>
                <View style={styles.ingredienteCard}>
                  <Text style={styles.ingredienteEmoji}>🍅</Text>
                </View>
                <TouchableOpacity style={styles.verTodosCard}>
                  <Text style={styles.verTodosText}>Ver</Text>
                  <Text style={styles.verTodosText}>todos</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Botão Adicionar aos Favoritos */}
            <TouchableOpacity style={styles.favoritoButton}>
              <Text style={styles.favoritoButtonText}>
                Adicionar aos favoritos
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 25,
    maxHeight: "90%",
  },
  closeButton: {
    alignSelf: "flex-start",
    padding: 10,
  },
  closeIcon: {
    fontSize: 28,
    color: "#333",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
    position: "relative",
  },
  image: {
    width: 280,
    height: 200,
    borderRadius: 20,
  },
  zoomButton: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "#FFF",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  zoomIcon: {
    fontSize: 24,
    color: "#333",
  },
  nutritionContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF5E6",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    justifyContent: "space-between",
  },
  nutritionItem: {
    alignItems: "center",
  },
  nutritionLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF9800",
  },
  detailsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  lerMaisLink: {
    color: "#FF9800",
    marginTop: 5,
    fontWeight: "600",
  },
  ingredientesSection: {
    marginBottom: 20,
  },
  ingredientesGrid: {
    flexDirection: "row",
    gap: 10,
  },
  ingredienteCard: {
    width: 70,
    height: 70,
    backgroundColor: "#FFF5E6",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  ingredienteEmoji: {
    fontSize: 35,
  },
  verTodosCard: {
    width: 70,
    height: 70,
    backgroundColor: "#FFF5E6",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  verTodosText: {
    fontSize: 12,
    color: "#FF9800",
    fontWeight: "600",
  },
  favoritoButton: {
    backgroundColor: "#FF9800",
    paddingVertical: 18,
    borderRadius: 12,
    marginBottom: 30,
  },
  favoritoButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});