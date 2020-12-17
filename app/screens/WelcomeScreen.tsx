import React, { FC } from "react";
import { View, ImageBackground, StyleSheet, Image, Text } from "react-native";

import { Colors } from "../config/colors";
import AppButton from "../components/AppButton";

interface WelcomeScreenProps {
  navigation: {
    navigate: (screen: string) => FC;
  };
}

const WelcomeScreen: FC<WelcomeScreenProps> = ({ navigation }): JSX.Element => {
  return (
    <ImageBackground
      blurRadius={0.8}
      style={styles.background}
      source={require("../assets/home16.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.stuff}
          source={require("../assets/2ms_logo.png")}
        ></Image>
        <Text style={styles.text}>Sell Your Stuff from Hand 2 Hand</Text>
        <Text style={styles.text2}>handmade | restorated | secondhand</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton title="Login" onPress={() => navigation.navigate("Login")} color={Colors.brown} />
        <AppButton title="Register" onPress={() => navigation.navigate("Register")} color={Colors.dark_purple} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 40,
    width: "100%",
  },
  logoContainer: {
    position: "absolute",
    top: 50,
    alignItems: "center",
  },
  stuff: {
    height: 58,
    width: 250,
    margin: 12,
    marginBottom: 12,
  },
  text: {
    fontSize: 21,
    fontWeight: "bold",
    color: Colors.dark,
    margin: 8,
  },
  text2: {
    fontSize: 17,
    fontWeight: "bold",
    color: Colors.dark,
    margin: 6,
  },
});

export default WelcomeScreen;
