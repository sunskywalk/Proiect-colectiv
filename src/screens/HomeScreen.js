// HomeScreen.js
import React, { useContext } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import ThemeContext from '../context/ThemeContext';

export default function HomeScreen({ navigation }) {
  const { themeValue } = useContext(ThemeContext);
  const styles = getDynamicStyles(themeValue);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Smartwash</Text>
      <Button 
        title="LET'S WASH" 
        onPress={() => navigation.navigate('Wash')} 
        color={styles.button.backgroundColor}  // Use dynamic styles for button color
      />
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
    title: {
      fontSize: 24,
      color: themeValue === 'dark' ? '#fff' : '#000',
      marginBottom: 20,
    },
    button: {
      backgroundColor: themeValue === 'dark' ? '#fff' : '#000', // Invert button background color
      color: themeValue === 'dark' ? '#000' : '#fff', // Invert text color
    }
  });
}
