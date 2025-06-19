import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import SafeAreaViewComponent from '../../../../components/common/SafeAreaViewComponent';
import KeyboardAvoidingComponent from '../../../../components/form/KeyboardAvoidingComponent';
import HeaderTitle from '../../../../components/common/HeaderTitle';
import {COLORS} from '../../../../themes/themes';
import FormInput from '../../../../components/form/FormInput';
import PickerSelect from '../../../../components/pickerSelect/PickerSelect';
import FixedBottomContainer from '../../../../components/common/FixedBottomContainer';
import FormButton from '../../../../components/form/FormButton';
import {
  rendezvousHeightOptions,
  rendezvousInterestedInOptions,
  rendezvousRelationshipStatus,
} from '../../../../data/dummyData';
import ScrollViewSpace from '../../../../components/common/ScrollViewSpace';
import {useTheme} from '../../../../Context/ThemeContext';

const PreferenceFlow1 = ({navigation}) => {
  const {theme} = useTheme();

  const [loading, setLoading] = useState(false);

  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [relationshipStatus, setRelationshipStatus] = useState('');

  // Error states
  const [formError, setFormError] = useState('');
  const [minAgeError, setMinAgeError] = useState('');
  const [maxAgeError, setMaxAgeError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [heightError, setHeightError] = useState('');
  const [relationshipStatusError, setRelationshipStatusError] = useState('');

  const onboardNext1 = () => {
    const preferenceData = {
      age: {min: minAge, max: maxAge},
      interested_in: gender,
      height: height,
      relationshipStatus: relationshipStatus,
    };

    if (!minAge) {
      setMinAgeError('Please provide minimum age');
    } else if (!maxAge) {
      setMaxAgeError('Please provide max age');
    } else if (!gender) {
      setGenderError('Please provide your gender');
    } else if (!height) {
      setHeightError('Please provide your height');
    } else if (!relationshipStatus) {
      setRelationshipStatusError('Please provide your relationship status');
    } else {
      navigation.navigate('PreferenceFlow2', preferenceData);
    }
  };

  return (
    <SafeAreaViewComponent>
      <KeyboardAvoidingComponent>
        <HeaderTitle
          leftIcon={'arrow-back-outline'}
          progress={50}
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
            <Text
              style={{
                color: theme.rendezvousText,
                fontSize: 14,
                fontWeight: '400',
              }}>
              Knowing your choice helps us better understand how to tailor your
              experience. Let us know what you'd like in a partner.
            </Text>
          </View>

          <FormInput
            formInputTitle={'Minimum Age'}
            keyboardType={'number-pad'}
            placeholder="Enter your minimum age"
            value={minAge}
            onChangeText={txt => {
              setMinAge(txt);
              setMinAgeError('');
              setFormError('');
            }}
            errorMessage={minAgeError}
          />

          <FormInput
            formInputTitle={'Maximum Age'}
            keyboardType={'number-pad'}
            placeholder="Enter your maximum age"
            value={maxAge}
            onChangeText={txt => {
              setMaxAge(txt);
              setMaxAgeError('');
              setFormError('');
            }}
            errorMessage={maxAgeError}
          />

          <PickerSelect
            items={rendezvousInterestedInOptions}
            placeholder={'Select your preferred gender for a partner'}
            formInputTitle={'What are you interested in?'}
            onValueChange={value => {
              setGender(value);
              setFormError('');
              setGenderError('');
            }}
            errorMessage={genderError}
          />

          <PickerSelect
            items={rendezvousRelationshipStatus}
            placeholder={'Select your option'}
            formInputTitle={'What are you looking for right now?'}
            onValueChange={value => {
              setRelationshipStatus(value);
              setFormError('');
              setRelationshipStatusError('');
            }}
            errorMessage={relationshipStatusError}
          />

          <PickerSelect
            items={rendezvousHeightOptions}
            placeholder={'Select your option'}
            formInputTitle={'What height would you prefer in your partner?'}
            onValueChange={value => {
              setHeight(value);
              setFormError('');
              setHeightError('');
            }}
            errorMessage={heightError}
          />

          <ScrollViewSpace />
        </ScrollView>

        {/* Buttons */}
        <FixedBottomContainer top={1.25}>
          <FormButton
            title={'Next'}
            width={1.1}
            onPress={onboardNext1}
            formError={formError}
          />
        </FixedBottomContainer>
      </KeyboardAvoidingComponent>
    </SafeAreaViewComponent>
  );
};

export default PreferenceFlow1;

const styles = StyleSheet.create({});
