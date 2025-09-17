import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProgressBar from "./ProgressBar";
import { useSelector } from "react-redux";
import { windowWidth } from "../../utils/Dimensions";
import { COLORS } from "../../themes/themes";
import { useTheme } from "../../Context/ThemeContext";

const FeedsHeaderTitle = ({ headerTitle, onHeaderIconPress }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons
          name={"arrow-back-outline"}
          size={20}
          color={COLORS.rendezvousRed}
          onPress={onHeaderIconPress}
        />
        {headerTitle && (
          <Text style={[styles.headerTitle, { color: theme?.rendezvousText }]}>
            {headerTitle}
          </Text>
        )}
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          //   backgroundColor: 'green',
          width: windowWidth / 3.4,
        }}
      />
    </View>
  );
};

export default FeedsHeaderTitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    color: COLORS.rendezvousBlack,
    fontWeight: "400",
    marginLeft: 10,
  },
  headerIcon: {
    width: 20,
    height: 20,
    objectFit: "contain",
  },
  leftIconContainer: {
    // backgroundColor: 'red',
    borderRadius: 10,
    padding: 5,
  },
  iconContainer: {
    padding: 5,
    // backgroundColor: 'red',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.appGrey3,
  },
  badgeContainer: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: COLORS.rendezvousRed,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
