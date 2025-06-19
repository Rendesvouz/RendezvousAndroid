import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import FeedsCard from "../../components/cards/FeedsCard";
import HeaderTitle from "../../components/common/HeaderTitle";
import BottomSheet from "../../components/bottomSheet/BottomSheet";
import { COLORS } from "../../themes/themes";
import { windowWidth } from "../../utils/Dimensions";
import FeedsInput from "../../components/form/FeedsInput";
import FormButton from "../../components/form/FormButton";
import axiosInstance from "../../utils/api-client";
import { RNToast, shuffleArray } from "../../Library/Common";
import HomeHeader from "../../components/common/HomeHeader";
import Carousels from "../../components/common/Carousel";

const MAX_IMAGES = 4;
const PAGE_SIZE = 10;
const viewabilityConfig = {
  itemVisiblePercentThreshold: 60,
};

const FeedsScreen = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const bottomSheetRef = useRef();

  const userProfle = state?.user?.user?.profile;
  console.log("userProfle", userProfle);

  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [feedContent, setFeedContent] = useState("");
  const [images, setImages] = useState([]);

  const [feedsPosts, setFeedsPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  console.log("feedsPosts", feedsPosts, displayedPosts);

  // Error states
  const [formError, setFormError] = useState("");

  const [visibleIndex, setVisibleIndex] = useState(null);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setVisibleIndex(viewableItems[0].index);
    }
  }).current;

  const pickImages = async () => {
    try {
      const selected = await ImagePicker.launchImageLibraryAsync({
        multiple: true,
        mediaType: "any",
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

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadContent = async () => {
    setPostLoading(true);
    const formData = new FormData();

    formData?.append("caption", "Post Feeds");
    formData?.append("content", feedContent);
    // formData?.append('feed_pictures', images);
    images?.forEach((img, index) => {
      const fileName = `feedPost-image-${Date.now()}-${index}.jpg`;
      formData.append("feed_pictures", {
        uri: img?.uri,
        name: fileName,
        type: "image/jpeg",
      });
    });

    try {
      await axiosInstance({
        url: "feeds/post",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
        .then((res) => {
          console.log("uploadContent res", res?.data);
          setPostLoading(false);
          RNToast(Toast, "Your post has been uploaded");
          bottomSheetRef?.current?.close();
          setImages([]);
          setFeedContent("");

          // fetch the post and update
          getAllPosts();
        })
        .catch((err) => {
          console.log("uploadContent err feeds/post", err?.response);
          setPostLoading(false);
        });
    } catch (error) {
      console.log("uploadContent error feeds/post", error?.response);
      setPostLoading(false);
    }
  };

  const getAllPosts = async () => {
    setLoading(true);

    try {
      const allPostsResponse = await axiosInstance({
        url: "feeds/post",
        method: "GET",
      });

      const allReelsResponse = await axiosInstance({
        url: "feeds/reels",
        method: "GET",
      });

      console.log("allReelsResponse", allReelsResponse?.data);
      console.log("allPostsResponse", allPostsResponse?.data);

      if (allPostsResponse?.data?.data && allReelsResponse?.data?.data) {
        const postResponses = allPostsResponse?.data?.data;
        const reelResponses = allReelsResponse?.data?.data;

        const allPostAndReelsDatax = [...postResponses, ...reelResponses];

        const postResponseWithProfiles = await Promise.all(
          allPostAndReelsDatax?.map(async (match) => {
            const postUserProfile = await getFeedUsersProfile(match?.authorId);
            return { ...match, postUserProfile };
          })
        );

        console.log("postResponseWithProfiles", postResponseWithProfiles);
        setLoading(false);
        const randomizedData = shuffleArray(postResponseWithProfiles);
        setFeedsPosts(randomizedData);
        setDisplayedPosts(randomizedData?.slice(0, PAGE_SIZE));
        // setFeedsPosts(postResponseWithProfiles);
      }
    } catch (error) {
      console.log("getAllPosts error", error?.response);
      setLoading(false);
    }
  };

  const getFeedUsersProfile = async (userId) => {
    try {
      const response = await axiosInstance({
        url: `profile/public/${userId}`,
        method: "GET",
      });
      console.log("getFeedUsersProfile res", response?.data);
      return response?.data?.data?.profile;
    } catch (error) {
      console.error(
        `getFeedUsersProfile error for userId ${userId}:`,
        error?.response
      );

      return null;
    }
  };

  const loadMore = () => {
    if (loadingMore || displayedPosts?.length >= feedsPosts?.length) {
      return;
    }

    setLoadingMore(true);
    setTimeout(() => {
      const nextPage = feedsPosts?.slice(
        displayedPosts?.length,
        displayedPosts?.length + PAGE_SIZE
      );
      setDisplayedPosts((prev) => [...prev, ...nextPage]);
      setLoadingMore(false);
    }, 1000);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const onRefresh = async () => {
    setLoading(true);
    try {
      await getAllPosts();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaViewComponent>
      {/* <HeaderTitle
        headerTitle={'Grids'}
        rightIcon={'add-circle-outline'}
        onRightIconPress={() => bottomSheetRef.current.open()}
      /> */}

      {userProfle && <HomeHeader />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 10 }}
      >
        <Carousels />

        <FlatList
          data={displayedPosts}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <FeedsCard key={index} props={item} play={index === visibleIndex} />
          )}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          showsVerticalScrollIndicator={false}
          refreshing={loading}
          onRefresh={onRefresh}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={
            <Text style={styles.noData}>No post for now</Text>
          }
          ListFooterComponent={
            loadingMore ? <ActivityIndicator size="small" color="#999" /> : null
          }
        />
        <BottomSheet
          bottomSheetRef={bottomSheetRef}
          bottomsheetTitle={"New Feed"}
          height={1.2}
        >
          <View style={{ padding: 10 }}>
            <ScrollView vertical showsVerticalScrollIndicator={false}>
              {/* Social Buttons */}
              <View style={styles.feedsProfile}>
                <Image
                  source={{ uri: userProfle?.profile_pictures[0] }}
                  style={styles.feedsCardImage}
                />
                <View style={{ marginLeft: 10, marginBottom: 10 }}>
                  <Text style={styles.profileHandle}>
                    @{userProfle?.username}
                  </Text>
                  <FeedsInput
                    //   numberOfLines={5}
                    multiLine={true}
                    keyboardType={"default"}
                    height={100}
                    placeholder="Whats new ?"
                    value={feedContent}
                    onChangeText={(txt) => {
                      setFeedContent(txt);
                    }}
                  />
                </View>
              </View>

              <View
                style={{
                  padding: 10,
                  marginLeft: 30,
                }}
              >
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {images?.length &&
                    images?.map((img, i) => (
                      <View key={i} style={styles.imageWrapper}>
                        <Image
                          source={{ uri: img?.uri }}
                          style={styles.mediaPost}
                        />
                        <TouchableOpacity
                          style={styles.removeBtn}
                          onPress={() => removeImage(i)}
                        >
                          <Ionicons name="close" size={20} color="black" />
                        </TouchableOpacity>
                      </View>
                    ))}
                </ScrollView>

                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Ionicons
                    name="images-outline"
                    color={COLORS.appGrey2}
                    size={24}
                    style={{ marginRight: 10 }}
                    onPress={pickImages}
                  />
                  <Ionicons
                    name="camera-outline"
                    color={COLORS.appGrey2}
                    size={24}
                  />
                </View>
              </View>
              <View
                style={{
                  alignItems: "flex-end",
                }}
              >
                <FormButton
                  title={"Post"}
                  width={5}
                  disabled={postLoading || !images?.length || !feedContent}
                  loading={postLoading}
                  onPress={uploadContent}
                />
              </View>
            </ScrollView>
          </View>
        </BottomSheet>
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default FeedsScreen;

const styles = StyleSheet.create({
  feedsProfile: {
    flexDirection: "row",
  },
  feedsCardImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
    // resizeMode: 'contain',
  },
  feedsMedia: {
    width: 200,
    height: 300,
    borderRadius: 8,
  },
  profileHandle: {
    color: "black",
    fontWeight: "600",
  },
  mediaPost: {
    width: 160,
    height: 220,
    resizeMode: "contain",
  },
  imageWrapper: {
    position: "relative",
    width: 160,
    height: 220,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginRight: 10,
    // backgroundColor: 'green',
  },
  removeBtn: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "white",
    borderRadius: 12,
  },
  noData: {
    fontWeight: "700",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
});
