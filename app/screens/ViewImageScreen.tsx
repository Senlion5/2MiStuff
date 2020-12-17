import React, { FC } from "react";
import { View, Image, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "../config/colors";

const ViewImageScreen: FC = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.closeIcon}>
        <MaterialCommunityIcons name="close" color={Colors.light} size={35} />
      </View>
      <View style={styles.deleteIcon}>
        <MaterialCommunityIcons name="delete" color={Colors.danger} size={34} />
      </View>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={require("../assets/restore.jpg")}
      ></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  container: {
    backgroundColor: Colors.black,
    flex: 1,
  },
  closeIcon: {
    position: "absolute",
    top: 45,
    left: 30,
  },
  deleteIcon: {
    position: "absolute",
    top: 45,
    right: 30,
  },
});

export default ViewImageScreen;
