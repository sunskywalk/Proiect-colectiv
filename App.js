import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import WashScreen from './src/screens/WashScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import AddClothesScreen from './src/screens/AddClothesScreen';
import SelectClothesScreen from './src/screens/SelectClothesScreen';
import { ThemeProvider } from './src/context/ThemeContext';
import { TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome';
import './i18n';  // Importă configurația i18next
import 'react-native-reanimated';  // Importing react-native-reanimated

const Stack = createNativeStackNavigator();

export default function App() {
  const { t } = useTranslation();

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                  <Icon name="gear" size={30} color="#000" />
                </TouchableOpacity>
              ),
              title: t('smartwash'),  // Folosind traducerile
              headerTitleAlign: 'center',
            })}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              title: t('settings'),  // Folosind traducerile
            }}
          />
          <Stack.Screen
            name="Wash"
            component={WashScreen}
            options={{
              title: t('wash_clothes'),  // Folosind traducerile
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: t('login'),  // Folosind traducerile
            }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{
              title: t('signup'),  // Folosind traducerile
            }}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
            options={{
              title: t('change_password'),  // Folosind traducerile
            }}
          />
          <Stack.Screen
            name="AddClothes"
            component={AddClothesScreen}
            options={{
              title: t('add_clothes'),  // Folosind traducerile
            }}
          />
          <Stack.Screen
            name="SelectClothes"
            component={SelectClothesScreen}
            options={{
              title: t('select_clothes'),  // Folosind traducerile
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
