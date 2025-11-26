import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Header({ 
  title, 
  onBackPress, 
  rightButtonIcon, 
  onRightButtonPress,
  rightButtonComponent 
}) {
  return (
    <View style={styles.header}>
      {/* Botão Voltar (Opcional) */}
      {onBackPress ? (
        <TouchableOpacity 
          style={styles.backButton}
          onPress={onBackPress}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
      
      {/* Título */}
      <Text style={styles.headerTitle}>{title}</Text>
      
      {/* Botão Direito (Opcional) */}
      {rightButtonComponent ? (
        rightButtonComponent
      ) : rightButtonIcon && onRightButtonPress ? (
        <TouchableOpacity 
          style={styles.rightButton}
          onPress={onRightButtonPress}
        >
          <Text style={styles.rightButtonIcon}>{rightButtonIcon}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FF9800",
    paddingHorizontal: 20,
    paddingTop: 20, // Ajuste conforme safe area
    paddingBottom: 20,
  },
  backButton: {
    padding: 5,
    width: 40,
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
    textAlign: 'center',
    flex: 1,
  },
  rightButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#61E06B",
    justifyContent: "center",
    alignItems: "center",
  },
  rightButtonIcon: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold",
  },
  placeholder: {
    width: 40,
  }
});