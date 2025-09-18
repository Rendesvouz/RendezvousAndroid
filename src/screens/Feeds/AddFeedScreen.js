import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";

import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import FeedsHeaderTitle from "../../components/common/FeedsHeaderTitle";
import { windowHeight, windowWidth } from "../../utils/Dimensions";
import axiosInstance from "../../utils/api-client";
import { RNToast } from "../../Library/Common";
import { COLORS } from "../../themes/themes";
import ScrollViewSpace from "../../components/common/ScrollViewSpace";
import FormButton from "../../components/form/FormButton";
import { useTheme } from "../../Context/ThemeContext";

const MAX_IMAGES = 4;

const AddFeedScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { theme } = useTheme();

  const userProfle = state?.user?.user?.profile;
  console.log("userProfle", userProfle);

  const [postLoading, setPostLoading] = useState(false);

  const [feedContent, setFeedContent] = useState("");
  const [images, setImages] = useState();
  console.log("images", images);

  // Error states
  const [formError, setFormError] = useState("");

  const pickImages = async () => {
    try {
      const selected = await ImagePicker.launchImageLibraryAsync({
        multiple: false,
        mediaTypes: ["images", "videos"],
        maxFiles: MAX_IMAGES - images?.length,
        // width: 350,
        // height: 350,
        // cropping: true,
        compressImageQuality: 0.1,
        compressImageMaxWidth: 800,
        compressImageMaxHeight: 800,
      });

      console.log("seleelee", selected);

      const media = {
        uri: selected?.assets?.[0]?.uri,
        isRemote: false,
        mime: selected?.assets?.[0]?.type,
        type: selected?.assets?.[0]?.type?.startsWith("video")
          ? "video"
          : "image",
      };
      console.log("media", media);

      setImages(media);
    } catch (err) {
      console.log("Image pick cancelled or failed", err);
    }
  };

  const openCamera = async () => {
    console.log("cameraaa");
    try {
      const captured = await ImagePicker.launchCameraAsync({
        mediaType: "any",
        compressImageQuality: 0.1,
      });

      const media = {
        uri: captured?.path,
        isRemote: false,
        mime: captured?.mime,
        type: captured?.mime.startsWith("video") ? "video" : "image",
      };

      setImages(media);
    } catch (err) {
      console.log("Camera open cancelled or failed", err);
    }
  };

  const removeImage = () => {
    setImages(null);
  };

  const uploadContent = async () => {
    if (!images) {
      return;
    }

    const media = images;

    setPostLoading(true);
    const formData = new FormData();
    const reelsFormData = new FormData();

    //   feeds data
    formData?.append("caption", "Rendezvous Feed");
    formData?.append("content", feedContent);
    // formData?.append('music', '');
    // formData?.append('textColor', '');
    // formData?.append('backgroundColor[]', '');

    const fileName = `feedPost-${Date.now()}.${media?.mime.split("/")[1]}`;
    formData.append("feed_pictures", {
      uri: media.uri,
      name: fileName,
      type: media.mime,
    });

    //   reels data
    reelsFormData?.append("caption", feedContent);
    // reelsFormData?.append('content', feedContent);
    reelsFormData?.append("duration", "30");

    const reelsFileName = `feedReel-${Date.now()}.${media?.mime.split("/")[1]}`;
    reelsFormData.append("reel_url", {
      uri: media.uri,
      name: reelsFileName,
      type: media.mime,
    });
    reelsFormData.append("reel_thumbnail", {
      uri: media.uri,
      name: reelsFileName,
      type: media.mime,
    });

    const endpoint = media.type === "video" ? "feeds/post-reels" : "feeds/post";
    const uploadData = media?.type === "image" ? formData : reelsFormData;
    console.log("endpoint", endpoint, uploadData);
    try {
      await axiosInstance({
        url: endpoint,
        method: "POST",
        data: uploadData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
        .then((res) => {
          console.log("uploadContent res", res?.data);
          setPostLoading(false);
          RNToast(Toast, "Your feed has been uploaded");
          setImages();
          setFeedContent("");
          navigation.goBack();
        })
        .catch((err) => {
          console.log("uploadContent err feeds/post", err?.response);
          setPostLoading(false);
          setFormError("An error occured while uploading your feed");
        });
    } catch (error) {
      console.log("uploadContent error feeds/post", error?.response);
      setPostLoading(false);
      setFormError("An error occured while uploading your feed");
    }
  };

  const cancelFnc = () => {
    return (
      <TouchableOpacity
        onPress={removeImage}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: 20,
          padding: 5,
        }}
      >
        <Ionicons name="close" size={20} color="white" />
      </TouchableOpacity>
    );
  };

  const player = useVideoPlayer(images?.uri, (player) => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <SafeAreaViewComponent>
      <FeedsHeaderTitle
        headerTitle={"Add Feed"}
        onHeaderIconPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 10 }}
      >
        <View style={styles.auth}>
          <TextInput
            placeholder="What is on your mind"
            placeholderTextColor={"#333"}
            style={{ height: 70, color: theme?.text, fontSize: 17 }}
            value={feedContent}
            onChangeText={(txt) => {
              setFeedContent(txt);
              setFormError("");
            }}
            autoFocus={true}
            autoCorrect={false}
          />
        </View>

        {images ? (
          images.type === "image" ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: images.uri }} style={styles.postImage} />
              {cancelFnc()}
            </View>
          ) : (
            <View style={[styles.imageContainer]}>
              <VideoView
                player={player}
                style={styles.postImage}
                allowsFullscreen
                allowsPictureInPicture
              />
              {cancelFnc()}
            </View>
          )
        ) : null}

        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            bottom: 90,
            position: "absolute",
            flexDirection: "row",
            padding: 20,
            marginLeft: 20,
            // backgroundColor: 'red',
          }}
          onPress={() => {
            pickImages();
          }}
        >
          <TouchableOpacity
            onPress={() => {
              openCamera();
            }}
            style={styles.openCameraButton}
          >
            <Ionicons name="camera" size={30} color={COLORS.rendezvousRed} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              pickImages();
            }}
            style={styles.openCameraButton}
          >
            <Ionicons
              name="images-outline"
              size={30}
              color={COLORS.rendezvousRed}
              onPress={() => pickImages()}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <ScrollViewSpace />
      </ScrollView>
      <FormButton
        title={"Upload"}
        onPress={uploadContent}
        loading={postLoading}
        disabled={postLoading}
        formError={formError}
      />
    </SafeAreaViewComponent>
  );
};

export default AddFeedScreen;

const styles = StyleSheet.create({
  auth: {
    width: windowWidth / 1.1,
    alignSelf: "center",
    // backgroundColor: 'pink',
  },
  openCameraButton: {
    borderWidth: 1,
    borderColor: COLORS.rendezvousRed,
    borderRadius: 10,
    width: 100,
    height: 100,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  postImage: {
    width: windowWidth / 1.2,
    height: windowHeight / 3,
    borderRadius: 10,
  },
  imageContainer: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 0,
    // backgroundColor: 'red',
  },
});
