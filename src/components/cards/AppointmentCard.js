import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { windowHeight, windowWidth } from "../../utils/Dimensions";
import { dummyImageUrl } from "../../data/dummyData";
import {
  convertTo12HourFormat,
  formatDate,
  setPriceTo2DecimalPlaces,
} from "../../Library/Common";
import { COLORS } from "../../themes/themes";

const AppointmentCard = ({ onPress, props }) => {
  console.log("props", props);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.therapistCard}
    >
      <Image
        style={styles.therapistImage}
        source={{
          uri: props?.providerProfile?.profile_pictures?.length
            ? props?.providerProfile?.profile_pictures[0]
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
        <View style={styles.namerows}>
          <Text style={styles.therapistName}>
            {props?.providerProfile?.fullname}
          </Text>
          <View
            style={[
              styles.statusCard,
              {
                backgroundColor:
                  props?.status == "request"
                    ? COLORS.pendingBgColor
                    : props?.status == "scheduled"
                    ? COLORS.acceptedBgColor
                    : COLORS.declinedBgColor,
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                {
                  color:
                    props?.status == "request"
                      ? COLORS.pendingColor
                      : props?.status == "scheduled"
                      ? COLORS.acceptedColor
                      : COLORS.declinedColor,
                },
              ]}
            >
              {props?.status == "request"
                ? "Pending"
                : props?.status == "scheduled"
                ? "Accepted"
                : "Declined"}
            </Text>
          </View>
        </View>
        <View style={styles.namerows}>
          <Text style={styles.appointmentKey}>Date</Text>
          <Text style={styles.appointmentValue}>
            {formatDate(props?.appointmentTime?.date)}
          </Text>
        </View>
        <View style={styles.namerows}>
          <Text style={styles.appointmentKey}>Time</Text>
          <Text style={styles.appointmentValue}>
            {convertTo12HourFormat(props?.appointmentTime?.time)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  therapistCard: {
    width: windowWidth / 1.05,
    height: windowHeight / 9,
    // backgroundColor: "red",
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  therapistImage: {
    width: 80,
    height: windowHeight / 12,
    borderRadius: 10,
  },
  therapistName: {
    color: "black",
    fontSize: 18,
    fontWeight: "600",
  },
  therapistExperienceNameValue: {
    fontWeight: "600",
    fontSize: 14,
  },
  namerows: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  appointmentKey: {
    fontSize: 14,
    // fontWeight: "500",
    color: COLORS.ndonuGrey,
  },
  appointmentValue: {
    fontWeight: "600",
    fontSize: 14,
  },
  statusCard: {
    padding: 5,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
  },
});
