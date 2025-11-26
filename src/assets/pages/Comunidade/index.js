import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from '../../components/Botao/BottomNavigation';

export default function Comunidade({ navigation }) {
  const [search, setSearch] = useState('');

  // Dados Fictícios - Em Alta
  const emAltaData = [
    {
      id: '1',
      titulo: 'Torta de Frango',
      autor: 'Ronaldo Oikawa',
      likes: '7.976',
      imagem: require('../../Images/TortaFrango.png'), // Placeholder
    },
    {
      id: '2',
      titulo: 'Risotto de limão siciliano',
      autor: 'Celso Olivette Junior',
      likes: '5.127',
      imagem: require('../../Images/RisotoLimao.png'), // Placeholder
    },
    {
      id: '3',
      titulo: 'Salada Caesar',
      autor: 'Maria Silva',
      likes: '3.420',
      imagem: require('../../Images/salada.png'), // Placeholder
    },
  ];

  // Dados Fictícios - Trending
  const trendingTopics = [
    { id: '1', text: 'Melhores receitas com vegetais', icon: '🔥' },
    { id: '2', text: 'Receitas de frango com batata doce', icon: '🔥' },
    { id: '3', text: 'Sopas', icon: '🔥' },
    { id: '4', text: 'Sobremesas fit', icon: '🔥' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Barra de Pesquisa */}
        <View style={styles.searchContainer}>
           <Image 
                source={require('../../icons/search.png')}
                style={styles.searchIcon}
                resizeMode="contain"
            />
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar receitas, pessoas, comidas, etc..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Seção: Postar sua receita */}
        <Text style={styles.sectionTitle}>Postar sua receita</Text>
        <TouchableOpacity style={styles.postContainer}>
           <Image 
             source={require('../../Images/TelaInicial1.png')} 
             style={styles.postImageBackground}
             blurRadius={3}
           />
           <View style={styles.cameraButton}>
             <Text style={styles.plusIcon}>+</Text>
           </View>
        </TouchableOpacity>

        {/* Seção: Em Alta */}
        <Text style={styles.sectionTitle}>Em Alta</Text>
        <FlatList
          horizontal
          data={emAltaData}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.emAltaList}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.cardEmAlta}>
              <Image source={item.imagem} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle} numberOfLines={1}>{item.titulo}</Text>
                <Text style={styles.cardAuthor} numberOfLines={1}>Receita por: {item.autor}</Text>
                <View style={styles.likesContainer}>
                  <Text style={styles.heartIcon}>💛</Text>
                  <Text style={styles.likesCount}>{item.likes}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Seção: Trending */}
        <View style={styles.trendingHeader}>
          <Text style={styles.sectionTitle}>Trending</Text>
          <Text style={styles.trendingIcon}>📈</Text>
        </View>
        
        <View style={styles.trendingList}>
          {trendingTopics.map((item) => (
            <TouchableOpacity key={item.id} style={styles.trendingItem}>
              <Text style={styles.trendingText}>{item.text}</Text>
              <Text style={styles.fireIcon}>{item.icon}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
      
      {/* Navegação Inferior */}
      <BottomNavigation navigation={navigation} activeScreen="Comunidade" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    margin: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    color: '#888',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 20,
    marginBottom: 15,
  },
  postContainer: {
    marginHorizontal: 20,
    height: 180,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEE',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  postImageBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.7,
  },
  cameraButton: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
  },
  plusIcon: {
    fontSize: 30,
    color: '#FFF',
    fontWeight: 'bold',
  },
  emAltaList: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  cardEmAlta: {
    width: 220,
    marginRight: 15,
    backgroundColor: '#FFF5E6', // Fundo laranja claro
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
  },
  cardImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardAuthor: {
    fontSize: 10,
    color: '#666',
    marginBottom: 8,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  heartIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  likesCount: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
  trendingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  trendingIcon: {
    fontSize: 24,
    marginLeft: 10,
    marginBottom: 15,
    color: '#000',
  },
  trendingList: {
    paddingHorizontal: 20,
  },
  trendingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  trendingText: {
    fontSize: 16,
    color: '#FF9800', // Laranja
    fontWeight: '500',
    flex: 1,
  },
  fireIcon: {
    fontSize: 16,
    marginLeft: 10,
  },
});
