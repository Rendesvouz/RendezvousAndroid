import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import StepIndicator from "react-native-step-indicator";
import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../components/common/HeaderTitle";
import { carRentalSteps } from "../../data/dummyData";
import { COLORS } from "../../themes/themes";

const labels = ["Getting Started", "Preferences", "Confirmation"];

const stepIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 1,
  stepStrokeCurrentColor: COLORS.rendezvousRed,
  separatorFinishedColor: COLORS.rendezvousRed,
  separatorUnFinishedColor: COLORS.appGrey,
  stepIndicatorFinishedColor: COLORS.rendezvousRed,
  stepIndicatorUnFinishedColor: COLORS.appGrey4,
  stepIndicatorCurrentColor: COLORS.white,
  stepIndicatorLabelFontSize: 12,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: COLORS.rendezvousRed,
  stepIndicatorLabelFinishedColor: COLORS.rendezvousRed,
  stepIndicatorLabelUnFinishedColor: COLORS.appGrey2,
  labelColor: "#666666",
  labelSize: 15,
  currentStepLabelColor: COLORS.rendezvousRed,
  labelAlign: "flex-start",
};

const CarRentalHomeScreen = ({ navigation }) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [count, setCount] = useState(carRentalSteps?.length);

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={"arrow-back-outline"}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        headerTitle={"Car Rental"}
      />

      <StepIndicator
        customStyles={stepIndicatorStyles}
        stepCount={count}
        direction="horizontal"
        // currentPosition is based on reduxProfileProgress
        currentPosition={currentPosition}
        onPress={(position) => {
          console.log("pox", position, currentPosition);
          if (currentPosition > position) {
            navigation.navigate(carRentalSteps[position].navigation);
          }
        }}
        labels={carRentalSteps?.map((item) => item?.title)}
        renderLabel={(lbl) => (
          <Text
            style={{
              fontSize: 14,
              textAlign: "left",
              marginTop: 8,
              marginLeft: 10,
              fontWeight: lbl?.stepStatus == "finished" ? "800" : "500",
              color:
                lbl?.stepStatus == "finished"
                  ? COLORS.rendezvousRed
                  : COLORS.appGrey,
            }}
          >
            {lbl.label}
          </Text>
        )}
      />
    </SafeAreaViewComponent>
  );
};

export default CarRentalHomeScreen;

const styles = StyleSheet.create({});
