import React, { FC } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import * as Progress from "react-native-progress";
import LottieView from "lottie-react-native";

import { Colors } from "../config/colors";

interface UploadScreenProps {
    onDone: () => void;
    progress: number;
    visible: boolean;
}

const UploadScreen: FC<UploadScreenProps> = ({ onDone, progress = 0, visible = false }): JSX.Element => {
    return (
        <Modal visible={visible}>
            <View style={styles.container}>
                {progress < 1 ? (
                    <Progress.Bar color={Colors.purple} progress={progress} width={200} />
                ) : (
                    <LottieView
                      autoPlay 
                      loop={false}
                      onAnimationFinish={onDone}
                      source={require("../assets/animations/isDone.json")}
                      style={styles.animation}
                    />
                )}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    animation: {
        width: 150
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    }
})

export default UploadScreen;