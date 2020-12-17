import React, { FC } from "react";
import { StyleSheet } from "react-native";

import AppText from "../AppText";
import { Colors } from "../../config/colors";

interface ErrorProps {
  error?: string;
  visible?: boolean;
}

const ErrorMessage: FC<ErrorProps> = ({ error, visible }) => {
  if (!error || !visible) return null;

  return <AppText style={styles.error}>{error}</AppText>;
};

const styles = StyleSheet.create({
  error: {
    color: Colors.danger,
  },
});

export default ErrorMessage;
