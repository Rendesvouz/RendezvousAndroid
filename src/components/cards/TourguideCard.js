import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {Rating} from 'react-native-ratings';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../themes/themes';
import {formatToUSD} from '../../Library/Common';
import {useTheme} from '../../Context/ThemeContext';

const TourguideCard = ({onPress, props}) => {
  const {theme} = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[styles.tourcard, {borderColor: theme?.borderColor}]}>
      <Image
        source={{
          uri: props?.offeringData
            ? props?.offeringData?.pictures[0]
            : props?.pictures[0],
        }}
        style={styles.tourcardImage}
      />
      <View style={styles.tourguideProfile}>
        <View style={styles.tourguideProfileInfo}>
          <Image
            source={{uri: props?.tourguideProfile?.profile_pictures[0]}}
            style={styles.tourguideProfileImage}
          />
          <Text style={[styles.tourguideProfileName, {color: theme?.text}]}>
            {props?.tourguideProfile?.fullname}
          </Text>
        </View>
        <View style={styles.tourguideProfileInfo}>
          <Text style={{color: theme?.text}}>0</Text>
          <Rating
            defaultRating={0}
            imageSize={17}
            style={{
              //   backgroundColor: "black",
              marginTop: 10,
              marginBottom: 10,
              justifyContent: 'flex-start',
              //   width: windowWidth / 4,
              //   marginLeft: 5,
              //   marginRight: 10,
            }}
            ratingBackgroundColor="red"
            tintColor="white"
            startingValue={4}
            minValue={3}
            ratingCount={1}
            readonly={true}
            unSelectedColor="red"
            starContainerStyle={{color: 'red'}}
          />
          <Text style={{color: theme?.text}}>(0 reviews)</Text>
        </View>
      </View>
      <Text numberOfLines={2} style={styles.tourguideDescription}>
        {props?.offeringData
          ? props?.offeringData?.description
          : props?.description}
      </Text>
      <View style={styles.tourguideProfile2}>
        <Ionicons
          name="location-outline"
          size={15}
          style={{marginRight: 6}}
          color={theme?.text}
        />
        <Text style={{color: theme?.text}}>
          {props?.offeringData ? props?.offeringData?.city : props?.city}
        </Text>
      </View>
      <View style={styles.tourguideProfile2}>
        <Ionicons
          name="time-outline"
          size={15}
          style={{marginRight: 6}}
          color={theme?.text}
        />
        <Text style={{color: theme?.text}}>
          {props?.offeringData
            ? props?.offeringData?.duration
            : props?.duration}{' '}
          hours
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={[styles.tourPrice, {color: theme?.text}]}>
          {formatToUSD(props?.price)}{' '}
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: COLORS.rendezvousBlack2,
            }}>
            / person
          </Text>
        </Text>
        {props?.status && (
          <View
            style={[
              styles.statusCard,
              {
                backgroundColor:
                  props?.status == 'request'
                    ? COLORS.pendingBgColor
                    : props?.status == 'scheduled'
                    ? COLORS.acceptedBgColor
                    : COLORS.declinedBgColor,
              },
            ]}>
            <Text
              style={[
                styles.statusText,
                {
                  color:
                    props?.status == 'request'
                      ? COLORS.pendingColor
                      : props?.status == 'scheduled'
                      ? COLORS.acceptedColor
                      : COLORS.declinedColor,
                },
              ]}>
              {props?.status == 'request'
                ? 'Pending'
                : props?.status == 'scheduled'
                ? 'Accepted'
                : 'Declined'}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default TourguideCard;

const styles = StyleSheet.create({
  tourcard: {
    width: windowWidth / 1.05,
    // height: windowHeight / 2.8,
    // backgroundColor: "red",
    padding: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.appGrey,
    marginBottom: 20,
  },
  tourcardImage: {
    width: windowWidth / 1.12,
    height: windowHeight / 7,
    objectFit: 'cover',
    borderRadius: 10,
    // marginBottom: 10,
  },
  tourguideProfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  tourguideProfileInfo: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  tourguideProfileImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 6,
  },
  tourguideProfileName: {
    fontSize: 18,
    fontWeight: '500',
  },
  tourguideDescription: {
    color: COLORS.rendezvousBlack2,
    fontWeight: '500',
    fontSize: 14,
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
  statusCard: {
    padding: 5,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
  },
});
