import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";
import React from "react";

import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import ScrollViewSpace from "../../components/common/ScrollViewSpace";
import HeaderTitle from "../../components/common/HeaderTitle";
import { windowHeight, windowWidth } from "../../utils/Dimensions";
import SearchBar from "../../components/search/SearchBar";
import TourguideCard from "../../components/cards/TourguideCard";
import OverlayCard from "../../components/cards/OverlayCard";

const TourPlacesScreen = ({ navigation, route }) => {
  const item = route?.params;

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={"arrow-back-outline"}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        rightIcon={""}
        headerTitle={item?.country}
      />
      <View
        style={{
          //   padding: 20,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <ImageBackground
          imageStyle={styles.placesImage}
          source={require("../../assets/skyImage.png")}
        >
          {/* Overlay */}
          <OverlayCard borderRadius={10} />

          <View style={styles.placesView}>
            <Text style={styles.placesheader}>
              {item?.place ? item?.place : item?.location} tours
            </Text>
            <Text style={styles.placessubheader}>
              Find the perfect guide for your journey
            </Text>
          </View>
        </ImageBackground>
      </View>

      {/* <SearchBar searchPlaceholder={"Search for your tour guides"} /> */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 10, padding: 10 }}
      >
        {!item?.placesArrayData ? (
          <Text style={styles.noData}>No tourguides found</Text>
        ) : (
          item?.placesArrayData?.map((cur, i) => (
            <TourguideCard
              key={i}
              props={cur}
              onPress={() => {
                navigation.navigate("ToursDetailsScreen", cur);
              }}
            />
          ))
        )}

        <ScrollViewSpace />
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default TourPlacesScreen;

const styles = StyleSheet.create({
  placesImage: {
    borderRadius: 10,
    height: windowHeight / 7,
    width: windowWidth / 1.1,
  },
  placesView: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: windowHeight / 7,
    width: windowWidth / 1.1,
  },
  placesheader: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
  },
  placessubheader: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
  },
  gradient: {
    position: "absolute",
    // top: windowHeight / 3.35,
    bottom: 0,
    top: 0,
    // left: 0,
    // right: 0,
    height: windowHeight / 7,
    width: windowWidth / 1.1,

    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
    borderRadius: 20,
    // padding: 15,
    // justifyContent: "flex-end",
  },
  noData: {
    fontWeight: "700",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    marginTop: 40,
  },
});
