import AsyncStorage from '@react-native-community/async-storage';


const localDB = {
    
    getValue: async (key) => {
        try {
          const value = await AsyncStorage.getItem('@'+key)
          return value;
        } catch(e) {
          return e
        }
      },

    setValue: async (key, value) => {
        try {
          await AsyncStorage.setItem('@'+key, value)
        } catch(e) {
          return e
        }
      },

    removeValue: async (key) => {
        try {
          await AsyncStorage.removeItem('@'+key)
        } catch(e) {
          return e
        }
      },

}


export default localDB