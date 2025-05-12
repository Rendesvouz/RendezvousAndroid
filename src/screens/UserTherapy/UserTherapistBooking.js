import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import moment from "moment";
import Toast from "react-native-toast-message";

import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../components/common/HeaderTitle";
import ScrollViewSpace from "../../components/common/ScrollViewSpace";
import { COLORS } from "../../themes/themes";
import HeaderText from "../../components/common/HeaderText";
import { generateTherapistAvailability, RNToast } from "../../Library/Common";
import FixedBottomContainer from "../../components/common/FixedBottomContainer";
import FormButton from "../../components/form/FormButton";
import PickerSelect from "../../components/pickerSelect/PickerSelect";
import FormInput from "../../components/form/FormInput";
import axiosInstance from "../../utils/api-client";
import verifyTokenWithoutApi from "../../components/hoc/verifyToken";

const UserTherapistBooking = ({ navigation, route }) => {
  const item = route.params;
  console.log("item", item);

  const therapistSchedules = item?.scheduling;
  // console.log("therapistSchedules", therapistSchedules);

  // Parse the stringified objects into actual objects
  const weeklyAvailability = {};
  therapistSchedules?.forEach((item) => {
    const parsedItem = JSON?.parse(item);
    weeklyAvailability[parsedItem.day] = parsedItem.time;
  });

  const transformedTherapistData = item?.counseling_type?.map((item) => ({
    label: item,
    value: item,
  }));

  const today = moment().format("YYYY-MM-DD");

  const [loading, setLoading] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [bookedAppointments, setBookedAppointments] = useState([]);

  const [selectedTime, setSelectedTime] = useState(null);
  const [counsellingArea, setCounsellingArea] = useState("");
  const [description, setDescription] = useState("");
  console.log("selectedDate", selectedDate, selectedTime);

  // Error states
  const [formError, setFormError] = useState("");
  const [counsellingAreaError, setCounsellingAreaError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handleTimePress = (time) => {
    console.log("tt", time);
    setSelectedTime(time);
  };

  // Example therapist availability data
  const therapistAvailability = {
    "2025-03-19": ["10:00 AM", "2:00 PM", "4:00 PM"],
    "2025-03-11": ["11:00 AM", "1:00 PM", "3:00 PM"],
  };

  const updatedAvailabilityDates = generateTherapistAvailability(
    moment,
    weeklyAvailability
  );

  const handleDateSelect = (day) => {
    const date = day.dateString;
    if (!moment(date)?.isBefore(today)) {
      setSelectedDate(date);

      const availableSlots = updatedAvailabilityDates[date] || [];
      const bookedTimesForDate = bookedAppointments
        .filter((appt) => appt.date === date)
        .map((appt) => appt.time);

      // Mark booked times as disabled
      const updatedSlots = availableSlots?.map((time) => ({
        time,
        disabled: bookedTimesForDate?.includes(time),
      }));

      console.log("updatedSlots", updatedSlots);

      setAvailableTimes(updatedSlots);
    } else {
      setSelectedDate("");
      setAvailableTimes([]);
    }
  };

  // Filter out past dates
  const futureAvailability = Object.keys(updatedAvailabilityDates).reduce(
    (acc, date) => {
      if (!moment(date).isBefore(today)) {
        acc[date] = {
          marked: true,
          dotColor: "#BC0D35", // Color for future available dates
          selected: date === selectedDate,
          selectedColor: "#BC0D35",
          selectedTextColor: "#ffffff",
        };
      }
      return acc;
    },
    {}
  );

  const getAllAppointmentsFortherapist = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance({
        url: `appointment/provider-upcoming/${item?.therapist_id}`,
        method: "GET",
      });

      console.log("ddd", response);

      const bookedAppointmentsResponse = response?.data?.data?.appointments;

      const bookedData = bookedAppointmentsResponse?.map((appt) => ({
        date: appt.appointmentTime.date,
        time: appt.appointmentTime.time,
      }));

      setBookedAppointments(bookedData || []);
    } catch (error) {
      console.log("Error fetching appointments", error?.response);
    } finally {
      setLoading(false);
    }
  };

  const bookAppointment = async () => {
    const appointmentData = {
      providerId: item?.therapist_id,
      type: "therapy",
      category: counsellingArea,
      appointmentTime: {
        date: selectedDate,
        time: selectedTime,
      },
      description: description,
      reminders: [15, 30],
      action: "request",
    };

    if (!description) {
      setDescriptionError("Please fill your description");
    } else {
      setLoading(true);

      try {
        await axiosInstance({
          url: "appointment",
          method: "POST",
          data: appointmentData,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            console.log("bookAppointment res", res);
            setLoading(false);

            RNToast(Toast, "Great, your appointment has been booked");
            navigation.navigate("UserTherapy");
          })
          .catch((err) => {
            console.log("bookAppointment err", err);
            setLoading(false);

            if (err?.response?.status == 400) {
              RNToast(
                Toast,
                "Please activate/fund your wallet before performing this action"
              );
            } else if (err?.response?.status == 403) {
              RNToast(
                Toast,
                "Your subscription has expired, please renew to keep enjoying our services"
              );
            }
          });
      } catch (error) {
        console.log("bookAppointment error", error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getAllAppointmentsFortherapist();
  }, []);

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={"arrow-back-outline"}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        headerTitle={"Schedule Appointment"}
        rightIcon={"calendar-outline"}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={futureAvailability}
          theme={{
            arrowColor: "#BC0D35",
            todayTextColor: "#BC0D35",
            selectedDayBackgroundColor: "#BC0D35",
            selectedDayTextColor: "#ffffff",
            dotColor: "#BC0D35",
            textMonthFontWeight: "bold",
            textMonthFontSize: 18,
          }}
          monthFormat={"MMMM yyyy"}
        />
        {selectedDate ? (
          <View style={styles.timeContainer}>
            <Text style={styles.heading}>
              Available Times on {selectedDate}
            </Text>
            {availableTimes?.length ? (
              <FlatList
                data={availableTimes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.timeSlot,
                      item.time === selectedTime
                        ? styles.selectedTimeSlot
                        : null,
                      item.disabled ? styles.disabledTimeSlot : null,
                    ]}
                    disabled={item.disabled}
                    onPress={() =>
                      !item.disabled && handleTimePress(item?.time)
                    }
                  >
                    <Text
                      style={[
                        styles.timeText,
                        item.time === selectedTime
                          ? styles.selectedTimeText
                          : null,
                        item.disabled ? styles.disabledTimeText : null, // Apply disabled text style
                      ]}
                    >
                      {item.time}
                    </Text>
                  </TouchableOpacity>
                )}
                numColumns={3}
              />
            ) : (
              <Text>No available times for the selected date.</Text>
            )}
          </View>
        ) : (
          <Text style={styles.instruction}>
            Select a date to see available times.
          </Text>
        )}

        {selectedTime && (
          <View>
            <PickerSelect
              items={transformedTherapistData}
              placeholder={"Select your counselling"}
              formInputTitle={"Select the counselling area"}
              onValueChange={(value) => {
                setCounsellingArea(value);
                setFormError("");
                setCounsellingAreaError("");
              }}
              errorMessage={counsellingAreaError}
            />

            <FormInput
              formInputTitle={"Description"}
              keyboardType={"default"}
              placeholder="Enter your brief description"
              value={description}
              onChangeText={(txt) => {
                setDescription(txt);
                setDescriptionError("");
                setFormError("");
              }}
              errorMessage={descriptionError}
              numberOfLines={5}
              multiLine={true}
              height={100}
            />
          </View>
        )}
        <ScrollViewSpace />
      </ScrollView>

      {/* Buttons */}
      <FixedBottomContainer top={1.1}>
        <FormButton
          title={"Book a Session"}
          width={1.1}
          onPress={bookAppointment}
          disabled={!selectedTime || !counsellingArea || loading}
          formError={formError}
          loading={loading}
        />
      </FixedBottomContainer>
    </SafeAreaViewComponent>
  );
};

export default verifyTokenWithoutApi(UserTherapistBooking);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  timeContainer: {
    marginTop: 20,
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  instruction: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
  timeSlot: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flex: 1, // Ensures equal spacing
  },
  timeText: {
    fontSize: 16,
    color: "#000",
  },
  selectedTimeSlot: {
    backgroundColor: COLORS.rendezvousRed,
    borderColor: COLORS.rendezvousRed,
  },
  selectedTimeText: {
    color: "#fff",
  },
  disabledTimeSlot: {
    backgroundColor: "#ccc",
    opacity: 0.5,
  },
  disabledTimeText: {
    color: "#888",
  },
});
