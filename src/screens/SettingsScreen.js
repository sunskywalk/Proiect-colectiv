// SettingsScreen.js
import React, { useState, useContext, useEffect } from 'react';
import { View, Button, StyleSheet, Text, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import ThemeContext from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const [language, setLanguage] = useState(null);
  const [openLanguage, setOpenLanguage] = useState(false);
  const [openTheme, setOpenTheme] = useState(false);
  const { themeValue, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) setLanguage(JSON.parse(savedLanguage));
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

  const handleThemeChange = async () => {
    const newTheme = themeValue === 'light' ? 'dark' : 'light';
    await toggleTheme(newTheme);
    setOpenTheme(false);
  };

  return (
    <ScrollView style={[styles.container, {backgroundColor: themeValue === 'dark' ? '#333' : '#fff'}]}>
      <Text style={[styles.title, {color: themeValue === 'dark' ? '#fff' : '#000'}]}>App Settings</Text>
      <View style={styles.settingsSection}>
        <Text style={[styles.label, {color: themeValue === 'dark' ? '#fff' : '#000'}]}>App Theme:</Text>
        <Button
          title={themeValue === 'light' ? 'Switch to Dark' : 'Switch to Light'}
          onPress={handleThemeChange}
          color={themeValue === 'dark' ? '#fff' : '#000'}
        />
        <Text style={[styles.label, {color: themeValue === 'dark' ? '#fff' : '#000'}]}>App Language:</Text>
        <DropDownPicker
          open={openLanguage}
          value={language}
          items={[
            { label: 'English', value: 'en' },
            { label: 'Русский', value: 'ru' },
            { label: 'Français', value: 'fr' },
            { label: 'Română', value: 'ro' }
          ]}
          setOpen={setOpenLanguage}
          setValue={handleLanguageChange}
          style={[styles.picker, {backgroundColor: themeValue === 'dark' ? '#555' : '#eee'}]}
          textStyle={{ color: themeValue === 'dark' ? '#fff' : '#000' }}
        />
      </View>
      <Button
        title="About Us"
        onPress={() => {}}
        color={themeValue === 'dark' ? '#fff' : '#000'}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingsSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    borderColor: '#000',
  }
});
