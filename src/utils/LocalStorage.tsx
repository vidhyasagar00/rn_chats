import AsyncStorage from "@react-native-async-storage/async-storage";

export default class LocalStorage {
     getValue = async (key: string): Promise<string> => {
        try {
            return await AsyncStorage.getItem(key) ?? ""
        } catch (err: any) {
            return ""
        }
    }

    setValue = async (key: string, value: string) => {
        try {
            return await AsyncStorage.setItem(key, value)
        } catch (err: any) {
            return ""
        }
    }
}
