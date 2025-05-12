import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ArtisanCard from "../cards/ArtisanCard";
import { COLORS } from "../../themes/themes";
import { useNavigation } from "@react-navigation/native";

const artisans = [
  {
    id: 1,
    title: "Car Washing",
    name: "Bimbooo",
    image: require("../../assets/1.jpg"),
  },
  {
    id: 2,
    title: "House Cleaning",
    name: "Bimbooo",
    image: require("../../assets/1.jpg"),
  },
  {
    id: 3,
    title: "House Cleaning",
    name: "Bimbooo",
    image: require("../../assets/1.jpg"),
  },
];

const TopArtisans = () => {
  const navigation = useNavigation();

  return (
    <View style={{ padding: 10 }}>
      <View style={styles.catSection}>
        <Text style={styles.topCatText}>Top Artisans</Text>
        <Text
          onPress={() => {
            navigation.navigate("Services");
          }}
          style={styles.seeAll}
        >
          See all
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {artisans?.map((cur, i) => (
          <ArtisanCard
            key={i}
            props={cur}
            onPress={() => {
              navigation.navigate("Details");
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TopArtisans;

const styles = StyleSheet.create({
  catSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  topCatText: {
    fontSize: 22,
    fontWeight: "600",
    color: "black",
  },
  seeAll: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.rendezvousRed,
  },
  catCard: {
    width: 116,
    height: 81,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    margin: 10,
  },
  catImage: {
    width: 33,
    height: 33,
    objectFit: "contain",
  },
  catTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 10,
  },
});
