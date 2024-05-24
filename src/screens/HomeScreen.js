import React, { useContext } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import ThemeContext from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function HomeScreen({ navigation }) {
  const { themeValue } = useContext(ThemeContext);
  const { t } = useTranslation();
  const styles = getDynamicStyles(themeValue);

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('home_screen.welcome_message')}</Text>
      <Button 
        title={t('home_screen.lets_wash')} 
        onPress={() => navigation.navigate('Wash')} 
        color={styles.button.backgroundColor} 
      />
      <View style={styles.buttonSpace} />
      <Button 
        title={t('home_screen.login')} 
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
    buttonSpace: {
      marginVertical: 10,
    },
  });
}
