import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const CategoryCard = ({ props }) => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={[styles.container]}>
      <View style={[styles.imageIcon, { backgroundColor: props.bgColor }]}>
        <Image style={styles.catImage} source={props.image} />
      </View>
      <Text style={styles.catText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    height: 102,
    width: 77,
    margin: 5,
  },
  imageIcon: {
    width: 70,
    height: 70,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  catText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
