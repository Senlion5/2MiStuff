import React, { FC } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "../config/colors";

interface DeleteAction {
  onPress: () => void;
}

const ListItemDeleteAction: FC<DeleteAction> = ({ onPress }): JSX.Element => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons name="delete" size={42} color={Colors.white} />
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.danger,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListItemDeleteAction;
