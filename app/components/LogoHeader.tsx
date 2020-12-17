import React, { FC } from "react";
import { View, Image, StyleSheet } from "react-native";

const LogoHeader: FC = (): JSX.Element => {
  return (
    <>
      <View>
        <Image style={styles.logo} source={require("../assets/2ms_logo.png")} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: 230,
    alignSelf: "center",
    marginTop: 35,
    marginBottom: 20,
  },
});

export default LogoHeader;
