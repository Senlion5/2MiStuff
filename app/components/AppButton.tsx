import React, { FC } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

import { Colors } from "../config/colors";

interface AppProps {
  title: string;
  color?: Colors;
  onPress?: () => void;
}

const AppButton: FC<AppProps> = ({
  title,
  onPress,
  color = Colors.primary,
}): JSX.Element => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    color: Colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
