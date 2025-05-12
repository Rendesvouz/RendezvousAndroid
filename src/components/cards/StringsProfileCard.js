import React, { useState, useRef } from "react";
import {
  View,
  FlatList,
  ImageBackground,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import PreferenceCard from "./PreferenceCard";
import { windowHeight, windowWidth } from "../../utils/Dimensions";
import { getAge } from "../../Library/Common";
import { COLORS } from "../../themes/themes";

const { width } = Dimensions.get("window");

const StringsProfileCard = ({ item, onPress, onLeftIconPress }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();

  const images = item?.matchedUserProfile?.profile_pictures || [];

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* FlatList with Swipeable Images */}
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        keyExtractor={(uri, index) => index.toString()}
        renderItem={({ item: imageUri }) => (
          <ImageBackground
            source={{ uri: imageUri }}
            imageStyle={styles.imageBackground}
            style={styles.imageWrapper}
          >
            {/* Overlay Info */}
            {/* <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {item?.matchedUserProfile?.username},{' '}
                {getAge(item?.matchedUserProfile?.dob)}
              </Text>

              <View style={styles.displaySection}>
                <PreferenceCard
                  iconName={'location-outline'}
                  title={item?.matchedUserProfile?.country}
                />
                {item?.action !== 'request' && (
                  <PreferenceCard
                    iconName={'flash-outline'}
                    title={`Match Accuracy: ${item?.accuracy?.toFixed(2)}%`}
                  />
                )}
              </View>
            </View> */}

            <View style={styles.backBtnWrapper}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={onLeftIconPress}
                style={{
                  borderRadius: 40,
                  width: 50,
                  height: 50,
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="arrow-back-outline" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        )}
      />

      {/* Top Swipe Indicator */}
      <View style={styles.indicatorWrapper}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentIndex === index && styles.activeIndicator,
            ]}
          />
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: windowWidth,
    height: windowHeight / 1.8,
    // borderRadius: 20,
    overflow: "hidden",
    // marginBottom: 20,
  },
  imageWrapper: {
    width: width,
    height: windowHeight / 1.8,
    justifyContent: "flex-end",
  },
  imageBackground: {
    resizeMode: "cover",
  },
  profileInfo: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 16,
  },
  profileName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  displaySection: {
    flexDirection: "row",
    marginTop: 8,
    gap: 8,
    flexWrap: "wrap",
  },
  indicatorWrapper: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  indicator: {
    height: 3,
    width: 30,
    backgroundColor: "#ccc",
    marginHorizontal: 2,
    borderRadius: 5,
  },
  activeIndicator: {
    backgroundColor: "#fff",
  },
  backBtnWrapper: {
    position: "absolute",
    top: 50,
    width: "100%",
    flexDirection: "row",
    // justifyContent: 'center',
    paddingHorizontal: 16,
    padding: 20,
  },
});

export default StringsProfileCard;
