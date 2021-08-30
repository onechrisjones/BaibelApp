import { AsyncStorage } from 'react-native';
import CONSTANTS from '~/utils/CONSTANTS';

export const getItemFromStorage = async (key, defaultValue) => {
  try {
    const valueFromStorage = await AsyncStorage.getItem(
      `${CONSTANTS.KEYS.APP_STORAGE_KEY}:${key}`,
    );

    return valueFromStorage || defaultValue;
  } catch (error) {
    console.log(error);
  }

  return defaultValue;
};

export const persistItemInStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(
      `${CONSTANTS.KEYS.APP_STORAGE_KEY}:${key}`,
      JSON.stringify(value),
    );
  } catch (err) {
    console.log(err);
  }
};

export const removeItemFromStorage = async key => {
  try {
    await AsyncStorage.removeItem(`${CONSTANTS.KEYS.APP_STORAGE_KEY}:${key}`);
  } catch (err) {
    console.log(err);
  }
};
