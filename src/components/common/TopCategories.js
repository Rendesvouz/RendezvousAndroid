import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "../../themes/themes";
import { useNavigation } from "@react-navigation/native";

const categoriesSector = [
  {
    id: 1,
    title: "Assemble",
    image: require("../../assets/1.jpg"),
    bgColor: "#00C34E1A",
  },
  {
    id: 2,
    title: "Cleaners",
    image: require("../../assets/1.jpg"),
    bgColor: "#2465E11A",
  },
  {
    id: 3,
    title: "Bakers",
    image: require("../../assets/1.jpg"),
    bgColor: "#C369001A",
  },
];

const TopCategories = ({}) => {
  const navigation = useNavigation();

  return (
    <View style={{ padding: 10 }}>
      <View style={styles.catSection}>
        <Text style={styles.topCatText}>Top Categories</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Categories");
          }}
        >
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categoriesSector?.map((cur, i) => (
          <TouchableOpacity
            key={i}
            activeOpacity={0.9}
            style={[styles.catCard, { backgroundColor: cur.bgColor }]}
          >
            <Image style={styles.catImage} source={cur?.image} />
            <Text style={styles.catTitle}>{cur?.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default TopCategories;

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
