import React, { useState, useContext } from 'react';
import { View, Text, Button, Modal, StyleSheet, ScrollView, Alert, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeContext from '../context/ThemeContext';

export default function AddClothesScreen() {
  const [material, setMaterial] = useState('cotton');
  const [color, setColor] = useState('colored');
  const [itemName, setItemName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSelection, setCurrentSelection] = useState('material'); // Установим по умолчанию
  const { themeValue } = useContext(ThemeContext);
  const styles = getDynamicStyles(themeValue);

  const handleOpenModal = (selection) => {
    setCurrentSelection(selection);
    setModalVisible(true);
  };

  const handleSaveClothing = async () => {
    const newClothingItem = { itemName, material, color };
    try {
      const existingClothes = await AsyncStorage.getItem('clothes');
      const clothes = existingClothes ? JSON.parse(existingClothes) : [];
      clothes.push(newClothingItem);
      await AsyncStorage.setItem('clothes', JSON.stringify(clothes));
      Alert.alert('Success', 'Clothing item added successfully');
      setItemName('');
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
      <Button title="Select Material" onPress={() => handleOpenModal('material')} />
      <Button title="Select Color" onPress={() => handleOpenModal('color')} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
              <Picker
                selectedValue={currentSelection === 'material' ? material : color}
                onValueChange={currentSelection === 'material' ? setMaterial : setColor}
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                {currentSelection === 'material' ? (
                  <>
                    <Picker.Item label="Cotton" value="cotton" />
                    <Picker.Item label="Synthetic" value="synthetic" />
                    <Picker.Item label="Wool" value="wool" />
                  </>
                ) : (
                  <>
                    <Picker.Item label="Colored" value="colored" />
                    <Picker.Item label="Black" value="black" />
                    <Picker.Item label="White" value="white" />
                  </>
                )}
              </Picker>
            </ScrollView>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
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
      padding: 10,
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: '80%',
      backgroundColor: '#fff',
      borderColor: '#ccc',
      borderRadius: 5,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    picker: {
      width: 250,
      height: 150,
      backgroundColor: themeValue === 'dark' ? '#555' : '#eee',
    },
    pickerItem: {
      color: themeValue === 'dark' ? '#fff' : '#000',
    }
  });
}
