import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { windowWidth } from "../../utils/Dimensions";
import { COLORS } from "../../themes/themes";

const SubscriptionPlansCard = ({ props, onPress, isCurrentPlan }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        styles.plansCard,
        isCurrentPlan && {
          borderColor: COLORS.rendezvousRed,
          borderWidth: 1,
        },
      ]}
    >
      <Image
        style={styles.rendezLogo}
        source={require("../../assets/newRendezvousLogo.png")}
      />
      {isCurrentPlan && (
        <View style={styles.currentBadge}>
          <Text style={styles.currentBadgeText}>Current Plan</Text>
        </View>
      )}
      <Text style={styles.planTitle}>{props?.subType}</Text>
    </TouchableOpacity>
  );
};

export default SubscriptionPlansCard;

const styles = StyleSheet.create({
  plansCard: {
    padding: 20,
    // backgroundColor: 'whitesmoke',
    marginBottom: 4,
    borderRadius: 8,

    width: windowWidth / 2.2,
    height: 130,
    borderColor: COLORS.appGrey4,
    borderWidth: 1,
    // borderRadius: 16,
    // marginBottom: 4,
    margin: 3,
    justifyContent: "space-between",
  },
  rendezLogo: {
    width: 40,
    height: 40,
    objectFit: "contain",
    marginBottom: 20,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  currentBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: COLORS.rendezvousRed,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  currentBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
