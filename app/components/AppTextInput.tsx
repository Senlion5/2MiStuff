import React from "react";
import { FC } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "../config/colors";
import myStyles from "../config/styles";

export interface TextInputProps {
  autoCapitalize?: "none" | "words";
  autoCorrect?: boolean;
  icon?: string;
  keyboardType?: "email-address" | "numeric";
  onBlur?: () => any;
  onChangeText?: (text: string) => any;
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  placeholder?: string;
  secureTextEntry?: boolean;
  textContentType?: "emailAddress" | "password";
  value?: string;
  width?: number;
}

const AppTextInput: FC<TextInputProps> = ({
  icon,
  width = "100%",
  ...otherProps
}): JSX.Element => {
  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={26}
          color={Colors.purple}
          style={styles.icon}
        />
      )}
      <TextInput style={myStyles.inputTextStyle} {...otherProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darker_light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 12,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppTextInput;
