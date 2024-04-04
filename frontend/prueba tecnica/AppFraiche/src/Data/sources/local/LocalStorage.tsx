import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Función que devuelve un objeto con métodos para guardar, obtener y eliminar datos del AsyncStorage.
 * @returns objeto con métodos para interactuar con el AsyncStorage.
 */

export const LocalStorage = () => {

    /**
     * Método para guardar un valor en el AsyncStorage.
     * @param key clave bajo la cual se guardará el valor.
     * @param value valor a guardar.
     * @throws error si no se puede guardar el valor en el AsyncStorage.
     */

    const save = async (key: string, value: string) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log('ERROR EN LOCAL STORAGE: ' + error);
        }
    }

    const saveOrd = async (key: string, value: string) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log('ERROR EN LOCAL STORAGE: ' + error);
        }
    }

    const savePro = async (key: string, value: string) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log('ERROR EN LOCAL STORAGE: ' + error);
        }
    }

    /**
     * Método para obtener un valor del AsyncStorage.
     * @param key clave bajo la cual se encuentra el valor.
     * @returns valor almacenado en el AsyncStorage.
     * @throws error si no se puede obtener el valor del AsyncStorage.
     */
    
    const getItem = async (key: string) => {
        try {
            const item = await AsyncStorage.getItem(key);
            return item;
        } catch (error) {
            console.log('ERROR EN LOCAL STORAGE: ' + error);
        }
    }

    const getItemOrd = async (key: string) => {
        try {
            const item = await AsyncStorage.getItem(key);
            return item;
        } catch (error) {
            console.log('ERROR EN LOCAL STORAGE: ' + error);
        }
    }

    const getItemPro = async (key: string) => {
        try {
            const item = await AsyncStorage.getItem(key);
            return item;
        } catch (error) {
            console.log('ERROR EN LOCAL STORAGE: ' + error);
        }
    }

    /**
     * Método para eliminar un valor del AsyncStorage.
     * @param key clave bajo la cual se encuentra el valor a eliminar.
     * @throws error si no se puede eliminar el valor del AsyncStorage.
     */

    const remove = async (key: string) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.log('ERROR EN LOCAL STORAGE: ' + error);
        }
    }

    return {
        save,
        getItem,
        remove,
        saveOrd,
        savePro,
        getItemOrd,
        getItemPro
    }

}

