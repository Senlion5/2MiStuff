import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from "expo-constants";
import { useNetInfo } from "@react-native-community/netinfo";

import AppText from './AppText';
import { Colors } from "../config/colors";

const OfflineNotice: FC = (): JSX.Element | null => {
    const netInfo = useNetInfo();

    if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
    return (
        <View style={styles.container}>
            <AppText style={styles.text}>No Internet Connection</AppText>
        </View>
    );

    return null;
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: Colors.purple,
        height: 45,
        justifyContent: "center",
        position: "absolute",
        top: Constants.statusBarHeight,
        width: "100%",
        zIndex: 1,
    },
    text: {
        color: Colors.white
    }
})

export default OfflineNotice;