import { StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

import SafeAreaViewComponent from "../../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../../components/common/HeaderTitle";
import ImagePickerUpload from "../../../components/pickerSelect/ImagePickerUpload";
import FormInput from "../../../components/form/FormInput";
import FixedBottomContainer from "../../../components/common/FixedBottomContainer";
import FormButton from "../../../components/form/FormButton";
import { windowHeight, windowWidth } from "../../../utils/Dimensions";
import { COLORS } from "../../../themes/themes";
import { RNToast } from "../../../Library/Common";

const TherapistOnboardingFlow4 = ({ navigation, route }) => {
  const item = route.params;
  console.log("item", item);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [imageObject, setImageObect] = useState("");

  // Error sttates
  const [formError, setFormError] = useState("");
  const [bioError, setBioError] = useState("");

  const openGallery = () => {
    console.log("clickeddd");
    setFormError("");
    ImagePicker.launchImageLibraryAsync({
      width: 350,
      height: 350,
      cropping: true,
      mediaType: "photo",
      multiple: false,
      compressImageQuality: 0.1,
      compressImageMaxWidth: 800,
      compressImageMaxHeight: 800,
    }).then((image) => {
      console.log("imageee", image);
      setImage(image?.sourceURL);
      setImageObect(image);
      setFormError("");
    });
  };

  const clearImage = () => {
    setImage(null);
    setFormError("");
  };

  const completeOnboarding = async () => {
    const formData = new FormData();

    const onboarding1Data = {
      fullName: item?.fullName,
      gender: item?.gender,
      phone_number: item?.phoneNumber,
      country: item?.country,
      address: item?.address,
      city: item?.city,
      qualification: item?.qualification,
      experience: item?.experience,
      license: item?.license,
      rate: item?.rate,
      platforms: [item?.platforms],
      skills: [item?.skill],
      therapyType: item?.therapyType,
      user_frequency: ["new"],
      bio: bio,
      profile_pictures: imageObject,
    };
    console.log("onboarding1Data", onboarding1Data);

    formData.append("profile_pictures", onboarding1Data?.profile_pictures);

    formData.append("fullname", onboarding1Data?.fullName);
    formData.append("highest_qualification", onboarding1Data?.qualification);
    formData.append("years_of_experience", onboarding1Data?.experience);
    formData.append("license_number", onboarding1Data?.license);
    formData.append("rate_per_hour", onboarding1Data?.rate);
    formData.append("bio", onboarding1Data?.bio);
    formData.append("gender", onboarding1Data?.gender);
    formData.append("phone_number", onboarding1Data?.phone_number);
    formData.append("address", onboarding1Data?.address);
    formData.append("country", onboarding1Data?.country);
    formData.append("phone_number", onboarding1Data?.phone_number);
    formData.append("address", onboarding1Data?.address);

    onboarding1Data?.platforms.forEach((platform, index) =>
      formData.append(`platforms[${index}]`, platform)
    );
    onboarding1Data?.skills.forEach((skill, index) =>
      formData.append(`skill[${index}]`, skill)
    );
    onboarding1Data?.therapyType.forEach((therapyType, index) =>
      formData.append(`counseling_type[${index}]`, therapyType)
    );
    onboarding1Data?.user_frequency.forEach((user_frequency, index) =>
      formData.append(`user_frequency[${index}]`, user_frequency)
    );

    console.log("formData", formData);

    setLoading(true);
    try {
      await axiosInstance({
        url: "profile/therapist",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
        .then((res) => {
          console.log("res", res?.data);
          setLoading(false);

          if (res?.data) {
            console.log("completeOnboarding data", res?.data);
            RNToast(Toast, "Awesome. Your profile has been setup 😇");

            navigation.navigate("Login");
          } else {
            console.log("message", res?.data?.message);
            setFormError(
              "An error occured while onboarding your profile, please try again later"
            );
          }
        })
        .catch((err) => {
          console.log("completeOnboarding err", err);
          setLoading(false);
          setFormError(
            "An error occured while onboarding your profile, please try again later"
          );
        });
    } catch (error) {
      console.log("completeOnboarding error", error);
      setFormError(
        "An error occured while onboarding your profile, please try again later"
      );
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
      <ImagePickerUpload
        image={image}
        onOpenGallery={openGallery}
        onClearImagePress={clearImage}
      />

      <FormInput
        formInputTitle={"Bio"}
        keyboardType={"default"}
        placeholder="Enter your a detailed bio about yourself"
        value={bio}
        onChangeText={(txt) => {
          setBio(txt);
          setBioError("");
          setFormError("");
        }}
        errorMessage={bioError}
        numberOfLines={5}
        multiLine={true}
        height={100}
      />

      {/* Buttons */}
      <FixedBottomContainer top={1.2}>
        <FormButton
          title={"Submit"}
          width={1.1}
          onPress={completeOnboarding}
          formError={formError}
          disabled={!image}
          loading={loading}
        />
      </FixedBottomContainer>
    </SafeAreaViewComponent>
  );
};

export default TherapistOnboardingFlow4;

const styles = StyleSheet.create({
  auth: {
    // width: windowWidth / 1.1,
    // alignSelf: "center",
    // marginTop: 10,
    padding: 20,
    // marginBottom: 20,
    // backgroundColor: 'red',
  },
  error: {
    color: "red",
    fontWeight: "500",
    alignSelf: "center",
    marginBottom: 7,
    fontSize: 13,
    textAlign: "center",
  },
  inputTitle: {
    marginBottom: 10,
    fontSize: 16,
    color: "#1E1E1E",
    fontWeight: "600",
  },
  icon: {
    marginBottom: 10,
    marginRight: 10,
  },
  coverArtContainer: {
    width: windowWidth / 1.1,
    height: windowHeight / 4,
    // backgroundColor: 'red',
    marginLeft: 20,
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'center',
    // marginBottom: 20,
    marginTop: 20,
  },
  uploadContainer: {
    width: windowWidth / 1.1,
    height: windowHeight / 5,
    // backgroundColor: 'green',
    // marginLeft: 20,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    marginBottom: 10,
  },
  cancelIcon: {
    position: "absolute",
    zIndex: 999,
    opacity: 0.9,
    backgroundColor: "black",
    right: 0,
    top: 0,
  },
  imageContainer: {
    width: windowWidth / 1.1,
    height: windowHeight / 5,
    // backgroundColor: 'green',
    // marginLeft: 20,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",

    marginBottom: 10,
  },
  imageUpload: {
    // width: 67,
    // height: 67,
    // backgroundColor: 'green',
    // marginLeft: 20,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 10,
    borderColor: COLORS.ndonuBlueColor,
    borderStyle: "dashed",
    borderRadius: 40,
    borderWidth: 1,
  },
  uploadImageArea: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  uploadedImage: {
    width: 67,
    height: 67,
    borderRadius: 40,
  },
});
