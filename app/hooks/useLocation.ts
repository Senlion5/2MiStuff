import { useState, useEffect } from "react";
import * as Location from "expo-location";

interface Location {
    latitude: number;
    longitude: number;
}

const useLocation = () => {
    const [location, setLocation] = useState<Location>();

    const getLocation = async () => {
        try {
            const result = await Location.requestPermissionsAsync();
            if (!result.granted) return;
            const location: any = await Location.getLastKnownPositionAsync();

            if (location !== null) {
                const { latitude, longitude }: Location = location.coords;

                setLocation({ latitude, longitude });
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
      getLocation();
    }, []);

    return location;
};

export default useLocation; 
