import React, { FC } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import AppText from "./AppText";
import { Image } from "react-native-expo-image-cache";

import { Colors } from "../config/colors";
import categories from "../config/categories";

interface CardProps {
  title: string;
  category: number;
  price: string;
  imageUrl: string;
  thumbnailUrl: string;
  onPress: () => FC;
}

const Card: FC<CardProps> = ({
  title,
  category,
  price,
  imageUrl,
  onPress,
  thumbnailUrl
}): JSX.Element => {
  const myCategory = categories.find(value => value.id === category);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.image} preview={{ uri: thumbnailUrl }} tint="light" uri={imageUrl}></Image>
        <View style={styles.detailsContainer}>
          <AppText style={styles.title} numberOfLines={1}>
            {title}
          </AppText>
          <AppText style={styles.category}>{myCategory?.label}</AppText>
          <AppText style={styles.price}>{price}</AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>

  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: Colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  category: {
    fontWeight: "bold",
    marginBottom: 3,
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: 220,
  },
  detailsContainer: {
    padding: 20,
  },
  price: {
    color: Colors.price,
  },
  title: {
    marginBottom: 5,
  },
});

export default Card;
