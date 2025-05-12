import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";

import SafeAreaViewComponent from "../../../components/common/SafeAreaViewComponent";
import KeyboardAvoidingComponent from "../../../components/form/KeyboardAvoidingComponent";
import HeaderTitle from "../../../components/common/HeaderTitle";
import FormInput from "../../../components/form/FormInput";
import PickerSelect from "../../../components/pickerSelect/PickerSelect";
import CountryPickerx from "../../../components/pickerSelect/CountryPicker";
import ScrollViewSpace from "../../../components/common/ScrollViewSpace";
import FixedBottomContainer from "../../../components/common/FixedBottomContainer";
import FormButton from "../../../components/form/FormButton";
import { COLORS } from "../../../themes/themes";
import { rendezvousGenders } from "../../../data/dummyData";

const TherapistOnboardingFlow1 = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryObject, setCountryObject] = useState("");

  console.log("ccr", country, countryObject);

  // Error states
  const [formError, setFormError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [cityError, setCityError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const onboardNext1 = () => {
    const onboarding1Data = {
      fullName: fullName,
      gender: gender,
      address: address,
      country: country,
      city: city,
      phoneNumber: phoneNumber,
    };

    if (!fullName) {
      setFullNameError("Please provide your fullname");
    } else if (!gender) {
      setGenderError("Please provide your gender");
    } else if (!country) {
      setCountryError("Please provide your country");
    } else if (!city) {
      setPersonalityError("Please provide your city");
    } else if (!address) {
      setAddressError("Please provide your valid address");
    } else if (!phoneNumber) {
      setPhoneNumberError("Please provide your phone number");
    } else {
      navigation.navigate("TherapistOnboardingFlow2", onboarding1Data);
    }
  };

  return (
    <SafeAreaViewComponent>
      <KeyboardAvoidingComponent>
        <HeaderTitle
          leftIcon={"arrow-back-outline"}
          progress={25}
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

          {/* <PickerSelect
            items={rendezvousQualification}
            placeholder={"Select your qualification"}
            formInputTitle={"What's your highest educational qualififcation ?"}
            onValueChange={(value) => {
              setGender(value);
              setFormError("");
              setGenderError("");
            }}
            errorMessage={genderError}
          /> */}

          <PickerSelect
            items={rendezvousGenders}
            placeholder={"Select your gender"}
            formInputTitle={"What's your Gender ?"}
            onValueChange={(value) => {
              setGender(value);
              setFormError("");
              setGenderError("");
            }}
            errorMessage={genderError}
          />

          <CountryPickerx
            formInputTitle={"Country"}
            countryError={countryError}
            setCountry={setCountry}
            setFormError={setFormError}
            setCountryObject={setCountryObject}
          />

          <FormInput
            formInputTitle={"City"}
            keyboardType={"default"}
            placeholder="Enter your city"
            value={city}
            onChangeText={(txt) => {
              setCity(txt);
              setCityError("");
              setFormError("");
            }}
            errorMessage={cityError}
          />
          <FormInput
            formInputTitle={"Address"}
            keyboardType={"default"}
            placeholder="Enter your address"
            value={address}
            onChangeText={(txt) => {
              setAddress(txt);
              setAddressError("");
              setFormError("");
            }}
            errorMessage={addressError}
            numberOfLines={5}
            multiLine={true}
            height={100}
          />

          <FormInput
            formInputTitle={"Phone Number"}
            keyboardType={"number-pad"}
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChangeText={(txt) => {
              setPhoneNumber(txt);
              setPhoneNumberError("");
              setFormError("");
            }}
            errorMessage={phoneNumberError}
          />
          <ScrollViewSpace />
        </ScrollView>

        {/* Buttons */}
        <FixedBottomContainer top={1.3}>
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

export default TherapistOnboardingFlow1;

const styles = StyleSheet.create({});
