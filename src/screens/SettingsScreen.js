import React, { useState, useContext, useEffect } from 'react';
import { View, Button, StyleSheet, Text, SafeAreaView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import ThemeContext from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

export default function SettingsScreen() {
  const [language, setLanguage] = useState(null);
  const [openLanguage, setOpenLanguage] = useState(false);
  const { themeValue, toggleTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  const loadSettings = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) {
        setLanguage(JSON.parse(savedLanguage));
      }
    } catch (e) {
      console.error('Failed to load the settings:', e);
    }
  };

  const saveSettings = async (key, value) => {
    if (value !== null && value !== undefined) {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.error('Failed to save the settings:', e);
      }
    } else {
      console.error(`Invalid value: ${value} for key: ${key}`);
    }
  };

  const handleLanguageChange = async (value) => {
    if (value) {
      setLanguage(value);
      await saveSettings('language', value);
    } else {
      console.error('Language value is invalid');
    }
  };

  const handleThemeChange = async () => {
    const newTheme = themeValue === 'light' ? 'dark' : 'light';
    await toggleTheme(newTheme);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeValue === 'dark' ? '#333' : '#fff' }]}>
      <Text style={[styles.title, { color: themeValue === 'dark' ? '#fff' : '#000' }]}>{t('settings_screen.app_settings')}</Text>
      <View style={styles.settingsSection}>
        <Text style={[styles.label, { color: themeValue === 'dark' ? '#fff' : '#000' }]}>{t('settings_screen.app_theme')}:</Text>
        <Button
          title={themeValue === 'light' ? t('settings_screen.switch_to_dark') : t('settings_screen.switch_to_light')}
          onPress={handleThemeChange}
          color={themeValue === 'dark' ? '#fff' : '#000'}
        />
        <Text style={[styles.label, { color: themeValue === 'dark' ? '#fff' : '#000' }]}>{t('settings_screen.app_language')}:</Text>
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
          setValue={setLanguage}
          onChangeValue={handleLanguageChange}
          style={[styles.picker, { backgroundColor: themeValue === 'dark' ? '#555' : '#eee' }]}
          textStyle={{ color: themeValue === 'dark' ? '#fff' : '#000' }}
        />
      </View>
      <Button
        title={t('settings_screen.about_us')}
        onPress={() => {}}
        color={themeValue === 'dark' ? '#fff' : '#000'}
      />
    </SafeAreaView>
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
