import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {windowWidth} from '../../utils/Dimensions';

const AdsCard = () => {
  return (
    <View style={styles.adsImageContainer}>
      <Image source={require('../../assets/1.jpg')} style={styles.adsImage} />
    </View>
  );
};

export default AdsCard;

const styles = StyleSheet.create({
  adsImageContainer: {
    padding: 10,
  },
  adsImage: {
    objectFit: 'contain',
    width: windowWidth / 1.05,
  },
});
