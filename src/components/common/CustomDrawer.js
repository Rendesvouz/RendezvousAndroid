import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { COLORS } from "../../themes/themes";
import { windowHeight } from "../../utils/Dimensions";
import { signOut } from "../../redux/features/user/userSlice";

const drawerNav = [
  {
    iconName: "home-outline",
    name: "Home",
    navigate: "HomeScreen",
  },
  // {
  //   iconName: 'options-outline',
  //   name: 'Strings',
  //   navigate: 'Strings',
  // },
  {
    iconName: "trail-sign-outline",
    name: "Tours",
    navigate: "TourguideScreen",
  },
  // {
  //   iconName: 'airplane-outline',
  //   name: 'Bookings',
  //   navigate: 'Booking',
  // },
  // {
  //   iconName: 'car-outline',
  //   name: 'Car Rentals',
  //   navigate: 'CarRental',
  // },
  // {
  //   iconName: 'gift-outline',
  //   name: 'GiftCards',
  //   navigate: 'GiftCardScreen',
  // },
  {
    iconName: "newspaper-outline",
    name: "Blogs & News Feed",
    navigate: "Blog",
  },
];

const CustomDrawer = ({ props, iconColor }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const user = state?.user?.user?.profile;

  const onSignOut = () => {
    dispatch(signOut());
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        {...props}
        contentContainerStyle={{
          height: windowHeight,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            // backgroundColor: 'green',
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {user ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Profile");
              }}
              style={styles.login}
            >
              <View style={styles.person}>
                <Image
                  source={{ uri: user?.profile_pictures[0] }}
                  style={styles.image}
                />
                {/* <Ionicons name="person-outline" size={16} color="black" /> */}
              </View>

              <View style={{ flexDirection: "row", marginLeft: 6 }}>
                <Text
                  style={[
                    styles.userName,
                    {
                      fontSize: 14,
                      fontWeight: "500",
                    },
                  ]}
                >
                  Welcome,{" "}
                </Text>
                <Text style={[styles.userName]}>{user?.username}</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.login}>
              <Image
                style={{
                  width: 180,
                  height: 40,
                  resizeMode: "contain",
                }}
                source={require("../../assets/RendezvousLogoBlack.png")}
              />
            </View>
          )}
        </View>
        {drawerNav?.map((cur, i) => (
          <DrawerItem
            key={i}
            style={{ marginBottom: 0 }}
            label={cur?.name}
            onPress={() => {
              if (user) {
                navigation.navigate("Home", { screen: cur?.navigate });
              } else if (cur?.name == "Tours") {
                navigation.navigate("Login", { destination: cur?.navigate });
              } else {
                navigation.navigate("Home", { screen: cur?.navigate });
              }
            }}
            activeBackgroundColor={COLORS.pinky}
            inactiveTintColor="white"
            // inactiveBackgroundColor={COLORS.btnBorderColor}
            icon={() => (
              <Ionicons name={cur?.iconName} size={20} color={COLORS.black} />
            )}
            labelStyle={{
              // marginLeft: -15,
              fontSize: 16,
              fontWeight: "500",
              color: "black",
            }}
          />
        ))}
      </DrawerContentScrollView>
      <View
        style={{
          padding: 15,
          paddingBottom: 0,
        }}
      >
        {user ? (
          <View
            style={{
              borderTopColor: "#333",
              borderTopWidth: 1,
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.set}
              onPress={() => navigation.navigate("Subscription")}
            >
              <View style={styles.setsContent}>
                <Ionicons name="diamond-outline" size={20} color={iconColor} />
                <Text style={[styles.settingsText]}>Your Plan</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.set}
              onPress={() => navigation.navigate("Profile")}
            >
              <View style={styles.setsContent}>
                <Ionicons name="person-outline" size={20} color={iconColor} />
                <Text style={[styles.settingsText]}>View Profile</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.set}
              onPress={onSignOut}
            >
              <View style={styles.setsContent}>
                <Ionicons name="log-in-outline" size={20} color={iconColor} />
                <Text style={[styles.settingsText]}>Log Out</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  person: {
    // backgroundColor: 'white',
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginRight: 10,
  },
  login: {
    margin: 15,
    flexDirection: "row",
    // marginBottom: 30,
    alignItems: "center",
    // backgroundColor: 'pink',
  },
  welcomeContainer: {
    display: "flex",
    flexDirection: "row",
  },
  userName: {
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "700",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  welcome: {
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 12,
    color: "#000",
    fontWeight: "500",
  },
  set: {
    marginBottom: 10,
    // borderBottomColor: '#333',
    // borderBottomWidth: 1,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: 'pink',
  },
  setsContent: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    // marginBottom: 18,

    // padding: 10,

    // margin: 5,
    // marginTop: 10,
  },
  settingsText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginLeft: 17,
  },
  celebProfileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    // marginBottom: 10,
    borderWidth: 2,
    borderColor: COLORS.purple,
  },
});
