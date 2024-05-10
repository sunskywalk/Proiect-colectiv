export const checkLaundryCompatibility = (clothesItems) => {
    let errors = [];
    let colorCategories = { white: false, colored: false, black: false };
  
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
  
    // Проверка смешивания белых и цветных вещей
    if ((colorCategories.white && colorCategories.colored) || (colorCategories.white && colorCategories.black)) {
      errors.push("Cannot wash white with colored or black clothes.");
    }
  
    // Проверка наличия деликатных тканей
    const delicateMaterials = ['silk', 'wool'];
    const hasDelicate = clothesItems.some(item => delicateMaterials.includes(item.material));
    if (hasDelicate && clothesItems.length > 1) {
      errors.push("Delicate materials should be washed separately.");
    }
  
    // Проверка наличия конфликтующих символов стирки
    const temperatureSymbols = new Set();
    clothesItems.forEach(item => {
      item.symbols.forEach(symbol => {
        if (['29', '30', '31'].includes(symbol)) { // Температурные символы
          temperatureSymbols.add(symbol);
        }
      });
    });
  
    if (temperatureSymbols.size > 1) {
      errors.push("Items require different washing temperatures.");
    }
  
    return {
      compatible: errors.length === 0,
      errors,
    };
  };
  