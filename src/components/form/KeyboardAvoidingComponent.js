import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../../themes/themes";

const KeyboardAvoidingComponent = ({ children }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container]}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
});
