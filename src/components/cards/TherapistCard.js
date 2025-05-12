import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { windowHeight, windowWidth } from "../../utils/Dimensions";
import { dummyImageUrl } from "../../data/dummyData";
import { setPriceTo2DecimalPlaces } from "../../Library/Common";

const TherapistCard = ({ onPress, props }) => {
  // console.log("pppp", props);

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
          width: windowWidth / 1.6,
        }}
      >
        <Text style={styles.therapistName}>{props?.fullname}</Text>
        <Text>
          Hourly:{" "}
          <Text style={styles.therapistExperienceNameValue}>
            {setPriceTo2DecimalPlaces(props.rate_per_hour)}
          </Text>{" "}
          | <Ionicons name="location-outline" color="black" size={13} />{" "}
          {props?.country}
        </Text>
        <Text style={{ alignItems: "center", justifyContent: "center" }}>
          Platforms:{" "}
          <Text style={styles.therapistExperienceNameValue}>
            {props?.platforms[0]}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TherapistCard;

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
    fontSize: 20,
    fontWeight: "600",
  },
  therapistExperienceNameValue: {
    fontWeight: "600",
    fontSize: 14,
  },
});
