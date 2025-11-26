import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavigation from "../../components/Botao/BottomNavigation";

export default function Favoritos({ navigation }) {
  const [abaAtiva, setAbaAtiva] = useState("receitas");
  const [receitasFavoritas, setReceitasFavoritas] = useState([]);

  const comidas = [
    { id: 1, emoji: "🍿", nome: "Pipoca" },
    { id: 2, emoji: "🍔", nome: "Hambúrguer" },
    { id: 3, emoji: "🍕", nome: "Pizza" },
    { id: 4, emoji: "🍝", nome: "Macarrão" },
    { id: 5, emoji: "🥗", nome: "Salada" },
  ];

  useFocusEffect(
    useCallback(() => {
      carregarFavoritos();
    }, [])
  );

  const carregarFavoritos = async () => {
    try {
      const favoritosSalvos = await AsyncStorage.getItem('favoritos');
      if (favoritosSalvos) {
        const lista = JSON.parse(favoritosSalvos);
        // Filtrar ou adaptar se necessário. Por enquanto assumimos que tudo salvo é "receita/alimento"
        // Se quiser separar comidas (emojis) de receitas (cards completos), precisaria de um flag no objeto salvo.
        // Como o pedido foi genérico, vamos exibir tudo na aba de receitas por enquanto ou adaptar.
        
        const receitasAdaptadas = lista.map(item => ({
          ...item,
          imagem: item.imagem || require("../../Images/TelaInicial1.png"), // Fallback image
          calorias: item.calorias || `${item.kcal || 0} kcal`
        }));
        
        setReceitasFavoritas(receitasAdaptadas);
      }
    } catch (error) {
      console.error("Erro ao carregar favoritos:", error);
    }
  };

  const removerFavorito = async (id) => {
    try {
      const novaLista = receitasFavoritas.filter(item => item.id !== id);
      setReceitasFavoritas(novaLista);
      await AsyncStorage.setItem('favoritos', JSON.stringify(novaLista));
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>Favoritos</Text>

      {/* Abas */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            styles.tabLeft,
            abaAtiva === "comidas" && styles.tabActive,
          ]}
          onPress={() => setAbaAtiva("comidas")}
        >
          <Text
            style={[
              styles.tabText,
              abaAtiva === "comidas" && styles.tabTextActive,
            ]}
          >
            Comidas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            styles.tabRight,
            abaAtiva === "receitas" && styles.tabActive,
          ]}
          onPress={() => setAbaAtiva("receitas")}
        >
          <Text
            style={[
              styles.tabText,
              abaAtiva === "receitas" && styles.tabTextActive,
            ]}
          >
            Receitas
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {abaAtiva === "comidas" ? (
          <View style={styles.comidasGrid}>
            {comidas.map((comida) => (
              <TouchableOpacity key={comida.id} style={styles.comidaCard}>
                <Text style={styles.comidaEmoji}>{comida.emoji}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.addCard}>
              <Text style={styles.addIcon}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.receitasContainer}>
            {receitasFavoritas.length > 0 ? (
              receitasFavoritas.map((receita) => (
                <TouchableOpacity
                  key={receita.id}
                  style={styles.receitaCard}
                  onPress={() =>
                    navigation.navigate("DetalhesAlimento", { alimento: receita })
                  }
                >
                  <Image source={receita.imagem} style={styles.receitaImagem} />
                  <View style={styles.receitaInfo}>
                    <Text style={styles.calorias}>{receita.calorias}</Text>
                    <Text style={styles.receitaNome}>{receita.nome}</Text>
                    <Text style={styles.receitaDescricao}>
                      {receita.descricao || "Sem descrição"}
                    </Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.favoriteButton}
                    onPress={() => removerFavorito(receita.id)}
                  >
                    <Text style={styles.heartIconFilled}>❤</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.emptyText}>Nenhum favorito adicionado ainda.</Text>
            )}

            <TouchableOpacity style={styles.buscarButton} onPress={() => navigation.navigate('Progresso')}>
              <Text style={styles.buscarButtonText}>Buscar Receitas</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation navigation={navigation} activeScreen="Favoritos" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 60,
    paddingBottom: 20,
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 30,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: "#FFF5E6",
  },
  tabLeft: {
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  tabRight: {
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  tabActive: {
    backgroundColor: "#FF9800",
  },
  tabText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  tabTextActive: {
    color: "#FFF",
  },
  comidasGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  comidaCard: {
    width: "30%",
    aspectRatio: 1,
    backgroundColor: "#FF9800",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  comidaEmoji: {
    fontSize: 50,
  },
  addCard: {
    width: "30%",
    aspectRatio: 1,
    backgroundColor: "#FFF5E6",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  addIcon: {
    fontSize: 50,
    color: "#FF9800",
  },
  receitasContainer: {
    paddingHorizontal: 20,
  },
  receitaCard: {
    flexDirection: "row",
    backgroundColor: "#FFB300",
    marginBottom: 15,
    borderRadius: 16,
    padding: 15,
    alignItems: "center",
  },
  receitaImagem: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#FFF",
  },
  receitaInfo: {
    flex: 1,
    marginLeft: 15,
  },
  calorias: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  receitaNome: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 5,
  },
  receitaDescricao: {
    fontSize: 14,
    color: "#333",
  },
  favoriteButton: {
    padding: 10,
  },
  heartIconFilled: {
    fontSize: 28,
    color: "#FF3333",
  },
  buscarButton: {
    backgroundColor: "#FF9800",
    paddingVertical: 18,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 30,
  },
  buscarButtonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
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