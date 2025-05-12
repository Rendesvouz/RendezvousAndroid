import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
  interpolate,
} from "react-native-reanimated";

import { windowWidth } from "../../utils/Dimensions";
import { convertCmToFeetInches, getAge } from "../../Library/Common";
import { COLORS } from "../../themes/themes";

const StringsCard = ({
  onLike,
  onCloseIconPress,
  props,
  onPress,
  onStringCloseBtnPress,
  onStringAcceptBtnPress,
  onStringMessageBtnPress,
  onStringBtnDisabled,
  matchedUserProfile,
}) => {
  console.log("propssss", props, matchedUserProfile);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    },
    onEnd: () => {
      if (translateY.value < -100 && onLike) {
        runOnJS(onLike)();
      }
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [-150, 0],
      [0, 1],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${translateX.value / 40}deg` },
      ],
      opacity,
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.cardContainer]}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onPress}
          style={styles.imageBackground}
        >
          <ImageBackground
            imageStyle={styles.imageBackground}
            source={{ uri: props?.matchedUserProfile?.profile_pictures[0] }}
            style={styles.imageWrapper}
          >
            {/* <TouchableOpacity
              style={styles.heartIcon}
              onPress={onCloseIconPress}>
              <Ionicons name="close-outline" size={20} color="#fff" />
            </TouchableOpacity> */}

            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {matchedUserProfile?.username},{" "}
                {getAge(matchedUserProfile?.dob)} |{" "}
                {convertCmToFeetInches(matchedUserProfile?.height)}
              </Text>
              {/* <View style={styles.infoCard}>
                <Ionicons name="briefcase-outline" size={10} color="#fff" />
                <Text style={[styles.profileDetails, {marginLeft: 4}]}>
                  {matchedUserProfile?.occupation}
                </Text>
              </View> */}

              <View style={styles.infoCard}>
                <Ionicons name="location" size={10} color="#fff" />
                <Text
                  numberOfLines={1}
                  style={[styles.profileDetails, { marginLeft: 4 }]}
                >
                  {matchedUserProfile?.city}, {matchedUserProfile?.country}
                </Text>
              </View>
            </View>
          </ImageBackground>

          {/* {props?.action == 'request' ? (
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.actionBtn,
                {opacity: onStringBtnDisabled ? 0.25 : null},
              ]}
              onPress={onStringBtnPress}
              disabled={onStringBtnDisabled}>
              <Text style={styles.stringText}>
                {onStringBtnDisabled ? 'Loading...' : 'Accept'}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.actionBtn,
                {opacity: onStringBtnDisabled ? 0.25 : null},
              ]}
              onPress={onStringBtnPress}
              disabled={onStringBtnDisabled}>
              <Text style={styles.stringText}>
                {onStringBtnDisabled
                  ? 'Loading...'
                  : props?.action == 'accept'
                  ? 'Message'
                  : 'String'}
              </Text>
            </TouchableOpacity>
          )} */}

          {props?.action == "request" ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={onStringCloseBtnPress}
                disabled={onStringBtnDisabled}
                style={styles.hertless}
              >
                <Text style={styles.stringText}>
                  {onStringBtnDisabled ? "Loading..." : "Reject"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={onStringAcceptBtnPress}
                disabled={onStringBtnDisabled}
                style={styles.hertless}
              >
                <Text style={styles.stringText}>
                  {onStringBtnDisabled ? "Loading..." : "Accept"}
                </Text>
              </TouchableOpacity>
            </View>
          ) : props?.action == "accept" ? (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={onStringMessageBtnPress}
              disabled={onStringBtnDisabled}
              style={styles.acceptBtn}
            >
              <Ionicons name="chatbox-outline" size={20} color={COLORS.white} />
              <Text style={styles.stringText}>
                {onStringBtnDisabled ? "Loading..." : "Message"}
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={onStringCloseBtnPress}
                disabled={onStringBtnDisabled}
                style={styles.hertless}
              >
                <Ionicons name="close" size={28} color={COLORS.rendezvousRed} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={onStringAcceptBtnPress}
                disabled={onStringBtnDisabled}
                style={styles.hertless}
              >
                <Ionicons
                  name="heart"
                  size={28}
                  color={COLORS.rendezvousBlue}
                />
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default StringsCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: windowWidth / 2.33,
    height: 250,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "white",
    // padding: 7,
    // backgroundColor: "red",
    marginBottom: 6,
    marginRight: 6,
  },
  imageWrapper: {
    flex: 1,
    justifyContent: "space-between",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  heartIcon: {
    backgroundColor: "#3D3D3D99",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 15,
    position: "absolute",
    top: 6,
    right: 6,
  },
  profileInfo: {
    position: "absolute",
    bottom: 3,
    left: 10,
    right: 10,
    backgroundColor: "#00000088",
    padding: 8,
    borderRadius: 6,
  },
  profileName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 5,
  },
  profileDetails: {
    color: "#fff",
    fontSize: 12,
  },
  infoCard: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  actionBtn: {
    padding: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.rendezvousRed,
  },
  stringText: {
    alignSelf: "center",
    color: "white",
    fontSize: 14,
    fontWeight: "700",
    alignContent: "center",
    marginLeft: 6,
  },
  hertless: {
    backgroundColor: "black",
    width: windowWidth / 4.68,
    padding: 10,
    alignContent: "center",
    alignItems: "center",
  },
  acceptBtn: {
    padding: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.rendezvousRed,
    flexDirection: "row",
  },
});
