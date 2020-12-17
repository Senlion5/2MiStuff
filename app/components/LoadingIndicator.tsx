import React, { FC } from 'react';
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

interface LoadingIndicatorProps {
    visible: Boolean;
}

const LoadingIndicator: FC<LoadingIndicatorProps> = ({ visible = false }) => {
    if (!visible) return null;

    return <View style={styles.overlay}>
        <LottieView 
            autoPlay
            loop
            source={require("../assets/animations/isLoading.json")}
        />
    </View>
}

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        opacity: 0.75,
        zIndex: 1
    }
})

export default LoadingIndicator;