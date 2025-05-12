import { StyleSheet, Text, View } from "react-native";
import React from "react";

const OverlayCard = ({ borderRadius }) => {
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        borderRadius: borderRadius,
      }}
    />
  );
};

export default OverlayCard;

const styles = StyleSheet.create({});
