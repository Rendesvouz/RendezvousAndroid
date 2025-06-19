import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ImageView from "react-native-image-viewing";
import { Video } from "expo-av";
import Ionicons from "react-native-vector-icons/Ionicons";

import {
  useFeedItemHeight,
  windowHeight,
  windowWidth,
} from "../../utils/Dimensions";
import { COLORS } from "../../themes/themes";
import { useTheme } from "../../Context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../utils/api-client";
import { useNavigation } from "@react-navigation/native";

const GridsCard = ({ props, onPress, play, isActive }) => {
  console.log("popopo", props);

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const videoRef = useRef();
  const navigation = useNavigation();

  const { theme } = useTheme();

  const feedItemHeight = useFeedItemHeight();

  const userProfle = state?.user?.user?.profile;
  console.log("userProfle", userProfle?.user_id);

  const transformedData = props?.feed_pictures?.map((item) => ({
    uri: item,
  }));

  const [visible, setIsVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const likePost = async () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    console.log("likeddd", isLiked);

    if (props?.reel_url) {
      try {
        const res = await axiosInstance({
          url: `feeds/reel-likes/${props?.id}`,
          method: "PUT",
        });

        console.log("likereel res", res?.data);
      } catch (error) {
        console.log("likereel error:", error?.response);
        setIsLiked(!isLiked);
      } finally {
        // setLoading(false);
        console.log("likereel worked");
      }
    } else {
      try {
        const res = await axiosInstance({
          url: `feeds/like/${props?.id}`,
          method: "PUT",
        });

        console.log("likePost res", res?.data);
      } catch (error) {
        console.log("likePost error:", error?.response);
        setIsLiked(!isLiked);
      } finally {
        // setLoading(false);
        console.log("likepost worked");
      }
    }
  };

  const stringUsers = async () => {
    if (userProfle) {
      navigation.navigate("Strings");
    } else {
      navigation.navigate("Auth", {
        screen: "Login",
        params: { destination: "GridsScreen" },
      });
    }
  };

  const wellnessUsers = async () => {
    if (userProfle) {
      navigation.navigate("Therapy");
    } else {
      navigation.navigate("Auth", {
        screen: "Login",
        params: { destination: "GridsScreen" },
      });
    }
  };

  const isUser = props?.postUserProfile?.User?.role === "User";
  const isDifferentUser =
    props?.postUserProfile?.user_id !== userProfle?.user_id;

  const renderUserCTA = () => (
    <View style={styles.userCtaBtnsSections}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity activeOpacity={0.9} style={styles.ctaCancelBtns}>
          <Text style={[styles.ctaCancelBtnsText, { color: theme?.text }]}>
            Not Interested
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={stringUsers}
          style={styles.ctaBtns}
        >
          <Text style={styles.ctaBtnsText}>String</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          backgroundColor: COLORS.appGrey,
          alignItems: "center",
          padding: 5,
          borderRadius: 4,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: 500, color: "black", marginRight: 5 }}>
            {likeCount}
          </Text>
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={20}
            color={isLiked ? COLORS.rendezvousRed : ""}
            style={{ marginRight: 10 }}
            onPress={() => {
              likePost();
            }}
          />
        </View>
        <Ionicons name="paper-plane-outline" size={20} />
      </View>
    </View>
  );

  const renderProviderCTA = () => (
    <View style={styles.providerCtaBtnsSections}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={wellnessUsers}
        style={styles.ctaBtns}
      >
        <Text style={styles.ctaBtnsText}>Book Now</Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          backgroundColor: COLORS.appGrey,
          alignItems: "center",
          padding: 5,
          borderRadius: 4,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: 500, color: "black", marginRight: 5 }}>
            {likeCount}
          </Text>
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={20}
            color={isLiked ? COLORS.rendezvousRed : ""}
            style={{ marginRight: 10 }}
            onPress={() => {
              likePost();
            }}
          />
        </View>
        <Ionicons name="paper-plane-outline" size={20} />
      </View>
    </View>
  );

  const renderEmptyCTA = () => null;

  useEffect(() => {
    if (videoRef.current && props?.reel_url?.length) {
      if (play) {
        videoRef.current.playAsync?.();
      } else {
        videoRef.current.pauseAsync?.();
      }
    }
  }, [play]);

  return (
    <View style={[styles.gridContainer, { backgroundColor: theme.background }]}>
      {props?.feed_pictures?.length
        ? props?.feed_pictures?.map((cur, i) => (
            <TouchableOpacity
              key={i}
              activeOpacity={0.9}
              onPress={() => {
                setIsVisible(true);
              }}
            >
              <Image
                source={{ uri: cur }}
                style={[styles.fullFeedsMedia, { height: feedItemHeight }]}
              />
              {/* profile and content section */}
              <View style={styles.profileSection}>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                  }}
                >
                  <Image
                    source={{
                      uri: props?.postUserProfile?.profile_pictures[0],
                    }}
                    style={styles.feedsCardImage}
                  />
                  <View
                    style={{
                      marginLeft: 10,
                      marginBottom: 10,
                      width: windowWidth / 1.2,
                    }}
                  >
                    <Text style={[styles.profileHandle, { color: "#ccc" }]}>
                      {props?.postUserProfile?.username
                        ? `${"@" + props?.postUserProfile?.username}`
                        : props?.postUserProfile?.fullname}
                    </Text>
                    <Text numberOfLines={2} style={{ color: COLORS.appGrey2 }}>
                      {props?.content ? props?.content : props?.caption}
                    </Text>
                  </View>
                </View>

                {!props?.postUserProfile
                  ? renderEmptyCTA()
                  : isUser && isDifferentUser
                  ? renderUserCTA()
                  : isUser && !isDifferentUser
                  ? renderEmptyCTA()
                  : renderProviderCTA()}
              </View>
            </TouchableOpacity>
          ))
        : props?.reel_url?.length
        ? props?.reel_url?.map((cur, i) => (
            <View>
              <Video
                key={i}
                ref={videoRef}
                source={{ uri: cur }}
                useNativeControls
                resizeMode="contain"
                isLooping
                style={{ height: feedItemHeight }}
                onPlaybackStatusUpdate={(status) =>
                  console.log(status.isPlaying)
                }
              />

              {/* profile and content section */}
              <View style={styles.profileSection}>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                  }}
                >
                  <Image
                    source={{
                      uri: props?.postUserProfile?.profile_pictures[0],
                    }}
                    style={styles.feedsCardImage}
                  />
                  <View
                    style={{
                      marginLeft: 10,
                      marginBottom: 10,
                      // backgroundColor: 'red',
                      width: windowWidth / 1.2,
                    }}
                  >
                    <Text style={[styles.profileHandle, { color: "#ccc" }]}>
                      {props?.postUserProfile?.username
                        ? `${"@" + props?.postUserProfile?.username}`
                        : props?.postUserProfile?.fullname}
                    </Text>
                    <Text numberOfLines={2} style={{ color: COLORS.appGrey2 }}>
                      {props?.content ? props?.content : props?.caption}
                    </Text>
                  </View>
                </View>

                {!props?.postUserProfile
                  ? renderEmptyCTA()
                  : isUser && isDifferentUser
                  ? renderUserCTA()
                  : isUser && !isDifferentUser
                  ? renderEmptyCTA()
                  : renderProviderCTA()}
              </View>
            </View>
          ))
        : null}
    </View>
  );
};

