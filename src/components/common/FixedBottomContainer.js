import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { windowHeight, windowWidth } from "../../utils/Dimensions";

const FixedBottomContainer = ({
  children,
  top,
  flexDirection,
  alignItems,
  justifyContent,
}) => {
  return (
    <View
      style={{
        top: windowHeight / (top ? top : 1.2),
        position: "absolute",
        width: windowWidth,
        padding: 20,
        flexDirection: flexDirection,
        alignItems: alignItems,
        justifyContent: justifyContent,
        backgroundColor: "white",
      }}
    >
      {children}
    </View>
  );
};

export default FixedBottomContainer;

const styles = StyleSheet.create({});
