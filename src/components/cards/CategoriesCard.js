import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";

const CategoriesCard = ({ props }) => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.catCard}>
      <Image source={{ uri: props?.image_url[0] }} style={styles.catImage} />
      <Text numberOfLines={1} style={styles.catName}>
        {props?.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoriesCard;

const styles = StyleSheet.create({
  catCard: {
    padding: 10,
    alignContent: "center",
    alignItems: "center",
    // backgroundColor: 'red',
    marginRight: 5,
  },
  catImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  catName: {
    fontSize: 14,
    fontWeight: "400",
    width: 100,
    textAlign: "center",
    marginTop: 4,
  },
});
