// Импорты, если они нужны
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next'; // Importă instanța i18next

// Данные о программках стирки для каждой модели стиральной машины
export const washingMachinePrograms = {
  "ARCTIC APL71024XLW1": [
    { name: "Cotton", temp: "40°C", rpm: "1200", canDry: true },
    { name: "Cotton", temp: "60°C", rpm: "1200", canDry: true },
    { name: "Cotton", temp: "90°C", rpm: "1200", canDry: true },
    { name: "Synthetics", temp: "40°C", rpm: "800", canDry: true },
    { name: "Synthetics", temp: "60°C", rpm: "800", canDry: true },
    { name: "Delicate", temp: "30°C", rpm: "600", canDry: false }
  ],
  "HISENSE WFQA8014EVJM": [
    { name: "Cotton", temp: "20°C", rpm: "1400", canDry: true },
    { name: "Cotton", temp: "30°C", rpm: "1400", canDry: true },
    { name: "Cotton", temp: "40°C", rpm: "1400", canDry: true },
    { name: "Cotton", temp: "60°C", rpm: "1400", canDry: true },
    { name: "Cotton", temp: "95°C", rpm: "1400", canDry: true },
    { name: "Synthetics", temp: "20°C", rpm: "1000", canDry: true },
    { name: "Synthetics", temp: "30°C", rpm: "1000", canDry: true },
    { name: "Synthetics", temp: "40°C", rpm: "1000", canDry: true },
    { name: "Wool", temp: "30°C", rpm: "600", canDry: false }
  ],
  "BEKO B3WFU58215W": [
    { name: "Cotton", temp: "40°C", rpm: "1000", canDry: true },
    { name: "Cotton", temp: "60°C", rpm: "1000", canDry: true },
    { name: "Cotton", temp: "90°C", rpm: "1000", canDry: true },
    { name: "Synthetics", temp: "40°C", rpm: "1200", canDry: true },
    { name: "Synthetics", temp: "60°C", rpm: "1200", canDry: true },
    { name: "Whool", temp: "40°C", rpm: "600", canDry: false }
  ],
  "LG F2WR508SBW": [
    { name: "Cotton", temp: "20°C", rpm: "1400", canDry: true },
    { name: "Cotton", temp: "40°C", rpm: "1400", canDry: true },
    { name: "Cotton", temp: "60°C", rpm: "1400", canDry: true },
    { name: "Mixed fabric", temp: "30°C", rpm: "1000", canDry: true },
    { name: "Wool", temp: "30°C", rpm: "600", canDry: false }
  ],
  "WHIRLPOOL WRSB 7259 BB EU": [
    { name: "Cotton", temp: "40°C", rpm: "1200", canDry: true },
    { name: "Cotton", temp: "60°C", rpm: "1200", canDry: true },
    { name: "Synthetics", temp: "40°C", rpm: "800", canDry: true },
    { name: "Synthetics", temp: "60°C", rpm: "800", canDry: true },
    { name: "Delicate", temp: "40°C", rpm: "800", canDry: false }
  ],
  // Добавьте аналогичные данные для других моделей
};

// Функция для проверки совместимости одежды
export const checkLaundryCompatibility = (clothesItems) => {
  let errors = [];
  let colorCategories = { white: false, colored: false, black: false };

  // Обработка цветов
  clothesItems.forEach(item => {
    switch (item.color) {
      case 'White':
        colorCategories.white = true;
        break;
      case 'Colored':
        colorCategories.colored = true;
        break;
      case 'Black':
        colorCategories.black = true;
        break;
      default:
        break;
    }
  });

  if ((colorCategories.white && colorCategories.colored) || (colorCategories.white && colorCategories.black)) {
    errors.push(i18next.t('laundry_logic.cannot_wash_white_with_colored_or_black'));
  }

  const delicateMaterials = ['silk', 'wool'];
  const hasDelicate = clothesItems.some(item => delicateMaterials.includes(item.material));
  if (hasDelicate && clothesItems.length > 1) {
    errors.push(i18next.t('laundry_logic.delicate_materials_should_be_washed_separately'));
  }

  // Проверка температур стирки
  const temperatureSymbols = new Set();
  clothesItems.forEach(item => {
    item.symbols.forEach(symbol => {
      if (['5', '6', '29', '30', '31'].includes(symbol)) { // Температурные символы
        temperatureSymbols.add(symbol);
      }
    });
  });

  if (temperatureSymbols.size > 1) {
    errors.push(i18next.t('laundry_logic.items_require_different_temperatures'));
  }

  // Проверка режимов стирки
  const washModes = new Set();
  clothesItems.forEach(item => {
    item.symbols.forEach(symbol => {
      if (['1', '2', '3', '4', '7'].includes(symbol)) { // Режимы стирки
        washModes.add(symbol);
      }
    });
  });

  if (washModes.size > 1) {
    errors.push(i18next.t('laundry_logic.items_require_different_wash_modes'));
  }

  return {
    compatible: errors.length === 0,
    errors,
  };
};

