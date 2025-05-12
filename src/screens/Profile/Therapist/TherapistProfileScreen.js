import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import ImageView from "react-native-image-viewing";
import SkeletonPlaceholder from "react-native-skeleton-placeholder-expo";
import { useDispatch, useSelector } from "react-redux";

import SafeAreaViewComponent from "../../../components/common/SafeAreaViewComponent";
import ProfileOptionsDisplay from "../../../components/common/ProfileOptionsDisplay";
import ScrollViewSpace from "../../../components/common/ScrollViewSpace";
import { signOut } from "../../../redux/features/user/userSlice";
import { COLORS } from "../../../themes/themes";

const settings = [
  {
    iconName: "person-outline",
    name: "Profile Settings",
    navigate: "ProfileInfo",
  },
  {
    iconName: "wallet-outline",
    name: "Wallet",
    navigate: "Wallet",
  },
  {
    iconName: "calendar-outline",
    name: "Calendar",
    navigate: "Bookings",
  },
  {
    iconName: "information-circle-outline",
    name: "Support",
    navigate: "Support",
  },
  {
    iconName: "newspaper-outline",
    name: "Blogs & News Feed",
    navigate: "Blog",
  },
  {
    iconName: "cart-outline",
    name: "Subscription",
    navigate: "Subscription",
  },
];

const TherapistProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const userProfle = state?.user?.therapistProfile?.profile;
  console.log("userProfle", userProfle);

  const transformedData = userProfle?.profile_pictures?.map((item) => ({
    uri: item,
  }));

  const [visible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const onLoadEnd = () => {
    setLoading(true);
  };

  function logout() {
    dispatch(signOut());
  }

  return (
    <SafeAreaViewComponent>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 10 }}
      >
        <View style={styles.profileSection}>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(true);
            }}
          >
            {loading ? (
              <SkeletonPlaceholder
                highlightColor={COLORS.skeletonBgColor}
                backgroundColor={COLORS.skeletonHighlightColor}
                speed={1900}
              >
                <Image style={styles.image} source={""} />
              </SkeletonPlaceholder>
            ) : (
              <Image
                source={{ uri: userProfle?.profile_pictures[0] }}
                style={styles.image}
                onPress={() => {
                  setIsVisible(true);
                }}
              />
            )}
          </TouchableOpacity>
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>{userProfle?.fullname}</Text>
            <Text style={styles.profileEmail}>{userProfle?.User?.email}</Text>
          </View>
        </View>

        {settings?.map((cur, i) => (
          <ProfileOptionsDisplay
            key={i}
            onPress={() => navigation.navigate(cur?.navigate)}
            title={cur?.name}
            iconName={cur?.iconName}
          />
        ))}

        <TouchableOpacity style={styles.set} onPress={logout}>
          <View style={styles.setsContent}>
            <Ionicons name="log-out-outline" size={20} color={"black"} />
            <Text style={[styles.settingsText]}>Sign Out</Text>
          </View>
        </TouchableOpacity>

        <ImageView
          images={transformedData}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />

        <ScrollViewSpace />
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default TherapistProfileScreen;

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
    width: 100,
    height: 100,
    borderRadius: 10,
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
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
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
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 24,
  },
  profileEmail: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 24,
    color: "#1E1E1E80",
  },
});
