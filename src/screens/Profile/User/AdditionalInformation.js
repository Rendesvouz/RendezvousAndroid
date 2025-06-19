import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

import SafeAreaViewComponent from "../../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../../components/common/HeaderTitle";
import ScrollViewSpace from "../../../components/common/ScrollViewSpace";
import FixedBottomContainer from "../../../components/common/FixedBottomContainer";
import FormButton from "../../../components/form/FormButton";
import {
  rendezvousHobbies,
  rendezvousInterests,
} from "../../../data/dummyData";
import PickerSelect from "../../../components/pickerSelect/PickerSelect";
import SelectedTags from "../../../components/form/SelectedTags";
import { checkUserProfile } from "../../../services/userServices";
import { getUser } from "../../../redux/features/user/userSlice";
import axiosInstance from "../../../utils/api-client";
import { RNToast } from "../../../Library/Common";

const AdditionalInformation = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const userProfle = state?.user?.user?.profile;
  console.log("userProfle", userProfle);

  const [loading, setLoading] = useState(false);

  const transformedData = rendezvousInterests.map((item) => ({
    label: item,
    value: item,
  }));

  const transformedHobbiesData = rendezvousHobbies.map((item) => ({
    label: item,
    value: item,
  }));

  const [selectedInterests, setSelectedInterests] = useState(
    userProfle?.interest ? userProfle?.interest : []
  );
  const [selectedHobbies, setSelectedHobbies] = useState(
    userProfle?.hobbies ? userProfle?.hobbies : []
  );
  console.log("selectedInterests", selectedInterests);

  // Error states
  const [formError, setFormError] = useState("");
  const [selectedInterestsError, setSelectedInterestsError] = useState("");
  const [selectedHobbiesError, setSelectedHobbiesError] = useState("");

  const handleRemove = (item) => {
    setSelectedInterests((prevTags) => prevTags.filter((tag) => tag !== item));
  };

  const handleRemoveHobbies = (item) => {
    setSelectedHobbies((prevTags) => prevTags.filter((tag) => tag !== item));
  };

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
      degree: userProfle?.degree,
      employmentStatus: userProfle?.employmentStatus,
      occupation: userProfle?.occupation,
      religion: userProfle?.religion,
      university: userProfle?.university,
      interest: selectedInterests,
      hobbies: selectedHobbies,
    };

    const formData = new FormData();
    // formData.append("profile_pictures", userProfle?.profile_pictures);
    formData.append("phone_number", userProfle?.phone_number);
    formData.append("personality", userProfle?.personality);
    formData.append("bio", userProfle?.bio);
    formData.append("city", userProfle?.city);
    // formData.append("fullname", userProfle?.fullname);
    // formData.append("dob", userProfle?.dob);
    // formData.append("country", userProfle?.country);
    formData.append("relationship_status", userProfle?.relationship_status);
    formData.append("height", userProfle?.height);
    formData.append("gender", userProfle?.gender);

    selectedInterests.forEach((interest, index) =>
      formData.append(`interest[${index}]`, interest)
    );
    selectedHobbies.forEach((hobby, index) =>
      formData.append(`hobbies[${index}]`, hobby)
    );

    console.log("formData", formData);

    if (!selectedInterests?.length) {
      setSelectedInterestsError("Please select from the options");
    } else if (!selectedHobbies?.length) {
      setSelectedHobbiesError("Please select from the options");
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
            console.log("updateProfile err", err?.response?.data);
            setFormError(
              "An error occured while updating your profile, please try again later"
            );
            setLoading(false);
          });
      } catch (error) {
        console.log("updateProfile error", error);
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
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cardsContainer}>
          <SelectedTags items={selectedInterests} onRemove={handleRemove} />
          <PickerSelect
            formInputTitle={"In my free time I love...?"}
            placeholder={"Select from the options"}
            items={transformedData}
            onValueChange={(value) => {
              if (!selectedInterests.includes(value)) {
                setSelectedInterests([...selectedInterests, value]);
                setSelectedInterestsError("");
              }
            }}
            errorMessage={selectedInterestsError}
          />
        </View>

        <Text style={styles.title}>My Hobbies</Text>
        <View style={styles.cardsContainer}>
          <SelectedTags
            items={selectedHobbies}
            onRemove={handleRemoveHobbies}
          />
          <PickerSelect
            formInputTitle={"Hobbies"}
            placeholder={"Select from the options"}
            items={transformedHobbiesData}
            onValueChange={(value) => {
              if (!selectedHobbies.includes(value)) {
                setSelectedHobbies([...selectedHobbies, value]);
                setSelectedHobbiesError("");
              }
            }}
            errorMessage={selectedHobbiesError}
          />
        </View>
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

export default AdditionalInformation;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    // backgroundColor: "#f8f9fb",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 30,
  },

  // container: {
  //   flexGrow: 1,
  //   padding: 20,
  //   // backgroundColor: "#f8f9fb",
  //   alignItems: "center",
  // },
  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  // cardsContainer: {
  //   flexDirection: "row",
  //   flexWrap: "wrap",
  //   justifyContent: "center",
  // },
  animatedCard: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 50, // Makes it a perfect circle
    overflow: "hidden",
  },
});
