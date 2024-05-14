import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import WashScreen from './src/screens/WashScreen';
import AddClothesScreen from './src/screens/AddClothesScreen';
import SelectClothesScreen from './src/screens/SelectClothesScreen';
import { ThemeProvider } from './src/context/ThemeContext';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import 'react-native-reanimated';  // Importing react-native-reanimated

const Stack = createNativeStackNavigator();

export default function App() {
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
              title: 'Smartwash',
              headerTitleAlign: 'center',
            })}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              title: 'Settings',
            }}
          />
          <Stack.Screen
            name="Wash"
            component={WashScreen}
            options={{
              title: 'Wash Clothes',
            }}
          />
          <Stack.Screen
            name="AddClothes"
            component={AddClothesScreen}
            options={{
              title: 'Add Clothes',
            }}
          />
          <Stack.Screen
            name="SelectClothes"
            component={SelectClothesScreen}
            options={{
              title: 'Select Clothes for Washing',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
