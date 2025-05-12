import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../components/common/HeaderTitle";
import ScrollViewSpace from "../../components/common/ScrollViewSpace";
import {
  availableTimesForAppointmentDaily,
  daysOfTheWeek,
} from "../../data/dummyData";
import FixedBottomContainer from "../../components/common/FixedBottomContainer";
import FormButton from "../../components/form/FormButton";
import { COLORS } from "../../themes/themes";
import { windowWidth } from "../../utils/Dimensions";
import { RNToast } from "../../Library/Common";
import { updateWeeklyAvailability } from "../../redux/features/user/userSlice";
import axiosInstance from "../../utils/api-client";
import verifyTokenWithoutApi from "../../components/hoc/verifyToken";

const SchedulingScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const reduxWeeklyAvailability = state?.user?.weeklyAvailability;

  const userProfle = state?.user?.therapistProfile?.profile;
  console.log("userProfle", userProfle);

  const [loading, setLoading] = useState(false);

  const [selectedDay, setSelectedDay] = useState("Monday");

  const [selectedTimes, setSelectedTimes] = useState([]);
  // const [weeklyAvailability, setWeeklyAvailability] = useState(
  //   reduxWeeklyAvailability
  // );

  console.log(
    "selectedTimes",
    selectedTimes,
    selectedDay,
    reduxWeeklyAvailability
    // weeklyAvailability
  );

  // Error states
  const [formError, setFormError] = useState("");

  // Function to update the availability for a selected day
  const updateDayAndTimes = () => {
    if (selectedTimes.length === 0) {
      RNToast(Toast, "Please select at least one time slot.");
      return;
    }

    RNToast(Toast, `Availability for ${selectedDay} updated.`);
  };

  // Handle editing a day's availability
  const editDay = (day) => {
    setSelectedDay(day);
    loadSelectedDayTimes();
    navigation.navigate("EditAppointmentDates", {
      day,
      times: reduxWeeklyAvailability[day] || [],
    });
  };

  // Load selected day's times into state
  const loadSelectedDayTimes = () => {
    setSelectedTimes([...reduxWeeklyAvailability[selectedDay]]);
  };

  const preloadAvailability = () => {
    const scheduling = userProfle?.scheduling ? userProfle?.scheduling : [];
    const updatedAvailability = { ...reduxWeeklyAvailability };
    console.log("updatedAvailability", updatedAvailability);

    // scheduling?.forEach((item) => {
    //   const { day, time } = typeof item === "string" ? JSON.parse(item) : item;

    //   // Ensure the day exists in the predefined days of the wekk
    //   if (daysOfTheWeek?.includes(day)) {
    //     //   assign the parsed times to the correct day
    //   }
    // });

    if (scheduling?.length) {
      scheduling?.forEach((item) => {
        const { day, time } =
          typeof item === "string" ? JSON.parse(item) : item;

        // dispatch the data to redux
        dispatch(
          updateWeeklyAvailability({
            day: day,
            times: time,
          })
        );
      });
    }
  };

  useEffect(() => {
    // let isMounted = true;
    // if (isMounted) {
    //   preloadAvailability();
    // }

    // return () => {
    //   isMounted = false;
    // };

    preloadAvailability();
  }, []);

  const updateProfile = async () => {
    setLoading(true);
    const formData = new FormData();
    const availabilityUpload = Object.entries(reduxWeeklyAvailability)
      ?.filter(([day, times]) => times?.length)
      ?.map(([day, time]) => ({ day, time }));

    console.log("popop", availabilityUpload);

    availabilityUpload?.forEach((scheduling, index) =>
      formData.append(`scheduling[${index}]`, JSON.stringify(scheduling))
    );

    if (!availabilityUpload?.length) {
      setLoading(false);

      RNToast(Toast, "Please select your preferred scheduling days and time");
    } else {
      try {
        await axiosInstance({
          url: "profile/therapist",
          method: "PUT",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then((res) => {
            console.log("res", res?.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log("updateProfile err", err?.response?.data);

            setLoading(false);
          });
      } catch (error) {
        console.log("updateProfile error", error);
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={"arrow-back-outline"}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        headerTitle={"Availability"}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 10 }}
      >
        {Object?.entries(reduxWeeklyAvailability)?.map(([day, times]) => (
          <View key={day} style={styles.schedulingPeriod}>
            <View style={styles.editSchedule}>
              <Text>
                Day: <Text style={styles.scheduleDays}>{day}</Text>
              </Text>
              <TouchableOpacity
                onPress={() => editDay(day)}
                activeOpacity={0.9}
              >
                <Text style={{ color: COLORS.rendezvousRed }}>Edit</Text>
              </TouchableOpacity>
            </View>
            <Text>
              Time:{" "}
              <Text style={styles.scheduleDays}>
                {times?.length > 0 ? times.join(", ") : "No time selected"}
              </Text>
            </Text>
          </View>
        ))}

        <ScrollViewSpace />
      </ScrollView>

      <FixedBottomContainer top={1.2}>
        <FormButton
          title={"Update Profile"}
          width={1.1}
          formError={formError}
          loading={loading}
          disabled={loading}
          onPress={updateProfile}
        />
      </FixedBottomContainer>
    </SafeAreaViewComponent>
  );
};

export default verifyTokenWithoutApi(SchedulingScreen);

const styles = StyleSheet.create({
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    // backgroundColor: "red",
  },
  schedulingPeriod: {
    padding: 10,
    borderRadius: 8,
    // backgroundColor: "#eee",
    width: windowWidth / 1.05,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  editSchedule: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  scheduleDays: {
    fontSize: 14,
    fontWeight: "700",
  },
});
