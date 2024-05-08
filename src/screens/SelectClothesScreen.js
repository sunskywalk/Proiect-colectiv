import React, { useState, useContext, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeContext from '../context/ThemeContext';
import { checkLaundryCompatibility } from '../algorhytms/LaundryLogic.js'; // Предполагаем, что функция здесь

export default function SelectClothesScreen({ navigation }) {
  const [clothes, setClothes] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const { themeValue } = useContext(ThemeContext);
  const styles = getDynamicStyles(themeValue);

  useEffect(() => {
    loadClothes();
  }, []);

  const loadClothes = async () => {
    const savedClothes = await AsyncStorage.getItem('clothes');
    const loadedClothes = savedClothes ? JSON.parse(savedClothes) : [];
    setClothes(loadedClothes);
  };

  const toggleSelection = (index) => {
    const newSelectedItems = [...selectedItems];
    if (newSelectedItems.includes(index)) {
      const itemIndex = newSelectedItems.indexOf(index);
      newSelectedItems.splice(itemIndex, 1);
    } else {
      newSelectedItems.push(index);
    }
    setSelectedItems(newSelectedItems);
  };

  const handleCheckCompatibility = () => {
    const selectedClothes = selectedItems.map(index => clothes[index]);
    const { compatible, errors } = checkLaundryCompatibility(selectedClothes);
    if (!compatible) {
      Alert.alert("Compatibility Issue", errors.join("\n"));
    } else {
      Alert.alert("Success", "The selected clothes are compatible for washing.");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={clothes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={selectedItems.includes(index) ? styles.selectedItem : styles.item}
            onPress={() => toggleSelection(index)}
          >
            <Text style={selectedItems.includes(index) ? styles.selectedText : styles.text}>
              {item.itemName} - {item.material} - {item.color}
            </Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.checkButton} onPress={handleCheckCompatibility}>
        <Text style={styles.buttonText}>Check Compatibility</Text>
      </TouchableOpacity>
    </View>
  );
}

function getDynamicStyles(themeValue) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeValue === 'dark' ? '#000' : '#fff',
    },
    item: {
      padding: 10,
      marginVertical: 5,
      backgroundColor: '#fff',
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 5,
    },
    selectedItem: {
      padding: 10,
      marginVertical: 5,
      backgroundColor: '#000',
      borderColor: '#fff',
      borderWidth: 1,
      borderRadius: 5,
    },
    text: {
      color: '#000',
      textAlign: 'center',
    },
    selectedText: {
      color: '#fff',
      textAlign: 'center',
    },
    checkButton: {
      padding: 10,
      backgroundColor: '#000',
      margin: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 18,
    }
  });
}
