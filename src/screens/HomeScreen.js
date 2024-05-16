import React, { useContext } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import ThemeContext from '../context/ThemeContext';

export default function HomeScreen({ navigation }) {
  const { themeValue } = useContext(ThemeContext);
  const styles = getDynamicStyles(themeValue);

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Smartwash</Text>
      <Button 
        title="LET'S WASH" 
        onPress={() => navigation.navigate('Wash')} 
        color={styles.button.backgroundColor} 
      />
      {/* Add space between buttons */}
      <View style={styles.buttonSpace} />
      <Button 
        title="LOGIN" 
        onPress={handleLoginPress} 
        color={styles.button.backgroundColor} 
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
      backgroundColor: themeValue === 'dark' ? '#fff' : '#000',
      color: themeValue === 'dark' ? '#000' : '#fff',
    },
    // Define styles for the space between buttons
    buttonSpace: {
      marginVertical: 10, // Adjust as needed
    },
  });
}
