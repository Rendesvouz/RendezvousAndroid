import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../themes/themes';
import {timeAgo} from '../../Library/Common';
import {useTheme} from '../../Context/ThemeContext';

const NotificationsCard = ({props}) => {
  const {theme} = useTheme();

  return (
    <TouchableOpacity activeOpacity={0.9} style={[styles.notificationCard, {borderColor: theme?.borderColor}]}>
      <View
        style={{
          // padding: 10,
          backgroundColor: '#F7F7F7',
          borderRadius: 30,
          marginRight: 10,
          height: 40,
          width: 40,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        {props?.type == 'funds' ? (
          <Ionicons name={'cash-outline'} size={20} />
        ) : props?.type == 'order' ? (
          <MaterialCommunityIcons name="truck-delivery-outline" size={20} />
        ) : props?.type == 'appointment' ? (
          <Ionicons name="calendar-outline" size={20} />
        ) : props?.type == 'session_started' ? (
          <Ionicons name="videocam-outline" size={20} />
        ) : (
          <Ionicons name={'cash-outline'} size={20} />
        )}
      </View>

      <View style={styles.notifcationContent}>
        <View style={styles.notifcationHeader}>
          <Text style={styles.notifcationHeaderText}>
            {props?.type == 'funds'
              ? 'Transaction Occured'
              : props?.type == 'appointment'
              ? 'Booked Appointment'
              : props?.type == 'session_started'
              ? 'Session Commenced'
              : 'Payment Confirmed! 🎉'}
          </Text>
          <Text style={styles.notificationTime}>
            {timeAgo(props?.createdAt)}
          </Text>
        </View>
        <Text numberOfLines={2} style={styles.notifcationDescription}>
          {props?.message}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationsCard;

const styles = StyleSheet.create({
  notificationCard: {
    width: windowWidth / 1.05,
    // backgroundColor: "red",
    padding: 10,
    borderRadius: 16,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.appGrey4,
    marginBottom: 5,
  },
  notifcationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  notificationTime: {
    fontStyle: 'italic',
    fontWeight: '300',
    fontSize: 12,
  },
  notifcationContent: {
    width: windowWidth / 1.3,
    // backgroundColor: "green",
  },
  notifcationHeaderText: {
    fontWeight: '500',
    fontSize: 16,
    color: COLORS.rendezvousBlack2,
  },
  notifcationDescription: {
    color: COLORS.appGrey2,
    fontSize: 14,
    lineHeight: 20,
  },
});
