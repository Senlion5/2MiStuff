import React, { FC } from "react";
import Constants from "expo-constants";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { Colors } from "../config/colors";

interface ScreenProps {
  children?: any;
  style?: {};
}

const Screen: FC<ScreenProps> = ({ children, style }): JSX.Element => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Colors.wall,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
