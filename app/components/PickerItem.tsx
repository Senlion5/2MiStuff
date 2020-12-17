import React, { FC } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import AppText from "./AppText";
import { Section } from "../config/section";

export interface PickerItemProps {
  item: Section;
  onPress?: () => void;
}

const PickerItem: FC<PickerItemProps> = ({ item, onPress }): JSX.Element => {
  return (
    <TouchableOpacity onPress={onPress}>
      <AppText style={styles.text}>{item.label}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
});

export default PickerItem;
