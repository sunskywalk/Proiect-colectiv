// ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext({
  themeValue: 'light', // Установка светлой темы по умолчанию
  toggleTheme: () => {}
});

export const ThemeProvider = ({ children }) => {
  const [themeValue, setThemeValue] = useState('light'); // Начальное значение - светлая тема

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      // Устанавливаем тему из хранилища, если она существует, иначе - 'light'
      setThemeValue(savedTheme || 'light');
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = themeValue === 'light' ? 'dark' : 'light';
    setThemeValue(newTheme);
    try {
      console.log('Saving new theme:', newTheme); // Логирование для отладки
      await AsyncStorage.setItem('theme', newTheme);
    } catch (e) {
      console.error('Failed to save the new theme:', e);
    }
  };

  return (
    <ThemeContext.Provider value={{ themeValue, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
