import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";

import {
  rendezvousQualification,
  therapyPlatforms,
  therapySkills,
} from "../../../data/dummyData";
import SafeAreaViewComponent from "../../../components/common/SafeAreaViewComponent";
import KeyboardAvoidingComponent from "../../../components/form/KeyboardAvoidingComponent";
import HeaderTitle from "../../../components/common/HeaderTitle";
import PickerSelect from "../../../components/pickerSelect/PickerSelect";
import FormInput from "../../../components/form/FormInput";
import ScrollViewSpace from "../../../components/common/ScrollViewSpace";
import FixedBottomContainer from "../../../components/common/FixedBottomContainer";
import FormButton from "../../../components/form/FormButton";
import { COLORS } from "../../../themes/themes";

const TherapistOnboardingFlow2 = ({ navigation, route }) => {
  const item = route.params;
  console.log("item4", item);

  const transformedQualificationData = rendezvousQualification?.map((item) => ({
    label: item,
    value: item,
  }));

  const transformedPlatformsData = therapyPlatforms?.map((item) => ({
    label: item,
    value: item,
  }));

  const transformedSkillsData = therapySkills?.map((item) => ({
    label: item,
    value: item,
  }));

  const [loading, setLoading] = useState(false);

  const [qualification, setQualification] = useState("");
  const [license, setLicense] = useState("");
  const [rate, setRate] = useState("");
  const [experience, setExperience] = useState("");
  const [platform, setPlatform] = useState("");
  const [skillset, setSkillset] = useState("");

  // Error states
  const [formError, setFormError] = useState("");
  const [qualificationError, setQualificationError] = useState("");
  const [licenseError, setLicenseError] = useState("");
  const [rateError, setRateError] = useState("");
  const [experienceError, setExperienceError] = useState("");
  const [platformError, setPlatformError] = useState("");
  const [skillsetError, setSkillsetError] = useState("");

  const onboardNext2 = () => {
    const onboarding1Data = {
      fullName: item?.fullName,
      gender: item?.gender,
      address: item?.address,
      country: item?.country,
      phoneNumber: item?.phoneNumber,
      city: item?.city,
      qualification: qualification,
      experience: experience,
      license: license,
      rate: rate,
      platforms: platform,
      skill: skillset,
    };

    if (!qualification) {
      setQualificationError("Please privide your qualification");
    } else if (!experience) {
      setExperienceError("Please provide your experience");
    } else if (!license) {
      setLicenseError("Please provide your license");
    } else if (!rate) {
      setRateError("Please provide a rate");
    } else if (!platform) {
      setPlatformError("Please provide your platform");
    } else if (!skillset) {
      setSkillsetError("Please write a skillset");
    } else {
      navigation.navigate("TherapistOnboardingFlow3", onboarding1Data);
    }
  };

  return (
    <SafeAreaViewComponent>
      <KeyboardAvoidingComponent>
        <HeaderTitle
          leftIcon={"arrow-back-outline"}
          progress={50}
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
              Therapist Onboarding
            </Text>
            <Text
              style={{ color: "#1E1E1EB2", fontSize: 14, fontWeight: "400" }}
            >
              Please fill all information as it's part of our therapist
              onboarding process.
            </Text>
          </View>

          <PickerSelect
            items={transformedQualificationData}
            placeholder={"Select your qualification"}
            formInputTitle={"What's your highest educational qualification ?"}
            onValueChange={(value) => {
              setQualification(value);
              setFormError("");
              setQualificationError("");
            }}
            errorMessage={qualificationError}
          />

          <FormInput
            formInputTitle={"Registered License Number"}
            keyboardType={"default"}
            placeholder="Enter your license number"
            value={license}
            onChangeText={(txt) => {
              setLicense(txt);
              setLicenseError("");
              setFormError("");
            }}
            errorMessage={licenseError}
          />

          <FormInput
            formInputTitle={"Experience level"}
            keyboardType={"default"}
            placeholder="How many years of experience"
            value={experience}
            onChangeText={(txt) => {
              setExperience(txt);
              setExperienceError("");
              setFormError("");
            }}
            errorMessage={experienceError}
          />

          <FormInput
            formInputTitle={"How much do you charge (USD)"}
            keyboardType={"default"}
            placeholder="Enter your rate"
            value={rate}
            onChangeText={(txt) => {
              setRate(txt);
              setRateError("");
              setFormError("");
            }}
            errorMessage={rateError}
          />

          <PickerSelect
            items={transformedPlatformsData}
            placeholder={"Select the platform that suits you best"}
            formInputTitle={"What platform suits you best?"}
            onValueChange={(value) => {
              setPlatform(value);
              setFormError("");
              setPlatformError("");
            }}
            errorMessage={platformError}
          />

          <PickerSelect
            items={transformedSkillsData}
            placeholder={"Select your skillset"}
            formInputTitle={"What's your skillset ?"}
            onValueChange={(value) => {
              setSkillset(value);
              setFormError("");
              setSkillsetError("");
            }}
            errorMessage={skillsetError}
          />

          <ScrollViewSpace />
        </ScrollView>

        {/* Buttons */}
        <FixedBottomContainer top={1.3}>
          <FormButton
            title={"Next"}
            width={1.1}
            onPress={onboardNext2}
            formError={formError}
          />
        </FixedBottomContainer>
      </KeyboardAvoidingComponent>
    </SafeAreaViewComponent>
  );
};

export default TherapistOnboardingFlow2;

const styles = StyleSheet.create({});
