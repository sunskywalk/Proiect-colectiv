import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert, TextInput, Modal, ScrollView, Image, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeContext from '../context/ThemeContext';

export default function AddClothesScreen() {
  const [itemName, setItemName] = useState('');
  const [material, setMaterial] = useState('Cotton');
  const [color, setColor] = useState('Colored');
  const [selectedSymbols, setSelectedSymbols] = useState([]);
  const [clothes, setClothes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { themeValue } = useContext(ThemeContext);
  const styles = getDynamicStyles(themeValue);

  const materials = ['Cotton', 'Synthetic', 'Wool'];
  const colors = ['Colored', 'Black', 'White'];
  const washingSymbols = [
    { id: '1', uri: require('../../assets/12-1-300x300.jpg') },
    { id: '2', uri: require('../../assets/14-1-300x300.jpg') },
    { id: '3', uri: require('../../assets/15-300x300.jpg') },
    { id: '4', uri: require('../../assets/13-1-300x300.jpg') },
    { id: '5', uri: require('../../assets/16-300x300.jpg') },
    { id: '6', uri: require('../../assets/17-300x300.jpg') },
    { id: '7', uri: require('../../assets/19-300x300.jpg') },
    { id: '8', uri: require('../../assets/20-300x300.jpg') },
    { id: '9', uri: require('../../assets/21-300x300.jpg') },
    { id: '10', uri: require('../../assets/22-300x300.jpg') },
    { id: '11', uri: require('../../assets/23-300x300.jpg') },
    { id: '12', uri: require('../../assets/24-300x300.jpg') },
    { id: '13', uri: require('../../assets/25-300x300.jpg') },
    { id: '14', uri: require('../../assets/26-300x300.jpg') },
    { id: '15', uri: require('../../assets/27-300x300.jpg') },
    { id: '16', uri: require('../../assets/1-1-300x300.jpg') },
    { id: '17', uri: require('../../assets/7-1-300x300.jpg') },
    { id: '18', uri: require('../../assets/2-2-300x300.jpg') },
    { id: '19', uri: require('../../assets/3-1-300x300.jpg') },
    { id: '20', uri: require('../../assets/6-1-300x300.jpg') },
    { id: '21', uri: require('../../assets/8-1-300x300.jpg') },
    { id: '22', uri: require('../../assets/11-1-300x300.jpg') },
    { id: '23', uri: require('../../assets/34-300x300.jpg') },
    { id: '24', uri: require('../../assets/38-300x300.jpg') },
    { id: '25', uri: require('../../assets/39-300x300.jpg') },
    { id: '26', uri: require('../../assets/35-300x300.jpg') },
    { id: '27', uri: require('../../assets/36-300x300.jpg') },
    { id: '28', uri: require('../../assets/37-300x300.jpg') },
    { id: '29', uri: require('../../assets/40-300x300.png') },
    { id: '30', uri: require('../../assets/41-300x300.png') },
    { id: '31', uri: require('../../assets/42-300x300.png') },
  ];

  useEffect(() => {
    loadClothes();
  }, []);

  const handleSaveClothing = async () => {
    const newClothingItem = { itemName, material, color, symbols: selectedSymbols };
    const existingClothes = await AsyncStorage.getItem('clothes');
    const updatedClothes = existingClothes ? JSON.parse(existingClothes) : [];
    updatedClothes.push(newClothingItem);
    await AsyncStorage.setItem('clothes', JSON.stringify(updatedClothes));
    setItemName('');
    Alert.alert('Success', 'Clothing item added successfully');
  };

  const loadClothes = async () => {
    const savedClothes = await AsyncStorage.getItem('clothes');
    const loadedClothes = savedClothes ? JSON.parse(savedClothes).map(cloth => ({
      ...cloth,
      symbols: cloth.symbols || [] // Ensure symbols is always an array
    })) : [];
    setClothes(loadedClothes);
  };

  const handleDeleteClothing = async (index) => {
    const updatedClothes = [...clothes];
    updatedClothes.splice(index, 1);
    await AsyncStorage.setItem('clothes', JSON.stringify(updatedClothes));
    setClothes(updatedClothes);
  };

  const toggleSelection = (id) => {
    setSelectedSymbols(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const renderSymbol = ({ item }) => (
    <TouchableOpacity onPress={() => toggleSelection(item.id)}>
      <Image
        source={item.uri}
        style={[styles.symbol, selectedSymbols.includes(item.id) ? styles.selected : {}]}
      />
    </TouchableOpacity>
  );

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
      <FlatList
        data={washingSymbols}
        renderItem={renderSymbol}
        keyExtractor={item => item.id}
        horizontal
        contentContainerStyle={styles.symbolList}
      />
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
              <Text style={styles.clothText}>
                {cloth.itemName} - {cloth.material} - {cloth.color} - {(cloth.symbols || []).join(', ')}
              </Text>
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
    symbol: {
      width: 100,
      height: 100,
      margin: 10,
    },
    selected: {
      borderWidth: 2,
      borderColor: '#007bff', // Blue border to indicate selection
    },
    symbolList: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
    },
    modalContent: {
      marginTop: 20,
      padding: 20,
    },
    clothItem: {
      flexDirection: 'row',
      justifyContent: 'space-between', // Добавлены закрывающие кавычки
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
