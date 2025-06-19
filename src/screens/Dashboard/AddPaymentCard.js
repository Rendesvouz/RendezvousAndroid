import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import SafeAreaViewComponent from '../../components/common/SafeAreaViewComponent';
import HeaderTitle from '../../components/common/HeaderTitle';
import HeaderText from '../../components/common/HeaderText';
import {windowWidth} from '../../utils/Dimensions';
import FormInput from '../../components/form/FormInput';
import {
  formatCardNumber,
  formatExpiryDate,
  isDateExpired,
} from '../../Library/Common';
import ScrollViewSpace from '../../components/common/ScrollViewSpace';
import FixedBottomContainer from '../../components/common/FixedBottomContainer';
import FormButton from '../../components/form/FormButton';

const AddPaymentCard = ({navigation}) => {
  const [cardName, setCardName] = useState('');
  const [cardExpiration, setCardExpiration] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardCVV, setCardCVV] = useState('');

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={'arrow-back-outline'}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />
      <HeaderText headerTitle={'Add Card'} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 10}}>
        <View style={styles.cardContainer}>
          <View style={styles.rowCard}>
            <Text style={styles.text}>Credit Card</Text>
            <Image
              source={require('../../assets/1.jpg')}
              style={styles.mastercardLogo}
            />
          </View>
          <Text style={styles.cardNumber}>{formatCardNumber(cardNumber)}</Text>

          <View style={styles.rowCard}>
            <Text style={styles.text}>{cardName}</Text>
            <Text style={styles.text}>{cardExpiration}</Text>
          </View>
        </View>

        <FormInput
          formInputTitle={'Card Holder Name'}
          keyboardType={'default'}
          value={cardName}
          onChangeText={txt => {
            setCardName(txt);
          }}
        />
        <FormInput
          formInputTitle={'Card Number'}
          keyboardType={'numeric'}
          value={formatCardNumber(cardNumber)}
          onChangeText={txt => {
            const cleanedText = txt.replace(/\s+/g, '');
            if (cleanedText.length <= 16) {
              setCardNumber(cleanedText);
            }
          }}
        />
        <View style={styles.cvvSection}>
          <FormInput
            formInputTitle={'Expiry Date'}
            width={2.5}
            formWidth={windowWidth / 2.5}
            keyboardType={'numeric'}
            value={cardExpiration}
            onChangeText={txt => {
              const formattedDate = formatExpiryDate(txt);
              setCardExpiration(formattedDate);

              if (formattedDate.length === 5 && isDateExpired(formattedDate)) {
                Alert.alert('The card is expired');
              }
            }}
          />
          <FormInput
            formInputTitle={'CVV'}
            keyboardType={'numeric'}
            value={cardCVV}
            formWidth={windowWidth / 2.5}
            onChangeText={txt => {
              if (txt.length <= 3) {
                setCardCVV(txt);
              }
            }}
            width={2.5}
          />
        </View>
        <ScrollViewSpace />
      </ScrollView>
      <FixedBottomContainer>
        <FormButton
          title={'Add Card'}
          onPress={() => {
            navigation.navigate('OrderSummary');
          }}
        />
      </FixedBottomContainer>
    </SafeAreaViewComponent>
  );
};

export default AddPaymentCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: windowWidth / 1.05,
    height: 220,
    borderRadius: 12,
    padding: 20,
    backgroundColor: 'black',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  rowCard: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mastercardLogo: {
    width: 54,
    height: 30,
    objectFit: 'contain',
  },
  text: {
    color: 'white',
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: '400',
    color: 'white',
  },
  cvvSection: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    // backgroundColor: 'red',
    width: windowWidth / 1.1,
    justifyContent: 'space-between',
    alignContent: 'center',
    marginLeft: 10,
  },
});
