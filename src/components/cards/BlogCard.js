import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";

import { windowWidth } from "../../utils/Dimensions";
import { formatDate, stripHtml } from "../../Library/Common";
import { useNavigation } from "@react-navigation/native";

const BlogCard = ({ props }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.blogContents}
      onPress={() => {
        navigation.navigate("BlogDetails", props);
      }}
    >
      <View style={styles.blogContent}>
        <Image
          source={require("../../assets/RendezvousLogoBlack.png")}
          style={styles.blogImage}
        />
        <View style={styles.blogTexts}>
          <Text numberOfLines={1} style={styles.blogTitle}>
            {props?.title}
          </Text>
          <Text numberOfLines={3} style={styles.blogContentText}>
            {stripHtml(props?.content)}
          </Text>
        </View>
      </View>
      <View style={styles.blogDateView}>
        <Text style={styles.blogDate}>By: RendezvousCare</Text>
        <Text style={styles.blogDate}>{formatDate(props?.createdAt)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BlogCard;

const styles = StyleSheet.create({
  blogContents: {
    padding: 10,
    // backgroundColor: "red",
    borderRadius: 8,
    height: 150,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  blogContent: {
    flexDirection: "row",
  },
  blogImage: {
    width: windowWidth / 4,
    height: 100,
    borderRadius: 8,
    objectFit: "contain",
  },
  blogTexts: {
    marginLeft: 20,
    // backgroundColor: "green",
    width: windowWidth / 1.65,
    justifyContent: "space-between",
  },
  blogDateView: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  blogTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  blogDate: {
    fontSize: 12,
    fontWeight: "600",
  },
  blogContentText: {
    fontSize: 12,
  },
});
