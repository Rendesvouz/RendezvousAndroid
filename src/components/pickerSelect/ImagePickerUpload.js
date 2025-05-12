import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useRef, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import { windowHeight, windowWidth } from "../../utils/Dimensions";
import { COLORS } from "../../themes/themes";
import FormInputTitle from "../form/FormInputTitle";
import UploadButtons from "../form/UploadButtons";

const ImagePickerUpload = ({ image, onOpenGallery, onClearImagePress }) => {
  return (
    <View style={styles.coverArtContainer}>
      <FormInputTitle formTitle={"Upload profile picture *"} />

      {!image ? (
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            style={[styles.uploadContainer]}
            onPress={onOpenGallery}
          >
            <Ionicons name="person-outline" color={COLORS.ndonuRed} size={50} />
          </TouchableOpacity>
          <View style={styles.paddingTips}>
            <Text style={{ marginBottom: 10, fontWeight: "600" }}>Tips</Text>
            <Text style={styles.paddingTipsText}>
              - Take pictures in well lighted places
            </Text>
            <Text style={styles.paddingTipsText}>
              - Upload high quality pictures in well lighted places
            </Text>
            <Text style={styles.paddingTipsText}>
              - Upload pictures in PNG or JPG format
            </Text>
          </View>
        </View>
      ) : (
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            // style={[styles.uploadContainer]}
            onPress={onOpenGallery}
          >
            <Image source={{ uri: image }} style={styles.uploadContainer} />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              marginBottom: 20,
              justifyContent: "space-between",
            }}
          >
            <UploadButtons
              leftIcon={"camera-outline"}
              iconColor={COLORS.rendezvousRed}
              borderColor={COLORS.rendezvousRed}
              borderWidth={1}
              width={2.5}
              title={"Clear Image"}
              onPress={onClearImagePress}
            />
            <UploadButtons
              leftIcon={"image-outline"}
              iconColor={COLORS.rendezvousRed}
              backgroundColor={COLORS.secondaryRed}
              width={2.5}
              title={"Change Picture"}
              onPress={onOpenGallery}
            />
          </View>
          <View style={styles.paddingTips}>
            <Text style={{ marginBottom: 10, fontWeight: "600" }}>Tips</Text>
            <Text style={styles.paddingTipsText}>
              - Take pictures in well lighted places
            </Text>
            <Text style={styles.paddingTipsText}>
              - Upload high quality pictures in well lighted places
            </Text>
            <Text style={styles.paddingTipsText}>
              - Upload pictures in PNG or JPG format
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default ImagePickerUpload;

const styles = StyleSheet.create({
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
    width: 173,
    height: 173,
    backgroundColor: COLORS.secondaryRed,
    // marginLeft: 20,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    // borderWidth: 1,
    // borderStyle: 'dashed',
    marginBottom: 20,
    borderRadius: windowWidth / 2,
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
  paddingTips: {
    padding: 30,
    borderWidth: 1,
    borderColor: COLORS.appGrey4,
    borderRadius: 16,
  },
  paddingTipsText: {
    marginBottom: 10,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.appGrey5,
  },
});
