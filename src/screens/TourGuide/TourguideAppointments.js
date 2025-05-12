import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../components/common/HeaderTitle";

const TourguideAppointments = ({ navigation }) => {
  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={"arrow-back-outline"}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        headerTitle={"Tour Appointments"}
      />
      <Text>TourguideAppointments</Text>
    </SafeAreaViewComponent>
  );
};

export default TourguideAppointments;

const styles = StyleSheet.create({});
