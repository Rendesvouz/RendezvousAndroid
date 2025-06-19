import {StyleSheet, ScrollView, Image, Text, View} from 'react-native';
import React, {useState} from 'react';
import Toast from 'react-native-toast-message';

import SafeAreaViewComponent from '../../../components/common/SafeAreaViewComponent';
import HeaderTitle from '../../../components/common/HeaderTitle';
import FixedBottomContainer from '../../../components/common/FixedBottomContainer';
import FormButton from '../../../components/form/FormButton';
import axiosInstance from '../../../utils/api-client';
import {RNToast} from '../../../Library/Common';
import ScrollViewSpace from '../../../components/common/ScrollViewSpace';
import FormInput from '../../../components/form/FormInput';
import {windowHeight, windowWidth} from '../../../utils/Dimensions';

const GiftCardDetails = ({navigation, route}) => {
  const item = route?.params;
  console.log('eee', item);

  const [loading, setLoading] = useState(false);

  const [amount, setAmount] = useState('');
  const [receiver, setReceiver] = useState('');
  const [receiverNumber, setReceiverNumber] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');

  // Error states
  const [formError, setFormError] = useState('');
  const [amountError, setAmountError] = useState('');
  const [receiverError, setReceiverError] = useState('');
  const [receiverNumberError, setReceiverNumberError] = useState('');
  const [senderNameError, setSenderNameError] = useState('');
  const [messageError, setMessageError] = useState('');

  const buyGiftCard = async () => {
    const giftcardData = {
      cardId: item?.productId,
      amount: amount,
      recipientEmail: receiver,
      recipientPhone: receiverNumber,
      senderName: senderName,
      customMessage: message,
    };

    if (!amount) {
      setAmountError('Please provide an amount');
    } else if (!receiver) {
      setReceiverError('Please provide your recipient email');
    } else if (!receiverNumber) {
      setReceiverNumberError('Please provide your recipients phone number');
    } else if (!senderName) {
      setSenderNameError('Please provide your sender name');
    } else if (!message) {
      senderNameError('Please provide a custom message');
    } else {
      setLoading(true);

      try {
        await axiosInstance({
          url: 'gift-card/purchase',
          method: 'POST',
          data: giftcardData,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(res => {
            console.log('buyGiftCard res', res);
            setLoading(false);

            RNToast(Toast, 'Great, your giftcard has been purchased');
            navigation.navigate('GiftCardScreen');
          })
          .catch(err => {
            console.log('buyGiftCard err', err?.response);
            setLoading(false);
            setFormError('An error occured while purchasing your giftcard');
          });
      } catch (error) {
        console.log('buyGiftCard error', error?.response);
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        headerTitle={item?.name}
        leftIcon={'arrow-back-outline'}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 10}}>
        <Image
          style={styles.detailsMainImage}
          source={{uri: item?.logoUrls[0]}}
        />
        <FormInput
          formInputTitle={'Amount'}
          placeholder={''}
          value={amount}
          onChangeText={txt => {
            setAmount(txt);
            setFormError('');
            setAmountError('');
          }}
          errorMessage={amountError}
        />
        <FormInput
          formInputTitle={'To'}
          placeholder="jane@gmail.com"
          value={receiver}
          onChangeText={txt => {
            setReceiver(txt);
            setFormError('');
            setReceiverError('');
          }}
          errorMessage={receiverError}
        />
        <FormInput
          formInputTitle={'Recipient Number'}
          placeholder="0987654321"
          value={receiverNumber}
          onChangeText={txt => {
            setReceiverNumber(txt);
            setFormError('');
            setReceiverNumberError('');
          }}
          errorMessage={receiverNumberError}
        />
        <FormInput
          formInputTitle={'From'}
          placeholder=""
          keyboardType={'default'}
          value={senderName}
          width={1.1}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={txt => {
            setSenderName(txt);
            setFormError('');
            setSenderNameError('');
          }}
          errorMessage={senderNameError}
        />
        <FormInput
          formInputTitle={'Custom Message'}
          placeholder=""
          keyboardType={'default'}
          value={message}
          width={1.1}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={txt => {
            setMessage(txt);
            setFormError('');
            setMessageError('');
          }}
          errorMessage={messageError}
          numberOfLines={5}
          multiLine={true}
          height={100}
        />
        <ScrollViewSpace />
      </ScrollView>

      {/* Buttons */}
      <FixedBottomContainer top={1.19}>
        <FormButton
          title={'Buy Now'}
          width={1.1}
          onPress={buyGiftCard}
          formError={formError}
          loading={loading}
          disabled={loading}
        />
      </FixedBottomContainer>
    </SafeAreaViewComponent>
  );
};

export default GiftCardDetails;

const styles = StyleSheet.create({
  detailsMainImage: {
    width: windowWidth / 1.05,
    height: windowHeight / 5,
    marginRight: 6,
    borderRadius: 20,
    marginBottom: 20,
  },
});
