import React, { useState, useCallback, useEffect } from "react";
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
import { auth } from "../../services/auth";

export default function Inicial({ navigation }) {
  const [refeicoesExpandidas, setRefeicoesExpandidas] = useState({});
  const [user, setUser] = useState({})
  
  const refeicoesPadrao = [
    {
      id: 1,
      nome: "Café da Manhã", // Adjusted to match Progresso
      horario: "08:00 - 08:30",
      completo: false,
      alimentos: [],
    },
    {
      id: 2,
      nome: "Almoço",
      horario: "12:00 - 12:30",
      completo: false,
      alimentos: [],
    },
    {
      id: 4, // Adjusted ID to match Progresso (Café da Tarde is 4 there)
      nome: "Café da Tarde",
      horario: "15:00 - 15:30",
      completo: false,
      alimentos: [],
    },
    {
      id: 5, // Jantar is 5
      nome: "Jantar",
      horario: "20:00 - 20:30",
      completo: false,
      alimentos: [],
    },
  ];

  const [refeicoes, setRefeicoes] = useState(refeicoesPadrao);

  useFocusEffect(
    useCallback(() => {
      // Descomente a linha abaixo para resetar/popular dados de teste (execute uma vez e comente novamente)
      popularDadosTeste();
      carregarRefeicoesDoDia();
    }, [])
  );

  const popularDadosTeste = async () => {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    const dataAtual = `${dia}/${mes}/${ano}`;

    const dadosFicticios = {
      caloriasConsumidas: 1250,
      caloriasQueimadas: 300,
      refeicoes: [
        {
          id: 1,
          nome: "Café da Manhã",
          calorias: 450,
          cor: "#FFE8D2",
          alimentos: [
            {
              id: "101",
              nome: "Pão de Queijo",
              kcal: 150,
              proteinas: "5g",
              carboidratos: "20g",
              gorduras: "8g",
              descricao: "Pão de queijo tradicional mineiro",
              imagem: require("../../Images/PaoQueijo.webp")
            },
            {
              id: "102",
              nome: "Café com Leite",
              kcal: 80,
              proteinas: "3g",
              carboidratos: "10g",
              gorduras: "2g",
              descricao: "Café preto com leite integral",
              imagem: require("../../Images/Cafeleite.jpeg")
            }
          ]
        },
        {
          id: 2,
          nome: "Almoço",
          calorias: 600,
          cor: "#FFE8D2",
          alimentos: [
            {
              id: "201",
              nome: "Arroz com Frango",
              kcal: 400,
              proteinas: "30g",
              carboidratos: "45g",
              gorduras: "10g",
              descricao: "Arroz branco com peito de frango grelhado",
              imagem: require("../../Images/frango.webp")
            },
            {
              id: "202",
              nome: "Salada Verde",
              kcal: 50,
              proteinas: "1g",
              carboidratos: "5g",
              gorduras: "0g",
              descricao: "Alface, rúcula e pepino",
              imagem: require("../../Images/PaoQueijo.webp")
            }
          ]
        },
        {
          id: 3,
          nome: "Exercícios",
          calorias: 0,
          cor: "#A2A2A2",
          alimentos: []
        },
        {
          id: 4,
          nome: "Café da Tarde",
          calorias: 200,
          cor: "#FFE8D2",
          alimentos: [
            {
              id: "401",
              nome: "Iogurte com Frutas",
              kcal: 200,
              proteinas: "8g",
              carboidratos: "25g",
              gorduras: "5g",
              descricao: "Iogurte natural com morango e banana",
              imagem: require("../../Images/PaoQueijo.webp")
            }
          ]
        },
        {
          id: 5,
          nome: "Jantar",
          calorias: 0,
          cor: "#FFB74D",
          alimentos: []
        }
      ]
    };

    try {
      await AsyncStorage.setItem(`progresso_${dataAtual}`, JSON.stringify(dadosFicticios));
      console.log("Dados fictícios inseridos com sucesso!");
      // Recarregar a tela
      carregarRefeicoesDoDia();
    } catch (error) {
      console.error("Erro ao popular dados:", error);
    }
  };

  const carregarRefeicoesDoDia = async () => {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    const dataAtual = `${dia}/${mes}/${ano}`;

    try {
      const dadosSalvos = await AsyncStorage.getItem(`progresso_${dataAtual}`);
      if (dadosSalvos) {
        const { refeicoes: refeicoesSalvas } = JSON.parse(dadosSalvos);
        
        const refeicoesAtualizadas = refeicoesPadrao.map(refPadrao => {
          // Find matching meal by ID or Name
          const refSalva = refeicoesSalvas.find(r => r.id === refPadrao.id || r.nome === refPadrao.nome);
          
          if (refSalva && refSalva.alimentos && refSalva.alimentos.length > 0) {
            return {
              ...refPadrao,
              completo: true, // Mark as complete if it has food
              alimentos: refSalva.alimentos.map(a => ({
                ...a,
                calorias: `${a.kcal || 0} kCAL`,
                descricao: a.descricao || "Alimento registrado",
                imagem: a.imagem || require("../../Images/TelaInicial1.png"),
                favorito: false
              }))
            };
          }
          return refPadrao;
        });
        
        setRefeicoes(refeicoesAtualizadas);
      }
    } catch (error) {
      console.error("Erro ao carregar refeições na Home:", error);
    }
  };


  const toggleRefeicao = (refeicaoId) => {
    setRefeicoesExpandidas(prevState => ({
      ...prevState,
      [refeicaoId]: !prevState[refeicaoId]
    }));
  };

  const toggleRefeicaoCompleta = async (refeicaoId) => {
    // Encontrar a refeição atual
    const refeicaoAtual = refeicoes.find(r => r.id === refeicaoId);
    if (!refeicaoAtual) return;

    const novoEstadoCompleto = !refeicaoAtual.completo;

    // Atualizar estado local visualmente
    setRefeicoes(prevRefeicoes => 
      prevRefeicoes.map(refeicao => 
        refeicao.id === refeicaoId 
          ? { ...refeicao, completo: novoEstadoCompleto }
          : refeicao
      )
    );

    // Atualizar no AsyncStorage (Progresso)
    try {
      const hoje = new Date();
      const dia = String(hoje.getDate()).padStart(2, '0');
      const mes = String(hoje.getMonth() + 1).padStart(2, '0');
      const ano = hoje.getFullYear();
      const dataAtual = `${dia}/${mes}/${ano}`;
      
      const dadosSalvos = await AsyncStorage.getItem(`progresso_${dataAtual}`);
      let dadosDia = dadosSalvos ? JSON.parse(dadosSalvos) : { refeicoes: [], caloriasConsumidas: 0, caloriasQueimadas: 0 };

      // Se estiver marcando como completo, precisamos garantir que os alimentos estejam salvos
      // Se estiver desmarcando, a lógica atual do app mantém os alimentos mas talvez devesse zerar?
      // Por enquanto, vamos apenas sincronizar o status visual se houver suporte no objeto de progresso,
      // mas como o objeto de progresso não tem campo "completo" explícito, vamos assumir que
      // marcar como completo na home é apenas visual OU poderia adicionar alimentos padrão se estiver vazio.
      
      // NOTA: A estrutura atual do Progresso não tem um flag "completo". 
      // Vamos focar na parte de FAVORITOS que foi pedida explicitamente para persistir.
      
      console.log(`Refeição ${refeicaoId} marcada como: ${novoEstadoCompleto}`);
    } catch (error) {
      console.error("Erro ao atualizar status da refeição:", error);
    }
  };

  const toggleFavorito = async (refeicaoId, alimentoId) => {
    let alimentoFavoritado = null;
    let novoStatusFavorito = false;

    // Atualizar estado local
    setRefeicoes(prevRefeicoes => 
      prevRefeicoes.map(refeicao => {
        if (refeicao.id === refeicaoId) {
          return {
            ...refeicao,
            alimentos: refeicao.alimentos.map(alimento => {
              if (alimento.id === alimentoId) {
                alimentoFavoritado = alimento;
                novoStatusFavorito = !alimento.favorito;
                return { ...alimento, favorito: novoStatusFavorito };
              }
              return alimento;
            })
          };
        }
        return refeicao;
      })
    );

    // Persistir nos Favoritos
    if (alimentoFavoritado) {
      try {
        const favoritosSalvos = await AsyncStorage.getItem('favoritos');
        let listaFavoritos = favoritosSalvos ? JSON.parse(favoritosSalvos) : [];

        if (novoStatusFavorito) {
          // Adicionar aos favoritos se não existir
          const jaExiste = listaFavoritos.some(fav => fav.id === alimentoId || fav.nome === alimentoFavoritado.nome);
          if (!jaExiste) {
            listaFavoritos.push({
              ...alimentoFavoritado,
              favorito: true,
              origem: 'TelaInicial'
            });
          }
        } else {
          // Remover dos favoritos
          listaFavoritos = listaFavoritos.filter(fav => fav.id !== alimentoId && fav.nome !== alimentoFavoritado.nome);
        }

        await AsyncStorage.setItem('favoritos', JSON.stringify(listaFavoritos));
        console.log("Favoritos atualizados:", listaFavoritos.length);
      } catch (error) {
        console.error("Erro ao salvar favoritos:", error);
      }
    }
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

  const getUser = async () => {
    setUser(await auth.getCurrentUser());
  }

  useEffect(() => {
    getUser();
  })


  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.greeting}>
          Bom dia, <Text style={styles.userName}>{user?.nome ?? "Almir"}</Text>
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
                  <Image 
                    source={alimento.favorito ? require('../../icons/heart.png') : require('../../icons/hollow-heart.png')}
                    style={[styles.heartIcon
                    ]}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

       {/* Bottom Navigation Component */}
      <BottomNavigation navigation={navigation} activeScreen="Inicial" />
    </SafeAreaView>
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
    fontFamily: 'ShantellSans-SemiBold',
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