// Функция для рекомендации программы стирки
export const recommendWashProgram = (machineModel, clothesItems) => {
  const programs = washingMachinePrograms[machineModel];

  if (!programs) {
    return i18next.t('laundry_logic.no_wash_programs_available');
  }

  let recommendedProgram = null;
  let maxTemp = 0;

  clothesItems.forEach(item => {
    const material = item.material;
    const temperatureLimit = Math.min(...item.symbols.filter(symbol => ['5', '6', '29', '30', '31'].includes(symbol)).map(symbol => {
      switch(symbol) {
        case '5':
        case '29':
          return 30;
        case '6':
        case '30':
          return 40;
        case '31':
          return 60;
        default:
          return 0;
      }
    }));

    const suitableProgram = programs.find(program => {
      const programTemp = parseInt(program.temp.replace("°C", ""));
      return (program.name.toLowerCase().includes(material.toLowerCase())) && (programTemp <= temperatureLimit);
    });

    if (suitableProgram && (parseInt(suitableProgram.temp.replace("°C", "")) > maxTemp)) {
      recommendedProgram = suitableProgram;
      maxTemp = parseInt(suitableProgram.temp.replace("°C", ""));
    }
  });

  if (!recommendedProgram) {
    return i18next.t('laundry_logic.no_suitable_wash_program_found');
  }

  const dryingSymbols = {
    '9': i18next.t('laundry_logic.dry_any_method'),
    '10': i18next.t('laundry_logic.do_not_tumble_dry'),
    '11': i18next.t('laundry_logic.suitable_for_tumble_drying'),
    '12': i18next.t('laundry_logic.do_not_wring'),
    '13': i18next.t('laundry_logic.dry_low_temp'),
    '14': i18next.t('laundry_logic.dry_medium_temp'),
    '15': i18next.t('laundry_logic.dry_high_temp')
  };

  const ironingSymbols = {
    '23': i18next.t('laundry_logic.iron_no_restrictions'),
    '24': i18next.t('laundry_logic.do_not_iron'),
    '25': i18next.t('laundry_logic.iron_without_steam'),
    '26': i18next.t('laundry_logic.iron_low_temp'),
    '27': i18next.t('laundry_logic.iron_medium_temp'),
    '28': i18next.t('laundry_logic.iron_high_temp')
  };

  let additionalInstructions = clothesItems.map(item => {
    const dryingSymbol = item.symbols.find(symbol => Object.keys(dryingSymbols).includes(symbol));
    const ironingSymbol = item.symbols.find(symbol => Object.keys(ironingSymbols).includes(symbol));
    const chemicalSymbol = item.symbols.find(symbol => ['16', '17', '18', '19', '20', '21', '22'].includes(symbol));

    let dryingInstruction = dryingSymbol ? `Drying: ${dryingSymbols[dryingSymbol]}` : i18next.t('laundry_logic.no_specific_drying_instructions');
    let ironingInstruction = ironingSymbol ? `Ironing: ${ironingSymbols[ironingSymbol]}` : i18next.t('laundry_logic.no_specific_ironing_instructions');
    let chemicalInstruction = chemicalSymbol ? `Chemical cleaning: ${chemicalSymbol}` : i18next.t('laundry_logic.no_specific_chemical_instructions');

    return `${item.itemName} - ${item.material} - ${item.color}\n${dryingInstruction}\n${ironingInstruction}\n${chemicalInstruction}`;
  }).join('\n\n');

  return `${i18next.t('laundry_logic.recommended_program')}: ${recommendedProgram.name} at ${recommendedProgram.temp} with ${recommendedProgram.rpm} rpm.\n\n${i18next.t('laundry_logic.additional_instructions')}:\n${additionalInstructions}`;
};