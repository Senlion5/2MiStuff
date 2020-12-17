import React, { FC } from "react";
import { Image, StyleSheet } from "react-native";

const Profile: FC = () => {
  return (
    <Image 
        style={styles.image} 
        source={require("../assets/blank_profile.jpg")}>
    </Image>
  );
};

const styles = StyleSheet.create({
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
      }
});

export default Profile;