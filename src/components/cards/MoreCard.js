import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';

import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../themes/themes';
import {useTheme} from '../../Context/ThemeContext';
import FeaturesCarousels from '../common/FeaturesCarousels';

const MoreCard = ({onPress, props}) => {
  const {theme, isDarkMode} = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[styles.tourcard, {borderColor: theme?.borderColor}]}>
      {/* <Text
        style={[
          styles.tourguideProfileName,
          {
            color: theme?.text,
            // marginBottom: 10,
            fontSize: 16,
            fontWeight: '600',
            padding: 5,
          },
        ]}>
        {props?.headerTitle}
      </Text> */}
      {/* <FeaturesCarousels imagesArray={props?.sliderImages} /> */}

      <Image source={{uri: props?.image}} style={styles.tourcardImage} />
      <View style={styles.tourguideProfile}>
        <View style={styles.tourguideProfileInfo}>
          <Text style={[styles.tourguideProfileName, {color: theme?.text}]}>
            {props?.headerTitle}
          </Text>
        </View>
      </View>
      <Text
        numberOfLines={2}
        style={{
          color: '#7D8694',
          fontSize: 14,
          marginLeft: 4,
          marginRight: 4,
        }}>
        {props?.description}
      </Text>
    </TouchableOpacity>
  );
};

export default MoreCard;

const styles = StyleSheet.create({
  tourcard: {
    width: windowWidth / 1.1,
    // height: windowHeight / 4.3,
    // backgroundColor: "red",
    padding: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.appGrey4,
    marginBottom: 8,
    paddingBottom: 12,
  },
  tourcardImage: {
    width: windowWidth / 1.135,
    height: windowHeight / 7,
    objectFit: 'cover',
    borderRadius: 12,
    // marginBottom: 10,
  },
  tourguideProfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 4,
  },
  tourguideProfileInfo: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  tourguideProfileImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 6,
  },
  tourguideProfileName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.rendezvousBlack,
  },
  tourguideProfile2: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tourPrice: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
  },
});
