import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import SafeAreaViewComponent from "../../../components/common/SafeAreaViewComponent";
import KeyboardAvoidingComponent from "../../../components/form/KeyboardAvoidingComponent";
import HeaderTitle from "../../../components/common/HeaderTitle";
import FormInput from "../../../components/form/FormInput";
import { COLORS } from "../../../themes/themes";
import {
  rendezvousGenders,
  rendezvousPersonalities,
  rendezvousRelationshipStatus2,
} from "../../../data/dummyData";
import PickerSelect from "../../../components/pickerSelect/PickerSelect";
import CountryPickerx from "../../../components/pickerSelect/CountryPicker";
import FormButton from "../../../components/form/FormButton";
import FixedBottomContainer from "../../../components/common/FixedBottomContainer";
import ScrollViewSpace from "../../../components/common/ScrollViewSpace";

const OnboardingFlow1 = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [personality, setPersonality] = useState("");
  const [relationshipStatus, setRelationshipStatus] = useState("");
  const [country, setCountry] = useState("");
  const [countryObject, setCountryObject] = useState("");

  console.log("ccr", country, countryObject);

  // Error states
  const [formError, setFormError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [personalityError, setPersonalityError] = useState("");
  const [relationshipStatusError, setRelationshipStatusError] = useState("");
  const [countryError, setCountryError] = useState("");

  const onboardNext1 = () => {
    const onboarding1Data = {
      fullName: fullName,
      gender: gender,
      personality: personality,
      country: country,
      relationshipStatus: relationshipStatus,
    };

    if (!fullName) {
      setFullNameError("Please provide your fullname");
    } else if (!gender) {
      setGenderError("Please provide your gender");
    } else if (!personality) {
      setPersonalityError("Please provide your personality");
    } else if (!relationshipStatus) {
      setRelationshipStatusError("Please provide your relationship status");
    } else if (!country) {
      setCountryError("Please provide your country");
    } else {
      navigation.navigate("OnboardingFlow2", onboarding1Data);
    }
  };

  return (
    <SafeAreaViewComponent>
      <KeyboardAvoidingComponent>
        <HeaderTitle
          leftIcon={"arrow-back-outline"}
          progress={20}
          onLeftIconPress={() => {
            navigation.goBack();
          }}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 0 }}
        >
          <View style={{ marginBottom: 20, padding: 20 }}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 24,
                fontWeight: "600",
                lineHeight: 24,
              }}
            >
              User Onboarding
            </Text>
            <Text
              style={{ color: "#1E1E1EB2", fontSize: 14, fontWeight: "400" }}
            >
              Please fill all information as it's part of our user onboarding
              process. Gathering these information helps us better understand
              how to you better.
            </Text>
          </View>

          <FormInput
            formInputTitle={"Full Name"}
            keyboardType={"default"}
            placeholder="Enter your FullName"
            value={fullName}
            onChangeText={(txt) => {
              setFullName(txt);
              setFullNameError("");
              setFormError("");
            }}
            errorMessage={fullNameError}
          />

          <PickerSelect
            items={rendezvousGenders}
            placeholder={"Select Your Gender"}
            formInputTitle={"Gender"}
            onValueChange={(value) => {
              setGender(value);
              setFormError("");
              setGenderError("");
            }}
            errorMessage={genderError}
          />

          <PickerSelect
            items={rendezvousRelationshipStatus2}
            placeholder={"Select Your Relationship Status"}
            formInputTitle={"Relationship Status"}
            onValueChange={(value) => {
              setRelationshipStatus(value);
              setFormError("");
              setRelationshipStatusError("");
            }}
            errorMessage={relationshipStatusError}
          />

          <PickerSelect
            items={rendezvousPersonalities}
            placeholder={"Select Your personality"}
            formInputTitle={"What's your Personality"}
            onValueChange={(value) => {
              setPersonality(value);
              setFormError("");
              setPersonalityError("");
            }}
            errorMessage={personalityError}
          />

          <CountryPickerx
            formInputTitle={"Country"}
            countryError={countryError}
            setCountry={setCountry}
            setFormError={setFormError}
            setCountryObject={setCountryObject}
          />
          <ScrollViewSpace />
        </ScrollView>

        {/* Buttons */}
        <FixedBottomContainer top={1.1}>
          <FormButton
            title={"Next"}
            width={1.1}
            onPress={onboardNext1}
            formError={formError}
          />
        </FixedBottomContainer>
      </KeyboardAvoidingComponent>
    </SafeAreaViewComponent>
  );
};

export default OnboardingFlow1;

const styles = StyleSheet.create({});
