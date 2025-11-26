import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavigation from "../../components/Botao/BottomNavigation";
import Svg, { Circle } from 'react-native-svg';

export default function Progresso({ navigation, route }) {
  const [refeicoesExpandidas, setRefeicoesExpandidas] = useState({});
  const [detalhesExpandidos, setDetalhesExpandidos] = useState({});
  const [diaAtual, setDiaAtual] = useState("Segunda");
  const [dataAtual, setDataAtual] = useState("15/09/2025");
  
  // Estados para os dados do usuário e progresso
  const [caloriasMeta, setCaloriasMeta] = useState(0);
  const [caloriasConsumidas, setCaloriasConsumidas] = useState(0);
  const [caloriasQueimadas, setCaloriasQueimadas] = useState(0);
  const [refeicoes, setRefeicoes] = useState([]);
  const [macrosDiarios, setMacrosDiarios] = useState({
    proteinas: 0,
    carboidratos: 0,
    gorduras: 0
  });

  const infoNutricional = {
    proteinas: `${macrosDiarios.proteinas.toFixed(0)}g`,
    carboidratos: `${macrosDiarios.carboidratos.toFixed(0)}g`,
    gorduras: `${macrosDiarios.gorduras.toFixed(0)}g`,
    qtde: caloriasMeta > 0 ? `${Math.min(Math.round((caloriasConsumidas / caloriasMeta) * 100), 100)}%` : "0%",
    item: "Meta"
  };

  const diasSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

  // Carregar dados do usuário ao abrir a tela
  useEffect(() => {
    carregarDadosUsuario();
    // Inicializar com a data de hoje se for a primeira vez
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    setDataAtual(`${dia}/${mes}/${ano}`);
    setDiaAtual(diasSemana[hoje.getDay()]);
  }, []);

  // Carregar progresso sempre que a data mudar
  useEffect(() => {
    carregarProgressoDia();
  }, [dataAtual]);

  // Salvar progresso e recalcular macros sempre que refeições mudarem
  useEffect(() => {
    if (refeicoes.length > 0) {
      salvarProgressoDia();
      calcularMacrosDiarios();
    }
  }, [refeicoes]);

  // Escutar mudanças nos parâmetros de navegação
  useEffect(() => {
    if (route.params?.alimentoAdicionado && route.params?.refeicaoId && refeicoes.length > 0) {
      console.log("Alimento recebido:", route.params.alimentoAdicionado);
      console.log("Refeição ID:", route.params.refeicaoId);
      adicionarAlimentoDaTela(route.params.alimentoAdicionado, route.params.refeicaoId);
      
      // Limpar os parâmetros após usar
      navigation.setParams({ 
        alimentoAdicionado: undefined, 
        refeicaoId: undefined 
      });
    }
  }, [route.params, refeicoes]);

  const calcularMacrosDiarios = () => {
    let totalProt = 0;
    let totalCarb = 0;
    let totalGord = 0;
    
    refeicoes.forEach(refeicao => {
      if (refeicao.alimentos) {
        refeicao.alimentos.forEach(alimento => {
          totalProt += parseFloat(alimento.proteinas) || 0;
          totalCarb += parseFloat(alimento.carboidratos) || 0;
          totalGord += parseFloat(alimento.gorduras) || 0;
        });
      }
    });

    setMacrosDiarios({
      proteinas: totalProt,
      carboidratos: totalCarb,
      gorduras: totalGord
    });
  };

  const salvarProgressoDia = async () => {
    try {
      const dadosDia = {
        refeicoes,
        caloriasConsumidas,
        caloriasQueimadas
      };
      await AsyncStorage.setItem(`progresso_${dataAtual}`, JSON.stringify(dadosDia));
    } catch (error) {
      console.error("Erro ao salvar progresso:", error);
    }
  };

  const adicionarAlimentoDaTela = (alimento, refeicaoId) => {
    console.log("Adicionando alimento:", alimento);
    setRefeicoes(prevRefeicoes => {
      const refeicoesAtualizadas = prevRefeicoes.map(refeicao => {
        // Usando == para permitir comparação entre string e number
        if (refeicao.id == refeicaoId) {
          const novosAlimentos = [...refeicao.alimentos, alimento];
          const novasCalorias = novosAlimentos.reduce((total, alimento) => total + alimento.kcal, 0);
          
          return {
            ...refeicao,
            alimentos: novosAlimentos,
            calorias: novasCalorias
          };
        }
        return refeicao;
      });
      
      return refeicoesAtualizadas;
    });
    
    // Atualizar calorias consumidas totais
    setCaloriasConsumidas(prev => {
      const novasCalorias = prev + alimento.kcal;
      return novasCalorias;
    });
    
    // Expandir automaticamente a refeição quando um alimento é adicionado
    setRefeicoesExpandidas(prev => ({
      ...prev,
      [refeicaoId]: true
    }));
    
    Alert.alert("Sucesso", "Alimento adicionado com sucesso!");
  };

  const abrirTelaAdicionar = (refeicaoId) => {
    const refeicao = refeicoes.find(r => r.id === refeicaoId);
    if (refeicao) {
      navigation.navigate('AdicionarAlimento', { 
        refeicaoNome: refeicao.nome,
        refeicaoId: refeicao.id 
      });
    } else {
      console.error("Refeição não encontrada para ID:", refeicaoId);
    }
  };
  
  // Função para excluir um alimento
const excluirAlimento = (refeicaoId, alimentoIndex) => {
  setRefeicoes(prevRefeicoes => {
    let totalCaloriasRemovidas = 0;

    const novasRefeicoes = prevRefeicoes.map(refeicao => {
      if (refeicao.id == refeicaoId) {

        const alimentoRemovido = refeicao.alimentos[alimentoIndex];
        if (!alimentoRemovido) return refeicao;

        totalCaloriasRemovidas = parseFloat(alimentoRemovido.kcal) || 0;

        const novosAlimentos = refeicao.alimentos.filter((_, idx) => idx !== alimentoIndex);
        const novasCalorias = novosAlimentos.reduce(
          (sum, alimento) => sum + (parseFloat(alimento.kcal) || 0),
          0
        );

        return {
          ...refeicao,
          alimentos: novosAlimentos,
          calorias: novasCalorias
        };
      }
      return refeicao;
    });

    setCaloriasConsumidas(prev => Math.max(0, prev - totalCaloriasRemovidas));

    return novasRefeicoes;
  });
};
  // Função para confirmar exclusão
  const confirmarExclusao = (refeicaoId, alimentoIndex, alimentoNome) => {
    Alert.alert(
      "Excluir Alimento",
      `Deseja excluir "${alimentoNome}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => excluirAlimento(refeicaoId, alimentoIndex)
        }
      ]
    );
  };

  const carregarDadosUsuario = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const meta = userData.caloriasMeta || 2500;
        setCaloriasMeta(meta);
      }
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      setCaloriasMeta(2500);
    }
  };

  const carregarProgressoDia = async () => {
    try {
      const dadosSalvos = await AsyncStorage.getItem(`progresso_${dataAtual}`);
      
      if (dadosSalvos) {
        const { refeicoes: refeicoesSalvas, caloriasConsumidas: calConsumidas, caloriasQueimadas: calQueimadas } = JSON.parse(dadosSalvos);
        setRefeicoes(refeicoesSalvas);
        setCaloriasConsumidas(calConsumidas);
        setCaloriasQueimadas(calQueimadas);
      } else {
        const refeicoesIniciais = [
          { 
            id: 1, 
            nome: "Café da Manhã", 
            calorias: 0, 
            cor: "#FFE8D2", 
            alimentos: []
          },
          { 
            id: 2, 
            nome: "Almoço", 
            calorias: 0, 
            cor: "#FFE8D2",
            alimentos: []
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
            calorias: 0, 
            cor: "#FFE8D2",
            alimentos: []
          },
          { 
            id: 5, 
            nome: "Jantar", 
            calorias: 0, 
            cor: "#FFB74D",
            alimentos: []
          },
        ];
        
        setRefeicoes(refeicoesIniciais);
        setCaloriasConsumidas(0);
        setCaloriasQueimadas(0);
      }
    } catch (error) {
      console.error("Erro ao carregar progresso do dia:", error);
    }
  };

  // Primeiro nível: expandir refeição (mostra apenas o total consumido)
  const toggleRefeicao = (id) => {
    setRefeicoesExpandidas(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    // Quando fecha a refeição, também fecha os detalhes
    if (refeicoesExpandidas[id]) {
      setDetalhesExpandidos(prev => ({
        ...prev,
        [id]: false
      }));
    }
  };

  // Segundo nível: expandir detalhes (mostra a tabela completa)
  const toggleDetalhes = (id) => {
    setDetalhesExpandidos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const mudarDia = (dias) => {
    const [dia, mes, ano] = dataAtual.split('/').map(Number);
    const data = new Date(ano, mes - 1, dia);
    data.setDate(data.getDate() + dias);
    
    const novoDia = String(data.getDate()).padStart(2, '0');
    const novoMes = String(data.getMonth() + 1).padStart(2, '0');
    const novoAno = data.getFullYear();
    
    setDataAtual(`${novoDia}/${novoMes}/${novoAno}`);
    setDiaAtual(diasSemana[data.getDay()]);
  };

  const avancarDia = () => mudarDia(1);
  const voltarDia = () => mudarDia(-1);

  // Função para calcular totais de uma refeição
  const calcularTotais = (alimentos) => {
    const totais = {
      quantidade: 0,
      kcal: 0,
      carboidratos: 0,
      proteinas: 0,
      fibras: 0
    };

    alimentos.forEach(alimento => {
      // Extrair apenas números das strings (ex: "20g" -> 20)
      const quantidadeNum = parseFloat(alimento.quantidade) || 0;
      const kcalNum = parseFloat(alimento.kcal) || 0;
      const carboidratosNum = parseFloat(alimento.carboidratos) || 0;
      const proteinasNum = parseFloat(alimento.proteinas) || 0;
      const fibrasNum = parseFloat(alimento.fibras) || 0;

      totais.quantidade += quantidadeNum;
      totais.kcal += kcalNum;
      totais.carboidratos += carboidratosNum;
      totais.proteinas += proteinasNum;
      totais.fibras += fibrasNum;
    });

    return totais;
  };

  const caloriasRestantes = caloriasMeta - caloriasConsumidas;

  // Configuração do gráfico circular
  const size = 140;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = caloriasMeta > 0 ? Math.min(caloriasConsumidas / caloriasMeta, 1) : 0;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor="#FF9800" barStyle="light-content" />
      
      {/* 1. Cabeçalho Superior */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Dia a Dia</Text>
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => abrirTelaAdicionar(1)} // Abre para Café da Manhã por padrão
        >
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Seção de Calorias - Layout Corrigido */}
        <View style={styles.calorieSection}>
          {/* Círculo Central de Calorias Diárias */}
          <View style={styles.calorieCircleContainer}>
            <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
              <Svg width={size} height={size} style={{ position: 'absolute' }}>
                {/* Círculo de Fundo */}
                <Circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="#E0E0E0"
                  strokeWidth={strokeWidth}
                  fill="none"
                />
                {/* Círculo de Progresso */}
                <Circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="#FF9800"
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  rotation="-90"
                  origin={`${size / 2}, ${size / 2}`}
                />
              </Svg>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.calorieValue}>{caloriasRestantes.toFixed(0)}</Text>
                <Text style={styles.calorieLabel}>Kcal restantes</Text>
              </View>
            </View>
          </View>

          {/* Cards de Calorias Consumidas e Queimadas - Abaixo do círculo */}
          <View style={styles.calorieCards}>
            <View style={[styles.calorieCard, styles.consumedCard]}>
              <Text style={styles.calorieCardValue}>{caloriasConsumidas.toFixed(0)}</Text>
              <Text style={styles.calorieCardTitle}>Kcal Consumidas</Text>
            </View>
            
            <View style={[styles.calorieCard, styles.burnedCard]}>
              <Text style={styles.calorieCardValue}>{caloriasQueimadas.toFixed(0)}</Text>
              <Text style={styles.calorieCardTitle}>Kcal Queimadas</Text>
            </View>
          </View>
        </View>

        {/* 4. Card Verde Horizontal com Informações Nutricionais Rápidas */}
        <View style={styles.nutritionCard}>
          <View style={styles.nutritionColumn}>
            <Text style={styles.nutritionTitle}>Item</Text>
            <Text style={styles.nutritionValue}>{infoNutricional.item}</Text>
          </View>
          
          <View style={styles.nutritionColumn}>
            <Text style={styles.nutritionTitle}>QTDE%</Text>
            <Text style={styles.nutritionValue}>{infoNutricional.qtde}</Text>
          </View>
          
          <View style={styles.nutritionColumn}>
            <Text style={styles.nutritionTitle}>Proteínas</Text>
            <Text style={styles.nutritionValue}>{infoNutricional.proteinas}</Text>
          </View>
          
          <View style={styles.nutritionColumn}>
            <Text style={styles.nutritionTitle}>Carboidratos</Text>
            <Text style={styles.nutritionValue}>{infoNutricional.carboidratos}</Text>
          </View>
          
          <View style={styles.nutritionColumn}>
            <Text style={styles.nutritionTitle}>Gordura</Text>
            <Text style={styles.nutritionValue}>{infoNutricional.gorduras}</Text>
          </View>
        </View>

        {/* 5. Seção de Dia da Semana */}
        <View style={styles.daySelector}>
          <TouchableOpacity onPress={voltarDia}>
            <Text style={styles.arrowIcon}>‹</Text>
          </TouchableOpacity>
          
          <View style={styles.dayInfo}>
            <Text style={styles.dayName}>{diaAtual}</Text>
            <Text style={styles.dayDate}>{dataAtual}</Text>
          </View>
          
          <TouchableOpacity onPress={avancarDia}>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>
        </View>
<View style={styles.mealsContainer}>
  {refeicoes.map((refeicao) => {
    const totais = refeicao.alimentos.length > 0 ? calcularTotais(refeicao.alimentos) : null;
    
    return (
      <View key={refeicao.id}>
        {/* Card Principal da Refeição */}
        <TouchableOpacity 
          style={[
            styles.mealCard, 
            { backgroundColor: refeicao.cor }
          ]}
          onPress={() => toggleRefeicao(refeicao.id)}
        >
          <Text style={styles.mealIcon}>+</Text>
          <Text style={styles.mealName}>{refeicao.nome}</Text>
          <View style={styles.mealInfo}>
            <Text style={styles.mealCalories}>{refeicao.calorias.toFixed(0)} kcal</Text>
            {refeicao.alimentos.length > 0 && (
              <Text style={styles.mealCount}>({refeicao.alimentos.length})</Text>
            )}
          </View>
        </TouchableOpacity>

        {/* Primeiro nível: Total Consumido (sem detalhes) */}
        {refeicoesExpandidas[refeicao.id] && refeicao.alimentos.length > 0 && (
          <View style={styles.expandedContent}>
            {/* Subcard de Total Consumido - Agora clicável para expandir detalhes */}
            <TouchableOpacity 
              style={styles.totalConsumedCard}
              onPress={() => toggleDetalhes(refeicao.id)}
            >
              <Text style={styles.totalConsumedText}>
                Total Consumido: {refeicao.calorias.toFixed(0)} Kcal
              </Text>
              <Text style={styles.expandIcon}>
                {detalhesExpandidos[refeicao.id] ? '▼' : '▶'}
              </Text>
            </TouchableOpacity>

            {/* Segundo nível: Tabela Nutricional Expandida (apenas quando clicado no Total Consumido) */}
            {detalhesExpandidos[refeicao.id] && (
              <View style={styles.foodsTable}>
                <View style={styles.tableHeader}>
                  <Text style={styles.headerCell}>Nome</Text>
                  <Text style={styles.headerCell}>Quantidade</Text>
                  <Text style={styles.headerCell}>Kcal</Text>
                  <Text style={styles.headerCell}>Carb</Text>
                  <Text style={styles.headerCell}>Proteínas</Text>
                  <Text style={styles.headerCell}>Fibras</Text>
                  <Text style={styles.headerCell}>Ações</Text>
                </View>
                
                {refeicao.alimentos.map((alimento, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.cell}>{alimento.nome}</Text>
                    <Text style={styles.cell}>{alimento.quantidade}</Text>
                    <Text style={styles.cell}>{alimento.kcal}</Text>
                    <Text style={styles.cell}>{alimento.carboidratos}</Text>
                    <Text style={styles.cell}>{alimento.proteinas}</Text>
                    <Text style={styles.cell}>{alimento.fibras}</Text>
                    <View style={styles.actionCell}>
                      <TouchableOpacity 
                        style={styles.deleteButton}
                        onPress={() => confirmarExclusao(refeicao.id, index, alimento.nome)}
                      >
                        <Text style={styles.deleteButtonText}>✕</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
                
                {/* Linha de Totais */}
                {totais && (
                  <View style={[styles.tableRow, styles.totalRow]}>
                    <Text style={[styles.cell, styles.totalCell]}>Total</Text>
                    <Text style={[styles.cell, styles.totalCell]}>{totais.quantidade.toFixed(0)}g</Text>
                    <Text style={[styles.cell, styles.totalCell]}>{totais.kcal.toFixed(0)}</Text>
                    <Text style={[styles.cell, styles.totalCell]}>{totais.carboidratos.toFixed(0)}g</Text>
                    <Text style={[styles.cell, styles.totalCell]}>{totais.proteinas.toFixed(0)}g</Text>
                    <Text style={[styles.cell, styles.totalCell]}>{totais.fibras.toFixed(0)}g</Text>
                    <View style={[styles.cell, styles.totalCell]}></View>
                  </View>
                )}

                {/* Botão para adicionar mais alimentos a esta refeição */}
                <TouchableOpacity 
                  style={styles.addFoodButton}
                  onPress={() => abrirTelaAdicionar(refeicao.id)}
                >
                  <Text style={styles.addFoodButtonText}>+ Adicionar Alimento</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* Se a refeição está expandida mas não tem alimentos, mostrar botão para adicionar */}
        {refeicoesExpandidas[refeicao.id] && refeicao.alimentos.length === 0 && (
          <View style={styles.expandedContent}>
            <TouchableOpacity 
              style={styles.addFoodButtonEmpty}
              onPress={() => abrirTelaAdicionar(refeicao.id)}
            >
              <Text style={styles.addFoodButtonText}>+ Adicionar Primeiro Alimento</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  })}
</View>
      </ScrollView>

      {/* 8. Rodapé da Tela */}
      <BottomNavigation navigation={navigation} activeScreen="Progresso" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  // 1. Cabeçalho Superior
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FF9800",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    fontSize: 30,
    color: "#FFF",
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#FFF",
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#61E06B",
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  // Seção de Calorias - Layout Corrigido
  calorieSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  calorieCircleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  // 2. Círculo Central de Calorias
  calorieCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: "#000",
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  calorieValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  calorieLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  // 3. Cards de Calorias (abaixo do círculo)
  calorieCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  calorieCard: {
    flex: 1,
    height: 70,
    borderRadius: 12,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  consumedCard: {
    backgroundColor: "#F9A33B",
  },
  burnedCard: {
    backgroundColor: "#4F8BFC",
  },
  calorieCardTitle: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    textAlign: "center",
  },
  calorieCardValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
    textAlign: "center",
  },
  // 4. Card Verde Nutricional
  nutritionCard: {
    flexDirection: "row",
    backgroundColor: "#61E06B",
    height: 80,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  nutritionColumn: {
    alignItems: "center",
    flex: 1,
  },
  nutritionTitle: {
    fontSize: 10,
    color: "#333",
    fontWeight: "500",
    marginBottom: 5,
  },
  nutritionValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  // 5. Seletor de Dia
  daySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  arrowIcon: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
  },
  dayInfo: {
    alignItems: "center",
  },
  dayName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  dayDate: {
    fontSize: 12,
    color: "#666",
  },
  // 6. Lista de Refeições
  mealsContainer: {
    marginBottom: 20,
  },
  mealCard: {
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  mealIcon: {
    fontSize: 18,
    color: "#222",
    marginRight: 10,
    fontWeight: "bold",
  },
  mealName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
    flex: 1,
  },
  mealInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealCalories: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  mealCount: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
    marginLeft: 5,
  },
  // Conteúdo Expandido
  expandedContent: {
    marginBottom: 10,
  },
  totalConsumedCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    padding: 15,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  totalConsumedText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  expandIcon: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  // Tabela de Alimentos
  foodsTable: {
    backgroundColor: "#E6E6E6",
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
    marginBottom: 5,
  },
  headerCell: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  cell: {
    fontSize: 11,
    color: "#333",
    flex: 1,
    textAlign: "center",
  },
  actionCell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  totalRow: {
    backgroundColor: "#D6D6D6",
    borderRadius: 5,
    marginTop: 5,
  },
  totalCell: {
    fontWeight: "bold",
  },
  // Botão para adicionar alimento
  addFoodButton: {
    backgroundColor: "#61E06B",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  addFoodButtonEmpty: {
    backgroundColor: "#61E06B",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  addFoodButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  // Estilo para o botão de excluir
  deleteButton: {
    backgroundColor: '#FF6B6B', // Vermelho mais suave
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
