import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import SafeAreaViewComponent from "../../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../../components/common/HeaderTitle";
import { validCounselingTypes } from "../../../data/dummyData";
import PreferencesCard from "../../../components/cards/PreferencesCard";
import ScrollViewSpace from "../../../components/common/ScrollViewSpace";
import FixedBottomContainer from "../../../components/common/FixedBottomContainer";
import FormButton from "../../../components/form/FormButton";

const TherapistOnboardingFlow3 = ({ navigation, route }) => {
  const item = route.params;
  console.log("item4", item);

  const [selectedCategories, setSelectedCategories] = useState([]);
  console.log("selectedCategories", selectedCategories);

  const handleToggleSelect = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((item) => item !== category)
        : [...prevSelected, category]
    );
  };

  const onboardNext2 = () => {
    const onboarding1Data = {
      fullName: item?.fullName,
      gender: item?.gender,
      country: item?.country,
      city: item?.city,
      address: item?.address,
      phoneNumber: item?.phoneNumber,
      license: item?.license,
      qualification: item?.qualification,
      rate: item?.rate,
      experience: item?.experience,
      platforms: item?.platforms,
      skill: item?.skill,
      therapyType: selectedCategories,
    };
    navigation.navigate("TherapistOnboardingFlow4", onboarding1Data);
  };

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={"arrow-back-outline"}
        progress={75}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.title}>
        Describe the kind of therapy you provide.
      </Text>
      {/* <Text style={styles.subtitle}>
        Describe the kind of therapy you provide.
      </Text> */}
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cardsContainer}>
          {validCounselingTypes?.map((cur, i) => (
            <PreferencesCard
              key={i}
              category={cur}
              selectedCategories={selectedCategories}
              onToggleSelect={handleToggleSelect}
            />
          ))}
        </View>
        <ScrollViewSpace />
      </ScrollView>

      {/* Buttons */}
      <FixedBottomContainer top={1.2}>
        <FormButton
          title={"Next"}
          width={1.1}
          onPress={onboardNext2}
          disabled={!selectedCategories?.length}
        />
      </FixedBottomContainer>
    </SafeAreaViewComponent>
  );
};

export default TherapistOnboardingFlow3;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f8f9fb",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f8f9fb",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  animatedCard: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 50, // Makes it a perfect circle
    overflow: "hidden",
  },
});
