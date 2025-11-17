import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

export default function Inicial({ navigation }) {
  const refeicoes = [
    {
      id: 1,
      nome: "Café da manhã",
      horario: "08:00 - 08:30",
      completo: true,
    },
    {
      id: 2,
      nome: "Almoço",
      horario: "12:00 - 12:30",
      completo: true,
    },
    {
      id: 3,
      nome: "Café da tarde",
      horario: "15:00 - 15:30",
      completo: false,
    },
  ];

  const alimentos = [
    {
      id: 1,
      nome: "Pão de Queijo",
      descricao: "Pão de queijo de tapioca",
      calorias: "450 kCAL",
      imagem: require("../../Images/TelaInicial1.png"),
    },
    {
      id: 2,
      nome: "Tapioca",
      descricao: "Tapioca de presunto e queijo",
      calorias: "450 kCAL",
      imagem: require("../../Images/TelaInicial2.png"),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.greeting}>
          Bom dia, <Text style={styles.userName}>Almir Artero</Text>
        </Text>

        {refeicoes.map((refeicao) => (
          <View key={refeicao.id}>
            <View style={styles.refeicaoHeader}>
              <Text style={styles.refeicaoNome}>{refeicao.nome}</Text>
              <Text style={styles.refeicaoHorario}>{refeicao.horario}</Text>
              <View
                style={[
                  styles.checkbox,
                  refeicao.completo && styles.checkboxCompleto,
                ]}
              >
                {refeicao.completo && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </View>

            {alimentos.map((alimento) => (
              <TouchableOpacity
                key={alimento.id}
                style={styles.alimentoCard}
                onPress={() =>
                  navigation.navigate("DetalhesAlimento", { alimento })
                }
              >
                <Image source={alimento.imagem} style={styles.alimentoImagem} />
                <View style={styles.alimentoInfo}>
                  <Text style={styles.calorias}>{alimento.calorias}</Text>
                  <Text style={styles.alimentoNome}>{alimento.nome}</Text>
                  <Text style={styles.alimentoDescricao}>
                    {alimento.descricao}
                  </Text>
                </View>
                <TouchableOpacity style={styles.favoriteButton}>
                  <Text style={styles.heartIcon}>♡</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navIconActive}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navIcon}>⋮⋮</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navIcon}>👥</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Favoritos")}
        >
          <Text style={styles.navIcon}>♡</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  userName: {
    color: "#FF9800",
  },
  refeicaoHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFF5E6",
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 8,
  },
  refeicaoNome: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  },
  refeicaoHorario: {
    fontSize: 14,
    color: "#666",
    marginRight: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#FF9800",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxCompleto: {
    backgroundColor: "#FF9800",
  },
  checkmark: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  alimentoCard: {
    flexDirection: "row",
    backgroundColor: "#FFB300",
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 16,
    padding: 15,
    alignItems: "center",
  },
  alimentoImagem: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#FFF",
  },
  alimentoInfo: {
    flex: 1,
    marginLeft: 15,
  },
  calorias: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  alimentoNome: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 5,
  },
  alimentoDescricao: {
    fontSize: 14,
    color: "#333",
  },
  favoriteButton: {
    padding: 10,
  },
  heartIcon: {
    fontSize: 28,
    color: "#FF3333",
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#FF9800",
    paddingVertical: 15,
    paddingHorizontal: 10,
    justifyContent: "space-around",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  navIcon: {
    fontSize: 24,
    color: "#333",
  },
  navIconActive: {
    fontSize: 24,
    color: "#FFF",
  },
});