import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import SafeAreaViewComponent from '../../../components/common/SafeAreaViewComponent';
import FormButton from '../../../components/form/FormButton';
import {windowWidth} from '../../../utils/Dimensions';
import {useTheme} from '../../../Context/ThemeContext';

const UserLifeCoachComplete = ({navigation}) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const {theme} = useTheme();

  const userProfle = state?.user?.user?.profile;
  console.log('userProfle', userProfle);

  const Next = () => {
    navigation.navigate('UserLifeCoach');
  };

  return (
    <SafeAreaViewComponent>
      <View style={{padding: 20, marginTop: 20}}>
        <Text style={[styles.onboardingText, {color: theme?.text}]}>
          Nice work, {userProfle?.username}
        </Text>
        <Text style={[styles.onboardingText2, {color: theme?.text}]}>
          Congratulations on completing the lifecoach preferences form, now
          let's find you the right lifecoach.
        </Text>
        <Image
          source={require('../../../assets/clapping.gif')}
          style={styles.onboardingImage}
        />

        <FormButton title={'Browse Life Coaches'} onPress={Next} />
      </View>
    </SafeAreaViewComponent>
  );
};

export default UserLifeCoachComplete;

const styles = StyleSheet.create({
  onboardingText: {
    color: 'black',
    fontSize: 22,
    fontWeight: '700',
    alignSelf: 'center',
    marginBottom: 30,
  },
  onboardingText2: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'center',
    marginBottom: 30,
    textAlign: 'center',
  },
  onboardingImage: {
    width: windowWidth / 1.1,
    alignSelf: 'center',
  },
});
