import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SafeAreaViewComponent from "../../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../../components/common/HeaderTitle";
import { validCounselingTypes } from "../../../data/dummyData";
import PreferencesCard from "../../../components/cards/PreferencesCard";
import ScrollViewSpace from "../../../components/common/ScrollViewSpace";
import FixedBottomContainer from "../../../components/common/FixedBottomContainer";
import FormButton from "../../../components/form/FormButton";
import HeaderText from "../../../components/common/HeaderText";
import axiosInstance from "../../../utils/api-client";
import { saveUserTherapyPreference } from "../../../redux/features/user/userSlice";
import { parseExperienceRange, parsePriceRange } from "../../../Library/Common";

const UserTherapyOnboardingFlow2 = ({ navigation, route }) => {
  const items = route.params;
  console.log("items", items);

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const userProfle = state?.user?.user?.profile;
  console.log("userProfle", userProfle);

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const [selectedCategories, setSelectedCategories] = useState([]);
  console.log("selectedCategories", selectedCategories);

  const handleToggleSelect = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((item) => item !== category)
        : [...prevSelected, category]
    );
  };

  const completeOnboarding = async () => {
    const userTherapyPreferenceData = {
      previous_experience: items.previousExperience,
      platforms: [items.platform],
      skill: [items.skill],
      priceRange: parsePriceRange(items.priceRange),
      years_of_experience: parseExperienceRange(items.yearsOfExperience),
      counseling_type: selectedCategories,
    };
    console.log("userTherapyPreferenceData", userTherapyPreferenceData);

    setLoading(true);
    try {
      await axiosInstance({
        url: "therapy/preferences",
        method: "POST",
        data: userTherapyPreferenceData,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("postUserTherapyPreference res", res);
          setLoading(false);

          // if theres a data in the response, it means the user has onboarded his therapy preferences
          if (res?.data?.data) {
            dispatch(saveUserTherapyPreference(res?.data?.data));
            navigation.navigate("Complete");
          }
        })
        .catch((err) => {
          console.log("postUserTherapyPreference err", err);
          setLoading(false);
          setFormError("An error occured while uploading your preferences");

          if (err?.status == 401) {
            Alert.alert(
              "Session Expired",
              "Your session has expired, please login again"
            );
            navigation.navigate("Login");
          }
        });
    } catch (error) {
      console.log("postUserTherapyPreference error", error);
      setLoading(false);
      setFormError("An error occured while uploading your preferences");

      if (err?.status == 401) {
        Alert.alert(
          "Session Expired",
          "Your session has expired, please login again"
        );
        navigation.navigate("Login");
      }
    }
  };

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={"arrow-back-outline"}
        progress={100}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />

      <HeaderText
        headerTitle={"What type of therapists are you looking fosddr?"}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cardsContainer}>
          {validCounselingTypes?.map((cur, i) => (
            <PreferencesCard
              key={i}
              category={cur}
              selectedCategories={selectedCategories}
              onToggleSelect={handleToggleSelect}
            />
          ))}
        </View>
        <ScrollViewSpace />
      </ScrollView>

      {/* Buttons */}
      <FixedBottomContainer top={1.1}>
        <FormButton
          title={"Save Preferences"}
          width={1.1}
          onPress={completeOnboarding}
          disabled={selectedCategories?.length < 3 || loading}
          loading={loading}
          formError={formError}
        />
      </FixedBottomContainer>
    </SafeAreaViewComponent>
  );
};

export default UserTherapyOnboardingFlow2;

const styles = StyleSheet.create({});
