import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import PhoneInput from 'react-native-phone-number-input';

import SafeAreaViewComponent from '../../../components/common/SafeAreaViewComponent';
import HeaderTitle from '../../../components/common/HeaderTitle';
import ScrollViewSpace from '../../../components/common/ScrollViewSpace';
import FormInput from '../../../components/form/FormInput';
import {emailValidator, phoneValidator} from '../../../Library/Validation';
import {
  addDaysToDate,
  extractCallingCode,
  RNToast,
} from '../../../Library/Common';
import PickerSelect from '../../../components/pickerSelect/PickerSelect';
import {regularGender} from '../../../data/dummyData';
import FixedBottomContainer from '../../../components/common/FixedBottomContainer';
import FormButton from '../../../components/form/FormButton';
import axiosInstance from '../../../utils/api-client';
import {windowHeight, windowWidth} from '../../../utils/Dimensions';
import Toast from 'react-native-toast-message';
import {COLORS} from '../../../themes/themes';
import {useTheme} from '../../../Context/ThemeContext';

const FlightBookingScreen = ({navigation, route}) => {
  const item = route?.params;
  console.log('flightBooking', item);

  const {theme, isDarkMode} = useTheme();

  const dispatch = useDispatch();
  const state = useSelector(state => state);
  console.log('state', state);

  const [loading, setLoading] = useState(false);
  const phoneInput = useRef(null);

  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [phoneCountry, setPhoneCountry] = useState('US');

  const [gender, setGender] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [dateIcon, setDateIcon] = useState('calendar-outline');
  const [dateField, setDateField] = useState(new Date());
  const [open, setOpen] = useState(false);

  const maximumDate = addDaysToDate();
  const formattedDob = moment(dob, 'MMM D, YYYY').format('YYYY-MM-DD');

  console.log('phooo', formattedValue, value, phoneCountry, formattedDob);

  // Error states
  const [formError, setFormError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [dobError, setDobError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const flightBooking = async () => {
    const callingCode = extractCallingCode(formattedValue, value);

    const flightBookingData = {
      data: {
        type: 'flight-order',
        flightOffers: [item],
        travelers: [
          {
            id: '1',
            dateOfBirth: formattedDob,
            gender: gender?.toUpperCase(),
            name: {
              firstName: firstName,
              lastName: lastName,
            },
            contact: {
              emailAddress: email,
              phones: [
                {
                  deviceType: 'MOBILE',
                  countryCallingCode: callingCode,
                  number: value,
                },
              ],
            },
          },
        ],
        payments: [
          {
            type: 'balance',
            amount: item?.price?.grandTotal,
            currency: 'EUR',
            brand: 'VISA',
            flightOfferIds: [item?.id],
          },
        ],
      },
    };
    console.log('flightBookingData', flightBookingData);

    if (!gender) {
      setGenderError('Please provide your gender');
    } else if (!firstName) {
      setFirstNameError('Please provide your firstname');
    } else if (!lastName) {
      setLastNameError('Please provide your lastname');
    } else if (!email) {
      setEmailError('Please provide your valid email address');
    } else if (!dob) {
      setDobError('Please provide your date of birth');
    } else if (!value) {
      setPhoneNumberError('Please provide your phone number');
    } else {
      setLoading(true);
      try {
        await axiosInstance({
          url: 'reservation/flights/book',
          method: 'POST',
          data: flightBookingData,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(res => {
            console.log('flightBooking res', res);
            setLoading(false);

            RNToast(
              Toast,
              'Your flight booking has been confirmed and an email of your itenariy has been sent to you registered email address',
            );

            Alert.alert(
              'Flight Booking',
              'Your flight booking has been confirmed and an email of your itenariy has been sent to you registered email address',
            );
            navigation.navigate('BookingScreen');
          })
          .catch(err => {
            console.log('flightBooking err', err?.response);
            setLoading(false);
            RNToast(
              Toast,
              'An error occured while booking for flight, please try again later',
            );
            setFormError(
              'An error occured while booking for flight, please try again later',
            );

            const errorMessage = err?.response?.data?.error || '';

            if (
              errorMessage.includes('Current grandTotal price') &&
              errorMessage.includes('is different from request one')
            ) {
              Alert.alert(
                'Price Changed',
                'The flight price has changed. Please recheck the fares or choose another option.',
              );
              navigation.goBack();
            }
          });
      } catch (error) {
        console.log('flightBooking error', error?.response);
        setLoading(false);
        setFormError(
          'An error occured while booking for flight, please try again later',
        );
      }
    }
  };

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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 20}}>
        <PickerSelect
          items={regularGender}
          placeholder={'Select your gender'}
          formInputTitle={"What's your Gender ?"}
          onValueChange={value => {
            setGender(value);
            setFormError('');
            setGenderError('');
          }}
          errorMessage={genderError}
        />
        <FormInput
          formInputTitle={'First Name'}
          placeholder="Enter your first name"
          keyboardType={'default'}
          value={firstName}
          onChangeText={txt => {
            setFirstName(txt);
            setFormError('');
            setFirstNameError('');
          }}
          errorMessage={firstNameError}
        />
        <FormInput
          formInputTitle={'Last Name'}
          placeholder="Enter your last name"
          keyboardType={'default'}
          value={lastName}
          onChangeText={txt => {
            setLastName(txt);
            setFormError('');
            setLastNameError('');
          }}
          errorMessage={lastNameError}
        />

        <FormInput
          formInputTitle={'Email Address'}
          placeholder="Enter your email address"
          keyboardType={'email-address'}
          value={email}
          onChangeText={txt => {
            setEmail(txt);
            setFormError('');
            if (!emailValidator(txt)) {
              setEmailError('Please enter a valid email');
            } else {
              setEmailError('');
            }
          }}
          errorMessage={emailError}
        />

        <FormInput
          formInputTitle={'Date of Birth'}
          value={dateField}
          onChangeText={text => {
            setDateField(text);
            setDob(text);
            setDobError('');
            setFormError('');
          }}
          onPress={() => setOpen(true)}
          handlePasswordVisibility={() => setOpen(true)}
          rightIcon={dateIcon}
          iconColor="black"
          placeholder={moment(dateField)?.format('dddd, MMMM D, YYYY')}
          placeholderTextColor={theme?.text}
          width={1.1}
          errorMessage={dobError}
        />
        <DatePicker
          mode="date"
          modal
          maximumDate={maximumDate}
          open={open}
          date={dateField}
          onConfirm={date => {
            setOpen(false);
            setDateField(date);
            setDob(date);
            console.log('dddd', date);
            setDobError('');
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        {/* <FormInput
          formInputTitle={'Phone Number'}
          keyboardType={'number-pad'}
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChangeText={txt => {
            setPhoneNumber(txt);
            setPhoneNumberError('');
            setFormError('');
          }}
          errorMessage={phoneNumberError}
        /> */}

        <View style={styles.auth}>
          <Text style={[styles.inputTitle, {color: theme?.text}]}>
            Phone Number
          </Text>
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode={phoneCountry}
            layout="first"
            placeholderTextColor="#666"
            onChangeText={txt => {
              setValue(txt);
            }}
            onChangeCountry={country => {
              setPhoneCountry(country?.cca2);
            }}
            onChangeFormattedText={text => {
              setFormattedValue(text);
              setPhoneNumberError('');
              if (!phoneValidator(text)) {
                setPhoneNumberError('Please enter a valid phone number');
              } else {
                setPhoneNumberError('');
              }
            }}
            withDarkTheme={isDarkMode ? true : false}
            withShadow
            // autoFocus
            containerStyle={{
              backgroundColor: theme?.background,
              borderRadius: 5,
              width: windowWidth / 1.1,
              borderWidth: 1,
              borderColor: COLORS.appGrey2,
            }}
            textContainerStyle={{
              backgroundColor: theme?.background,
              height: windowHeight / 16,
            }}
            codeTextStyle={{
              height: windowHeight / 36,
              marginTop: 5,
              color: theme?.text,
            }}
            textInputStyle={{color: theme?.text}}
            textInputProps={{
              placeholderTextColor: '#666',
              keyboardType: 'numeric',
            }}
            countryPickerButtonStyle={{backgroundColor: theme?.text}}
            flagButtonStyle={{backgroundColor: theme?.background}}
          />
          {phoneNumberError ? (
            <Text style={styles.validationError}>{phoneNumberError}</Text>
          ) : null}
        </View>

        <ScrollViewSpace />
      </ScrollView>

      {/* Buttons */}
      <FixedBottomContainer top={1.19}>
        <FormButton
          title={'Book Flight'}
          width={1.1}
          onPress={flightBooking}
          formError={formError}
          loading={loading}
          disabled={loading}
        />
      </FixedBottomContainer>
    </SafeAreaViewComponent>
  );
};

export default FlightBookingScreen;

const styles = StyleSheet.create({
  auth: {
    width: windowWidth / 1.1,
    alignSelf: 'center',
    marginTop: 20,
  },
  inputTitle: {
    marginBottom: 10,
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
  validationError: {
    color: 'red',
    fontWeight: '500',
    marginBottom: 5,
    fontSize: 13,
    // textAlign: 'center',
  },
});
