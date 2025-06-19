import {StyleSheet, ScrollView, Text, View} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import SafeAreaViewComponent from '../../../components/common/SafeAreaViewComponent';
import HeaderTitle from '../../../components/common/HeaderTitle';
import ScrollViewSpace from '../../../components/common/ScrollViewSpace';

const HotelsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  console.log('state', state);

  const loggedInUser = state?.user?.user;
  console.log('loggedInUser', loggedInUser);

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        headerTitle={'Flights Booking'}
        leftIcon={'arrow-back-outline'}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 20}}>
        <ScrollViewSpace />
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default HotelsScreen;

const styles = StyleSheet.create({});
