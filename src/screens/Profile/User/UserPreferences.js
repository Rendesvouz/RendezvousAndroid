import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

import SafeAreaViewComponent from "../../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../../components/common/HeaderTitle";
import { COLORS } from "../../../themes/themes";
import FormInput from "../../../components/form/FormInput";
import FixedBottomContainer from "../../../components/common/FixedBottomContainer";
import FormButton from "../../../components/form/FormButton";
import { windowWidth } from "../../../utils/Dimensions";
import ScrollViewSpace from "../../../components/common/ScrollViewSpace";
import PickerSelect from "../../../components/pickerSelect/PickerSelect";
import {
  rendezvousDrinkingOptions,
  rendezvousHeightOptions,
  rendezvousInterestedInOptions,
  rendezvousKidsOptions,
  rendezvousRelationshipStatus,
  rendezvousSmokingOptions,
} from "../../../data/dummyData";
import { checkUserPreferences } from "../../../services/userServices";
import axiosInstance from "../../../utils/api-client";
import { RNToast } from "../../../Library/Common";
import { saveUserPreferences } from "../../../redux/features/user/userSlice";

const UserPreferences = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const reduxUserId = state?.user?.user?.profile?.user_id;
  const reduxUserPreference = state?.user?.userPreferences;
  console.log("reduxUserPreference", reduxUserPreference);

  const [loading, setLoading] = useState(false);

  const [religion, setReligion] = useState(
    reduxUserPreference?.religion ? reduxUserPreference?.religion : ""
  );
  const [ageRange, setAgeRange] = useState();

  const [minAge, setMinAge] = useState(
    reduxUserPreference?.ageRange?.min
      ? JSON.stringify(reduxUserPreference?.ageRange?.min)
      : ""
  );
  const [maxAge, setMaxAge] = useState(
    reduxUserPreference?.ageRange?.max
      ? JSON.stringify(reduxUserPreference?.ageRange?.max)
      : ""
  );
  const [relationshipStatus, setRelationshipStatus] = useState(
    reduxUserPreference?.relationship_status
      ? reduxUserPreference?.relationship_status
      : ""
  );
  const [interestedIn, setInterestedIn] = useState(
    reduxUserPreference?.interested_in ? reduxUserPreference?.interested_in : ""
  );
  const [height, setHeight] = useState(
    reduxUserPreference?.height ? reduxUserPreference?.height : ""
  );
  const [drinkingHabit, setDrinkingHabit] = useState(
    reduxUserPreference?.drinking_habits
      ? reduxUserPreference?.drinking_habits
      : ""
  );
  const [smokingHabit, setSmokingHabit] = useState(
    reduxUserPreference?.smoking_habits
      ? reduxUserPreference?.smoking_habits
      : ""
  );
  const [kids, setKids] = useState(
    reduxUserPreference?.kids ? reduxUserPreference?.kids : ""
  );
  console.log("maxA", maxAge);

  // Error states
  const [formError, setFormError] = useState("");
  const [minAgeError, setMinAgeError] = useState("");
  const [maxAgeError, setMaxAgeError] = useState("");
  const [religionError, setReligionError] = useState("");
  const [drinkingHabitError, setDrinkingHabitError] = useState("");
  const [smokingHabitError, setSmokingHabitError] = useState("");
  const [kidsError, setKidsError] = useState("");
  const [relationshipStatusError, setRelationshipStatusError] = useState("");
  const [interestedInError, setInterestedInError] = useState("");
  const [heightError, setHeightError] = useState("");

  const updatePreferences = async () => {
    const preferenceData = {
      religion: religion,
      drinking_habits: drinkingHabit,
      smoking_habits: smokingHabit,
      kids: kids,
      interested_in: interestedIn,
      height: height,
      relationship_status: relationshipStatus,
      ageRange: {
        min: parseInt(minAge),
        max: parseInt(maxAge),
      },
    };
    console.log("preferenceData", preferenceData);

    if (!minAge) {
      setMinAgeError("Please provide a value");
    } else if (!maxAge) {
      setMaxAgeError("Please provide a value");
    } else if (!religion) {
      setReligionError("Please provide a value");
    } else if (!drinkingHabit) {
      setDrinkingHabitError("Please select from the options");
    } else if (!smokingHabit) {
      setSmokingHabitError("Please select from the options");
    } else if (!relationshipStatus) {
      setRelationshipStatusError("Please select from the options");
    } else if (!interestedIn) {
      setInterestedInError("Please select from the options");
    } else if (!height) {
      setHeightError("Please provide a value");
    } else if (!kids) {
      setKidsError("Please select from the options");
    } else {
      setLoading(true);
      try {
        await axiosInstance({
          url: "matchmaking/update",
          method: "PUT",
          data: preferenceData,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            console.log("res", res?.data);
            setLoading(false);

            if (res?.data) {
              console.log("updatePreferences data", res?.data);
              checkUserPreferences(
                axiosInstance,
                reduxUserId,
                dispatch,
                saveUserPreferences
              );
              RNToast(Toast, "Great, Your preferences have been updated 😇");
              navigation.goBack();
            } else {
              console.log("message", res?.data?.message);
              setFormError(
                "An error occured while updating your preferences, please try again later"
              );
            }
          })
          .catch((err) => {
            console.log("updatePreferences err", err?.response?.data);
            setFormError(
              "An error occured while updating your preferences, please try again later"
            );
            setLoading(false);
          });
      } catch (error) {
        console.log("updatePreferences error", error);
        setFormError(
          "An error occured while updating your preferences, please try again later"
        );
      }
    }
  };

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={"arrow-back-outline"}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        headerTitle={"Preferences"}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        <View style={styles.ageRange}>
          <FormInput
            formInputTitle={"Minimum Age"}
            placeholder=""
            keyboardType={"number-pad"}
            width={2.4}
            value={minAge}
            onChangeText={(txt) => {
              setMinAge(txt);
              setMinAgeError("");
              setFormError("");
            }}
            errorMessage={minAgeError}
          />
          <FormInput
            formInputTitle={"Maximum Age"}
            placeholder=""
            keyboardType={"number-pad"}
            width={2.4}
            value={maxAge}
            onChangeText={(txt) => {
              setMaxAge(txt);
              setMaxAgeError("");
              setFormError("");
            }}
            errorMessage={maxAgeError}
          />
        </View>

        <PickerSelect
          formInputTitle={"Interested in"}
          placeholder={"Select an option"}
          items={rendezvousInterestedInOptions}
          value={interestedIn}
          onValueChange={(value) => {
            setInterestedIn(value);
            setFormError("");
            setInterestedInError("");
          }}
          errorMessage={interestedInError}
        />
        <FormInput
          formInputTitle={"Religion"}
          placeholder=""
          keyboardType={"default"}
          value={religion}
          onValueChange={(value) => {
            setReligion(value);
            setFormError("");
            setReligionError("");
          }}
          errorMessage={religionError}
          width={1.1}
        />
        <PickerSelect
          formInputTitle={"Relationship Status"}
          placeholder={"Select an option"}
          items={rendezvousRelationshipStatus}
          value={relationshipStatus}
          onValueChange={(value) => {
            setRelationshipStatus(value);
            setFormError("");
            setRelationshipStatusError("");
          }}
          errorMessage={relationshipStatusError}
        />
        <PickerSelect
          formInputTitle={"Drinking habits"}
          placeholder={"Select an option"}
          items={rendezvousDrinkingOptions}
          value={drinkingHabit}
          onValueChange={(value) => {
            setDrinkingHabit(value);
            setFormError("");
            setDrinkingHabitError("");
          }}
          errorMessage={drinkingHabitError}
        />
        <PickerSelect
          formInputTitle={"Smoking habits"}
          placeholder={"Select an option"}
          items={rendezvousSmokingOptions}
          value={smokingHabit}
          onValueChange={(value) => {
            setSmokingHabit(value);
            setFormError("");
            setSmokingHabitError("");
          }}
          errorMessage={smokingHabitError}
        />
        <PickerSelect
          formInputTitle={"Height"}
          placeholder={"Select an option"}
          items={rendezvousHeightOptions}
          value={height}
          onValueChange={(value) => {
            setHeight(value);
            setFormError("");
            setHeightError("");
          }}
          errorMessage={heightError}
        />
        <PickerSelect
          formInputTitle={"Kids"}
          placeholder={"Select an option"}
          items={rendezvousKidsOptions}
          value={kids}
          onValueChange={(value) => {
            setKids(value);
            setFormError("");
            setKidsError("");
          }}
          errorMessage={kidsError}
        />
        <ScrollViewSpace />
      </ScrollView>

      {/* Buttons */}
      <FixedBottomContainer top={1.2}>
        <FormButton
          title={"Update Preferences"}
          width={1.1}
          onPress={updatePreferences}
          loading={loading}
          disabled={loading}
          formError={formError}
        />
      </FixedBottomContainer>
    </SafeAreaViewComponent>
  );
};

export default UserPreferences;

const styles = StyleSheet.create({
  ageRange: {
    flexDirection: "row",
    alignContent: "space-between",
    alignItems: "space-between",
    width: windowWidth / 1.1,
    justifyContent: "space-between",
    alignSelf: "center",
  },
});
