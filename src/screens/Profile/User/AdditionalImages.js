import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

import SafeAreaViewComponent from "../../../components/common/SafeAreaViewComponent";
import ScrollViewSpace from "../../../components/common/ScrollViewSpace";
import HeaderTitle from "../../../components/common/HeaderTitle";
import { windowWidth } from "../../../utils/Dimensions";
import FixedBottomContainer from "../../../components/common/FixedBottomContainer";
import FormButton from "../../../components/form/FormButton";
import axiosInstance from "../../../utils/api-client";
import { checkUserProfile } from "../../../services/userServices";
import { getUser } from "../../../redux/features/user/userSlice";
import { RNToast } from "../../../Library/Common";
import { useTheme } from "../../../Context/ThemeContext";

const MAX_IMAGES = 7;

const AdditionalImages = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { theme } = useTheme();

  const userProfle = state?.user?.user?.profile;
  console.log("userProfle", userProfle);

  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState([]);
  console.log("images", images);

  // Error states
  const [formError, setFormError] = useState("");

  const pickImages = async () => {
    try {
      const selected = await ImagePicker.launchImageLibraryAsync({
        multiple: true,
        mediaType: "photo",
        maxFiles: MAX_IMAGES - images?.length,
        // width: 350,
        // height: 350,
        // cropping: true,
        compressImageQuality: 0.1,
        compressImageMaxWidth: 800,
        compressImageMaxHeight: 800,
      });

      console.log("seleelee", selected);

      const newImages = selected?.map((img) => ({
        uri: img?.path,
        isRemote: false,
      }));

      setImages((prev) => [...prev, ...newImages].slice(0, MAX_IMAGES));
    } catch (err) {
      console.log("Image pick cancelled or failed", err);
    }
  };

  const updateProfile = async () => {
    setLoading(true);
    const formData = new FormData();

    images?.forEach((img, index) => {
      const fileName = `profile-image-${Date.now()}-${index}.jpg`;
      formData.append("additional_pictures", {
        uri: img?.uri,
        name: fileName,
        type: "image/jpeg",
      });
    });

    console.log("formData", formData);

    try {
      await axiosInstance({
        url: "profile/pic",
        method: "PUT",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
        .then((res) => {
          console.log("updateProfile res", res);
          setLoading(false);

          if (res?.data) {
            checkUserProfile(dispatch, getUser, axiosInstance);
            RNToast(Toast, "Great, Your profile has been updated 😇");
            navigation.goBack();
          }
        })
        .catch((err) => {
          console.log("updateProfile err", err?.response);
          setLoading(false);
          setFormError("An error occured while uploading your images");
        });
    } catch (error) {
      console.log("updateProfile error", error?.response);
      setLoading(false);
      setFormError("An error occured while uploading your images");
    }
  };

  useEffect(() => {
    if (userProfle?.additional_pictures?.length) {
      const formatted = userProfle?.additional_pictures?.map((url) => ({
        uri: url,
        isRemote: true,
      }));
      setImages(formatted);
    }
  }, [userProfle]);

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={"arrow-back-outline"}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        headerTitle={"Additional Images"}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 0, padding: 10 }}
      >
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            marginTop: 10,
          }}
        >
          {[...Array(MAX_IMAGES)]?.map((_, index) => {
            const image = images[index];
            return (
              <TouchableOpacity
                key={index}
                onPress={pickImages}
                style={{
                  width: windowWidth / 2.2,
                  height: 200,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: theme?.borderColor,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: theme?.background,
                }}
              >
                {image ? (
                  <Image
                    source={{ uri: image?.uri }}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 8,
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <Text style={{ fontSize: 24, color: "#999" }}>+</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
        <ScrollViewSpace />
      </ScrollView>

      {/* Buttons */}
      <FixedBottomContainer top={1.18}>
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

export default AdditionalImages;

const styles = StyleSheet.create({});
