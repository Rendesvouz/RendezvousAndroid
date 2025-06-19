import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';

import {windowWidth} from '../../utils/Dimensions';
import {formatDate, stripHtml} from '../../Library/Common';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../Context/ThemeContext';

const BlogCard = ({props}) => {
  const navigation = useNavigation();
  const {theme} = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.blogContents, {borderBottomColor: theme?.borderColor}]}
      onPress={() => {
        navigation.navigate('BlogDetails', props);
      }}>
      <View style={styles.blogContent}>
        <Image
          source={{uri: props?.blog_pictures[0]}}
          style={styles.blogImage}
        />
        <View style={styles.blogTexts}>
          <Text
            numberOfLines={1}
            style={[styles.blogTitle, {color: theme?.text}]}>
            {props?.title}
          </Text>
          <Text
            numberOfLines={3}
            style={[styles.blogContentText, {color: theme?.rendezvousText}]}>
            {stripHtml(props?.content)}
          </Text>
        </View>
      </View>
      <View style={styles.blogDateView}>
        <Text style={[styles.blogDate, {color: theme?.text}]}>
          By: RendezvousCare
        </Text>
        <Text style={[styles.blogDate, {color: theme?.text}]}>
          {formatDate(props?.createdAt)}
        </Text>
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
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  blogContent: {
    flexDirection: 'row',
  },
  blogImage: {
    width: windowWidth / 4,
    height: 100,
    borderRadius: 8,
    objectFit: 'contain',
  },
  blogTexts: {
    marginLeft: 20,
    // backgroundColor: "green",
    width: windowWidth / 1.65,
    justifyContent: 'space-between',
  },
  blogDateView: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  blogTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  blogDate: {
    fontSize: 12,
    fontWeight: '600',
  },
  blogContentText: {
    fontSize: 12,
  },
});
