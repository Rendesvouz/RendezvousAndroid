import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../components/common/HeaderTitle";
import { windowHeight, windowWidth } from "../../utils/Dimensions";
import { COLORS } from "../../themes/themes";
import axiosInstance from "../../utils/api-client";
import { RNToast, shuffleArray } from "../../Library/Common";
import GridsCard from "../../components/cards/GridsCard";
import { useTheme } from "../../Context/ThemeContext";
import HomeHeader2 from "../../components/common/HomeHeader2";

const MAX_IMAGES = 4;
const PAGE_SIZE = 10;
const viewabilityConfig = {
  itemVisiblePercentThreshold: 60,
};

const GridsScreen = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const bottomSheetRef = useRef();
  const { theme } = useTheme();
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
        url: `profile/${userId}`,
        method: "GET",
      });
      console.log("getFeedUsersProfile res", response?.data);
      return response?.data?.profileData;
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
    <View style={{ backgroundColor: theme?.background }}>
      {/* {userProfle && (
        <View
          style={{
            position: 'absolute',
            top: insets.top,
            left: 0,
            right: 0,
            zIndex: 999,
          }}>
          <HomeHeader2 />
        </View>
      )} */}

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

      {/* <FlatList
        data={displayedPosts}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({item, index}) => (
          <GridsCard props={item} isActive={index === currentIndex} />
        )}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={
          useRef(({viewableItems}) => {
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
      /> */}

      <SwiperFlatList
        vertical={true}
        onChangeIndex={handleChangeIndexValue}
        data={displayedPosts}
        renderItem={({ item, index }) => <GridsCard key={index} props={item} />}
        keyExtractor={(item, index) => index}
      />
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
