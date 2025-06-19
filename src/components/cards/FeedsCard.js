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

import { COLORS } from "../../themes/themes";
import { windowWidth } from "../../utils/Dimensions";
import { useTheme } from "../../Context/ThemeContext";
import { useEvent } from "expo";

const FeedsCard = ({ onPress, props, play }) => {
  console.log("popopo", props);
  const videoRef = useRef();
  const { theme, isDarkMode } = useTheme();

  const transformedData = props?.feed_pictures?.map((item) => ({
    uri: item,
  }));

  const [visible, setIsVisible] = useState(false);

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
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.feedsCard, { borderBottomColor: theme?.borderColor }]}
    >
      <View style={styles.feedsProfile}>
        <Image
          source={{ uri: props?.postUserProfile?.profile_pictures[0] }}
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
          <Text style={[styles.profileHandle, { color: theme?.text }]}>
            @{props?.postUserProfile?.username}
          </Text>
          <Text style={{ color: COLORS.appGrey5 }}>
            {props?.content ? props?.content : props?.caption}
          </Text>
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{}}>
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
                  style={[
                    props?.feed_pictures?.length > 1
                      ? styles.feedsMedia
                      : styles.fullFeedsMedia,
                  ]}
                />
              </TouchableOpacity>
            ))
          : props?.reel_url?.length
          ? props?.reel_url?.map((cur, i) => (
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
            ))
          : null}
      </ScrollView>

      {/* CTA Buttons */}
      {/* <View style={{flexDirection: 'row', marginTop: 10, padding: 10}}>
        <Ionicons name="heart-outline" size={20} style={{marginRight: 20}}/>
        <Ionicons name="paper-plane-outline" size={20} />
      </View> */}

      <ImageView
        images={transformedData}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </TouchableOpacity>
  );
};

export default FeedsCard;

const styles = StyleSheet.create({
  feedsCard: {
    padding: 10,
    borderBottomColor: COLORS.appGrey5,
    borderBottomWidth: 1,
  },
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
    marginRight: 10,
  },
  profileHandle: {
    color: "black",
    fontWeight: "600",
  },
  fullFeedsMedia: {
    width: windowWidth / 1.05,
    height: 300,
    borderRadius: 8,
    // resizeMode: 'contain',
  },
});
