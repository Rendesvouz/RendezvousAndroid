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
import { windowHeight, windowWidth } from "../../utils/Dimensions";
import FormButton from "../../components/form/FormButton";
import axiosInstance from "../../utils/api-client";
import {
  saveUserTherapists,
  saveUserTherapyPreference,
} from "../../redux/features/user/userSlice";
import verifyTokenWithoutApi from "../../components/hoc/verifyToken";
import { COLORS } from "../../themes/themes";
import AppointmentCard from "../../components/cards/AppointmentCard";
import LifeCoachCard from "../../components/cards/LifeCoachCard";
import TherapistHeaderTitle from "../../components/common/TherapistHeaderTitle";

const Tab = createMaterialTopTabNavigator();

const TherapistComponent = ({
  loading,
  reduxUserTherapists,
  navigation,
  onRefresh,
}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: 10,
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
      ) : reduxUserTherapists?.length ? (
        reduxUserTherapists?.map((cur, i) => (
          <LifeCoachCard
            key={i}
            props={cur}
            onPress={() => {
              navigation.navigate("UserTherapistDetails", cur);
            }}
          />
        ))
      ) : (
        <Text style={[styles.noData]}>
          We dont have any therapist onboarded at the moment. You can check back
          some other time
        </Text>
      )}
    </ScrollView>
  );
};

const UserTherapistAppointmentsComponent = ({
  loading,
  appointments,
  navigation,
  onRefresh,
}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: 10,
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
      ) : appointments?.length ? (
        appointments?.map((cur, i) => (
          <AppointmentCard
            key={i}
            props={cur}
            onPress={() => {
              navigation.navigate("UserTherapyAppointmentDetails", cur);
            }}
          />
        ))
      ) : (
        <Text style={[styles.noData]}>
          We dont have any therapist onboarded at the moment. You can check back
          some other time
        </Text>
      )}
    </ScrollView>
  );
};

const UserTherapyHomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const userProfle = state?.user?.user?.profile;
  const reduxUserTherapyPreference = state?.user?.userTherapyPreference;
  const reduxUserTherapists = state?.user?.userTherapists;

  console.log("userProfle", userProfle, reduxUserTherapists);

  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const [isOnboarded, setIsOnboarded] = useState(
    reduxUserTherapyPreference ? true : false
  );

  const getStarted = () => {
    navigation.navigate("UserTherapyOnboardingFlow1");
  };

  const getUserTherapyPreference = async () => {
    try {
      await axiosInstance({
        url: "therapy/preferences",
        method: "GET",
      })
        .then((res) => {
          console.log("getUserTherapyPreference res", res);

          // if theres a data in the response, it means the user has onboarded his therapy preferences
          if (res?.data?.data) {
            setIsOnboarded(true);
            dispatch(saveUserTherapyPreference(res?.data?.data));
          }
        })
        .catch((err) => {
          console.log("getUserTherapyPreference err", err);
        });
    } catch (error) {
      console.log("getUserTherapyPreference error", error);
    }
  };

  const getAllTherapists = async () => {
    setLoading(true);
    try {
      await axiosInstance({
        url: "therapy/search/providers",
        method: "GET",
      })
        .then((res) => {
          console.log("getAllTherapists res", res?.data);
          setLoading(false);

          if (res?.data?.data) {
            dispatch(saveUserTherapists(res?.data?.data?.matchedProviders));
          }
        })
        .catch((err) => {
          console.log("getAllTherapists err", err);
          setLoading(false);
        });
    } catch (error) {
      console.log("getAllTherapists error", error);
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

        // Filter appointments to only include those of type 'therapy'
        const therapyAppointments = appointmentss.filter(
          (appointment) => appointment?.type === "therapy"
        );

        const appointmentsWithProfiles = await Promise.all(
          therapyAppointments?.map(async (appointment) => {
            const providerProfile = await getProvidersProfile(
              appointment?.providerId
            );
            return { ...appointment, providerProfile };
          })
        );

        console.log("appointmentsWithProfiles", appointmentsWithProfiles);
        setAppointments(appointmentsWithProfiles);
        setLoading(false);
      }
    } catch (error) {
      console.log("getAllUserAppointments error", error);
      setLoading(false);
    }
  };

  const getProvidersProfile = async (userId) => {
    try {
      const response = await axiosInstance({
        url: `profile/provider-profile/${userId}/therapist`,
        method: "GET",
      });
      console.log("getProvidersProfile res", response?.data);
      return response?.data?.profile;
    } catch (error) {
      console.log(`getUserProfile error for userId ${userId}:`, error);

      return null;
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (!reduxUserTherapyPreference) {
        getUserTherapyPreference();
      }

      getAllTherapists();
      getAllUserAppointments();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const onRefresh = useCallback(() => {
    setLoading(true);
    getAllTherapists();
    getAllUserAppointments();
  }, []);

  return (
    <SafeAreaViewComponent>
      {isOnboarded ? (
        <>
          <TherapistHeaderTitle
            headerTitle={"Therapists"}
            therapistIcon
            appointmentsArray={appointments}
            onRightIconPress3={() => {
              navigation.navigate("UserTherapyAppointments", appointments);
            }}
          />
          {/* <HeaderTitle headerTitle={'Browse Therapist'} /> */}
          {/* <View style={{ height: windowHeight / 19, marginBottom: 20 }}>
            <CustomSwitch
              arrayData={libraryData}
              seletionMode={0}
              onSelectSwitch={onSelectSwitch}
            />
          </View> */}

          {/* <Tab.Navigator
            screenOptions={{
              tabBarStyle: {
                backgroundColor: '#fff',
                borderBottomColor: COLORS.rendezvousRed,
              },
              tabBarColor: COLORS.black,
              tabBarActiveTintColor: COLORS.black,
              tabBarIndicatorStyle: {
                borderBottomColor: COLORS.rendezvousRed,
                backgroundColor: COLORS.rendezvousRed,
              },
            }}>
            <Tab.Screen
              name="Therapists"
              children={() => (
                <TherapistComponent
                  loading={loading}
                  reduxUserTherapists={reduxUserTherapists}
                  navigation={navigation}
                  onRefresh={onRefresh}
                />
              )}
            />
            <Tab.Screen
              name="Appointments"
              children={() => (
                <UserTherapistAppointmentsComponent
                  loading={loading}
                  appointments={appointments}
                  navigation={navigation}
                  onRefresh={onRefresh}
                />
              )}
            />
          </Tab.Navigator> */}

          <TherapistComponent
            loading={loading}
            reduxUserTherapists={reduxUserTherapists}
            navigation={navigation}
            onRefresh={onRefresh}
          />
        </>
      ) : (
        <View style={{ padding: 20, marginTop: 20 }}>
          <Text style={styles.onboardingText}>
            Hey {userProfle?.username}, Ready to find the best Therapist for
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

export default verifyTokenWithoutApi(UserTherapyHomeScreen);

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
  },
  loadingText: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
});
