import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

import BottomNavigation from "../../components/Botao/BottomNavigation";

export default function Inicial({ navigation }) {
  const [refeicoesExpandidas, setRefeicoesExpandidas] = useState({});
  const [refeicoes, setRefeicoes] = useState([
    {
      id: 1,
      nome: "Café da manhã",
      horario: "08:00 - 08:30",
      completo: true,
      alimentos: [
        {
          id: 1,
          nome: "Pão de Queijo",
          descricao: "Pão de queijo de tapioca",
          calorias: "450 kCAL",
          imagem: require("../../Images/TelaInicial1.png"),
          favorito: false,
        },
        {
          id: 2,
          nome: "Tapioca",
          descricao: "Tapioca de presunto e queijo",
          calorias: "450 kCAL",
          imagem: require("../../Images/TelaInicial2.png"),
          favorito: true,
        },
      ],
    },
    {
      id: 2,
      nome: "Almoço",
      horario: "12:00 - 12:30",
      completo: true,
      alimentos: [
        {
          id: 3,
          nome: "Salada de Rúcula",
          descricao: "Rúcula e tomate",
          calorias: "300 kCAL",
          imagem: require("../../Images/TelaInicial1.png"),
          favorito: false,
        },
        {
          id: 4,
          nome: "Frango Grelhado",
          descricao: "Frango com legumes",
          calorias: "350 kCAL",
          imagem: require("../../Images/TelaInicial2.png"),
          favorito: false,
        },
      ],
    },
    {
      id: 3,
      nome: "Café da tarde",
      horario: "15:00 - 15:30",
      completo: false,
      alimentos: [
        {
          id: 5,
          nome: "Iogurte Natural",
          descricao: "Iogurte com granola",
          calorias: "200 kCAL",
          imagem: require("../../Images/TelaInicial1.png"),
          favorito: false,
        },
        {
          id: 6,
          nome: "Bolo de Cenoura",
          descricao: "Bolo caseiro",
          calorias: "400 kCAL",
          imagem: require("../../Images/TelaInicial2.png"),
          favorito: false,
        },
      ],
    },
  ]);

  const toggleRefeicao = (refeicaoId) => {
    setRefeicoesExpandidas(prevState => ({
      ...prevState,
      [refeicaoId]: !prevState[refeicaoId]
    }));
  };

  const toggleRefeicaoCompleta = (refeicaoId) => {
    setRefeicoes(prevRefeicoes => 
      prevRefeicoes.map(refeicao => 
        refeicao.id === refeicaoId 
          ? { ...refeicao, completo: !refeicao.completo }
          : refeicao
      )
    );
  };

  const toggleFavorito = (refeicaoId, alimentoId) => {
    setRefeicoes(prevRefeicoes => 
      prevRefeicoes.map(refeicao => 
        refeicao.id === refeicaoId 
          ? {
              ...refeicao,
              alimentos: refeicao.alimentos.map(alimento =>
                alimento.id === alimentoId
                  ? { ...alimento, favorito: !alimento.favorito }
                  : alimento
              )
            }
          : refeicao
      )
    );
  };

  // Função para obter todos os alimentos favoritos de todas as refeições
  const getAlimentosFavoritos = () => {
    const todosFavoritos = [];
    refeicoes.forEach(refeicao => {
      refeicao.alimentos.forEach(alimento => {
        if (alimento.favorito) {
          todosFavoritos.push(alimento);
        }
      });
    });
    return todosFavoritos;
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.greeting}>
          Bom dia, <Text style={styles.userName}>Almir Artero</Text>
        </Text>

        {refeicoes.map((refeicao) => (
          <View key={refeicao.id}>
            <View style={styles.refeicaoHeader}>
              <TouchableOpacity 
                style={styles.refeicaoInfo}
                onPress={() => toggleRefeicao(refeicao.id)}
              >
                <Text style={styles.refeicaoNome}>{refeicao.nome}</Text>
                <Text style={styles.refeicaoHorario}>{refeicao.horario}</Text>
                <Text style={styles.expandIcon}>
                  {refeicoesExpandidas[refeicao.id] ? '▲' : '▼'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  refeicao.completo && styles.checkboxCompleto,
                ]}
                onPress={() => toggleRefeicaoCompleta(refeicao.id)}
              >
                {refeicao.completo && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            </View>

            {refeicoesExpandidas[refeicao.id] && refeicao.alimentos.map((alimento) => (
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
                <TouchableOpacity 
                  style={styles.favoriteButton}
                  onPress={() => toggleFavorito(refeicao.id, alimento.id)}
                >
                  <Text style={[
                    styles.heartIcon,
                    alimento.favorito && styles.heartIconFavorito
                  ]}>
                    {alimento.favorito ? '♥' : '♡'}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

       {/* Bottom Navigation Component */}
      <BottomNavigation navigation={navigation} activeScreen="Inicial" />
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
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFF5E6",
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 8,
  },
  refeicaoInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
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
  expandIcon: {
    fontSize: 16,
    color: "#FF9800",
    marginLeft: 10,
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
    color: "#FFF",
  },
  heartIconFavorito: {
    color: "#FF3333",
  },
});