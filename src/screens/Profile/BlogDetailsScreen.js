import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React from 'react';
import RenderHTML from 'react-native-render-html';

import SafeAreaViewComponent from '../../components/common/SafeAreaViewComponent';
import HeaderTitle from '../../components/common/HeaderTitle';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import ScrollViewSpace from '../../components/common/ScrollViewSpace';
import {useTheme} from '../../Context/ThemeContext';

const BlogDetailsScreen = ({navigation, route}) => {
  const item = route?.params;
  const {theme} = useTheme();

  const source = {
    html: item?.content,
  };

  return (
    <SafeAreaViewComponent backgroundColor={'white'}>
      <HeaderTitle
        headerTitle={''}
        leftIcon={'arrow-back-outline'}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 10}}>
        <Image
          source={{uri: item?.blog_pictures[0]}}
          style={styles.blogImage}
        />
        <RenderHTML contentWidth={windowWidth} source={source} />
        <ScrollViewSpace />
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default BlogDetailsScreen;

const styles = StyleSheet.create({
  blogImage: {
    width: windowWidth / 1.05,
    height: windowHeight / 3,
    objectFit: 'contain',
  },
});
