// AddClothesScreen.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Picker } from 'react-native';

export default function AddClothesScreen() {
  const [material, setMaterial] = useState('cotton');
  const [symbol, setSymbol] = useState('none');
  const [clothingType, setClothingType] = useState('colored');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Добавить Одежду</Text>
      
      {/* Выбор материала */}
      <Picker
        selectedValue={material}
        onValueChange={(itemValue, itemIndex) => setMaterial(itemValue)}
      >
        <Picker.Item label="Сotton" value="cotton" />
        <Picker.Item label="Synthetic" value="synthetic" />
        {/* Добавьте другие материалы */}
      </Picker>

      {/* Выбор символов с бирки */}
      {/* Для этого нужно будет добавить картинки и Picker.Item для каждого символа */}

      {/* Выбор типа вещи */}
      <Picker
        selectedValue={clothingType}
        onValueChange={(itemValue, itemIndex) => setClothingType(itemValue)}
      >
        <Picker.Item label="Colored" value="colored" />
        <Picker.Item label="Black" value="black" />
        <Picker.Item label="White" value="white" />
        {/* Добавьте другие типы если нужно */}
      </Picker>

      {/* Кнопка для подтверждения добавления */}
      <Button title="Add" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  // Добавьте стили для остальных компонентов
});
