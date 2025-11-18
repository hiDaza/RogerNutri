// components/BottomNavigation.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const BottomNavigation = ({ navigation, activeScreen }) => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => navigation.navigate("Inicial")}
      >
        <Text style={activeScreen === 'Inicial' ? styles.navIconActive : styles.navIcon}>🏠</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => navigation.navigate("Exercicios")}
      >
        <Text style={activeScreen === 'Exercicios' ? styles.navIconActive : styles.navIcon}>⋮⋮</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => navigation.navigate("Comunidade")}
      >
        <Text style={activeScreen === 'Comunidade' ? styles.navIconActive : styles.navIcon}>👥</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => navigation.navigate("Favoritos")}
      >
        <Text style={activeScreen === 'Favoritos' ? styles.navIconActive : styles.navIcon}>♡</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => navigation.navigate("Perfil")}
      >
        <Text style={activeScreen === 'Perfil' ? styles.navIconActive : styles.navIcon}>👤</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default BottomNavigation;