// WashScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import ThemeContext from '../context/ThemeContext';



export default function WashScreen() {
  const { themeValue } = useContext(ThemeContext);
  const [lastWashDate, setLastWashDate] = useState('not defined');
  const addClothes = () => {
    navigation.navigate('AddClothes');
  };
  // Динамические стили, зависящие от темы
  const styles = getDynamicStyles(themeValue);

  // Представим, что функция addClothes вызывается при нажатии на центральную кнопку
  

  return (
    <View style={styles.container}>
      <Image source={require ('../../assets/washmashine.png')} style={styles.washingMachine} />
      <Text style={styles.lastWashDate}>Last wash cycle: {lastWashDate}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>choose washmashine</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={addClothes}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>history</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function getDynamicStyles(themeValue) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: themeValue === 'dark' ? '#000' : '#fff',
    },
    washingMachine: {
      width: 400, // Выберите подходящий размер
      height: 400, // Выберите подходящий размер
      marginBottom: 20,
    },
    lastWashDate: {
      color: themeValue === 'dark' ? '#fff' : '#000',
      marginBottom: 20,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      paddingHorizontal: 20,
      marginTop: 20,
    },
    button: {
      width: 100, // Выберите подходящий размер
      height: 100, // Выберите подходящий размер
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: themeValue === 'dark' ? '#fff' : '#000',
      borderRadius: 15, // Скругленные углы
      elevation: 5, // Тень для Android
      shadowColor: '#000', // Тень для iOS
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    buttonText: {
      color: themeValue === 'dark' ? '#000' : '#fff',
      fontSize: 25, // Размер текста кнопки с "+"
    },
  });
}
