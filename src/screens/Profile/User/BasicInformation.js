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
import { rendezvousGenders, universitiesJson } from "../../../data/dummyData";
import SearchablePicker from "../../../components/pickerSelect/SearchablePicker";
import axiosInstance from "../../../utils/api-client";
import { checkUserProfile } from "../../../services/userServices";
import { getUser } from "../../../redux/features/user/userSlice";
import { RNToast } from "../../../Library/Common";

const BasicInformation = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const userProfle = state?.user?.user?.profile;
  console.log("userProfle", userProfle);

  const [loading, setLoading] = useState(false);

  const [gender, setGender] = useState(
    userProfle?.gender ? userProfle?.gender : ""
  );
  const [degree, setDegree] = useState(
    userProfle?.degree ? userProfle?.degree : ""
  );
  const [university, setUniversity] = useState(
    userProfle?.university ? userProfle?.university : ""
  );
  const [employmentStatus, setEmploymentStatus] = useState(
    userProfle?.employmentStatus ? userProfle?.employmentStatus : ""
  );
  const [occupation, setOccupation] = useState(
    userProfle?.occupation ? userProfle?.occupation : ""
  );
  const [religion, setReligion] = useState(
    userProfle?.religion ? userProfle?.religion : ""
  );

  // Error states
  const [formError, setFormError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [degreeError, setDegreeError] = useState("");
  const [universityError, setUniversityError] = useState("");
  const [employmentStatusError, setEmploymentStatusError] = useState("");
  const [occupationError, setOccupationError] = useState("");
  const [religionError, setReligionError] = useState("");

  const [selectedValue, setSelectedValue] = useState(
    userProfle?.university ? userProfle?.university : ""
  );
  console.log("selectedValue", selectedValue);

  const transformedData = universitiesJson.map((item) => ({
    label: item,
    value: item,
  }));

  const updateProfile = async () => {
    const updateProfileData = {
      // fullname: userProfle?.fullname,
      // profile_pictures: userProfle?.profile_pictures,
      phone_number: userProfle?.phone_number,
      personality: userProfle?.personality,
      bio: userProfle?.bio,
      city: userProfle?.city,
      // country: userProfle?.country,
      // dob: userProfle?.dob,
      relationship_status: userProfle?.relationship_status,
      height: userProfle?.height,
      gender: userProfle?.gender,
      degree: degree,
      employmentStatus: employmentStatus,
      occupation: occupation,
      religion: religion,
      university: userProfle?.university ? university : selectedValue,
      interest: userProfle?.interest,
      hobbies: userProfle?.hobbies,
    };
    // const formData = new FormData();
    // formData.append("fullname", userProfle?.fullname);
    // formData.append("profile_pictures", userProfle?.profile_pictures);
    // formData.append("phone_number", userProfle?.phone_number);
    // formData.append("personality", userProfle?.personality);
    // formData.append("bio", userProfle?.bio);
    // formData.append("city", userProfle?.city);
    // formData.append("dob", userProfle?.dob);

    // formData.append("relationship_status", userProfle?.relationship_status);
    // formData.append("height", userProfle?.height);
    // formData.append("gender", userProfle?.gender);

    // formData.append("degree", degree);
    // formData.append("employmentStatus", employmentStatus);
    // formData.append("occupation", occupation);
    // formData.append("religion", religion);
    // formData.append("university", selectedValue);

    // const interests = userProfle?.interest || [];
    // const hobbies = userProfle?.hobbies || [];

    // interests.forEach((interest, index) =>
    //   formData.append(`interest[${index}]`, interest)
    // );
    // hobbies.forEach((hobby, index) =>
    //   formData.append(`hobbies[${index}]`, hobby)
    // );

    // console.log("formData", formData);

    if (!gender) {
      setGenderError("Please provide your gender");
    } else if (!degree) {
      setDegreeError("Please provide your valid degree");
    } else if (!employmentStatus) {
      setEmploymentStatusError("Please provide your status");
    } else if (!occupation) {
      setOccupationError("Please input your occupation");
    } else if (!religion) {
      setReligionError("Please input your religion");
    } else if (!university && !selectedValue) {
      setUniversityError("Please select a value");
    } else {
      setLoading(true);
      try {
        await axiosInstance({
          url: "profile",
          method: "PUT",
          data: updateProfileData,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            console.log("res", res?.data);
            setLoading(false);

            if (res?.data) {
              console.log("updateProfile data", res?.data);
              checkUserProfile(dispatch, getUser, axiosInstance);
              RNToast(Toast, "Great, Your profile has been updated 😇");
              navigation.goBack();
            } else {
              console.log("message", res?.data?.message);
              setFormError(
                "An error occured while updating your profile, please try again later"
              );
            }
          })
          .catch((err) => {
            console.log("updateProfile err", err?.response);
            setFormError(
              "An error occured while updating your profile, please try again later"
            );
            setLoading(false);
          });
      } catch (error) {
        console.log("updateProfile error", error?.response);
        setFormError(
          "An error occured while updating your profile, please try again later"
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
        headerTitle={"Basic Information"}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        <PickerSelect
          formInputTitle={"Gender"}
          placeholder={"Select a gender"}
          items={rendezvousGenders}
          value={gender}
          onValueChange={(value) => {
            setGender(value);
            setFormError("");
            setGenderError("");
          }}
          errorMessage={genderError}
        />
        <FormInput
          formInputTitle={"Degree"}
          placeholder=""
          keyboardType={"default"}
          value={degree}
          width={1.1}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(txt) => {
            setDegree(txt);
            setFormError("");
            setDegreeError("");
          }}
          errorMessage={degreeError}
        />

        {university ? (
          <FormInput
            formInputTitle={"University"}
            placeholder=""
            keyboardType={"default"}
            value={university}
            width={1.1}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(txt) => {
              setUniversity(txt);
              setFormError("");
              setUniversityError("");
            }}
            errorMessage={universityError}
          />
        ) : (
          <SearchablePicker
            formInputTitle={"University"}
            items={transformedData}
            onValueChange={(value) => {
              setSelectedValue(value);
              setUniversityError("");
            }}
            errorMessage={universityError}
          />
        )}

        <FormInput
          formInputTitle={"Employement Status"}
          placeholder=""
          keyboardType={"default"}
          value={employmentStatus}
          width={1.1}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(txt) => {
            setEmploymentStatus(txt);
            setFormError("");
            setEmploymentStatusError("");
          }}
          errorMessage={employmentStatusError}
        />
        <FormInput
          formInputTitle={"Occupation"}
          placeholder=""
          keyboardType={"default"}
          value={occupation}
          width={1.1}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(txt) => {
            setOccupation(txt);
            setFormError("");
            setOccupationError("");
          }}
          errorMessage={occupationError}
        />

        <FormInput
          formInputTitle={"Religion"}
          placeholder=""
          keyboardType={"default"}
          value={religion}
          width={1.1}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(txt) => {
            setReligion(txt);
            setFormError("");
            setReligionError("");
          }}
          errorMessage={religionError}
        />

        <ScrollViewSpace />
      </ScrollView>

      {/* Buttons */}
      <FixedBottomContainer top={1.2}>
        <FormButton
          title={"Update Profile"}
          width={1.1}
          onPress={updateProfile}
          loading={loading}
          disabled={loading}
          formError={formError}
        />
      </FixedBottomContainer>
    </SafeAreaViewComponent>
  );
};

export default BasicInformation;

const styles = StyleSheet.create({});
