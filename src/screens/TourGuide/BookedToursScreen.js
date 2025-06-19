import {StyleSheet, Text, View, ScrollView, RefreshControl} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import SafeAreaViewComponent from '../../components/common/SafeAreaViewComponent';
import HeaderTitle from '../../components/common/HeaderTitle';
import ScrollViewSpace from '../../components/common/ScrollViewSpace';
import axiosInstance from '../../utils/api-client';
import {COLORS} from '../../themes/themes';
import TourguideBookedCard from '../../components/cards/TourguideBookedCards';
import {useTheme} from '../../Context/ThemeContext';

const BookedToursScreen = ({navigation}) => {
  const {theme} = useTheme();

  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const getAllBookedTours = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('tour-guide/all-user-books');

      const locations = res?.data?.data?.bookings;

      if (!locations) {
        return;
      }

      const enrichedLocations = await Promise.all(
        locations.map(async location => {
          try {
            const profileRes = await axiosInstance.get(
              `profile/tourguide-public/${location?.tourguide_id}`,
            );
            return {
              ...location,
              tourguideProfile: profileRes?.data?.data?.profile,
            };
          } catch (error) {
            console.error(
              `Error fetching profile for user ${location?.tourguide_id}`,
              error,
            );
            return {...location, tourguideProfile: null};
          }
        }),
      );

      const enrichedOfferingData = await Promise.all(
        enrichedLocations?.map(async offering => {
          try {
            const offeringRes = await axiosInstance.get(
              `tour-guide/offerings/${offering?.offering_id}`,
            );

            const offeringData = offeringRes?.data?.data;

            if (!offeringData) {
              console.warn(
                `No offering data found for ID ${offering?.offering_id}`,
              );
              return {...offering, offeringData: null};
            }

            return {
              ...offering,
              offeringData,
            };
          } catch (error) {
            console.error(
              `Error fetching offering for ID ${offering?.offering_id}`,
              error,
            );
            return {...offering, offeringData: null};
          }
        }),
      );

      console.log('enrichedOfferingData', enrichedOfferingData);
      console.log('enrichedLocations', enrichedLocations);
      setAppointments(enrichedOfferingData);
    } catch (error) {
      console.log('getAllBookedTours error', error?.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBookedTours();
  }, []);

  const onRefresh = useCallback(() => {
    setLoading(true);
    getAllBookedTours();
  }, []);

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={'arrow-back-outline'}
        onLeftIconPress={() => {
          navigation.navigate('TourguideScreen');
        }}
        rightIcon={''}
        headerTitle={'Booked Tours'}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 10}}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            tintColor={COLORS.rendezvousRed}
            style={{zIndex: 999}}
          />
        }>
        {loading ? (
          <Text style={[styles.loadingText, {color: theme?.text}]}>
            Please wait while we fetch your bookings
          </Text>
        ) : appointments?.length ? (
          appointments?.map((cur, i) => (
            <TourguideBookedCard
              key={i}
              props={cur}
              // onPress={() => {
              //   navigation.navigate('ToursDetailsScreen', cur);
              // }}
            />
          ))
        ) : (
          <Text style={[styles.noData, {color: theme?.text}]}>
            We dont have any tourguide appointment at the moment. You can browse
            through the list of tours and book one at your convenience
          </Text>
        )}
        <ScrollViewSpace />
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default BookedToursScreen;

const styles = StyleSheet.create({
  noData: {
    fontWeight: '400',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
  loadingText: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
});
