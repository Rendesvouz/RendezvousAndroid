import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProgressBar from "./ProgressBar";
import { useSelector } from "react-redux";

const HeaderTitle = ({
  onLeftIconPress,
  leftIcon,
  headerTitle,
  onRightIconPress,
  rightIcon,
  progress,
}) => {
  const state = useSelector((state) => state);
  const userDestination = state.user.destination;

  return (
    <View style={styles.container}>
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
      {headerTitle && <Text style={[styles.headerTitle]}>{headerTitle}</Text>}
      {userDestination == "Registration" && progress && (
        <ProgressBar progress={progress} />
      )}

      {rightIcon ? (
        <TouchableOpacity onPress={onRightIconPress}>
          <Ionicons name={rightIcon} size={24} color={"black"} />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 17,
    color: "black",
    fontWeight: "700",
  },
  leftIconContainer: {
    // backgroundColor: 'red',
    borderRadius: 10,
    padding: 5,
  },
});
