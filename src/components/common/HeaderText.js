import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../themes/themes";

const HeaderText = ({ headerTitle }) => {
  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          color: COLORS.black,
          fontSize: 18,
          fontWeight: "600",
          lineHeight: 24,
          textAlign: "center",
        }}
      >
        {headerTitle}
      </Text>
    </View>
  );
};

export default HeaderText;

const styles = StyleSheet.create({});
