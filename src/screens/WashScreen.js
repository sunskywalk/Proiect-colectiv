// WashScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import ThemeContext from '../context/ThemeContext';

export default function WashScreen({ navigation }) {
  const { themeValue } = useContext(ThemeContext);
  const [lastWashDate, setLastWashDate] = useState('not defined');

  const styles = getDynamicStyles(themeValue);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/washmashine.png')} style={styles.washingMachine} />
      <Text style={styles.lastWashDate}>Last wash cycle: {lastWashDate}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Choose washmashine')}>
          <Text style={styles.buttonText}>choose washmashine</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddClothes')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('View history')}>
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
      width: 250,
      height: 250,
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
      width: 100,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: themeValue === 'dark' ? '#fff' : '#000',
      borderRadius: 15,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    buttonText: {
      color: themeValue === 'dark' ? '#000' : '#fff',
      fontSize: 16,
    },
  });
}
