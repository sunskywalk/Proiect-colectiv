import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert, TextInput, Modal, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeContext from '../context/ThemeContext';

export default function AddClothesScreen() {
  const [itemName, setItemName] = useState('');
  const [material, setMaterial] = useState('Cotton'); // Исходное значение для материала
  const [color, setColor] = useState('Colored'); // Исходное значение для цвета
  const [clothes, setClothes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { themeValue } = useContext(ThemeContext);
  const styles = getDynamicStyles(themeValue);

  const materials = ['Cotton', 'Synthetic', 'Wool']; // Переместил определение внутрь компонента
  const colors = ['Colored', 'Black', 'White']; // Переместил определение внутрь компонента

  useEffect(() => {
    loadClothes();
  }, []);

  const handleSaveClothing = async () => {
    const newClothingItem = { itemName, material, color };
    const existingClothes = await AsyncStorage.getItem('clothes');
    const updatedClothes = existingClothes ? JSON.parse(existingClothes) : [];
    updatedClothes.push(newClothingItem);
    await AsyncStorage.setItem('clothes', JSON.stringify(updatedClothes));
    setItemName('');
    Alert.alert('Success', 'Clothing item added successfully');
  };

  const loadClothes = async () => {
    const savedClothes = await AsyncStorage.getItem('clothes');
    const loadedClothes = savedClothes ? JSON.parse(savedClothes) : [];
    setClothes(loadedClothes);
  };

  const handleDeleteClothing = async (index) => {
    const updatedClothes = [...clothes];
    updatedClothes.splice(index, 1);
    await AsyncStorage.setItem('clothes', JSON.stringify(updatedClothes));
    setClothes(updatedClothes);
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
      <Button title="My Clothes" onPress={() => setModalVisible(true)} />
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <ScrollView style={styles.modalContent}>
          {clothes.map((cloth, index) => (
            <View key={index} style={styles.clothItem}>
              <Text style={styles.clothText}>{cloth.itemName} - {cloth.material} - {cloth.color}</Text>
              <Button title="Delete" onPress={() => handleDeleteClothing(index)} color="red" />
            </View>
          ))}
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </ScrollView>
      </Modal>
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
    },
    modalContent: {
      marginTop: 20,
      padding: 20,
    },
    clothItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc'
    },
    clothText: {
      flex: 1,
      marginRight: 10,
    }
  });
}
