// HomeScreen.js
import React, { useContext } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import ThemeContext from '../context/ThemeContext';

export default function HomeScreen({ navigation }) {
  const { themeValue } = useContext(ThemeContext);
  const styles = getDynamicStyles(themeValue);

  return (
    <View style={styles.container}>
      <Button title="LET'S WASH" onPress={() => navigation.navigate('Wash')} />
    </View>
  );
}

function getDynamicStyles(themeValue) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: themeValue === 'dark' ? '#000' : '#fff', // Динамический фон
    },
  });
}
