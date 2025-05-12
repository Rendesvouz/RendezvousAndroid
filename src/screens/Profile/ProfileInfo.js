import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";

import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../components/common/HeaderTitle";
import ProfileOptionsDisplay from "../../components/common/ProfileOptionsDisplay";

const settings = [
  {
    iconName: "person-outline",
    name: "Profile Information",
    navigate: "ProfileInformation",
  },
  {
    iconName: "person-outline",
    name: "Basic Information",
    navigate: "BasicProfile",
  },
  {
    iconName: "images-outline",
    name: "Additional Images",
    navigate: "AdditionalImages",
  },
  {
    iconName: "settings-outline",
    name: "Additional Information",
    navigate: "AdditionalInformation",
  },
  {
    iconName: "settings-outline",
    name: "Preferences",
    navigate: "UserPreferences",
  },
];

const providerSettings = [
  {
    iconName: "person-outline",
    name: "Profile Information",
    navigate: "ProfileInformation",
  },
  // {
  //   iconName: "person-outline",
  //   name: "Basic Information",
  //   navigate: "BasicProfile",
  // },
  // {
  //   iconName: "images-outline",
  //   name: "Additional Images",
  //   navigate: "AdditionalImages",
  // },
  // {
  //   iconName: "settings-outline",
  //   name: "Additional Information",
  //   navigate: "AdditionalInformation",
  // },
  {
    iconName: "alarm-outline",
    name: "Scheduling",
    navigate: "SchedulingScreen",
  },
];

const ProfileInfo = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const userProfile = state?.user?.userRole;
  console.log("userProfile", userProfile);
  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={"arrow-back-outline"}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 10 }}
      >
        {userProfile == "User"
          ? settings?.map((cur, i) => (
              <ProfileOptionsDisplay
                key={i}
                title={cur?.name}
                iconName={cur?.iconName}
                onPress={() => navigation.navigate(cur?.navigate)}
              />
            ))
          : providerSettings?.map((cur, i) => (
              <ProfileOptionsDisplay
                key={i}
                title={cur?.name}
                iconName={cur?.iconName}
                onPress={() => navigation.navigate(cur?.navigate)}
              />
            ))}
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default ProfileInfo;

const styles = StyleSheet.create({
  profileSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  profileDetails: {
    // alignItems: 'center',
    marginLeft: 20,
    justifyContent: "space-between",
    // backgroundColor: 'red',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  settings: {
    margin: 5,
    marginTop: 30,
    borderTopWidth: 1,
    marginBottom: 20,
    borderColor: "#999",
  },
  set: {
    marginBottom: 0,
    // borderBottomColor: '#999',
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
    margin: 5,
    marginTop: 10,
  },
  settingsText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
    marginLeft: 17,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "600",
    lineHeight: 24,
  },
  profileEmail: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    color: "#1E1E1E80",
  },
});
