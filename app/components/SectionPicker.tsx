import React, { FC } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { PickerItemProps } from "./PickerItem";
import Icon from "./Icon";
import AppText from "./AppText";

const SectionPicker: FC<PickerItemProps> = ({ item, onPress }): JSX.Element => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        {item.icon && (
          <Icon
            name={item.icon}
            size={80}
            backgroundColor={item.backgroundColor}
          />
        )}
        <AppText style={styles.label}>{item.label}</AppText>
      </TouchableOpacity>
    </View>
);
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    alignItems: "center",
    width: "33.3%",
  },
  label: {
    marginTop: 6,
    textAlign: "center",
  },
});

export default SectionPicker;
