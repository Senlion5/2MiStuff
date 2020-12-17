import React, { FC } from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import AppText from "./AppText";
import Swipeable from "react-native-gesture-handler/Swipeable";
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

const SquareItem: FC<UserProps> = ({
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
              <AppText style={styles.subTitle} numberOfLines={4}>
                {subTitle}
              </AppText>
            )}
          </View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: Colors.darker_light,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  subTitle: {
    color: Colors.dark_purple,
    marginVertical: 3,
  },
  title: {
    fontWeight: "800",
    color: Colors.strong,
  },
});

export default SquareItem;
