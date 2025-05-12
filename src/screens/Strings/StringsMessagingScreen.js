import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

import HeaderTitle from "../../components/common/HeaderTitle";
import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import axiosInstance from "../../utils/api-client";
import ScrollViewSpace from "../../components/common/ScrollViewSpace";
import MessagesListCard from "../../components/cards/MessagesListCard";
import { COLORS } from "../../themes/themes";

const StringsMessagingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const userProfle = state?.user?.user?.profile;
  // console.log('ddd', userProfle);

  const [loading, setLoading] = useState(false);

  const [matchesWithProfiles, setMatchesWithProfiles] = useState([]);

  const getAllChatRooms = async (userId) => {
    setLoading(true);
    try {
      const chatRoomResponse = await axiosInstance({
        url: `chat/rooms/${userProfle?.user_id}`,
        method: "GET",
      });

      console.log("chatRoomResponse", chatRoomResponse?.data);

      if (chatRoomResponse?.data?.data?.rooms) {
        const chatRoomResponses = chatRoomResponse?.data?.data?.rooms;

        const chatRoomsResponseWithProfiles = await Promise.all(
          chatRoomResponses?.map(async (matchh) => {
            const [matchedUserProfile, match] = await Promise.all([
              getMatchedUsersProfile(matchh),
              getMatchedPreferences(matchh),
            ]);
            return { ...matchh, matchedUserProfile, match };
          })
        );

        console.log(
          "chatRoomsResponseWithProfiles",
          chatRoomsResponseWithProfiles
        );
        setMatchesWithProfiles(chatRoomsResponseWithProfiles);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.log("getAllChatRooms error", error?.response);
      setLoading(false);
    }
  };

  const getMatchedUsersProfile = async (matchh) => {
    const matchedUser = matchh;
    // console.log('matchedUserrrr', matchedUser);

    const matchedUserId =
      matchedUser?.user1Id == userProfle?.user_id
        ? matchedUser?.user2Id
        : matchedUser?.user1Id;

    try {
      const response = await axiosInstance({
        url: `profile/public/${matchedUserId}`,
        method: "GET",
      });
      console.log("getMatchedUsersProfile res", response?.data);
      return response?.data?.data?.profile;
    } catch (error) {
      console.log(
        `getMatchedUsersProfile error for userId ${matchedUserId}:`,
        error?.response
      );

      return null;
    }
  };

  const getMatchedPreferences = async (matchh) => {
    const matchedUser = matchh;
    // console.log('matchedUserrrr', matchedUser);

    const matchedUserId =
      matchedUser?.user1Id == userProfle?.user_id
        ? matchedUser?.user2Id
        : matchedUser?.user1Id;

    try {
      const response = await axiosInstance({
        url: `matchmaking/preference/${matchedUserId}`,
        method: "GET",
      });
      console.log("getMatchedPreferences res", response?.data);
      return response?.data;
    } catch (error) {
      console.log(
        `getMatchedPreferences error for matchId ${matchedUserId}:`,
        error?.response
      );

      return null;
    }
  };

  useEffect(() => {
    getAllChatRooms();
  }, []);

  const onRefresh = useCallback(() => {
    setLoading(true);
    getAllChatRooms();
  }, []);

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={"arrow-back-outline"}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        headerTitle={"Chats"}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 10 }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            tintColor={COLORS.rendezvousRed}
            style={{ zIndex: 999 }}
          />
        }
      >
        {matchesWithProfiles?.length ? (
          matchesWithProfiles?.map((cur, i) => (
            <MessagesListCard
              key={i}
              props={cur}
              onPress={() => {
                navigation.navigate("StringsChattingScreen", cur);
              }}
            />
          ))
        ) : (
          <Text style={styles.noData}>
            You have no chats with anybody at the moment, request a string and
            begin your connections
          </Text>
        )}
        <ScrollViewSpace />
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default StringsMessagingScreen;

const styles = StyleSheet.create({
  noData: {
    fontWeight: "700",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    textAlign: "center",
  },
});
