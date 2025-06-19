import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import SafeAreaViewComponent from '../components/common/SafeAreaViewComponent';
import axiosInstance from '../utils/api-client';
import HeaderTitle from '../components/common/HeaderTitle';
import NotificationsCard from '../components/cards/NotificationsCard';
import ScrollViewSpace from '../components/common/ScrollViewSpace';
import {useTheme} from '../Context/ThemeContext';

const NotificationsScreen = ({navigation}) => {
  const {theme} = useTheme();

  const [loading, setLoading] = useState(false);

  const [notifications, setNotifications] = useState();

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      await axiosInstance({
        url: 'notifications',
        method: 'GET',
      })
        .then(res => {
          console.log('fetchNotifications res', res?.data);
          setLoading(false);

          setNotifications(res?.data?.data?.notifications);
        })
        .catch(err => {
          console.log('fetchNotifications err', err);
          setLoading(false);
        });
    } catch (error) {
      console.log('fetchNotifications error', error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchNotifications();
    }

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        headerTitle={'Notifications'}
        leftIcon={'arrow-back-outline'}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 10}}>
        {loading ? (
          <Text style={[styles.loadingText, {color: theme?.text}]}>
            Please wait while we fetch your data
          </Text>
        ) : (
          notifications?.map((cur, i) => (
            <NotificationsCard key={i} props={cur} />
          ))
        )}

        <ScrollViewSpace />
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  loadingText: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
});
