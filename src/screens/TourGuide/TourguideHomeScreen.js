import {
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

import SafeAreaViewComponent from '../../components/common/SafeAreaViewComponent';
import SearchBar from '../../components/search/SearchBar';
import TrendingLocationsCard from '../../components/cards/TrendingLocationsCard';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import ScrollViewSpace from '../../components/common/ScrollViewSpace';
import axiosInstance from '../../utils/api-client';
import {saveTourLocations} from '../../redux/features/user/userSlice';
import {COLORS} from '../../themes/themes';
import HeaderTitle from '../../components/common/HeaderTitle';
import {useTheme} from '../../Context/ThemeContext';

const trendingLocations = [
  {
    id: 1,
    location: 'Paris',
    country: 'France',
    visits: '3445',
    backgroundImage: require('../../assets/paris.png'),
  },
  // {
  //   id: 2,
  //   location: 'Oslo',
  //   country: 'Norway',
  //   visits: '3445',
  //   backgroundImage: require('../../assets/norway.png'),
  // },
  {
    id: 3,
    location: 'Dubai',
    country: 'Dubai',
    visits: '3445',
    backgroundImage: require('../../assets/dubai.png'),
  },
  // {
  //   id: 4,
  //   location: 'Barcelona',
  //   country: 'Spain',
  //   visits: '3445',
  //   backgroundImage: require('../../assets/barcelona.jpg'),
  // },
];

const TourguideHomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const {theme} = useTheme();

  const userProfle = state?.user?.user?.profile;
  const reduxToursLocations = state?.user?.toursLocations;

  console.log('userProfle', userProfle, reduxToursLocations);

  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  // seasrch feature
  const [clicked, setClicked] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [tourLocations, setTourLocations] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  console.log('filteredDataSource', filteredDataSource);

  const getAllTourLocations = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('tour-guide/all-offerings');
      console.log('getAllTourLocations res', res?.data);

      if (res?.data?.data) {
        const locations = res.data.data;

        // Fetch profiles for each tour location
        const enrichedLocations = await Promise.all(
          locations.map(async location => {
            try {
              const profileRes = await axiosInstance.get(
                `profile/tourguide-public/${location?.tourguide_id}`,
              );
              console.log('ppp', profileRes?.data?.data);
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

        console.log('enrichedLocations', enrichedLocations);

        dispatch(saveTourLocations(enrichedLocations));
        setFilteredDataSource(enrichedLocations);
        setTourLocations(enrichedLocations);
      }
    } catch (error) {
      console.log('getAllTourLocations error', error);
    } finally {
      setLoading(false);
    }
  };

  const getAllBookedTours = async () => {
    setLoading(true);
    try {
      await axiosInstance({
        url: 'tour-guide/all-user-books',
        method: 'GET',
      }).then(async res => {
        console.log('getAllBookedTours res', res);
        if (res?.data?.data) {
          const locations = res?.data?.data;

          // Fetch profiles for each tour location
          const enrichedLocations = await Promise.all(
            locations?.map(async location => {
              try {
                const profileRes = await axiosInstance.get(
                  `profile/tourguide-public/${location?.tourguide_id}`,
                );
                console.log('ppp', profileRes?.data?.data);
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

          console.log('enrichedLocations', enrichedLocations);
        }
      });
    } catch (error) {
      console.log('getAllBookedTours error', error?.response);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getAllTourLocations();
      getAllBookedTours();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter locations based on search text
  const searchFilterFunction = text => {
    if (text) {
      const newData = tourLocations?.filter(cur => {
        const itemData = cur?.city ? cur?.city.toLowerCase() : ''.toLowerCase();
        const textData = text.toLowerCase();
        return itemData?.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearchText(text);
    } else {
      setFilteredDataSource(tourLocations);
      setSearchText(text);
    }
  };

  const onRefresh = useCallback(() => {
    setLoading(true);
    getAllTourLocations();
  }, []);

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={'arrow-back-outline'}
        onLeftIconPress={() => {
          // navigation.navigate('Home', {screen: 'HomeScreen'});
          navigation.navigate("BookingScreen");
        }}
        headerTitle={'Tours'}
        rightIcon={'calendar-outline'}
        onRightIconPress={() => {
          navigation.navigate('BookedToursScreen', appointments);
        }}
      />
      <View style={{padding: 20}}>
        <Text style={[styles.tourHeaderText, {color: theme?.text}]}>
          Discover Your Next Adventure
        </Text>
        <Text style={[styles.toursubHeaderText, {color: theme?.text}]}>
          Find the perfect guide for your journey
        </Text>
      </View>
      <SearchBar
        searchPlaceholder={'Search locations'}
        searchPhrase={searchText}
        clicked={clicked}
        setClicked={setClicked}
        setSearchPhrase={text => {
          setSearchText(text);
          searchFilterFunction(text);
        }}
      />
      <View
        style={{
          padding: 10,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Text style={styles.trendingLocationText}>Trending locations</Text>
        <Ionicons name="ellipsis-vertical-outline" size={20} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            tintColor={COLORS.rendezvousRed}
            style={{zIndex: 999}}
          />
        }>
        {!searchText ? (
          trendingLocations?.map((cur, i) => (
            <TrendingLocationsCard
              key={i}
              props={cur}
              onPress={() => {
                const matchedData = tourLocations?.filter(
                  item =>
                    item?.city?.toLowerCase() ===
                      cur?.location?.toLowerCase() ||
                    item?.places?.toLowerCase() ===
                      cur?.location?.toLowerCase(),
                );

                // setSearchText(cur?.location);
                // setClicked(true);
                // searchFilterFunction(cur?.location);

                navigation.navigate('TourPlaces', {
                  place: cur?.location,
                  placesArrayData: matchedData,
                });
              }}
            />
          ))
        ) : filteredDataSource.length > 0 ? (
          filteredDataSource?.map((cur, i) => (
            <TrendingLocationsCard
              key={i}
              props={{
                ...cur,
                backgroundImage: cur.backgroundImage
                  ? cur.backgroundImage
                  : require('../../assets/skyImage.png'),
                location: cur?.places,
                country: cur?.city,
                visits: 1200,
              }}
              onPress={() => {
                navigation.navigate('TourPlaces', {
                  place: filteredDataSource[0]?.city,
                  placesArrayData: filteredDataSource,
                });
              }}
            />
          ))
        ) : (
          <Text style={styles.noData}>No locations found</Text>
        )}
        <ScrollViewSpace />
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default TourguideHomeScreen;

const styles = StyleSheet.create({
  tourHeaderText: {
    fontSize: 18,
    fontWeight: '700',
  },
  toursubHeaderText: {
    fontSize: 14,
    marginTop: 10,
  },
  trendingLocationText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  noData: {
    fontWeight: '700',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: 40,
  },
});
