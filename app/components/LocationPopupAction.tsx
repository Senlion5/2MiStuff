import React, { FC } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "../config/colors";

interface LocationPopupAction {
  onPress: () => any;
}

const LocationPopupAction: FC<LocationPopupAction> = ({ onPress }): JSX.Element => {
  return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <MaterialCommunityIcons name="earth" size={42} color={Colors.white} />
        </View>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.greenish,
    width: 90,
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
});

export default LocationPopupAction;
