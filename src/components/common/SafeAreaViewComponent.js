import { StyleSheet, SafeAreaView, Platform } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

const SafeAreaViewComponent = ({ children }) => {
  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar />
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaViewComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: Platform.OS == "android" ? 0 : 20,
    paddingTop: Platform.OS == "android" ? 20 : 0,
  },
});
