import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, Button, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeContext from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { checkLaundryCompatibility } from '../algorhytms/LaundryLogic.js';

export default function WashScreen({ navigation }) {
  const { t } = useTranslation();
  const { themeValue } = useContext(ThemeContext);
  const [lastWashDate, setLastWashDate] = useState('not defined');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');
  const [clothes, setClothes] = useState([]);

  const washingMachines = [
    "ARCTIC APL71024XLW1",
    "HISENSE WFQA8014EVJM",
    "BEKO B3WFU58215W",
    "LG F2WR508SBW",
    "WHIRLPOOL WRSB 7259 BB EU"
  ];

  useEffect(() => {
    loadSelectedModel();
    loadClothes();
    loadLastWashDate();
  }, []);

  const loadSelectedModel = async () => {
    try {
      const model = await AsyncStorage.getItem('selectedWashingMachine');
      if (model !== null) {
        setSelectedModel(model);
      }
    } catch (error) {
      Alert.alert(t('wash_screen.error'), t('wash_screen.load_selected_machine_error'));
    }
  };

  const loadClothes = async () => {
    try {
      const savedClothes = await AsyncStorage.getItem('clothes');
      if (savedClothes !== null) {
        setClothes(JSON.parse(savedClothes));
      }
    } catch (error) {
      Alert.alert(t('wash_screen.error'), t('wash_screen.load_clothes_error'));
    }
  };

  const loadLastWashDate = async () => {
    try {
      const date = await AsyncStorage.getItem('lastWashDate');
      if (date !== null) {
        setLastWashDate(date);
      }
    } catch (error) {
      Alert.alert(t('wash_screen.error'), t('wash_screen.load_last_wash_date_error'));
    }
  };

  const saveLastWashDate = async () => {
    const timestamp = new Date();
    const formattedDate = timestamp.toLocaleDateString();
    setLastWashDate(formattedDate);
    await AsyncStorage.setItem('lastWashDate', formattedDate);
  };

  const selectMachine = async (model) => {
    try {
      await AsyncStorage.setItem('selectedWashingMachine', model);
      setSelectedModel(model);
      setModalVisible(false); // Close modal after selection
    } catch (error) {
      Alert.alert(t('wash_screen.error'), t('wash_screen.save_selected_machine_error'));
    }
  };

  const handleStart = async () => {
    navigation.navigate('SelectClothes'); // Navighează la ecranul "Select Clothes"
  };

  const styles = getDynamicStyles(themeValue);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/washmashine.png')} style={styles.washingMachine} />
      <Text style={styles.lastWashDate}>{t('wash_screen.last_wash_cycle')}: {lastWashDate}</Text>
      <Text style={styles.modelText}>{t('wash_screen.selected_model')}: {selectedModel || t('wash_screen.none')}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>{t('wash_screen.choose_washing_machine')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddClothes')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>{t('wash_screen.start')}</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <ScrollView>
            {washingMachines.map((machine, index) => (
              <Button key={index} title={machine} onPress={() => selectMachine(machine)} />
            ))}
          </ScrollView>
          <Button title={t('wash_screen.close')} onPress={() => setModalVisible(false)} color="#000" />
        </View>
      </Modal>
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
    washingMachine: {
      width: 250,
      height: 250,
      marginBottom: 20,
    },
    lastWashDate: {
      color: themeValue === 'dark' ? '#fff' : '#000',
      marginBottom: 20,
    },
    modelText: {
      color: themeValue === 'dark' ? '#fff' : '#000',
      fontSize: 16,
      marginBottom: 20,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      paddingHorizontal: 20,
      marginTop: 20,
    },
    button: {
      width: 100,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: themeValue === 'dark' ? '#fff' : '#000',
      borderRadius: 15,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    buttonText: {
      color: themeValue === 'dark' ? '#000' : '#fff',
      fontSize: 16,
    },
    modalView: {
      margin: 20,
      backgroundColor: themeValue === 'dark' ? '#333' : '#fff',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    }
  });
}