export default GridsCard;

const styles = StyleSheet.create({
  gridContainer: {
    // height: windowHeight,
    backgroundColor: "black",
    // borderBottomColor: 'red',
    // borderBottomWidth: 1,
  },
  feedsCard: {
    padding: 10,
    borderBottomColor: COLORS.appGrey,
    borderBottomWidth: 1,
  },
  feedsProfile: {
    flexDirection: "row",
  },
  feedsCardImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
    resizeMode: "contain",
  },
  feedsMedia: {
    width: windowWidth,
    // height: windowHeight,
    borderRadius: 8,
    marginRight: 10,
  },
  profileHandle: {
    color: "white",
    fontWeight: "600",
  },
  fullFeedsMedia: {
    width: windowWidth,
    // height: windowHeight,
    borderRadius: 8,
    resizeMode: "contain",
  },
  imageContainer: {
    width: windowWidth,
    height: windowHeight,
    // resizeMode: 'contain',
    // backgroundColor: 'red',
  },
  profileSection: {
    position: "absolute",
    bottom: 40,
    // left: 6,
    // backgroundColor: 'white',
    // borderRadius: 12,
    width: windowWidth / 1.05,
    // flexDirection: 'row',
    padding: 10,
  },
  userCtaBtnsSections: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: 'blue',
  },
  providerCtaBtnsSections: {
    // backgroundColor: 'pink',
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ctaBtns: {
    backgroundColor: COLORS.rendezvousRed,
    padding: 10,
    borderRadius: 8,
    marginRight: 6,
    width: windowWidth / 3.5,
  },
  ctaBtnsText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
  ctaCancelBtns: {
    // backgroundColor: COLORS.rendezvousRed,
    padding: 10,
    borderRadius: 8,
    marginRight: 6,
    borderWidth: 1,
    borderColor: COLORS.rendezvousRed,
  },
  ctaCancelBtnsText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
});
