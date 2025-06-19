import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../themes/themes';
import FormButton from '../form/FormButton';
import {
  extractDuration,
  extractJustTime,
  formatToUSD,
} from '../../Library/Common';
import FlightBookingBtn from '../form/FlightBookingBtn';
import {useTheme} from '../../Context/ThemeContext';

const FlightListingCard = ({
  props,
  destinationProps,
  onPress,
  onBookingPress,
}) => {
  const {theme} = useTheme();

  console.log('pppp', props, destinationProps);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.flightListingCard, {borderColor: theme?.borderColor}]}>
      <View
        style={[styles.flightInfo, {borderBottomColor: theme?.borderColor}]}>
        <View style={styles.flightInfo1}>
          <Text style={[styles.flightAirline, {color: theme?.text}]}>
            {props?.validatingAirlineDetails?.[0]?.businessName}
          </Text>
          <Text style={styles.flightPrice}>
            {formatToUSD(props?.price?.grandTotal)}
          </Text>
        </View>
      </View>

      <View
        style={{
          padding: 10,
          borderWidth: 1,
          borderColor: theme?.borderColor,
          borderRadius: 8,
          marginBottom: 10,
        }}>
        <Text style={styles.itenaryMain}>Depart</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            marginBottom: 10,
            backgroundColor: theme?.background,
            padding: 10,
          }}>
          <View style={{justifyContent: 'space-between'}}>
            <Text style={[styles.flightTime, {color: theme?.text}]}>
              {extractJustTime(
                props?.itineraries?.[0]?.segments?.[0]?.departure?.at,
              )}
            </Text>
            <Text style={{color: theme?.text}}>
              {destinationProps?.flightSearchFrom?.address?.cityName}
            </Text>
          </View>
          <View style={{justifyContent: 'space-between'}}>
            <Text style={{color: theme?.text}}>
              {extractDuration(props?.itineraries?.[0]?.duration)}
            </Text>
            <Text style={{color: theme?.text}}>
              {props?.itineraries?.[0]?.segments?.[0]?.length}
            </Text>
          </View>
          <View style={{justifyContent: 'space-between'}}>
            <Text style={[styles.flightTime, {color: theme?.text}]}>
              {extractJustTime(
                props?.itineraries?.[0]?.segments?.[0]?.arrival?.at,
              )}
            </Text>
            <Text style={{color: theme?.text}}>
              {destinationProps?.flightSearchTo?.address?.cityName}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          padding: 10,
          borderWidth: 1,
          borderColor: theme?.borderColor,
          borderRadius: 8,
        }}>
        <Text style={styles.itenaryMain}>Return</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            marginBottom: 10,
            backgroundColor: theme?.background,
            padding: 10,
          }}>
          <View style={{justifyContent: 'space-between'}}>
            <Text style={[styles.flightTime, {color: theme?.text}]}>
              {extractJustTime(
                props?.itineraries?.[1]?.segments?.[0]?.departure?.at,
              )}
            </Text>
            <Text style={{color: theme?.text}}>
              {destinationProps?.flightSearchTo?.address?.cityName}
            </Text>
          </View>
          <View style={{justifyContent: 'space-between'}}>
            <Text style={{color: theme?.text}}>
              {extractDuration(props?.itineraries?.[1]?.duration)}
            </Text>
            <Text style={{color: theme?.text}}>
              {props?.itineraries?.[1]?.segments?.[0]?.length}
            </Text>
          </View>
          <View style={{justifyContent: 'space-between'}}>
            <Text style={[styles.flightTime, {color: theme?.text}]}>
              {extractJustTime(
                props?.itineraries?.[1]?.segments?.[0]?.arrival?.at,
              )}
            </Text>
            <Text style={{color: theme?.text}}>
              {destinationProps?.flightSearchFrom?.address?.cityName}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <TouchableOpacity activeOpacity={0.9}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: COLORS.rendezvousRed,
            }}>
            View More
          </Text>
        </TouchableOpacity>
        <FlightBookingBtn
          width={3}
          title={'Book Now'}
          onPress={onBookingPress}
        />
      </View>
    </TouchableOpacity>
  );
};

export default FlightListingCard;

const styles = StyleSheet.create({
  flightListingCard: {
    padding: 10,
    width: windowWidth / 1.1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.appGrey,
    marginBottom: 20,
  },
  flightInfo: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.appGrey,
    marginBottom: 10,
    padding: 5,
  },
  flightInfo1: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flightAirline: {
    fontSize: 16,
    fontWeight: '500',
  },
  flightPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.acceptedColor,
  },
  flightTime: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  itenaryMain: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.appGrey5,
  },
});
