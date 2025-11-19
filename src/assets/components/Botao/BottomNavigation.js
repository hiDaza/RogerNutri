// components/Botao/BottomNavigation.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

export default function BottomNavigation({ navigation, activeScreen }) {
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
    <View style={styles.bottomNav}>
      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => handleNavigation('Inicial')}
      >
        <Text style={[
          styles.navIcon, 
          activeScreen === 'Inicial' ? styles.navIconActive : {}
        ]}>🏠</Text>
        <Text style={[
          styles.navText,
          activeScreen === 'Inicial' ? styles.navTextActive : {}
        ]}>Início</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => handleNavigation('Progresso')}
      >
        <Text style={[
          styles.navIcon, 
          activeScreen === 'Progresso' ? styles.navIconActive : {}
        ]}>📊</Text>
        <Text style={[
          styles.navText,
          activeScreen === 'Progresso' ? styles.navTextActive : {}
        ]}>Progresso</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => handleNavigation('Favoritos')}
      >
        <Text style={[
          styles.navIcon, 
          activeScreen === 'Favoritos' ? styles.navIconActive : {}
        ]}>❤</Text>
        <Text style={[
          styles.navText,
          activeScreen === 'Favoritos' ? styles.navTextActive : {}
        ]}>Favoritos</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => handleNavigation('Perfil')}
      >
        <Text style={[
          styles.navIcon, 
          activeScreen === 'Perfil' ? styles.navIconActive : {}
        ]}>👤</Text>
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
    height: 70,
    paddingHorizontal: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 10,
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