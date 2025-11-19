import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';

export default function AdicionarAlimento({ navigation, route }) {
  const [pesquisa, setPesquisa] = useState('');
  const [abaAtiva, setAbaAtiva] = useState('Pesquisar');
  
  const { refeicaoNome, refeicaoId } = route.params;

  // Lista de alimentos para pesquisa (banco de dados geral)
  const alimentosPesquisa = [
    { 
      id: '1', 
      nome: 'Arroz com frango',
      quantidade: '100g',
      kcal: 150,
      carboidratos: '20g',
      proteinas: '15g',
      fibras: '2g',
      imagem: require('../../Images/TelaInicial1.png')
    },
    { 
      id: '2', 
      nome: 'Mingau de Aveia',
      quantidade: '100g',
      kcal: 130,
      carboidratos: '25g',
      proteinas: '5g',
      fibras: '3g',
      imagem: require('../../Images/TelaInicial1.png')
    },
    { 
      id: '3', 
      nome: 'Salada de Alface',
      quantidade: '100g',
      kcal: 15,
      carboidratos: '3g',
      proteinas: '1g',
      fibras: '1g',
      imagem: require('../../Images/TelaInicial1.png')
    },
    { 
      id: '4', 
      nome: 'Omelete',
      quantidade: '100g',
      kcal: 154,
      carboidratos: '1g',
      proteinas: '11g',
      fibras: '0g',
      imagem: require('../../Images/TelaInicial1.png')
    },
    { 
      id: '5', 
      nome: 'Smoothie de Banana',
      quantidade: '100g',
      kcal: 89,
      carboidratos: '23g',
      proteinas: '1g',
      fibras: '2g',
      imagem: require('../../Images/TelaInicial1.png')
    },
  ];

  // Lista de minhas comidas (alimentos favoritos/adicionados pelo usuário)
  const minhasComidas = [
    { 
      id: '6', 
      nome: 'Pão Integral',
      quantidade: '100g',
      kcal: 247,
      carboidratos: '41g',
      proteinas: '13g',
      fibras: '7g',
      imagem: require('../../Images/TelaInicial1.png')
    },
    { 
      id: '7', 
      nome: 'Iogurte Natural',
      quantidade: '100g',
      kcal: 61,
      carboidratos: '4.7g',
      proteinas: '3.5g',
      fibras: '0g',
      imagem: require('../../Images/TelaInicial1.png')
    },
  ];

  // Dados para formulário manual
  const [dadosManuais, setDadosManuais] = useState({
    nome: '',
    quantidade: '',
    kcal: '',
    carboidratos: '',
    proteinas: '',
    fibras: ''
  });

  // Filtrar alimentos baseado na pesquisa
  const alimentosFiltradosPesquisa = alimentosPesquisa.filter(alimento =>
    alimento.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const minhasComidasFiltradas = minhasComidas.filter(alimento =>
    alimento.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const adicionarAlimento = (alimento) => {
    console.log("Navegando de volta com alimento:", alimento);
    console.log("Refeição ID:", refeicaoId);
    
    // Navegar de volta para a tela Progresso passando o alimento adicionado
    navigation.navigate('Progresso', { 
      alimentoAdicionado: alimento,
      refeicaoId: refeicaoId
    });
  };

  const verDetalhesAlimento = (alimento) => {
    // Navegar para a tela de detalhes do alimento
    navigation.navigate('DetalhesAlimento', { alimento });
  };

  const adicionarManual = () => {
    if (!dadosManuais.nome || !dadosManuais.kcal) {
      alert('Por favor, preencha pelo menos o nome e as calorias do alimento.');
      return;
    }

    const alimentoManual = {
      id: Date.now().toString(),
      nome: dadosManuais.nome,
      quantidade: dadosManuais.quantidade || '100g',
      kcal: parseFloat(dadosManuais.kcal) || 0,
      carboidratos: dadosManuais.carboidratos || '0g',
      proteinas: dadosManuais.proteinas || '0g',
      fibras: dadosManuais.fibras || '0g',
      imagem: require('../../Images/TelaInicial1.png')
    };

    adicionarAlimento(alimentoManual);
  };

  // Conteúdo das abas
  const renderConteudoAba = () => {
    switch (abaAtiva) {
      case 'Pesquisar':
        return (
          <View style={styles.abaContent}>
            <FlatList
              data={alimentosFiltradosPesquisa}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.itemAlimento}
                  onPress={() => verDetalhesAlimento(item)}
                >
                  <View style={styles.alimentoInfo}>
                    <Text style={styles.nomeAlimento}>{item.nome}</Text>
                    <Text style={styles.infoAlimento}>{item.kcal} kcal • {item.quantidade}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => adicionarAlimento(item)}
                  >
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
              scrollEnabled={false}
            />
          </View>
        );
      
      case 'Minhas Comidas':
        return (
          <View style={styles.abaContent}>
            <FlatList
              data={minhasComidasFiltradas}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.itemAlimento}
                  onPress={() => verDetalhesAlimento(item)}
                >
                  <View style={styles.alimentoInfo}>
                    <Text style={styles.nomeAlimento}>{item.nome}</Text>
                    <Text style={styles.infoAlimento}>{item.kcal} kcal • {item.quantidade}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => adicionarAlimento(item)}
                  >
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
              scrollEnabled={false}
            />
          </View>
        );
      
      case 'Adicionar Calorias':
        return (
          <View style={styles.abaContent}>
            <Text style={styles.abaTitle}>Adicionar Manualmente</Text>
            
            <TextInput
              style={styles.textInput}
              placeholder="Nome do alimento"
              value={dadosManuais.nome}
              onChangeText={(text) => setDadosManuais({...dadosManuais, nome: text})}
            />
            
            <TextInput
              style={styles.textInput}
              placeholder="Quantidade (ex: 100g)"
              value={dadosManuais.quantidade}
              onChangeText={(text) => setDadosManuais({...dadosManuais, quantidade: text})}
            />
            
            <TextInput
              style={styles.textInput}
              placeholder="Calorias (kcal)"
              keyboardType="numeric"
              value={dadosManuais.kcal}
              onChangeText={(text) => setDadosManuais({...dadosManuais, kcal: text})}
            />
            
            <TextInput
              style={styles.textInput}
              placeholder="Carboidratos (ex: 20g)"
              value={dadosManuais.carboidratos}
              onChangeText={(text) => setDadosManuais({...dadosManuais, carboidratos: text})}
            />
            
            <TextInput
              style={styles.textInput}
              placeholder="Proteínas (ex: 10g)"
              value={dadosManuais.proteinas}
              onChangeText={(text) => setDadosManuais({...dadosManuais, proteinas: text})}
            />
            
            <TextInput
              style={styles.textInput}
              placeholder="Fibras (ex: 5g)"
              value={dadosManuais.fibras}
              onChangeText={(text) => setDadosManuais({...dadosManuais, fibras: text})}
            />
            
            <TouchableOpacity 
              style={styles.adicionarManualButton}
              onPress={adicionarManual}
            >
              <Text style={styles.adicionarManualButtonText}>Adicionar Alimento</Text>
            </TouchableOpacity>
          </View>
        );
      
      case 'Receitas':
        return (
          <View style={styles.abaContent}>
            <Text style={styles.abaTitle}>Receitas Salvas</Text>
            <Text style={styles.placeholderText}>
              Suas receitas salvas aparecerão aqui...
            </Text>
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FF9800" barStyle="light-content" />
      
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{refeicaoNome}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Barra de Pesquisa - APENAS NAS ABAS PESQUISAR E MINHAS COMIDAS */}
      {(abaAtiva === 'Pesquisar' || abaAtiva === 'Minhas Comidas') && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.barraPesquisa}
            placeholder="Pesquisar"
            value={pesquisa}
            onChangeText={setPesquisa}
          />
        </View>
      )}

      {/* Abas - 4 BOTÕES COLORIDOS COMO NA IMAGEM */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[
            styles.tab, 
            abaAtiva === 'Pesquisar' ? styles.tabActive : styles.tabInactive
          ]}
          onPress={() => setAbaAtiva('Pesquisar')}
        >
          <Text style={[
            styles.tabText, 
            abaAtiva === 'Pesquisar' ? styles.tabTextActive : styles.tabTextInactive
          ]}>
            Pesquisar
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab, 
            abaAtiva === 'Minhas Comidas' ? styles.tabActive : styles.tabInactive
          ]}
          onPress={() => setAbaAtiva('Minhas Comidas')}
        >
          <Text style={[
            styles.tabText, 
            abaAtiva === 'Minhas Comidas' ? styles.tabTextActive : styles.tabTextInactive
          ]}>
            Minhas Comidas
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab, 
            abaAtiva === 'Adicionar Calorias' ? styles.tabActive : styles.tabInactive
          ]}
          onPress={() => setAbaAtiva('Adicionar Calorias')}
        >
          <Text style={[
            styles.tabText, 
            abaAtiva === 'Adicionar Calorias' ? styles.tabTextActive : styles.tabTextInactive
          ]}>
            Adicionar Calorias
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab, 
            abaAtiva === 'Receitas' ? styles.tabActive : styles.tabInactive
          ]}
          onPress={() => setAbaAtiva('Receitas')}
        >
          <Text style={[
            styles.tabText, 
            abaAtiva === 'Receitas' ? styles.tabTextActive : styles.tabTextInactive
          ]}>
            Receitas
          </Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo da aba selecionada */}
      <ScrollView style={styles.content}>
        {renderConteudoAba()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FF9800',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backIcon: {
    fontSize: 30,
    color: '#FFF',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  placeholder: {
    width: 30,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  barraPesquisa: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: '#FFF',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  tabActive: {
    backgroundColor: '#FF9800',
  },
  tabInactive: {
    backgroundColor: '#F5F5F5',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  tabTextActive: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  tabTextInactive: {
    color: '#666',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  abaContent: {
    marginBottom: 20,
  },
  abaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  itemAlimento: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  alimentoInfo: {
    flex: 1,
  },
  nomeAlimento: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginBottom: 4,
  },
  infoAlimento: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#61E06B',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#FF9800',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  adicionarManualButton: {
    backgroundColor: '#61E06B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  adicionarManualButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  placeholderText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});