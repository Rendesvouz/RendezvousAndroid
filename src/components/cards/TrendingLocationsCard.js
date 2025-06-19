import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import {windowHeight, windowWidth} from '../../utils/Dimensions';
import OverlayCard from './OverlayCard';

const TrendingLocationsCard = ({props, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.trendingCard}>
      <ImageBackground
        source={props?.backgroundImage}
        imageStyle={styles.trendingCardImage}>
        {/* Overlay */}
        <OverlayCard borderRadius={10} />

        <TouchableOpacity style={styles.heartIcon}>
          <Ionicons name="heart-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.trandingInfo}>
          <Text style={styles.trendingInfoTitle}>{props?.location}</Text>
          <View style={styles.trendinglocations}>
            <Ionicons name="location-outline" color="white" size={15} />
            <Text style={styles.trendinglocationsText}>{props?.country}</Text>
          </View>
          {/* <Text style={styles.trendinglocationsText}>
            {props?.visits} visits
          </Text> */}
        </View>
        {/* <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'transparent']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          style={styles.gradient}>
          <View style={styles.trandingInfo}>
            <Text style={styles.trendingInfoTitle}>{props?.location}</Text>
            <View style={styles.trendinglocations}>
              <Ionicons name="location-outline" color="white" size={15} />
              <Text style={styles.trendinglocationsText}>{props?.country}</Text>
            </View>
            <Text style={styles.trendinglocationsText}>
              {props?.visits} visits
            </Text>
          </View>
        </LinearGradient> */}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default TrendingLocationsCard;

const styles = StyleSheet.create({
  trendingCard: {
    width: windowWidth / 1.1,
    height: windowHeight / 3,
    borderRadius: 16,
    margin: 20,
    // backgroundColor: 'red',
    marginBottom: 10,
  },
  trendingCardImage: {
    width: windowWidth / 1.1,
    height: windowHeight / 3,
    borderRadius: 20,
  },
  heartIcon: {
    // justifyContent: "flex-end",
    backgroundColor: '#3D3D3D99',
    alignItems: 'flex-end',
    width: 35,
    borderRadius: 40,
    padding: 6,
    alignContent: 'flex-end',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  trandingInfo: {
    // backgroundColor: "red",
    padding: 6,
    position: 'absolute',
    top: windowHeight / 4.4,
    left: 10,
  },
  trendingInfoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  trendinglocations: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    color: 'white',
  },
  gradient: {
    position: 'absolute',
    // top: windowHeight / 3.35,
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    height: windowHeight / 3,
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
    borderRadius: 20,
    padding: 15,
    justifyContent: 'flex-end',
  },
  trendinglocationsText: {
    color: 'white',
  },
});
