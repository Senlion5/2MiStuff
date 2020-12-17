import React, { FC } from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../config/colors";

export interface IconProps {
  name: string;
  size?: number;
  backgroundColor?: string;
  iconColor?: string;
}

const Icon: FC<IconProps> = ({
  name,
  size = 40,
  backgroundColor = Colors.black,
  iconColor = Colors.white,
}) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons name={name} color={iconColor} size={size * 0.5} />
    </View>
  );
};

export default Icon;
