import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SafeAreaViewComponent from "../../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../../components/common/HeaderTitle";
import {
  validCounselingTypes,
  validLifeCoachTypes,
} from "../../../data/dummyData";
import PreferencesCard from "../../../components/cards/PreferencesCard";
import ScrollViewSpace from "../../../components/common/ScrollViewSpace";
import FixedBottomContainer from "../../../components/common/FixedBottomContainer";
import FormButton from "../../../components/form/FormButton";
import HeaderText from "../../../components/common/HeaderText";
import axiosInstance from "../../../utils/api-client";
import { saveUserLifeCoachPreference } from "../../../redux/features/user/userSlice";
import { parseExperienceRange, parsePriceRange } from "../../../Library/Common";
import {useTheme} from '../../../Context/ThemeContext';

const UserLifeCoachOnboardingFlow2 = ({ navigation, route }) => {
  const items = route.params;
  console.log("items", items);
  const {theme} = useTheme();

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
    const userLifeCoachPreferenceData = {
      previous_experience: items.previousExperience,
      platforms: [items.platform],
    //   skill: [items.skill],
      priceRange: parsePriceRange(items.priceRange),
      years_of_experience: parseExperienceRange(items.yearsOfExperience),
      coaching_areas: selectedCategories,
    };
    console.log("userLifeCoachPreferenceData", userLifeCoachPreferenceData);

    setLoading(true);
    try {
      await axiosInstance({
        url: "life-coach/preferences",
        method: "POST",
        data: userLifeCoachPreferenceData,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("completeOnboarding res", res);
          setLoading(false);

          // if theres a data in the response, it means the user has onboarded his life coach preferences
          if (res?.data?.data) {
            dispatch(saveUserLifeCoachPreference(res?.data?.data));
            navigation.navigate('UserLifeCoachComplete');
          }
        })
        .catch((err) => {
          console.log("completeOnboarding err", err);
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
      console.log("completeOnboarding error", error);
      setLoading(false);
      setFormError("An error occured while uploading your preferences");

      if (error?.status == 401) {
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
        headerTitle={"What type of life-coach are you looking for?"}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cardsContainer}>
          {validLifeCoachTypes?.map((cur, i) => (
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
      <FixedBottomContainer top={1.2}>
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

export default UserLifeCoachOnboardingFlow2;

const styles = StyleSheet.create({});
