import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

import axiosInstance from "../../utils/api-client";
import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../components/common/HeaderTitle";
import { COLORS } from "../../themes/themes";
import ScrollViewSpace from "../../components/common/ScrollViewSpace";
import StringsCard from "../../components/cards/StringsCard";
import { RNToast } from "../../Library/Common";

const StringsFriendRequest = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const userProfle = state?.user?.user?.profile;

  const [loading, setLoading] = useState(false);
  const [stringLoading, setStringLoading] = useState(null);

  const [matchesWithProfiles, setMatchesWithProfiles] = useState([]);

  const getAllStringMatches = async () => {
    setLoading(true);
    try {
      const matchesResponse = await axiosInstance({
        url: "matchmaking/actions",
        method: "GET",
      });

      console.log("matchesResponse", matchesResponse?.data);
      if (matchesResponse?.data?.data?.actions) {
        const matchedResponses = matchesResponse?.data?.data?.actions;

        const matchedResponseWithProfiles = await Promise.all(
          matchedResponses?.map(async (matchh) => {
            const [matchedUserProfile, match] = await Promise.all([
              getMatchedUsersProfile(matchh),
              getMatchedPreferences(matchh),
            ]);
            return { ...matchh, matchedUserProfile, match };
          })
        );

        console.log("matchedResponseWithProfiles", matchedResponseWithProfiles);
        setMatchesWithProfiles(matchedResponseWithProfiles);
        setLoading(false);
      }
    } catch (error) {
      console.log("getAllStringMatches error", error?.response);
      setLoading(false);
    }
  };

  const getMatchedUsersProfile = async (matchh) => {
    const matchedUser = matchh;
    console.log("getMatchedUsersProfilematchedUserrrr", matchedUser);

    const matchedUserId =
      matchedUser?.receiverId == userProfle?.user_id
        ? matchedUser?.senderId
        : matchedUser?.receiverId;

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
    console.log("matchedUserrrr", matchedUser);

    const matchedUserId =
      matchedUser?.receiverId == userProfle?.user_id
        ? matchedUser?.senderId
        : matchedUser?.receiverId;

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

  const getAllRooms = async (item) => {
    // console.log('fff', item);
    // setLoading(true);
    try {
      const getAllChatRooms = await axiosInstance({
        url: `/chat/rooms/${userProfle?.user_id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("getAllChatRooms", getAllChatRooms?.data);

      const existingRoom = getAllChatRooms?.data?.data?.rooms?.find(
        (room) =>
          room?.user1Id === userProfle?.user_id ||
          room?.user2Id === userProfle?.user_id
      );

      console.log("existingRoom", existingRoom);
      setLoading(false);

      if (existingRoom) {
        const updatedItem = {
          ...item,
          chatRoom: existingRoom,
        };
        navigation.navigate("StringsChattingScreen", updatedItem);
      } else {
        startChat(item);
      }

      // if (startChatResponse?.data?.data?.chatRoom) {
      //   const updatedItem = {
      //     ...item,
      //     chatRoom: startChatResponse?.data?.data?.chatRoom,
      //   };
      //   navigation.navigate('StringsChattingScreen', updatedItem);
      // }
    } catch (error) {
      console.log("startChat error", error?.response);
      setLoading(false);
    }
  };

  const startChat = async (item) => {
    // create new room first, if it exist just navigate
    // if it doesnt and it works regardless, still navigate with the proper data

    console.log("check", item);
    // setLoading(true);

    const matchedUserId =
      item?.receiverId == userProfle?.user_id
        ? item?.senderId
        : item?.receiverId;

    try {
      const startChatResponse = await axiosInstance({
        url: "chat/create-or-get-room",
        method: "POST",
        data: {
          user2Id: matchedUserId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("startChatResponse", startChatResponse?.data);
      setLoading(false);
      if (startChatResponse?.data?.data?.chatRoom) {
        const updatedItem = {
          ...item,
          chatRoom: startChatResponse?.data?.data?.chatRoom,
        };
        navigation.navigate("StringsChattingScreen", updatedItem);
      }
    } catch (error) {
      console.log("startChat error", error?.response);
      setLoading(false);
    }
  };

  const updateMatchAction = async (item, action) => {
    const matchedUserId =
      item?.receiverId == userProfle?.user_id
        ? item?.senderId
        : item?.receiverId;

    setStringLoading(item?.matchId);

    try {
      const updateMatchActionResponse = await axiosInstance({
        url: "matchmaking/match/action/",
        method: "PUT",
        data: {
          matchId: item?.matchId,
          receiverId: matchedUserId,
          action: action,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("updateMatchActionResponse", updateMatchActionResponse?.data);
      setStringLoading(null);
      RNToast(
        Toast,
        `You have been stringed with ${item?.matchedUserProfile?.username}`
      );

      const updatedActionData =
        updateMatchActionResponse?.data?.data?.actionLog;
      console.log(
        "updatedActionData before",
        updatedActionData,
        matchesWithProfiles
      );

      // ✅ Update the specific item in the matchesWithProfiles list
      setMatchesWithProfiles((prev) =>
        prev?.map((match) =>
          match?.matchId === updatedActionData?.matchId
            ? {
                ...match,
                action: updatedActionData?.action,
                updatedAt: updatedActionData?.updatedAt,
              }
            : match
        )
      );

      console.log("matchesWithProfiles after", matchesWithProfiles);
    } catch (error) {
      console.log("startChat error", error?.response);
      setStringLoading(null);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getAllStringMatches();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const onRefresh = useCallback(() => {
    setLoading(true);
    getAllStringMatches();
  }, []);

  const renderItem = ({ item }) => {
    const isLoggedInUserReceiver = item?.receiverId === userProfle?.user_id;
    const isRequest = item?.action === "request";
    const isAccept = item?.action === "accept";

    if (isRequest && isLoggedInUserReceiver) {
      return (
        <StringsCard
          props={item}
          matchedUserProfile={item?.matchedUserProfile}
          matchAccuracy={item?.accuracy}
          matchesInfo={item?.match}
          onPress={() => {
            navigation.navigate("StringsProfile", item);
          }}
          onStringBtnDisabled={stringLoading === item?.match?.id}
          onStringCloseBtnPress={() => {
            console.log("cloooseee");
            updateMatchAction(item, "decline");
          }}
          onStringAcceptBtnPress={() => {
            console.log("acceptttt");
            updateMatchAction(item, "accept");
          }}
        />
      );
    } else if (isAccept) {
      return (
        <StringsCard
          props={item}
          matchedUserProfile={item?.matchedUserProfile}
          matchAccuracy={item?.accuracy}
          matchesInfo={item?.match}
          onPress={() => {
            navigation.navigate("StringsProfile", item);
          }}
          onStringBtnDisabled={stringLoading === item?.match?.id}
          onStringMessageBtnPress={() => {
            console.log("ppp");
            getAllRooms(item);
          }}
        />
      );
    }
    return null;
  };

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        headerTitle={"Strings Requests"}
        leftIcon={"arrow-back-outline"}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 10,
          padding: 10,
          backgroundColor: "white",
        }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            tintColor={COLORS.rendezvousRed}
            style={{ zIndex: 999 }}
          />
        }
      >
        {loading ? (
          <Text style={styles.noData}>
            Please wait while we aggregate your data
          </Text>
        ) : matchesWithProfiles?.length ? (
          <FlatList
            data={matchesWithProfiles}
            renderItem={renderItem}
            keyExtractor={(item) => item?.match?.id}
            contentContainerStyle={styles.products}
          />
        ) : (
          <Text style={styles.noData}>
            You do not have any strings requests at the moment, please check
            back some other time
          </Text>
        )}
        <ScrollViewSpace />
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default StringsFriendRequest;

const styles = StyleSheet.create({
  products: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 10,
    // backgroundColor: 'green',
  },
  noData: {
    fontWeight: "700",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    textAlign: "center",
  },
});
