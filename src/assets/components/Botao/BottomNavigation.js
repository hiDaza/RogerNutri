// components/Botao/BottomNavigation.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BottomNavigation({ navigation, activeScreen }) {
  const insets = useSafeAreaInsets();
  console.log('BottomNavigation - Tela ativa:', activeScreen);

  const handleNavigation = (screenName) => {
    console.log(`Navegando para: ${screenName}`);
    
    try {
      // Verifica se podemos navegar para a tela
      navigation.navigate(screenName);
    } catch (error) {
      console.error(`Erro ao navegar para ${screenName}:`, error);
      Alert.alert('Erro', `Não foi possível navegar para ${screenName}`);
    }
  };

  return (
    <View style={[styles.bottomNav, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => handleNavigation('Inicial')}
      >
        <Image 
          source={require('../../icons/home.png')}
          style={styles.navIcon}
          resizeMode="contain"
        />
        <Text style={[
          styles.navText,
          activeScreen === 'Inicial' ? styles.navTextActive : {}
        ]}>Início</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => handleNavigation('Progresso')}
      >
        <Image 
          source={require('../../icons/progress.png')}
          style={styles.navIcon}
          resizeMode="contain"
        />
        <Text style={[
          styles.navText,
          activeScreen === 'Progresso' ? styles.navTextActive : {}
        ]}>Progresso</Text>
      </TouchableOpacity>

       <TouchableOpacity 
        style={styles.navButton}
        onPress={() => handleNavigation('Comunidade')}
      >
       <Image 
          source={require('../../icons/comunity.png')}
          style={styles.navIcon}
          resizeMode="contain"
        />
        <Text style={[
          styles.navText,
          activeScreen === 'Favoritos' ? styles.navTextActive : {}
        ]}>Comunidade</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => handleNavigation('Favoritos')}
      >
       <Image 
          source={require('../../icons/favorite.png')}
          style={styles.navIcon}
          resizeMode="contain"
        />
        <Text style={[
          styles.navText,
          activeScreen === 'Favoritos' ? styles.navTextActive : {}
        ]}>Favoritos</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => handleNavigation('Perfil')}
      >
        <Image 
          source={require('../../icons/profile.png')}
          style={styles.navIcon}
          resizeMode="contain"
        />
        <Text style={[
          styles.navText,
          activeScreen === 'Perfil' ? styles.navTextActive : {}
        ]}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FF9800',
    paddingTop: 10,
    paddingHorizontal: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navIcon: {
    fontSize: 22,
    color: '#333',
    marginBottom: 2,
    width: 30
  },
  navIconActive: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  navText: {
    fontSize: 10,
    color: '#333',
  },
  navTextActive: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});