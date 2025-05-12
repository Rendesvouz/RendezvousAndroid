import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeAreaViewComponent from "../components/common/SafeAreaViewComponent";
import ComingSoon from "../components/common/ComingSoon";
import HeaderTitle from "../components/common/HeaderTitle";

const CarRentalScreen = ({ navigation }) => {
  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        headerTitle={"Car Rentals"}
        leftIcon={"arrow-back-outline"}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />
      <ComingSoon />
    </SafeAreaViewComponent>
  );
};

export default CarRentalScreen;

const styles = StyleSheet.create({});
