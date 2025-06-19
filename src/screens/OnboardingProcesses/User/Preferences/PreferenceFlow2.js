import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Toast from 'react-native-toast-message';

import SafeAreaViewComponent from '../../../../components/common/SafeAreaViewComponent';
import KeyboardAvoidingComponent from '../../../../components/form/KeyboardAvoidingComponent';
import HeaderTitle from '../../../../components/common/HeaderTitle';
import {COLORS} from '../../../../themes/themes';
import FormInput from '../../../../components/form/FormInput';
import PickerSelect from '../../../../components/pickerSelect/PickerSelect';
import FixedBottomContainer from '../../../../components/common/FixedBottomContainer';
import FormButton from '../../../../components/form/FormButton';
import {
  rendezvousDrinkingOptions,
  rendezvousKidsOptions,
  rendezvousSmokingOptions,
} from '../../../../data/dummyData';
import axiosInstance from '../../../../utils/api-client';
import {RNToast} from '../../../../Library/Common';
import {checkUserProfile} from '../../../../services/userServices';
import {
  getUser,
  saveUserPreferences,
} from '../../../../redux/features/user/userSlice';
import {useDispatch} from 'react-redux';
import ScrollViewSpace from '../../../../components/common/ScrollViewSpace';
import {useTheme} from '../../../../Context/ThemeContext';

const PreferenceFlow2 = ({navigation, route}) => {
  const item = route?.params;
  console.log('dddd', item);

  const dispatch = useDispatch();
  const {theme} = useTheme();

  const [loading, setLoading] = useState(false);

  const [religion, setReligion] = useState('');
  const [drinkingHabit, setDrinkingHabit] = useState('');
  const [smokingHabit, setSmokingHabit] = useState('');
  const [kids, setKids] = useState('');

  // Error states
  const [formError, setFormError] = useState('');
  const [religionError, setReligionError] = useState('');
  const [drinkingHabitError, setDrinkingHabitError] = useState('');
  const [smokingHabitError, setSmokingHabitError] = useState('');
  const [kidsError, setKidsError] = useState('');

  const completeUserPreferences = async () => {
    const preferenceData = {
      religion: religion,
      drinking_habits: drinkingHabit,
      smoking_habits: smokingHabit,
      kids: kids,
      interested_in: item?.interested_in,
      height: item?.height,
      relationship_status: item?.relationshipStatus,
      ageRange: item?.age,
    };
    console.log('preferenceData', preferenceData);

    if (!religion) {
      setReligionError('Please provide a value');
    } else if (!drinkingHabit) {
      setDrinkingHabitError('Please provide an option');
    } else if (!smokingHabit) {
      setSmokingHabitError('Please provide an option');
    } else if (!kids) {
      setKidsError('Please provide your an option');
    } else {
      setLoading(true);
      try {
        await axiosInstance({
          url: 'matchmaking/preferences',
          method: 'POST',
          data: preferenceData,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(res => {
            console.log('res', res?.data);
            setLoading(false);

            if (res?.data) {
              console.log('completePreferences data', res?.data);
              checkUserProfile(dispatch, getUser, axiosInstance);
              dispatch(saveUserPreferences(res?.data?.data?.preference));
              RNToast(Toast, 'Awesome. Your preferences have been setup 😇');

              navigation.navigate('StringsScreen');
            } else {
              console.log('message', res?.data?.message);
              setFormError(
                'An error occured while saving your preferences, please try again later',
              );
            }
          })
          .catch(err => {
            console.log('completePreferences err', err?.response);
            setLoading(false);
            setFormError(
              'An error occured while saving your preferences, please try again later',
            );
          });
      } catch (error) {
        console.log('completePreferences error', error?.response);
        setLoading(false);
        setFormError(
          'An error occured while saving your preferences, please try again later',
        );
      }
    }
  };

  return (
    <SafeAreaViewComponent>
      <KeyboardAvoidingComponent>
        <HeaderTitle
          leftIcon={'arrow-back-outline'}
          progress={100}
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
              Matchmaking Preferences
            </Text>
            <Text style={{color: theme.rendezvousText, fontSize: 14, fontWeight: '400'}}>
              Knowing your choice helps us better understand how to tailor your
              experience. Let us know what you'd like in a partner.
            </Text>
          </View>

          <FormInput
            formInputTitle={
              'What religion do you want your partner to identify with?'
            }
            keyboardType={'default'}
            placeholder="Enter religion"
            value={religion}
            onChangeText={txt => {
              setReligion(txt);
              setReligionError('');
              setFormError('');
            }}
            errorMessage={religionError}
          />

          <PickerSelect
            items={rendezvousDrinkingOptions}
            placeholder={'Select your preferred option'}
            formInputTitle={
              "Choose your preference for your partner's drinking habits"
            }
            onValueChange={value => {
              setDrinkingHabit(value);
              setFormError('');
              setDrinkingHabitError('');
            }}
            errorMessage={drinkingHabitError}
          />

          <PickerSelect
            items={rendezvousSmokingOptions}
            placeholder={'Select your preferred option'}
            formInputTitle={
              "Choose your preference for your partner's smoking habits"
            }
            onValueChange={value => {
              setSmokingHabit(value);
              setFormError('');
              setSmokingHabitError('');
            }}
            errorMessage={smokingHabitError}
          />

          <PickerSelect
            items={rendezvousKidsOptions}
            placeholder={'Select your option'}
            formInputTitle={
              'Are you comfortable being with someone who has kids?'
            }
            onValueChange={value => {
              setKids(value);
              setFormError('');
              setKidsError('');
            }}
            errorMessage={kidsError}
          />

          <ScrollViewSpace />
        </ScrollView>

        {/* Buttons */}
        <FixedBottomContainer top={1.3}>
          <FormButton
            title={'Next'}
            width={1.1}
            onPress={completeUserPreferences}
            formError={formError}
            disabled={loading}
            loading={loading}
          />
        </FixedBottomContainer>
      </KeyboardAvoidingComponent>
    </SafeAreaViewComponent>
  );
};

export default PreferenceFlow2;

const styles = StyleSheet.create({});
