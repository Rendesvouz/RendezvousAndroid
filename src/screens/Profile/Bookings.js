import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import SafeAreaViewComponent from '../../components/common/SafeAreaViewComponent';
import HeaderTitle from '../../components/common/HeaderTitle';
import HeaderText from '../../components/common/HeaderText';
import CategorySticker from '../../components/common/CategorySticker';
import {windowWidth} from '../../utils/Dimensions';
import TransparentBtn from '../../components/form/TransparentBtn';
import BookingCard from '../../components/cards/BookingCard';

const Tab = createMaterialTopTabNavigator();

const dummyData = [
  {
    id: 1,
    jobTitle: 'Cleaning Service',
    vendor: 'Tinubu',
    price: '$130',
    service: 'Cleaning',
    image: require('../../assets/2.jpg'),
  },
  {
    id: 2,
    jobTitle: 'Cleaning Service',
    vendor: 'Tinubu',
    price: '$130',
    service: 'Cleaning',
    image: require('../../assets/2.jpg'),
  },
];

const PendingComponent = () => {
  return (
    <View style={{padding: 5}}>
      {dummyData.map((cur, i) => (
        <BookingCard
          key={i}
          imageSource={cur.image}
          servicceTitle={cur.jobTitle}
          servicePrice={cur.price}
          serviceType={cur.service}
          vendorName={cur.vendor}
        />
      ))}
    </View>
  );
};

const Bookings = ({navigation}) => {
  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={'arrow-back-outline'}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />
      <HeaderText headerTitle={'My Bookings'} />

      <Tab.Navigator>
        <Tab.Screen name="New" component={PendingComponent} />
        <Tab.Screen name="Pending" component={PendingComponent} />
        <Tab.Screen name="Completed" component={PendingComponent} />
      </Tab.Navigator>
      <Text>Bookings</Text>
    </SafeAreaViewComponent>
  );
};

export default Bookings;

const styles = StyleSheet.create({
  bookingCard: {
    width: 382,
    height: 167,
    backgroundColor: 'red',
    padding: 10,
  },
  cardContents: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  cardImage: {
    width: 93,
    height: 93,
    borderRadius: 8,
    marginRight: 10,
  },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginBottom: 10,
    display: 'flex',
    width: windowWidth / 1.8,
  },
  serviceName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '600',
  },
});
