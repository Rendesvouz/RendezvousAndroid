import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../components/common/HeaderTitle";
import axiosInstance from "../../utils/api-client";
import BlogCard from "../../components/cards/BlogCard";
import ScrollViewSpace from "../../components/common/ScrollViewSpace";

const BlogScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [loading, setLoading] = useState(false);

  const [blogs, setBlogs] = useState("");

  const fecthAllBlogs = async () => {
    setLoading(true);
    try {
      await axiosInstance({
        url: "blog/post",
        method: "GET",
      })
        .then((res) => {
          console.log("fecthAllBlogs res", res?.data);
          setLoading(false);

          //   fetchAutherProfile(res?.data?.data[0]?.authorId);

          setBlogs(res?.data?.data);
        })
        .catch((err) => {
          console.log("fecthAllBlogs err", err);
          setLoading(false);
        });
    } catch (error) {
      console.log("fecthAllBlogs error", error);
    }
  };

  const fetchAutherProfile = async (userId) => {
    setLoading(true);
    try {
      await axiosInstance({
        url: `profile/public/${userId}`,
        method: "GET",
      })
        .then((res) => {
          console.log("fetchAutherProfile res", res?.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("fetchAutherProfile err", err);
          setLoading(false);
        });
    } catch (error) {
      console.log("fetchAutherProfile error", error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fecthAllBlogs();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        headerTitle={"News Feed"}
        leftIcon={"arrow-back-outline"}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 10 }}
      >
        {blogs && blogs?.length ? (
          blogs?.map((cur, i) => <BlogCard key={i} props={cur} />)
        ) : (
          <Text style={[styles.noData]}>No blogs for now</Text>
        )}
        <ScrollViewSpace />
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default BlogScreen;

const styles = StyleSheet.create({
  noData: {
    fontWeight: "700",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
});
