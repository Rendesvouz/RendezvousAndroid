import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import SafeAreaViewComponent from '../../../components/common/SafeAreaViewComponent';
import HeaderTitle from '../../../components/common/HeaderTitle';
import PickerSelect from '../../../components/pickerSelect/PickerSelect';
import {
  therapyQuestionOption4,
  therapyQuestionOption5,
  therapyQuestionsOptions,
  therapyQuestionsOptions2,
  therapyQuestionsOptions3,
} from '../../../data/dummyData';
import FixedBottomContainer from '../../../components/common/FixedBottomContainer';
import FormButton from '../../../components/form/FormButton';
import {COLORS} from '../../../themes/themes';
import ScrollViewSpace from '../../../components/common/ScrollViewSpace';
import {useTheme} from '../../../Context/ThemeContext';

const UserLifeCoachOnboardingFlow1 = ({navigation}) => {
  const {theme} = useTheme();

  const [previousExperience, setPreviousExperience] = useState('');
  const [platforms, setPlatforms] = useState('');
  const [skill, setSkill] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');

  // Error states
  const [formError, setFormError] = useState('');
  const [previousExperienceError, setPreviousExperienceError] = useState('');
  const [platformsError, setPlatformsError] = useState('');
  const [skillError, setSkillError] = useState('');
  const [priceRangeError, setPriceRangeError] = useState('');
  const [yearsOfExperienceError, setYearsOfExperienceError] = useState('');

  const Next = () => {
    const userLifeCoachPreferenceData = {
      previousExperience: previousExperience,
      platform: platforms,
      skill: skill,
      priceRange: priceRange,
      yearsOfExperience: yearsOfExperience,
    };
    console.log('userLifeCoachPreferenceData', userLifeCoachPreferenceData);

    if (!previousExperience) {
      setPreviousExperienceError('Please select from the options');
    } else if (!platforms) {
      setPlatformsError('Please select from the options');
    } else if (!skill) {
      setSkillError('Please select from the options');
    } else if (!priceRange) {
      setPriceRangeError('Please select from the options');
    } else if (!yearsOfExperience) {
      setYearsOfExperienceError('Please select from the options');
    } else {
      navigation.navigate(
        'UserLifeCoachOnboardingFlow2',
        userLifeCoachPreferenceData,
      );
    }
  };

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={'arrow-back-outline'}
        progress={50}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 10}}>
        <View style={{marginBottom: 20, padding: 10}}>
          <Text
            style={{
              color: theme.text,
              fontSize: 24,
              fontWeight: '600',
              lineHeight: 24,
            }}>
            Life Coach Onboarding
          </Text>
          <Text style={{color: theme?.rendezvousText, fontSize: 14, fontWeight: '400'}}>
            Knowing your choice helps us better understand how to tailor your
            experience. We won’t share your answer with anyone else, including
            future life-coaches.
          </Text>
        </View>

        <PickerSelect
          formInputTitle={'Have you ever worked with a life-coach before?'}
          items={therapyQuestionsOptions}
          placeholder={'Select an option'}
          value={previousExperience}
          onValueChange={txt => {
            setPreviousExperience(txt);
            setPreviousExperienceError('');
            setFormError('');
          }}
          errorMessage={previousExperienceError}
        />
        <PickerSelect
          formInputTitle={'What type of session format works best for you?'}
          items={therapyQuestionsOptions2}
          placeholder={'Select an option'}
          value={platforms}
          onValueChange={txt => {
            setPlatforms(txt);
            setPlatformsError('');
            setFormError('');
          }}
          errorMessage={platformsError}
        />
        <PickerSelect
          formInputTitle={'What’s most important to you in a life-coach?'}
          items={therapyQuestionsOptions3}
          placeholder={'Select an option'}
          value={skill}
          onValueChange={txt => {
            setSkill(txt);
            setSkillError('');
            setFormError('');
          }}
          errorMessage={skillError}
        />
        <PickerSelect
          formInputTitle={
            'What price range are you comfortable with for your life-coach?'
          }
          items={therapyQuestionOption4}
          placeholder={'Select an option'}
          value={priceRange}
          onValueChange={txt => {
            setPriceRange(txt);
            setPriceRangeError('');
            setFormError('');
          }}
          errorMessage={priceRangeError}
        />
        <PickerSelect
          formInputTitle={
            'What level of experience would you prefer your life-coach to have?'
          }
          items={therapyQuestionOption5}
          placeholder={'Select an option'}
          value={yearsOfExperience}
          onValueChange={txt => {
            setYearsOfExperience(txt);
            setYearsOfExperienceError('');
            setFormError('');
          }}
          errorMessage={yearsOfExperienceError}
        />

        <ScrollViewSpace />
      </ScrollView>

      {/* Buttons */}
      <FixedBottomContainer top={1.2}>
        <FormButton
          title={'Next'}
          width={1.1}
          onPress={Next}
          // formError={formError}
        />
      </FixedBottomContainer>
    </SafeAreaViewComponent>
  );
};

export default UserLifeCoachOnboardingFlow1;

const styles = StyleSheet.create({});
