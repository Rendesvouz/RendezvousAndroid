import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../themes/themes';
import {formatDateTime, formatToUSD} from '../../Library/Common';
import {useTheme} from '../../Context/ThemeContext';

const TransactionsCard = ({props}) => {
  const {theme} = useTheme();

  return (
    <TouchableOpacity
      style={[styles.transactionCard, {borderColor: theme?.borderColor}]}>
      <View style={styles.iconContainer}>
        <Ionicons name="arrow-up-outline" color={COLORS.success} size={20} />
      </View>
      <View style={styles.transactionCardDetails}>
        <View style={styles.transactionInfo}>
          <Text numberOfLines={1} style={styles.transactionTitle}>
            {props?.description}
          </Text>
          <Text style={styles.transactionPrice}>
            {formatToUSD(props?.amount)}
          </Text>
        </View>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionDesc}>
            {formatDateTime(props?.createdAt)}
          </Text>
          <Text style={{color: COLORS.success, fontSize: 12}}>Successful</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionsCard;

const styles = StyleSheet.create({
  transactionCard: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    borderRadius: 16,
    height: 72,
    borderWidth: 1,
    borderColor: COLORS.appGrey4,
    marginBottom: 10,
  },
  iconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: COLORS.successBg,
  },
  transactionCardDetails: {
    // flexDirection: 'row',
    marginLeft: 10,
    width: windowWidth / 1.3,
    // backgroundColor: 'green',
    height: windowHeight / 22,
    justifyContent: 'space-between',
  },
  transactionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionTitle: {
    color: COLORS.appGrey2,
    fontWeight: '400',
    fontSize: 16,
    width: windowWidth / 1.7,
  },
  transactionDesc: {
    color: COLORS.appGrey2,
    fontWeight: '400',
    fontSize: 12,
  },
  transactionPrice: {
    color: '#4B5563',
    fontSize: 16,
    fontWeight: '500',
  },
});
