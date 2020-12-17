import React, { FC } from "react";
import { Text } from "react-native";

import myStyles from "../config/styles";

interface TextProps {
  children: any;
  style?: {};
  numberOfLines?: number;
}

const AppText: FC<TextProps> = ({ children, style, ...otherProps }) => {
  return (
    <Text style={[myStyles.inputTextStyle, style]} {...otherProps}>
      {children}
    </Text>
  );
};

export default AppText;
