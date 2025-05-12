import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../components/common/HeaderTitle";
import { windowHeight, windowWidth } from "../../utils/Dimensions";
import FormButton from "../../components/form/FormButton";
import axiosInstance from "../../utils/api-client";
import {
  saveUserLifeCoaches,
  saveUserLifeCoachPreference,
} from "../../redux/features/user/userSlice";
import TherapistCard from "../../components/cards/TherapistCard";
import { COLORS } from "../../themes/themes";
import LifeCoachCard from "../../components/cards/LifeCoachCard";
import TherapistHeaderTitle from "../../components/common/TherapistHeaderTitle";

const Tab = createMaterialTopTabNavigator();

const TherapistComponent = ({
  loading,
  reduxUserLifeCoaches,
  navigation,
  onRefresh,
}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: 0,
        padding: 10,
        backgroundColor: "white",
        flex: 1,
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
        <Text style={styles.loadingText}>
          Please wait while we fetch your data
        </Text>
      ) : reduxUserLifeCoaches?.length ? (
        reduxUserLifeCoaches?.map((cur, i) => (
          <LifeCoachCard
            key={i}
            props={cur}
            onPress={() => {
              navigation.navigate("UserLifeCoachDetails", cur);
            }}
          />
        ))
      ) : (
        <Text style={[styles.noData]}>
          We dont have any life coaches onboarded at the moment. You can check
          back some other time
        </Text>
      )}
    </ScrollView>
  );
};

const UserLifeCoachHomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const userProfle = state?.user?.user?.profile;
  const reduxUserLifeCoachPreference = state?.user?.userLifeCoachPreference;
  const reduxUserLifeCoaches = state?.user?.userLifeCoaches;

  console.log("userProfle", userProfle, reduxUserLifeCoaches);

  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const [isOnboarded, setIsOnboarded] = useState(
    reduxUserLifeCoachPreference ? true : false
  );

  const getStarted = () => {
    navigation.navigate("UserLifeCoachOnboardingFlow1");
  };

  const getUserLifeCoachPreference = async () => {
    try {
      await axiosInstance({
        url: "life-coach/preferences",
        method: "GET",
      })
        .then((res) => {
          console.log("getUserLifeCoachPreference res", res);

          // if theres a data in the response, it means the user has onboarded his lifecoach preferences
          if (res?.data?.data) {
            setIsOnboarded(true);
            dispatch(saveUserLifeCoachPreference(res?.data?.data));
          }
        })
        .catch((err) => {
          console.log("getUserLifeCoachPreference err", err);
        });
    } catch (error) {
      console.log("getUserLifeCoachPreference error", error);
    }
  };

  const getAllLifeCoaches = async () => {
    setLoading(true);
    try {
      await axiosInstance({
        url: "life-coach/search/provider",
        method: "GET",
      })
        .then((res) => {
          console.log("getAllLifeCoaches res", res);
          setLoading(false);

          if (res?.data?.data) {
            dispatch(saveUserLifeCoaches(res?.data?.data?.matchedProviders));
          }
        })
        .catch((err) => {
          console.log("getAllLifeCoaches err", err);
          setLoading(false);
        });
    } catch (error) {
      console.log("getAllLifeCoaches error", error);
      setLoading(false);
    }
  };

  const getAllUserAppointments = async () => {
    setLoading(true);
    try {
      const appointmentsResponse = await axiosInstance({
        url: "appointment/user-upcoming",
        method: "GET",
      });

      console.log("appointmentsResponse", appointmentsResponse?.data);

      if (appointmentsResponse?.data?.data?.appointments) {
        const appointmentss = appointmentsResponse?.data?.data?.appointments;

        // Filter appointments to only include those of type 'lifecoach'
        const therapyAppointments = appointmentss.filter(
          (appointment) => appointment?.type != "therapy"
        );

        const appointmentsWithProfiles = await Promise.all(
          therapyAppointments.map(async (appointment) => {
            const providerProfile = await getProvidersProfile(
              appointment?.providerId
            );
            return { ...appointment, providerProfile };
          })
        );

        console.log("appointmentsWithProfiles", appointmentsWithProfiles);
        setAppointments(appointmentsWithProfiles);
      }
    } catch (error) {
      console.log("getAllUserAppointments error", error);
      setLoading(false);
    }
  };

  const getProvidersProfile = async (userId) => {
    try {
      const response = await axiosInstance({
        url: `profile/provider-profile/${userId}/Lifecoach`,
        method: "GET",
      });
      console.log("getProvidersProfile res", response?.data);
      return response?.data?.profile;
    } catch (error) {
      console.log(
        `getUserProfile error for userId ${userId}:`,
        error?.response
      );

      return null;
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (!reduxUserLifeCoachPreference) {
        getUserLifeCoachPreference();
      }

      getAllLifeCoaches();
      getAllUserAppointments();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const onRefresh = useCallback(() => {
    setLoading(true);
    getAllLifeCoaches();
    getAllUserAppointments();
  }, []);

  return (
    <SafeAreaViewComponent>
      {isOnboarded ? (
        <>
          {/* <HeaderTitle headerTitle={'Browse Life Coaches'} /> */}

          <TherapistHeaderTitle
            headerTitle={"LifeCoaches"}
            appointmentsArray={appointments}
            onRightIconPress3={() => {
              navigation.navigate("UserLifeCoachAppointments", appointments);
            }}
          />

          <TherapistComponent
            loading={loading}
            reduxUserLifeCoaches={reduxUserLifeCoaches}
            navigation={navigation}
            onRefresh={onRefresh}
          />
        </>
      ) : (
        <View style={{ padding: 20, marginTop: 20 }}>
          <Text style={styles.onboardingText}>
            Hey {userProfle?.username}, Ready to find the best Life Coach for
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

export default UserLifeCoachHomeScreen;

const styles = StyleSheet.create({
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
  noData: {
    fontWeight: "700",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    marginTop: 30,
  },
  loadingText: {
    textAlign: "center",
  },
});
