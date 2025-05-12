import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import PreferencesCard from "../../../components/cards/PreferencesCard";
import { rendezvousHobbies } from "../../../data/dummyData";
import SafeAreaViewComponent from "../../../components/common/SafeAreaViewComponent";
import FixedBottomContainer from "../../../components/common/FixedBottomContainer";
import FormButton from "../../../components/form/FormButton";
import ScrollViewSpace from "../../../components/common/ScrollViewSpace";
import HeaderTitle from "../../../components/common/HeaderTitle";

const OnboardingFlow4 = ({ navigation, route }) => {
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
      personality: item?.personality,
      country: item?.country,
      relationshipStatus: item?.relationshipStatus,
      bio: item?.bio,
      city: item?.city,
      height: item?.height,
      dob: item?.dob,
      interests: item?.interests,
      hobbies: selectedCategories,
    };
    navigation.navigate("OnboardingFlow5", onboarding1Data);
  };

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={"arrow-back-outline"}
        progress={80}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.title}>Tell us about your hobbies</Text>
      <Text style={styles.subtitle}>
        What do you like to do in your free time?
      </Text>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cardsContainer}>
          {rendezvousHobbies?.map((cur, i) => (
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
      <FixedBottomContainer top={1.1}>
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

export default OnboardingFlow4;

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
  animatedCard: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 50, // Makes it a perfect circle
    overflow: "hidden",
  },
});
