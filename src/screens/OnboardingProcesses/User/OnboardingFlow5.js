import { StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

import SafeAreaViewComponent from "../../../components/common/SafeAreaViewComponent";
import FormButton from "../../../components/form/FormButton";
import { windowHeight, windowWidth } from "../../../utils/Dimensions";
import { COLORS } from "../../../themes/themes";
import FixedBottomContainer from "../../../components/common/FixedBottomContainer";
import ImagePickerUpload from "../../../components/pickerSelect/ImagePickerUpload";
import HeaderTitle from "../../../components/common/HeaderTitle";
import { RNToast } from "../../../Library/Common";
import axiosInstance from "../../../utils/api-client";
import { getUser } from "../../../redux/features/user/userSlice";
import { useTheme } from "../../../Context/ThemeContext";

const OnboardingFlow5 = ({ navigation, route }) => {
  const item = route.params;
  console.log("item", item);

  const dispatch = useDispatch();
  const { theme } = useTheme();

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState("");
  const [image, setImage] = useState("");
  const [imageObject, setImageObect] = useState("");

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
      personality: item?.personality,
      country: item?.country,
      relationshipStatus: item?.relationshipStatus,
      bio: item?.bio,
      city: item?.city,
      height: item?.height,
      dob: item?.dob,
      interests: item?.interests,
      hobbies: item?.hobbies,
      profile_pictures: imageObject,
    };
    console.log("onboarding1Data", onboarding1Data);

    formData.append("profile_pictures", {
      uri: imageObject?.path,
      name: "profile-image.jpg",
      type: "image/jpg",
      size: 1024,
    });

    formData.append("fullname", onboarding1Data?.fullName);
    formData.append("personality", onboarding1Data?.personality);
    formData.append("bio", onboarding1Data?.bio);
    formData.append("dob", onboarding1Data?.dob);
    formData.append("relationship_status", onboarding1Data?.relationshipStatus);
    formData.append("height", onboarding1Data?.height);
    formData.append("gender", onboarding1Data?.gender);
    formData.append("country", onboarding1Data?.country);
    formData.append("city", onboarding1Data?.city);

    onboarding1Data?.interests.forEach((interest, index) =>
      formData.append(`interest[${index}]`, interest)
    );
    onboarding1Data?.hobbies.forEach((hobby, index) =>
      formData.append(`hobbies[${index}]`, hobby)
    );

    console.log("formData", formData);

    setLoading(true);
    try {
      await axiosInstance({
        url: "profile",
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
            checkUserProfile();

            // navigation.navigate('Login');
          } else {
            console.log("message", res?.data?.message);
            setFormError(
              "An error occured while onboarding your profile, please try again later"
            );
          }
        })
        .catch((err) => {
          console.log("completeOnboarding err", err?.response);
          setLoading(false);
          setFormError(
            "An error occured while onboarding your profile, please try again later"
          );
        });
    } catch (error) {
      console.log("completeOnboarding error", error?.response);
      setFormError(
        "An error occured while onboarding your profile, please try again later"
      );
    }
  };

  const checkUserProfile = async () => {
    try {
      const profileResponse = await axiosInstance({
        url: "profile/private",
        method: "GET",
      });

      console.log("ressssssss", profileResponse);
      dispatch(getUser(profileResponse?.data?.data));
      RNToast(Toast, "Awesome. Your profile has been setup 😇");
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.error("checkUserProfile check error:", error?.response);
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

export default OnboardingFlow5;

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
