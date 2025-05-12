import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SafeAreaViewComponent from '../../components/common/SafeAreaViewComponent';
import HeaderTitle from '../../components/common/HeaderTitle';
import HeaderText from '../../components/common/HeaderText';
import CategorySticker from '../../components/common/CategorySticker';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../themes/themes';
import FormButton from '../../components/form/FormButton';
import FixedBottomContainer from '../../components/common/FixedBottomContainer';

const OrderSummary = ({navigation}) => {
  const SummaryCard = ({title, value}) => {
    return (
      <View style={styles.Q}>
        <Text style={styles.summaryQ}>{title}</Text>
        <Text style={styles.summaryA}>{value}</Text>
      </View>
    );
  };
  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={'arrow-back-outline'}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />
      <HeaderText headerTitle={'Review Summary'} />

      <View style={{padding: 20}}>
        <View style={styles.serviceDetails}>
          <Image
            source={require('../../assets/1.jpg')}
            style={styles.serviceImage}
          />
          <View>
            <View style={styles.serviceSection}>
              <Text style={styles.serviceName}>Car Washing</Text>
              <CategorySticker
                categoryName={'Cleaning'}
                style={{marginBottom: 10}}
              />
            </View>
            <View style={styles.serviceSection}>
              <Text>Tunde Ednut</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Ionicons name="star" size={15} color={'gold'} />
                <Text>4.3</Text>
              </View>
            </View>
            <Text style={styles.servicePrice}>$45</Text>
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <SummaryCard
            title={'Reservation Date'}
            value={'August 28, 2024 | 11:00AM'}
          />
          <SummaryCard title={'Reservation for'} value={'Mary Bethelheim'} />
          <SummaryCard title={'Amount'} value={'$150'} />
          <SummaryCard title={'Tax + Fees'} value={'$20'} />
          <SummaryCard title={'Total'} value={'$170'} />
        </View>
      </View>
      <FixedBottomContainer>
        <FormButton
          title={'Continue'}
          onPress={() => {
            navigation.navigate('OrderSuccessful');
          }}
        />
      </FixedBottomContainer>
    </SafeAreaViewComponent>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceImage: {
    width: 116,
    height: 116,
    borderRadius: 14,
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
  serviceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    display: 'flex',
    width: windowWidth / 1.8,
  },
  Q: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: windowHeight / 15,
    alignContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'black',
  },
  summaryQ: {
    color: COLORS.ndonuGrey,
    // fontWeight: '500',
    fontSize: 14,
    // backgroundColor: 'red',
    // width: windowWidth / 1.3,
  },
  summaryA: {
    color: '#000',
    fontWeight: '500',
    fontSize: 16,
  },
});
