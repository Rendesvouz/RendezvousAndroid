import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React from "react";
import { windowHeight, windowWidth } from "../../utils/Dimensions";

const ServicesCard = ({ props, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.servicesCardContainer}
    >
      <Image
        source={{ uri: props?.imagee }}
        // imageStyle={styles.servicesCardImaage}
        style={styles.servicesCardImaage}
      />
      <Text style={styles.servicesCardText}>{props?.title}</Text>
    </TouchableOpacity>
  );
};

export default ServicesCard;

const styles = StyleSheet.create({
  servicesCardContainer: {
    padding: 7,
    width: windowWidth / 2.2,
    height: 180,
    borderColor: "#eee",
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 4,
    margin: 3,
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
    fontSize: 15,
    fontWeight: "500",
    color: "black",
    // textAlign: "center",
  },
});
