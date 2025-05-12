import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import ImageView from "react-native-image-viewing";

import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../components/common/HeaderTitle";
import { windowHeight, windowWidth } from "../../utils/Dimensions";
import PreferenceCard from "../../components/cards/PreferenceCard";
import {
  capitalizeFirstLetter,
  convertCmToFeetInches,
  getAge,
  normalizeGender,
  RNToast,
} from "../../Library/Common";
import InterestsCard from "../../components/cards/InterestCard";
import SVGIconCard from "../../components/cards/SVGIconCard";
import { COLORS } from "../../themes/themes";
import FixedBottomContainer from "../../components/common/FixedBottomContainer";
import FormButton from "../../components/form/FormButton";
import ScrollViewSpace from "../../components/common/ScrollViewSpace";
import axiosInstance from "../../utils/api-client";
import Toast from "react-native-toast-message";
import StringsProfileCard from "../../components/cards/StringsProfileCard";

const StringsProfileScreen = ({ navigation, route }) => {
  const item = route?.params;
  console.log("profileitem", item);

  const allPictures = [
    ...(item?.matchedUserProfile?.profile_pictures || []),
    ...(item?.matchedUserProfile?.additional_pictures || []),
  ];

  const transformedData = allPictures?.map((picture) => ({
    uri: picture,
  }));

  const [visible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const matchAction = async (matchId, receiverId, action) => {
    console.log("action matched", matchId, receiverId, action);
    if (!matchId) {
      return;
    }

    const matchActionData = {
      matchId: item?.match?.id,
      action: "request",
      receiverId: item?.match?.userId,
    };

    setLoading(true);

    try {
      const response = await axiosInstance({
        url: "matchmaking/match/action",
        method: "POST",
        data: matchActionData,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("matchAction response", response?.data);

      navigation.goBack();

      RNToast(Toast, "String request sent");
      setLoading(false);
    } catch (error) {
      console.log("Error matching user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StringsProfileCard
          item={item}
          onPress={() => {
            setIsVisible(true);
          }}
          onLeftIconPress={() => navigation.goBack()}
        />
        <ScrollView
          vertical
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20 }}
        >
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {item?.matchedUserProfile?.username},{" "}
              {getAge(item?.matchedUserProfile?.dob)}
            </Text>

            <Text style={styles.profileName}>
              {convertCmToFeetInches(item?.matchedUserProfile?.height)}
            </Text>

            <View style={styles.displaySection}>
              <PreferenceCard
                iconName={"location-outline"}
                title={item?.matchedUserProfile?.country}
              />
              {item?.action !== "request" && (
                <PreferenceCard
                  iconName={"flash-outline"}
                  title={`Match Accuracy: ${item?.accuracy?.toFixed(2)}%`}
                />
              )}
            </View>
          </View>

          <View style={styles.cardSection}>
            <Text style={styles.bioHeaders}>Bio</Text>
            <Text style={styles.bioDescription}>
              {item?.matchedUserProfile?.bio}
            </Text>
            <Text style={styles.bioHeaders}>About Me</Text>

            <View style={styles.displaySection}>
              <SVGIconCard
                title={capitalizeFirstLetter(item?.match?.drinking_habits)}
                svgName={"drink"}
                iconColor={COLORS.rendezvousRed}
              />
              <SVGIconCard
                title={normalizeGender(item?.matchedUserProfile?.gender)}
                iconName={
                  normalizeGender(item?.matchedUserProfile?.gender) == "Male"
                    ? "man-outline"
                    : "woman-outline"
                }
                iconColor={COLORS.black}
              />
              <SVGIconCard
                title={capitalizeFirstLetter(item?.match?.religion)}
                iconName={"moon-outline"}
                iconColor={COLORS.black}
              />
              <SVGIconCard
                title={capitalizeFirstLetter(
                  item?.matchedUserProfile?.relationship_status
                )}
                iconName={"person-add-outline"}
                iconColor={COLORS.black}
              />
              <SVGIconCard
                title={capitalizeFirstLetter(item?.match?.smoking_habits)}
                svgName={"smoke"}
                iconColor={COLORS.black}
              />
            </View>
          </View>

          <View style={styles.cardSection}>
            <Text style={styles.bioHeaders}>Interests</Text>

            <View style={styles.displaySection}>
              {item?.matchedUserProfile?.interest?.map((cur, i) => (
                <InterestsCard key={i} title={cur} />
              ))}
            </View>

            <Text style={styles.bioHeaders}>Hobbies</Text>

            <View style={styles.displaySection}>
              {item?.matchedUserProfile?.hobbies?.map((cur, i) => (
                <InterestsCard key={i} title={cur} />
              ))}
            </View>
          </View>

          <View style={styles.cardSection}>
            <Text style={styles.bioHeaders}>Background</Text>

            <View style={styles.displaySection}>
              <SVGIconCard
                title={capitalizeFirstLetter(item?.matchedUserProfile?.degree)}
                iconName={"library-outline"}
                iconColor={COLORS.black}
              />

              <SVGIconCard
                title={capitalizeFirstLetter(
                  item?.matchedUserProfile?.university
                )}
                iconName={"school-outline"}
                iconColor={COLORS.black}
              />

              <SVGIconCard
                title={capitalizeFirstLetter(
                  item?.matchedUserProfile?.employmentStatus
                )}
                iconName={"briefcase-outline"}
                iconColor={COLORS.black}
              />

              <SVGIconCard
                title={capitalizeFirstLetter(
                  item?.matchedUserProfile?.occupation
                )}
                iconName={"business-outline"}
                iconColor={COLORS.black}
              />
            </View>
          </View>

          <ImageView
            images={transformedData}
            imageIndex={0}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
          />
          <ScrollViewSpace />
        </ScrollView>
      </ScrollView>

      {/* Buttons */}
      {!item?.action == "request" && (
        <FixedBottomContainer top={1.1}>
          <FormButton
            title={"String"}
            width={1.1}
            loading={loading}
            disabled={loading}
            onPress={matchAction}
          />
        </FixedBottomContainer>
      )}
    </View>
  );
};

export default StringsProfileScreen;

const styles = StyleSheet.create({
  cardContainer: {
    width: windowWidth / 1.1,
    height: windowHeight / 2.8,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "white",
  },
  imageWrapper: {
    flex: 1,
    justifyContent: "space-between",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  heartIcon: {
    backgroundColor: "#3D3D3D99",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 15,
    position: "absolute",
    top: 6,
    right: 6,
  },
  profileInfo: {
    // position: 'absolute',
    // bottom: 10,
    // left: 10,
    // right: 10,
    backgroundColor: "#00000088",
    padding: 8,
    borderRadius: 6,
  },
  profileName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  profileDetails: {
    color: "#fff",
    fontSize: 12,
  },
  infoCard: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  bioHeaders: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  cardSection: {
    padding: 20,
    borderRadius: 8,
    backgroundColor: "whitesmoke",
    marginTop: 10,
  },
  bioDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  displaySection: {
    flexDirection: "row",
    width: windowWidth / 1.2,
    flexWrap: "wrap",
    marginBottom: 10,
  },
});
