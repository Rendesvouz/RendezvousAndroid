import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { windowHeight, windowWidth } from "../../utils/Dimensions";
import axiosInstance from "../../utils/api-client";
import { RNToast, shuffleArray } from "../../Library/Common";
import GridsCard from "../../components/cards/GridsCard";
import { useTheme } from "../../Context/ThemeContext";
import FeedsHeader from "../../components/common/FeedsHeader";
import { useFocusEffect } from "@react-navigation/native";

const MAX_IMAGES = 4;
const PAGE_SIZE = 10;
const viewabilityConfig = {
  itemVisiblePercentThreshold: 60,
};

const GridsScreen = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const bottomSheetRef = useRef();
  const { theme, isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();
  // console.log('insets.top', insets.top);

  const userProfle = state?.user?.user?.profile;
  console.log("userProfle", userProfle);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChangeIndexValue = ({ index }) => {
    setCurrentIndex(index);
  };

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

  // const getAllPosts = async () => {
  //   setLoading(true);

  //   try {
  //     // Fetch both endpoints individually and safely
  //     const [allPostsResponse, allReelsResponse] = await Promise.allSettled([
  //       axiosInstance.get('feeds/post'),
  //       axiosInstance.get('feeds/reels'),
  //     ]);

  //     const postsData =
  //       allPostsResponse.status === 'fulfilled' &&
  //       allPostsResponse.value?.data?.data
  //         ? allPostsResponse.value.data.data
  //         : [];

  //     const reelsData =
  //       allReelsResponse?.status === 'fulfilled' &&
  //       allReelsResponse.value?.data?.data
  //         ? allReelsResponse.value.data.data
  //         : [];

  //     const combinedFeed = [...postsData, ...reelsData];

  //     if (combinedFeed?.length === 0) {
  //       console.warn('No posts or reels found.');
  //       setLoading(false);
  //       return;
  //     }

  //     // Fetch author profiles for each item
  //     const feedWithProfiles = await Promise.all(
  //       combinedFeed?.map(async item => {
  //         try {
  //           const postUserProfile = await getFeedUsersProfile(item?.authorId);
  //           return {...item, postUserProfile};
  //         } catch (err) {
  //           console.warn('Failed to fetch profile for:', item?.authorId);
  //           return {...item, postUserProfile: null};
  //         }
  //       }),
  //     );

  //     const randomizedData = shuffleArray(feedWithProfiles);
  //     setFeedsPosts(randomizedData);
  //     setDisplayedPosts(randomizedData.slice(0, PAGE_SIZE));
  //   } catch (error) {
  //     console.error('getAllPosts fatal error:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getAllFeeds = async () => {
    setLoading(true);

    try {
      const allFeedsResponse = await axiosInstance({
        url: "feeds/reels",
        method: "GET",
      });

      console.log("allFeedsResponse", allFeedsResponse?.data?.data?.data);
      const feedsData = allFeedsResponse?.data?.data?.data;

      if (feedsData) {
        const postResponseWithProfiles = await Promise.all(
          feedsData?.map(async (match) => {
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
      console.log("getAllFeeds error", error?.response);
      setLoading(false);
    }
  };

  const getFeedUsersProfile = async (userId) => {
    try {
      const response = await axiosInstance({
        url: `profile/${userId}`,
        method: "GET",
      });
      console.log("getFeedUsersProfile res", response?.data);
      return response?.data?.profileData;
    } catch (error) {
      console.log(
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
    // getAllPosts();
    getAllFeeds();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getAllFeeds();
    }, [])
  );

  const onRefresh = async () => {
    setLoading(true);
    try {
      // await getAllPosts();
      await getAllFeeds();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const renderSkeletons = () => {
    return (
      <View
        borderRadius={10}
        backgroundColor={isDarkMode ? "#2a2a2a" : "#e1e9ee"}
        highlightColor={isDarkMode ? "#3a3a3a" : "#f2f8fc"}
      >
        {[...Array(3)].map((_, index) => (
          <View key={index} style={{ marginBottom: 20 }}>
            {/* User info row */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
              }}
            >
              <View style={{ width: 50, height: 50, borderRadius: 25 }} />
              <View style={{ marginLeft: 10 }}>
                <View style={{ width: 120, height: 12, borderRadius: 4 }} />
                <View
                  style={{
                    marginTop: 6,
                    width: 180,
                    height: 12,
                    borderRadius: 4,
                  }}
                />
              </View>
            </View>

            {/* Image Placeholder */}
            <View style={{ width: "100%", height: 300, borderRadius: 10 }} />
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: theme?.background }}>
      <View
        style={{
          position: "absolute",
          top: insets.top,
          left: 0,
          right: 0,
          zIndex: 999,
        }}
      >
        <FeedsHeader />
      </View>
      {/* <Image
        source={require('../../assets/2.jpg')}
        style={styles.imageContainer}
      /> */}

      {/* profile and content section */}
      {/* <View style={styles.profileSection}>
        <Image
          source={require('../../assets/2.jpg')}
          style={styles.feedsCardImage}
        />
        <View
          style={{
            marginLeft: 10,
            marginBottom: 10,
            // backgroundColor: 'red',
            width: windowWidth / 1.2,
          }}>
          <Text style={styles.profileHandle}>@Yewande</Text>
          <Text numberOfLines={2} style={{color: COLORS.appGrey5}}>
            Yakube Gowon Yakube Gowon Yakube Gowon Yakube Gowon Yakube Gowon
            Yakube Gowon Yakube Gowon Yakube Gowon Yakube Gowon
          </Text>
        </View>
      </View> */}

      {loading && <ScrollView>{renderSkeletons()}</ScrollView>}

      <FlatList
        data={displayedPosts}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <GridsCard props={item} isActive={index === currentIndex} />
        )}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={
          useRef(({ viewableItems }) => {
            if (viewableItems?.length > 0) {
              setCurrentIndex(viewableItems[0]?.index);
            }
          }).current
        }
        viewabilityConfig={{
          itemVisiblePercentThreshold: 80,
        }}
        bounces={false}
        decelerationRate="fast"
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      />

      {/* <SwiperFlatList
        vertical={true}
        onChangeIndex={handleChangeIndexValue}
        data={displayedPosts}
        renderItem={({item, index}) => <GridsCard props={item} />}
        keyExtractor={(item, index) => index}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={
          useRef(({viewableItems}) => {
            if (viewableItems?.length > 0) {
              setCurrentIndex(viewableItems[0]?.index);
            }
          }).current
        }
        viewabilityConfig={{itemVisiblePercentThreshold: 80}}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      /> */}
    </View>
  );
};

export default GridsScreen;

const styles = StyleSheet.create({
  container: { position: "relative" },
  imageContainer: {
    width: windowWidth,
    height: windowHeight,
    // resizeMode: 'contain',
    // backgroundColor: 'red',
  },
  profileSection: {
    position: "absolute",
    bottom: 100,
    left: 6,
    // backgroundColor: 'white',
    borderRadius: 12,
    width: windowWidth / 1.05,
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
});
