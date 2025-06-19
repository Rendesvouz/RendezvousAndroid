import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../components/common/HeaderTitle";
import ScrollViewSpace from "../../components/common/ScrollViewSpace";
import {
  availableTimesForAppointmentDaily,
  daysOfTheWeek,
} from "../../data/dummyData";
import PreferencesCard from "../../components/cards/PreferencesCard";
import TransparentBtn from "../../components/form/TransparentBtn";
import FixedBottomContainer from "../../components/common/FixedBottomContainer";
import FormButton from "../../components/form/FormButton";
import { windowWidth } from "../../utils/Dimensions";
import { updateWeeklyAvailability } from "../../redux/features/user/userSlice";

const EditAppointmentDaysScreen = ({ navigation, route }) => {
  const item = route?.params;
  console.log("iteeem", item);

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [loading, setLoading] = useState(false);

  const [selectedDays, setSelectedDays] = useState("");
  const [selectedTimes, setSelectedTimes] = useState(
    item?.times?.length ? item?.times : []
  );
  console.log("selectedTimes", selectedTimes);

  // Error states
  const [formError, setFormError] = useState("");

  const handleToggleSelect = (category) => {
    setSelectedTimes((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((item) => item !== category)
        : [...prevSelected, category]
    );
  };

  const updateSchedulingInfo = () => {
    dispatch(
      updateWeeklyAvailability({
        day: item?.day,
        times: selectedTimes,
      })
    );
    navigation.goBack();
  };

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={"arrow-back-outline"}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        headerTitle={`${item?.day}'s availability`}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 10 }}
      >
        <View style={styles.cardsContainer}>
          {availableTimesForAppointmentDaily?.map((cur, i) => (
            <PreferencesCard
              key={i}
              category={cur}
              selectedCategories={selectedTimes}
              onToggleSelect={handleToggleSelect}
            />
          ))}
        </View>

        <ScrollViewSpace />
      </ScrollView>

      <FixedBottomContainer top={1.2}>
        <TransparentBtn
          title={"Update Availability"}
          width={1.1}
          onPress={updateSchedulingInfo}
          disabled={loading}
          formError={formError}
          loading={loading}
        />
      </FixedBottomContainer>
    </SafeAreaViewComponent>
  );
};

export default EditAppointmentDaysScreen;

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
