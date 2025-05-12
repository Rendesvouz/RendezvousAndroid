import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import { COLORS } from "../../themes/themes";
import AppointmentCard from "../../components/cards/AppointmentCard";
import axiosInstance from "../../utils/api-client";
import HeaderTitle from "../../components/common/HeaderTitle";
import ScrollViewSpace from "../../components/common/ScrollViewSpace";

const UserTherapyAppointments = ({ route, navigation }) => {
  const item = route.params;
  console.log("ittt", item);

  const [loading, setLoading] = useState(false);

  const [appointments, setAppointments] = useState(item);

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
      getAllUserAppointments();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const onRefresh = useCallback(() => {
    setLoading(true);
    getAllUserAppointments();
  }, []);

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={"arrow-back-outline"}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        headerTitle={"Therapy Appointments"}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 10,
          padding: 10,
          backgroundColor: "white",
          //   flex: 1,
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
            Please wait while we fetch your appointments
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
            We dont have any therapist appointment at the moment. You can browse
            through the list of therapist and book one at your convenience
          </Text>
        )}

        <ScrollViewSpace />
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default UserTherapyAppointments;

const styles = StyleSheet.create({
  noData: {
    fontWeight: "400",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    textAlign: "center",
  },
  loadingText: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
});
