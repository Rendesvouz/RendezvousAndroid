import { StyleSheet, Text, View } from "react-native";
import React from "react";

const FormInputTitle = ({ formTitle }) => {
  return <Text style={[styles.inputTitle]}>{formTitle}</Text>;
};

export default FormInputTitle;

const styles = StyleSheet.create({
  inputTitle: {
    marginBottom: 10,
    fontSize: 16,
    color: "#1E1E1E",
    fontWeight: "600",
  },
});
