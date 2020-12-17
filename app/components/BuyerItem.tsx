import React, { FC } from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import AppText from "./AppText";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "react-native-expo-image-cache";

import { Colors } from "../config/colors";

interface UserProps {
  title: string;
  subTitle?: string;
  image?: string;
  ImageComponent?: JSX.Element;
  onPress?: () => void;
  renderRightActions?: any;
}

const BuyerItem: FC<UserProps> = ({
  title,
  subTitle,
  image,
  ImageComponent,
  onPress,
  renderRightActions,
}): JSX.Element => {

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={Colors.light} onPress={onPress}>
        <View style={styles.container}>
          {image ? <Image style={styles.image} uri={image}></Image> : ImageComponent}
          <View style={styles.detailsContainer}>
            <AppText style={styles.title} numberOfLines={1}>
              {title}
            </AppText>
            {subTitle && (
              <AppText style={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </AppText>
            )}
          </View>
          <MaterialCommunityIcons
            name="bullseye-arrow"
            size={42}
            color={Colors.dark}
          />
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    paddingRight: 24,
    backgroundColor: Colors.cherry,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 18,
    justifyContent: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  subTitle: {
    color: Colors.greenish,
    marginVertical: 3,
  },
  title: {
    fontWeight: "bold",
    color: Colors.primary,
  },
});

export default BuyerItem;
