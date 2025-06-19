import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";

import ScrollViewSpace from "../../components/common/ScrollViewSpace";
import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../components/common/HeaderTitle";
import axiosInstance from "../../utils/api-client";
import { RNToast } from "../../Library/Common";
import PickerSelect from "../../components/pickerSelect/PickerSelect";
import FormInput from "../../components/form/FormInput";
import ImagePickerUpload from "../../components/pickerSelect/ImagePickerUpload";
import FixedBottomContainer from "../../components/common/FixedBottomContainer";
import FormButton from "../../components/form/FormButton";

const AddProduct = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const userProfle = state?.user?.user?.profile;
  console.log("userProfle", userProfle);
  const reduxProductCategories = state?.user?.productCategories;
  console.log("reduxProductCategories", reduxProductCategories);

  const transformedData = reduxProductCategories.map((item) => ({
    label: item?.name,
    value: item,
  }));

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState("");
  const [image, setImage] = useState("");
  const [imageObject, setImageObect] = useState("");
  console.log("iiii", image, imageObject);

  const [productImage, setProductImage] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDiscount, setProductDiscount] = useState("");
  const [productStockQuantity, setProductStockQuantity] = useState("");
  const [productColor, setProductColor] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [productShippingDuration, setProductShippingDuration] = useState("");
  console.log("productCategory", productCategory);

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

  const uploadProduct = async () => {
    const formData = new FormData();
    formData.append("title", productName);
    formData.append("description", productDescription);
    formData.append("price", parseInt(productPrice));
    formData.append("categoryId", productCategory?.id);
    formData.append("stock_quantity", parseInt(productStockQuantity));

    formData.append("productType", "vendor");
    formData.append("color", productColor);
    formData.append("weight", parseInt(productWeight));

    formData.append("discounted_price", parseInt(productDiscount));
    formData.append("shippingTime", productShippingDuration);
    formData.append("thumbnail_url", imageObject);
    formData.append("images_url", imageObject);

    console.log("formData", formData);

    setLoading(true);
    try {
      await axiosInstance({
        url: "product",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        maxContentLength: Infinity, // Ensure larger payloads are accepted
        maxBodyLength: Infinity,
      })
        .then((res) => {
          console.log("res", res?.data);
          setLoading(false);

          if (res?.data) {
            console.log("uploadProduct data", res?.data);
            RNToast(Toast, "Great, Your product has been updated 😇");
            navigation.goBack();
          } else {
            console.log("message", res?.data);
            setFormError(
              "An error occured while updating your profile, please try again later"
            );
          }
        })
        .catch((err) => {
          console.log("uploadProduct err", err);
          setFormError(
            "An error occured while updating your profile, please try again later"
          );
          setLoading(false);
        });
    } catch (error) {
      console.log("uploadProduct error", error);
      setFormError(
        "An error occured while updating your profile, please try again later"
      );
    }
  };

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={"arrow-back-outline"}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        headerTitle={"Add Product"}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        <ImagePickerUpload
          image={image}
          onOpenGallery={openGallery}
          onClearImagePress={clearImage}
        />
        <PickerSelect
          formInputTitle={"Product Category"}
          placeholder={"Select a gender"}
          items={transformedData}
          value={productCategory}
          onValueChange={(value) => {
            setProductCategory(value);
            setFormError("");
          }}
          //   errorMessage={genderError}
        />
        <FormInput
          formInputTitle={"Product Name"}
          placeholder=""
          keyboardType={"default"}
          value={productName}
          width={1.1}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(txt) => {
            setProductName(txt);
            setFormError("");
          }}
        />
        <FormInput
          formInputTitle={"Product Description"}
          placeholder=""
          keyboardType={"default"}
          value={productDescription}
          width={1.1}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(txt) => {
            setProductDescription(txt);
            setFormError("");
          }}
        />
        <FormInput
          formInputTitle={"Product Price"}
          placeholder=""
          keyboardType={"default"}
          value={productPrice}
          width={1.1}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(txt) => {
            setProductPrice(txt);
            setFormError("");
          }}
        />
        <FormInput
          formInputTitle={"Product Discount"}
          placeholder=""
          keyboardType={"default"}
          value={productDiscount}
          width={1.1}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(txt) => {
            setProductDiscount(txt);
            setFormError("");
          }}
        />
        <FormInput
          formInputTitle={"Product Stock quantity"}
          placeholder=""
          keyboardType={"default"}
          value={productStockQuantity}
          width={1.1}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(txt) => {
            setProductStockQuantity(txt);
            setFormError("");
          }}
        />
        <FormInput
          formInputTitle={"Product Color"}
          placeholder=""
          keyboardType={"default"}
          value={productColor}
          width={1.1}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(txt) => {
            setProductColor(txt);
            setFormError("");
          }}
        />
        <FormInput
          formInputTitle={"Product weight"}
          placeholder=""
          keyboardType={"default"}
          value={productWeight}
          width={1.1}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(txt) => {
            setProductWeight(txt);
            setFormError("");
          }}
        />
        <FormInput
          formInputTitle={"Product Shipping duration"}
          placeholder=""
          keyboardType={"default"}
          value={productShippingDuration}
          width={1.1}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(txt) => {
            setProductShippingDuration(txt);
            setFormError("");
          }}
        />
        <ScrollViewSpace />
      </ScrollView>

      {/* Buttons */}
      <FixedBottomContainer top={1.2}>
        <FormButton
          title={"Upload Product"}
          width={1.1}
          onPress={uploadProduct}
          formError={formError}
          disabled={!image || loading}
          loading={loading}
        />
      </FixedBottomContainer>
    </SafeAreaViewComponent>
  );
};

export default AddProduct;

const styles = StyleSheet.create({});
