import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import ImageView from "react-native-image-viewing";
import { useDispatch, useSelector } from "react-redux";

import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import { useTheme } from "../../Context/ThemeContext";
import ScrollViewSpace from "../../components/common/ScrollViewSpace";
import { COLORS } from "../../themes/themes";
import { formatDate, formatDateToBornLabel } from "../../Library/Common";
import SecondaryBtn from "../../components/form/SecondaryBtn";

const ViewProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { theme } = useTheme();

  const userProfle = state?.user?.user?.profile;
  console.log("userProfle", userProfle);

  const imagesArray = [
    ...userProfle?.profile_pictures,
    ...userProfle?.additional_pictures,
  ];

  const transformedData = imagesArray?.map((item) => ({
    uri: item,
  }));

  const [visible, setIsVisible] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: theme?.background }}>
      <ScrollView
        vertical
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ backgroundColor: theme?.background }}
      >
        <ImageBackground
          imageStyle={styles.imageBackground}
          source={
            userProfle?.additional_pictures?.length
              ? { uri: userProfle?.additional_pictures[0] }
              : require("../../assets/user-dummy-img.jpg")
          }
          style={styles.imageWrapper}
        >
          <View style={styles.backBtnWrapper}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                borderRadius: 40,
                width: 40,
                height: 40,
                padding: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
              }}
            >
              <Ionicons name="arrow-back-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <TouchableOpacity
          onPress={() => {
            setIsVisible(true);
          }}
          style={styles.overlappingImageContainer}
        >
          <Image
            source={{ uri: userProfle?.profile_pictures[0] }}
            style={styles.image}
            onPress={() => {
              setIsVisible(true);
            }}
          />
        </TouchableOpacity>
        <View style={styles.profileDetails}>
          <Text style={[styles.profileName, { color: theme?.text }]}>
            {userProfle?.fullname}
          </Text>
          <Text style={[styles.profileEmail, { color: theme?.text }]}>
            {userProfle?.User?.email}
          </Text>
          <Text style={[styles.profileEmail, { color: theme?.text }]}>
            {userProfle?.bio}
          </Text>
        </View>
        <View style={{ padding: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Ionicons
              name="location-outline"
              size={15}
              color={COLORS.rendezvousRed}
            />
            <Text
              style={[
                styles.profileEmail,
                { color: theme?.text, marginLeft: 5 },
              ]}
            >
              {userProfle?.city}, {userProfle?.country}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Ionicons
              name="balloon-outline"
              size={15}
              color={COLORS.rendezvousRed}
            />
            <Text
              style={[
                styles.profileEmail,
                { color: theme?.text, marginLeft: 5 },
              ]}
            >
              {formatDate(userProfle?.dob)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Ionicons
              name="call-outline"
              size={15}
              color={COLORS.rendezvousRed}
            />
            <Text
              style={[
                styles.profileEmail,
                { color: theme?.text, marginLeft: 5 },
              ]}
            >
              {userProfle?.phone_number}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Ionicons
              name="calendar-outline"
              size={15}
              color={COLORS.rendezvousRed}
            />
            <Text
              style={[
                styles.profileEmail,
                { color: theme?.text, marginLeft: 5, fontSize: 12 },
              ]}
            >
              Joined{" "}
              <Text
                style={[
                  styles.profileEmail,
                  { color: theme?.text, marginLeft: 5 },
                ]}
              >
                {formatDate(userProfle?.createdAt)}
              </Text>
            </Text>
          </View>
        </View>
        <ImageView
          images={transformedData}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />

        <SecondaryBtn
          title={"Edit Profile"}
          height={50}
          onPress={() => {
            navigation.navigate("ProfileInfo");
          }}
        />
        <ScrollViewSpace />
      </ScrollView>
    </View>
  );
};

export default ViewProfileScreen;

const styles = StyleSheet.create({
  imageWrapper: {
    flex: 1,
    justifyContent: "space-between",
    // backgroundColor: 'green',
    width: "100%",
    height: 250,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  overlappingImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",

    marginTop: -50,

    borderRadius: 10,
    overflow: "visible",
    zIndex: 10,
  },
  profileDetails: {
    alignItems: "center",
    // marginLeft: 20,
    justifyContent: "space-between",
    marginTop: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    // lineHeight: 24,
  },
  profileEmail: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 24,
    color: "#1E1E1E80",
  },
  backBtnWrapper: {
    position: "absolute",
    top: 50,
    width: "100%",
    flexDirection: "row",
    // justifyContent: 'center',
    paddingHorizontal: 16,
    padding: 20,
  },
});
