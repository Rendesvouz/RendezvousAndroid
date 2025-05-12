import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import { windowHeight, windowWidth } from "../../utils/Dimensions";
import { COLORS } from "../../themes/themes";

// daysjs plugin
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const MessagesListCard = ({ navigation, onPress, props }) => {
  // console.log('starboy', props);
  const messageThread = props?.Messages?.[0];

  const lastMessage =
    messageThread?.content?.[messageThread.content.length - 1];
  // console.log('lastMessage', lastMessage, messageThread);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.listCard}
    >
      <Image
        style={styles.therapistImage}
        source={{
          uri: props?.matchedUserProfile?.profile_pictures[0],
        }}
      />
      <View
        style={{
          marginLeft: 10,
          justifyContent: "space-around",
          width: windowWidth / 1.5,
        }}
      >
        <Text style={styles.therapistName}>
          {props?.matchedUserProfile?.username}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{ fontSize: 12, fontWeight: "400", color: COLORS.appGrey2 }}
          >
            {lastMessage?.content || "No messages yet"}
          </Text>
          <Text
            style={{ fontSize: 10, color: COLORS.black, fontStyle: "italic" }}
          >
            {lastMessage?.timestamp
              ? dayjs(lastMessage?.timestamp).fromNow()
              : ""}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MessagesListCard;

const styles = StyleSheet.create({
  listCard: {
    width: windowWidth / 1.05,
    height: windowHeight / 9,
    // backgroundColor: "red",
    flexDirection: "row",
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    borderWidth: 1,
    borderColor: COLORS.appGrey4,
    borderRadius: 16,
    marginBottom: 5,
  },
  therapistImage: {
    width: 80,
    height: windowHeight / 12,
    borderRadius: 10,
  },
  therapistName: {
    color: COLORS.rendezvousBlack,
    fontSize: 16,
    fontWeight: "500",
  },
  therapistExperienceNameValue: {
    fontWeight: "600",
    fontSize: 14,
  },
});
