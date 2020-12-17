import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from "dayjs";

const prefix = "cache";
const expireInMinutes = 10;

const store = async (key: any, value: any) => {
    try {
        const item = {
            value,
            timestamp: Date.now()
        }
        await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
    } catch (error) {
        console.log(error);
    }
}

const isExpired = (item: any) => { 
    const now = dayjs();
    const storedItemTime = dayjs(item.timestamp);
    return now.diff(storedItemTime, "minute") > expireInMinutes;
}

const get = async (key: any) => {
    try {
        const value: any = await AsyncStorage.getItem(prefix + key);
        const item = JSON.parse(value); 

        if (!item) return null;

        if (isExpired(item)) {
            await AsyncStorage.removeItem(prefix + key);
            return null;
        }

        return item.value;

    } catch (error) {
        console.log(error);
    }
}  

export default {
    store,
    get
}