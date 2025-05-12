import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { windowWidth } from "../../utils/Dimensions";
import { COLORS } from "../../themes/themes";

const MessagingHeaderTitle = ({
  leftIcon,
  onLeftIconPress,
  headerTitle,
  onProfilePressed,
  profileImage,
}) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {leftIcon && (
          <TouchableOpacity
            onPress={onLeftIconPress}
            activeOpacity={0.9}
            style={styles.leftIconContainer}
          >
            <Ionicons
              name={leftIcon ? leftIcon : "arrow-back-outline"}
              size={25}
              color={"black"}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={onProfilePressed}
          style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}
        >
          <Image
            style={{ width: 35, height: 35, borderRadius: 20 }}
            source={{ uri: profileImage }}
          />
          {headerTitle && (
            <Text style={[styles.headerTitle]}>{headerTitle}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessagingHeaderTitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    borderBottomColor: COLORS.appGrey,
    borderBottomWidth: 1,
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
