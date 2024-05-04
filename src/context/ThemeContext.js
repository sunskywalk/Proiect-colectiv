// ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext({
  themeValue: 'light', // Значение по умолчанию
  toggleTheme: () => {}  // Пустая функция для переключения темы
});

export const ThemeProvider = ({ children }) => {
  const [themeValue, setThemeValue] = useState('light'); // Светлая тема по умолчанию

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme !== null) {
        setThemeValue(savedTheme); // Устанавливаем сохраненную тему, если она есть
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = themeValue === 'light' ? 'dark' : 'light';
    setThemeValue(newTheme);
    await AsyncStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ themeValue, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
