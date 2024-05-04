import React, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeContext from '../context/ThemeContext';

export default function AddClothesScreen() {
  const [itemName, setItemName] = useState('');
  const [material, setMaterial] = useState('');
  const [color, setColor] = useState('');
  const { themeValue } = useContext(ThemeContext);
  const styles = getDynamicStyles(themeValue);

  const materials = ['Cotton', 'Synthetic', 'Wool'];
  const colors = ['Colored', 'Black', 'White'];

  const handleSaveClothing = async () => {
    const newClothingItem = { itemName, material, color };
    try {
      const existingClothes = await AsyncStorage.getItem('clothes');
      const clothes = existingClothes ? JSON.parse(existingClothes) : [];
      clothes.push(newClothingItem);
      await AsyncStorage.setItem('clothes', JSON.stringify(clothes));
      Alert.alert('Success', 'Clothing item added successfully');
      setItemName('');
      setMaterial('');
      setColor('');
    } catch (error) {
      Alert.alert('Error', 'Failed to save clothing item');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setItemName}
        value={itemName}
        placeholder="Enter item name"
        placeholderTextColor="#999"
      />
      <Text style={styles.label}>Select Material:</Text>
      {materials.map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.option(material === item)}
          onPress={() => setMaterial(item)}
        >
          <Text style={styles.optionText}>{item}</Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.label}>Select Color:</Text>
      {colors.map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.option(color === item)}
          onPress={() => setColor(item)}
        >
          <Text style={styles.optionText}>{item}</Text>
        </TouchableOpacity>
      ))}
      <Button title="Save Clothing" onPress={handleSaveClothing} />
    </View>
  );
}

function getDynamicStyles(themeValue) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: themeValue === 'dark' ? '#333' : '#fff',
      padding: 20,
    },
    input: {
      height: 40,
      marginVertical: 12,
      borderWidth: 1,
      padding: 10,
      width: '80%',
      backgroundColor: '#fff',
      borderColor: '#ccc',
      borderRadius: 5,
    },
    label: {
      fontSize: 16,
      color: themeValue === 'dark' ? '#fff' : '#000',
      marginTop: 20,
    },
    option: (selected) => ({
      padding: 10,
      marginVertical: 5,
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: selected ? '#007bff' : '#fff',
      borderRadius: 5,
    }),
    optionText: {
      color: themeValue === 'dark' ? '#fff' : '#000',
      textAlign: 'center',
    }
  });
}
