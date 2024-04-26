// SettingsScreen.js
import React, { useState, useContext, useEffect } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import ThemeContext from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const [language, setLanguage] = useState(null);
  const [theme, setTheme] = useState(null);
  const [openLanguage, setOpenLanguage] = useState(false);
  const [openTheme, setOpenTheme] = useState(false);
  const { themeValue, setThemeValue } = useContext(ThemeContext);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      const savedTheme = await AsyncStorage.getItem('theme');
      setLanguage(savedLanguage ? JSON.parse(savedLanguage) : null);
      setThemeValue(savedTheme ? JSON.parse(savedTheme) : 'light');
    } catch (e) {
      console.error('Failed to load the settings:', e);
    }
  };

  const saveSettings = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Failed to save the settings:', e);
    }
  };

  const handleLanguageChange = async (value) => {
    setLanguage(value);
    await saveSettings('language', value);
    setOpenLanguage(false);
  };

  const handleThemeChange = async (value) => {
    setThemeValue(value);
    await saveSettings('theme', value);
    setOpenTheme(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: themeValue === 'dark' ? '#000' : '#fff' }]}>
      <Text style={styles.title}>App Theme</Text>
      <DropDownPicker
        open={openTheme}
        value={theme}
        items={[
          { label: 'Light', value: 'light' },
          { label: 'Dark', value: 'dark' },
        ]}
        setOpen={setOpenTheme}
        setValue={handleThemeChange}
        zIndex={3000}
        zIndexInverse={1000}
        placeholder="Choose the theme"
      />
      <Text style={styles.title}>App Language</Text>
      <DropDownPicker
        open={openLanguage}
        value={language}
        items={[
          { label: 'English', value: 'en' },
          { label: 'Русский', value: 'ru' },
          { label: 'Français', value: 'fr' },
          { label: 'Română', value: 'ro' },
        ]}
        setOpen={setOpenLanguage}
        setValue={handleLanguageChange}
        zIndex={2000}
        zIndexInverse={2000}
        placeholder="Select language"
      />
      <Button title="About Us" onPress={() => {}} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#ccc',
  },
});
