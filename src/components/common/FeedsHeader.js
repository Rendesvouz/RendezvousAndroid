import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";

import { COLORS } from "../../themes/themes";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../Context/ThemeContext";

const FeedsHeader = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { theme } = useTheme();

  const userProfle = state?.user?.user?.profile;
  console.log("userProfle", userProfle);

  return (
    <View
      style={[styles.container, { backgroundColor: "rgba(0, 0, 0, 0.25)" }]}
    >
      <View style={[styles.profileSection]}>
        <TouchableOpacity
          style={[
            styles.menuBorder,
            { backgroundColor: "rgba(0, 0, 0, 0.25)" },
          ]}
          activeOpacity={0.9}
        >
          <Ionicons
            name="menu-outline"
            size={25}
            color={theme?.text}
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        </TouchableOpacity>
      </View>

      {!userProfle ? (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              navigation.navigate("Login", {
                destination: "GridsScreen",
              });
            }}
            style={styles.profileDetails}
          >
            <Text
              style={[
                styles.profileName,
                { color: COLORS.rendezvousRed, fontSize: 14 },
              ]}
            >
              Create
            </Text>
          </TouchableOpacity>
          <Ionicons
            name="add-circle-outline"
            size={24}
            color={COLORS.rendezvousRed}
            onPress={() => {
              navigation.navigate("Login", {
                destination: "GridsScreen",
              });
            }}
          />
        </View>
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              navigation.navigate("AddFeedScreen");
            }}
            style={styles.profileDetails}
          >
            <Text
              style={[
                styles.profileName,
                { color: COLORS.rendezvousRed, fontSize: 14, marginRight: 6 },
              ]}
            >
              Create
            </Text>
          </TouchableOpacity>
          <Ionicons
            name="add-circle-outline"
            size={24}
            color={COLORS.rendezvousRed}
            onPress={() => {
              navigation.navigate("AddFeedScreen");
            }}
          />
        </View>
      )}
    </View>
  );
};

export default FeedsHeader;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  profileSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // padding: 20,
  },
  profileDetails: {
    // alignItems: 'center',
    marginLeft: 10,
    justifyContent: "space-between",
    // backgroundColor: 'red',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 24,
  },
  profileEmail: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 24,
    color: "#000",
  },
  wallet: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: COLORS.pinky,
    alignItems: "center",
    borderRadius: 10,
    marginRight: 6,
  },
  walletBalance: {
    color: "black",
    fontWeight: "700",
    fontSize: 14,
    marginRight: 6,
  },
  menuBorder: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 6,
  },
});
