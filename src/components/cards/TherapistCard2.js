import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import { windowHeight, windowWidth } from "../../utils/Dimensions";
import { dummyImageUrl } from "../../data/dummyData";
import { COLORS } from "../../themes/themes";

const TherapistCard2 = ({ onPress, props }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.therapistCard}
    >
      <Image
        style={styles.therapistImage}
        source={{
          uri: props?.profile_pictures?.length
            ? props?.profile_pictures[0]
            : dummyImageUrl,
        }}
      />
      <View
        style={{
          marginLeft: 10,
          justifyContent: "space-around",
          width: windowWidth / 1.5,
        }}
      >
        <Text style={styles.therapistName}>{props?.fullname}</Text>
        <View
          style={{
            justifyContent: "space-between",
            width: windowWidth / 1.6,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: windowWidth / 2.4,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                alignItems: "center",
              }}
            >
              4.5 <Ionicons name="star" size={12} color={"gold"} />
            </Text>
            <Text>(0 reviews)</Text>
          </View>
          <Text
            style={{ fontSize: 12, fontWeight: "400", color: COLORS.appGrey2 }}
          >
            {props?.city}, {props?.country}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TherapistCard2;

const styles = StyleSheet.create({
  therapistCard: {
    width: windowWidth / 1.05,
    height: windowHeight / 9,
    // backgroundColor: "red",
    flexDirection: "row",
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    borderWidth: 1,
    borderColor: COLORS.appGrey4,
    borderRadius: 10,
  },
  therapistImage: {
    width: 80,
    height: windowHeight / 12,
    borderRadius: 10,
  },
  therapistName: {
    color: COLORS.rendezvousBlack,
    fontSize: 18,
    fontWeight: "500",
  },
  therapistExperienceNameValue: {
    fontWeight: "600",
    fontSize: 14,
  },
});
