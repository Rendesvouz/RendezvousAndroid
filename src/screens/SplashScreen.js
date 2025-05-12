import { StyleSheet, View, SafeAreaView, Image, Text } from "react-native";
import React from "react";
import { COLORS } from "../themes/themes";
import { windowHeight, windowWidth } from "../utils/Dimensions";

const SplashScreen = () => {
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/RendezvousLogoBlack.png")}
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    // height: windowHeight,
  },
  logo: {
    height: windowHeight / 5,
    width: windowWidth / 1.2,
    resizeMode: "contain",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: windowHeight / 3.5,
  },
  logoContainer: {
    marginTop: 50,
    resizeMode: "cover",
    alignSelf: "center",
  },
  subtitle: {
    marginTop: 20,
    fontSize: 16,
    color: COLORS.rendezvousRed,
    textAlign: "center",
  },
});
