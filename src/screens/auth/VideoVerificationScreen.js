import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import SafeAreaViewComponent from '../../components/common/SafeAreaViewComponent';
import HeaderTitle from '../../components/common/HeaderTitle';
import FixedBottomContainer from '../../components/common/FixedBottomContainer';
import {COLORS} from '../../themes/themes';
import FormButton from '../../components/form/FormButton';
import {useDispatch} from 'react-redux';
import { setUserDestination } from '../../redux/features/user/userSlice';

const VideoVerificationScreen = ({navigation}) => {
  const dispatch = useDispatch();

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={'arrow-back-outline'}
        progress={60}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />

      <View style={{marginBottom: 20, padding: 20}}>
        <Text
          style={{
            color: COLORS.black,
            fontSize: 24,
            fontWeight: '600',
            lineHeight: 24,
          }}>
          Video Verification{' '}
        </Text>
        <Text style={{color: '#1E1E1EB2', fontSize: 16, fontWeight: '400'}}>
          Take a quick video of yourself to verify that you are actually the
          person from the image{' '}
        </Text>
      </View>

      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}>
        <Image
          source={require('../../assets/1.jpg')}
          style={styles.recordImage}
        />
        <Text style={{textAlign: 'center', fontSize: 16, fontWeight: '400'}}>
          Make sure your face is inside the circle before pressing the record
          button.
        </Text>
      </View>

      <FixedBottomContainer>
        <FormButton
          title={'Next'}
          width={1.1}
          onPress={() => {
            dispatch(setUserDestination('Registration'));
            navigation.navigate('EmailVerification');
          }}
        />
      </FixedBottomContainer>
    </SafeAreaViewComponent>
  );
};

export default VideoVerificationScreen;

const styles = StyleSheet.create({
  recordImage: {
    width: 242,
    height: 242,
    borderRadius: 124,
    marginBottom: 40,
  },
});
