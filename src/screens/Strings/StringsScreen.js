import {
  Alert,
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

import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import StringsHeaderTitle from "../../components/common/StringsHeaderTitle";
import axiosInstance from "../../utils/api-client";
import { COLORS } from "../../themes/themes";
import ScrollViewSpace from "../../components/common/ScrollViewSpace";
import StringsCard from "../../components/cards/StringsCard";
import { RNToast } from "../../Library/Common";
import verifyTokenWithoutApi from "../../components/hoc/verifyToken";
import FormButton from "../../components/form/FormButton";
import { windowWidth } from "../../utils/Dimensions";

const StringsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const userProfle = state?.user?.user?.profile;
  const userId = userProfle?.user_id;
  const reduxUserPreferences = state?.user?.userPreferences;

  console.log("userProfle", userProfle);

  const [loading, setLoading] = useState(false);
  const [stringLoading, setStringLoading] = useState(null);

  const [matchesWithProfiles, setMatchesWithProfiles] = useState([]);

  const [isOnboarded, setIsOnboarded] = useState(
    reduxUserPreferences ? true : false
  );

  const getStarted = () => {
    navigation.navigate("PreferenceFlow1");
  };

  const getUserPreferences = async () => {
    try {
      await axiosInstance({
        url: `matchmaking/preference/${userId}`,
        method: "GET",
      })
        .then((res) => {
          console.log("getUserPreference res", res?.data);

          // if theres a data in the response, it means the user has onboarded his therapy preferences
          if (res?.data) {
            setIsOnboarded(true);
            dispatch(saveUserPreferences(res?.data));
          }
        })
        .catch((err) => {
          console.log("getUserPreferences err", err);
        });
    } catch (error) {
      console.log("getUserPreferences error", error);
    }
  };

  const getAllStringMatches = async () => {
    setLoading(true);
    try {
      const matchesResponse = await axiosInstance({
        url: "matchmaking/matches",
        method: "GET",
      });

      console.log("matchesResponse", matchesResponse?.data);

      if (matchesResponse?.data?.data?.matches) {
        const matchedResponses = matchesResponse?.data?.data?.matches;

        const matchedResponseWithProfiles = await Promise.all(
          matchedResponses?.map(async (match) => {
            const matchedUserProfile = await getMatchedUsersProfile(
              match?.match?.userId
            );
            return { ...match, matchedUserProfile };
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

  const getMatchedUsersProfile = async (userId) => {
    try {
      const response = await axiosInstance({
        url: `profile/public/${userId}`,
        method: "GET",
      });
      console.log("getMatchedUsersProfile res", response?.data);
      return response?.data?.data?.profile;
    } catch (error) {
      console.log(
        `getMatchedUsersProfile error for userId ${userId}:`,
        error?.response
      );

      return null;
    }
  };

  // Function to handle match actions (like, favorite, etc.)
  const matchAction = async (matchId, receiverId, action) => {
    console.log("action matched", matchId, receiverId, action);
    if (!matchId) {
      return;
    }

    const matchActionData = {
      matchId: matchId,
      action: action,
      receiverId: receiverId,
    };

    setStringLoading(matchId);

    try {
      const response = await axiosInstance({
        url: "matchmaking/match/action",
        method: "POST",
        data: matchActionData,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("matchAction response", response?.data);

      setMatchesWithProfiles((prevMatches) =>
        prevMatches?.filter((match) => match?.match?.id !== matchId)
      );

      action == "request" && RNToast(Toast, "String request sent");
      setStringLoading(null);
    } catch (error) {
      console.log("Error matching user:", error?.response);
    } finally {
      setStringLoading(null);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (!reduxUserPreferences) {
        getUserPreferences();
      }

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

  const renderItem = ({ item }) => (
    <StringsCard
      props={item}
      matchedUserProfile={item?.matchedUserProfile}
      matchAccuracy={item?.accuracy}
      matchesInfo={item?.match}
      onPress={() => navigation.navigate("StringsProfile", item)}
      onStringBtnPress={() => {
        matchAction(item?.match?.id, item?.match?.userId, "request");
      }}
      onStringBtnDisabled={stringLoading === item?.match?.id}
      onStringCloseBtnPress={() => {
        matchAction(item?.match?.id, item?.match?.userId, "decline");
      }}
      onStringAcceptBtnPress={() => {
        matchAction(item?.match?.id, item?.match?.userId, "request");
      }}
    />
  );

  return (
    <SafeAreaViewComponent>
      {isOnboarded ? (
        <>
          <StringsHeaderTitle
            headerTitle={"Strings of Connections"}
            onRightIconPress2={() => {
              navigation.navigate("StringsFriendRequest");
            }}
            onRightIconPress3={() => {
              navigation.navigate("StringsMessagingScreen");
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
                You do not have any strings of connection at the moment, please
                check back some other time
              </Text>
            )}
            <ScrollViewSpace />
          </ScrollView>
        </>
      ) : (
        <View style={{ padding: 20, marginTop: 20 }}>
          <Text style={styles.onboardingText}>
            Hey {userProfle?.username}, Ready to find the best connections for
            you?
          </Text>

          <Image
            source={require("../../assets/onboard.gif")}
            style={styles.onboardingImage}
          />

          <FormButton title={"Get Started"} onPress={getStarted} />
        </View>
      )}
    </SafeAreaViewComponent>
  );
};

export default verifyTokenWithoutApi(StringsScreen);

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
  onboardingText: {
    color: "black",
    fontSize: 22,
    fontWeight: "700",
    alignSelf: "center",
  },
  onboardingImage: {
    width: windowWidth / 1.1,
    alignSelf: "center",
  },
  loadingText: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
});
