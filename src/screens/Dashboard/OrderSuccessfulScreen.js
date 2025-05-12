import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeAreaViewComponent from '../../components/common/SafeAreaViewComponent';
import FixedBottomContainer from '../../components/common/FixedBottomContainer';
import FormButton from '../../components/form/FormButton';
import {windowWidth} from '../../utils/Dimensions';
import { COLORS } from '../../themes/themes';

const OrderSuccessfulScreen = ({navigation}) => {
  return (
    <SafeAreaViewComponent>
      <FixedBottomContainer top={1.7}>
        <View
          style={{
            marginBottom: 20,
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
            width: windowWidth / 1.1,
          }}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: 24,
              fontWeight: '600',
              lineHeight: 24,
              textAlign: 'center',
              width: windowWidth / 1.1,
            }}>
            Congratulations
          </Text>
          <Text
            style={{
              color: '#1E1E1EB2',
              fontSize: 16,
              fontWeight: '400',
              textAlign: 'center',
              marginTop: 20,
              width: windowWidth / 1.3,
            }}>
            Your Home Cleaning Service Booked. You can check your history for
            more information.
          </Text>
        </View>
      </FixedBottomContainer>
      <FixedBottomContainer>
        <FormButton
          title={'View Receipt'}
          onPress={() => {
            navigation.navigate('OrderReceipt');
          }}
        />
      </FixedBottomContainer>
    </SafeAreaViewComponent>
  );
};

export default OrderSuccessfulScreen;

const styles = StyleSheet.create({});
