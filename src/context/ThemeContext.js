// ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeValue, setThemeValue] = useState('light'); // По умолчанию светлая тема

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme !== null) {
        setThemeValue(savedTheme); // Устанавливаем сохраненную тему
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = (newTheme) => {
    setThemeValue(newTheme);
    AsyncStorage.setItem('theme', newTheme); // Сохраняем новую тему в AsyncStorage
  };

  return (
    <ThemeContext.Provider value={{ themeValue, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
