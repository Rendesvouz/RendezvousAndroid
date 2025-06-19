import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

import SafeAreaViewComponent from '../../../components/common/SafeAreaViewComponent';
import KeyboardAvoidingComponent from '../../../components/form/KeyboardAvoidingComponent';
import HeaderTitle from '../../../components/common/HeaderTitle';
import FormInput from '../../../components/form/FormInput';
import {COLORS} from '../../../themes/themes';
import FormButton from '../../../components/form/FormButton';
import FixedBottomContainer from '../../../components/common/FixedBottomContainer';
import {
  addDaysToDate,
  formatDateForBackend,
  getMaxSelectableDateFor17YearsOld,
} from '../../../Library/Common';
import ScrollViewSpace from '../../../components/common/ScrollViewSpace';
import {useTheme} from '../../../Context/ThemeContext';

const OnboardingFlow2 = ({navigation, route}) => {
  const item = route.params;
  console.log('item', item);

  const {theme} = useTheme();

  const [loading, setLoading] = useState(false);

  const [height, setHeight] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [dob, setDob] = useState('');
  const [bio, setBio] = useState('');
  console.log('dob', dob);

  // Error states
  const [formError, setFormError] = useState('');
  const [heightError, setHeightError] = useState('');
  const [cityError, setCityError] = useState('');
  const [zipcodeError, setZipcodeError] = useState('');
  const [dobError, setDobError] = useState('');
  const [bioError, setBioError] = useState('');

  const [dateIcon, setDateIcon] = useState('calendar-outline');
  const [dateField, setDateField] = useState(new Date());
  const [open, setOpen] = useState(false);

  const maximumDate = getMaxSelectableDateFor17YearsOld();

  const onboardNext2 = () => {
    const onboarding1Data = {
      fullName: item?.fullName,
      gender: item?.gender,
      personality: item?.personality,
      country: item?.country,
      relationshipStatus: item?.relationshipStatus,
      bio: bio,
      city: city,
      height: height,
      dob: moment(dob, 'MMM D, YYYY').format('YYYY-MM-DD'),
    };

    if (!city) {
      setCityError('Please privide your city');
    } else if (!height) {
      setHeightError('Please provide your height');
    } else if (!dob) {
      setDobError('Please provide your date of birth');
    } else if (!bio) {
      setBioError('Please write a detailed description about yourself');
    } else {
      navigation.navigate('OnboardingFlow3', onboarding1Data);
    }
  };

  return (
    <SafeAreaViewComponent>
      <KeyboardAvoidingComponent>
        <HeaderTitle
          leftIcon={'arrow-back-outline'}
          progress={40}
          onLeftIconPress={() => {
            navigation.goBack();
          }}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingTop: 0}}>
          <View style={{marginBottom: 20, padding: 20}}>
            <Text
              style={{
                color: theme.text,
                fontSize: 24,
                fontWeight: '600',
                lineHeight: 24,
              }}>
              User Onboarding
            </Text>
            <Text
              style={{
                color: theme.rendezvousText,
                fontSize: 14,
                fontWeight: '400',
              }}>
              Please fill all information as it's part of our user onboarding
              process. Gathering these information helps us better understand
              how to you better.
            </Text>
          </View>

          <FormInput
            formInputTitle={'City'}
            keyboardType={'default'}
            placeholder="Enter your city"
            value={city}
            onChangeText={txt => {
              setCity(txt);
              setCityError('');
              setFormError('');
            }}
            errorMessage={cityError}
          />

          <FormInput
            formInputTitle={'Height (cm)'}
            keyboardType={'numeric'}
            placeholder="Enter your height"
            value={height}
            onChangeText={txt => {
              setHeight(txt);
              setHeightError('');
              setFormError('');
            }}
            errorMessage={heightError}
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
            placeholder={moment(dateField)?.format('MMMM D, YYYY')}
            placeholderTextColor={theme.text}
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

          <FormInput
            formInputTitle={'Bio'}
            numberOfLines={5}
            multiLine={true}
            keyboardType={'default'}
            height={100}
            placeholder="Enter your bio"
            value={bio}
            onChangeText={txt => {
              setBio(txt);
              setBioError('');
              setFormError('');
            }}
            errorMessage={bioError}
          />

          <ScrollViewSpace />
        </ScrollView>

        {/* Buttons */}
        <FixedBottomContainer top={1.3}>
          <FormButton
            title={'Next'}
            width={1.1}
            onPress={onboardNext2}
            formError={formError}
          />
        </FixedBottomContainer>
      </KeyboardAvoidingComponent>
    </SafeAreaViewComponent>
  );
};

export default OnboardingFlow2;

const styles = StyleSheet.create({});
