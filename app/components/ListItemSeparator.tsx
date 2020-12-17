import React, { FC } from "react";
import { View, StyleSheet } from "react-native";

import { Colors } from "../config/colors";

const ListItemSeparator: FC = (): JSX.Element => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.light,
  },
});

export default ListItemSeparator;
