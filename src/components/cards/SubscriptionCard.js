import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import { windowHeight, windowWidth } from "../../utils/Dimensions";
import { COLORS } from "../../themes/themes";
import FormButton from "../form/FormButton";
import TransparentBtn from "../form/TransparentBtn";

const SubscriptionCard = ({
  props,
  onPress,
  borderColor,
  isSubscribed,
  onSubscriptionPressed,
  loading,
  isDisabled,
}) => {
  return (
    <TouchableOpacity
      onPress={isDisabled ? null : onPress}
      activeOpacity={0.9}
      style={[
        styles.subscriptionCard,
        {
          borderColor: borderColor || COLORS.appGrey4,
          // opacity: isDisabled ? 0.5 : 1,
        },
      ]}
    >
      <Text style={styles.subPlan}>{props?.subType} </Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          color: COLORS.rendezvousRed,
          marginBottom: 20,
          textDecorationLine: "line-through",
        }}
      >
        {props?.oldPrice}/month
      </Text>

      <Text style={styles.subPlanPrice}>
        <Text style={{ fontSize: 14 }}>Current: </Text>
        {props?.price}{" "}
        <Text style={{ fontSize: 18, fontWeight: "400" }}>/month</Text>
      </Text>

      {props?.subFeatures?.map((cur, i) => (
        <View key={i} style={styles.subFeatures}>
          <Ionicons
            name="checkmark-outline"
            size={20}
            color={COLORS.rendezvousRed}
          />
          <Text style={{ fontSize: 16, fontWeight: "500", marginLeft: 10 }}>
            {cur}
          </Text>
        </View>
      ))}

      {/* Buttons */}
      <View
        style={{
          bottom: 0,
          position: "relative",
          width: windowWidth / 1.5,
          // padding: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isSubscribed ? (
          <TransparentBtn title={"Subscribed"} width={2} disabled={true} />
        ) : (
          <FormButton
            title={"Subscribe"}
            width={2}
            disabled={loading || isSubscribed || isDisabled}
            onPress={onSubscriptionPressed}
            loading={loading}
            height={50}
            marginTop={20}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SubscriptionCard;

const styles = StyleSheet.create({
  subscriptionCard: {
    padding: 20,
    // height: '100%',
    width: windowWidth / 1.5,
    // backgroundColor: 'red',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.appGrey4,
    marginRight: 10,
  },
  subPlan: {
    padding: 10,
    // backgroundColor: 'red',
    borderRadius: 10,
    width: "100%",
  },
  subPlanPrice: {
    fontSize: 24,
    fontWeight: "600",
  },
  subFeatures: {
    flexDirection: "row",
    marginTop: 20,
  },
});
