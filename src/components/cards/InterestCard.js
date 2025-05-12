import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import { windowHeight, windowWidth } from "../../utils/Dimensions";
import { COLORS } from "../../themes/themes";

const InterestsCard = ({ title, onPress, iconName, iconColor }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.servicesCardContainer}
    >
      <Text style={styles.servicesCardText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default InterestsCard;

const styles = StyleSheet.create({
  servicesCardContainer: {
    padding: 10,
    // width: '100%',
    // borderColor: '#eee',
    // borderWidth: 1,
    borderRadius: 16,
    marginBottom: 4,

    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    backgroundColor: COLORS.declinedBgColor,
    marginRight: 7,
  },
  servicesCardImaage: {
    width: windowWidth / 2.4,
    height: 130,
    borderRadius: 12,
    marginBottom: 10,
    objectFit: "cover",
  },
  imageBackgroundContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  servicesCardText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.rendezvousRed,
    marginLeft: 5,
    // textAlign: "center",
  },
});
