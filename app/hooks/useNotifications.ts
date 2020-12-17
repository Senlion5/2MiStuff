import { useEffect } from "react";
import * as Notifications from 'expo-notifications';
import * as Permissions from "expo-permissions";
import Constants from 'expo-constants';
import { Platform } from "react-native";

import expoPushTokensApi from "../api/expoPushTokens";

const useNotifications = (notificationListener?: (notification: any) => void) => {
    useEffect(() => {
        registerForPushNotificationsAsync()

        if (notificationListener) {
            const subscription = Notifications.addNotificationReceivedListener(notificationListener);

            return () => subscription.remove();
        };
    }, []);

    const registerForPushNotificationsAsync = async () => {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
            }
            if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            expoPushTokensApi.register(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }
        
        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
            });
        }
        
        return token;
    }
}

export default useNotifications;
