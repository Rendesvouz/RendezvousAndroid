import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useRef, useState} from 'react';
import PassMeter from 'react-native-passmeter';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

import SafeAreaViewComponent from '../../components/common/SafeAreaViewComponent';
import HeaderTitle from '../../components/common/HeaderTitle';
import {COLORS} from '../../themes/themes';
import FormButton from '../../components/form/FormButton';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import FixedBottomContainer from '../../components/common/FixedBottomContainer';
import KeyboardAvoidingComponent from '../../components/form/KeyboardAvoidingComponent';
import {checkPassword, checkPasswordMatch} from '../../Library/Validation';
import FormInput from '../../components/form/FormInput';
import axiosInstance from '../../utils/api-client';
import {RNToast} from '../../Library/Common';
import {useTheme} from '../../Context/ThemeContext';

const RegisterScreen2 = ({navigation, route}) => {
  const item = route?.params;
  console.log('roueee', item);

  const {theme} = useTheme();

  // Passmeter validation
  const MAX_LEN = 15,
    MIN_LEN = 8,
    PASS_LABELS = [
      '  Too Short',
      '  Must include a lower, uppercase, number and special character like !@#$%%^&*',
      '  Must include a lower, uppercase, number and special character like !@#$%%^&*',
      '  Must include a lower, uppercase, number and special character like !@#$%%^&*',
      '  Perfecto !',
    ];
  const deviceWindow = Dimensions.get('window');

  const [loading, setLoading] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [refCode, setRefCode] = useState('');

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');

  // Error states
  const [formError, setFormError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [refCodeError, setRefCodeError] = useState('');

  const validatedPassword = checkPassword(newPassword);

  // This function handles the password visibility displaying the icons
  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const checkPasswords = checkPasswordMatch(newPassword, confirmPassword);
  console.log('checkPasswords', checkPasswords);

  const register = async () => {
    console.log('register');

    const registerData = {
      email: item?.email,
      username: item?.username,
      role: item?.role,
      password: newPassword,
      signup_channel: 'ios',
    };

    if (refCode) {
      registerData.recruiterCode = refCode;
    }

    setLoading(true);
    try {
      await axiosInstance({
        url: 'authentication/signup',
        method: 'POST',
        data: registerData,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
          console.log('res', res);
          setLoading(false);

          if (res?.data) {
            console.log('register data', res?.data);

            RNToast(
              Toast,
              'We sent a 6-digit code to your email for verification',
            );
            navigation.navigate('EmailVerification', {email: item?.email});
          }
        })
        .catch(err => {
          console.log('Login err', err?.response);
          setLoading(false);
          setFormError(err?.response?.data?.message);
          Alert.alert(
            'Signup Failed',
            'Something went wrong, please try again later',
          );
        });
    } catch (error) {
      console.log('Login error', error?.response);
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
          <View style={{marginBottom: 0, padding: 20}}>
            <Text
              style={{
                color: theme?.text,
                fontSize: 24,
                fontWeight: '600',
                lineHeight: 24,
              }}>
              Create an Account
            </Text>
            <Text
              style={{
                color: theme?.rendezvousText,
                fontSize: 16,
                fontWeight: '400',
              }}>
              Please fill in your information to create an account{' '}
            </Text>
          </View>

          <FormInput
            formInputTitle={'Password'}
            placeholder="Password"
            placeholderTextColor="#666"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={passwordVisibility}
            textContentType="password"
            rightIcon={rightIcon}
            iconColor="#1E1E1EB2"
            value={newPassword}
            onChangeText={text => {
              setNewPassword(text);
              setPasswordError('');
            }}
            // onChange={handleChange}
            handlePasswordVisibility={handlePasswordVisibility}
            marginBottom={10}
          />
          <Text
            style={{
              color: '#999',
              fontSize: 12,
              marginTop: newPassword?.length ? -6 : 5,
              padding: 10,
              marginBottom: 10,
            }}>
            Use at least 8 characters including 1 uppercase letter, a number and
            a special character like !@#$%%^&*
          </Text>
          <View
            style={{
              width: windowWidth / 1.1,
              overflow: 'hidden',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            {newPassword !== '' ? (
              <PassMeter
                showLabels
                password={newPassword}
                maxLength={MAX_LEN}
                minLength={MIN_LEN}
                labels={PASS_LABELS}
                backgroundColor={styles.bg}
              />
            ) : null}
          </View>
          {passwordError && (
            <Text style={styles.validationError}>{passwordError}</Text>
          )}

          <FormInput
            formInputTitle={'Confirm password'}
            placeholder="Confirm password"
            placeholderTextColor="#666"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={passwordVisibility}
            textContentType="password"
            rightIcon={rightIcon}
            iconColor="#1E1E1EB2"
            value={confirmPassword}
            onChangeText={text => {
              setConfirmPassword(text);
              setPasswordError('');
            }}
            // onChange={handleChange}
            handlePasswordVisibility={handlePasswordVisibility}
          />

          <FormInput
            formInputTitle={'Referral Code'}
            keyboardType={'default'}
            placeholder="Enter Referal Code (Optional)"
            value={refCode}
            onChangeText={txt => {
              setRefCode(txt);
              setRefCodeError('');
              setFormError('');
            }}
            errorMessage={refCodeError}
          />
        </ScrollView>

        {/* Buttons */}
        <FixedBottomContainer top={1.5}>
          <FormButton
            title={'Sign Up'}
            width={1.1}
            onPress={() => {
              register();
            }}
            loading={loading}
            disabled={loading}
            formError={formError}
          />
        </FixedBottomContainer>
      </KeyboardAvoidingComponent>
    </SafeAreaViewComponent>
  );
};

export default RegisterScreen2;

const styles = StyleSheet.create({
  auth: {
    // width: windowWidth / 1.1,
    // alignSelf: "center",
    // marginTop: 10,
    padding: 20,
    // marginBottom: 20,
    // backgroundColor: 'red',
  },
  error: {
    color: 'red',
    fontWeight: '500',
    alignSelf: 'center',
    marginBottom: 7,
    fontSize: 13,
    textAlign: 'center',
  },
  inputTitle: {
    marginBottom: 10,
    fontSize: 16,
    color: '#1E1E1E',
    fontWeight: '600',
  },
  icon: {
    marginBottom: 10,
    marginRight: 10,
  },
  coverArtContainer: {
    width: windowWidth / 1.1,
    height: windowHeight / 4,
    // backgroundColor: 'red',
    marginLeft: 20,
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'center',
    // marginBottom: 20,
    marginTop: 20,
  },
  uploadContainer: {
    width: windowWidth / 1.1,
    height: windowHeight / 5,
    // backgroundColor: 'green',
    // marginLeft: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    marginBottom: 10,
  },
  cancelIcon: {
    position: 'absolute',
    zIndex: 999,
    opacity: 0.9,
    backgroundColor: 'black',
    right: 0,
    top: 0,
  },
  imageContainer: {
    width: windowWidth / 1.1,
    height: windowHeight / 5,
    // backgroundColor: 'green',
    // marginLeft: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',

    marginBottom: 10,
  },
  imageUpload: {
    // width: 67,
    // height: 67,
    // backgroundColor: 'green',
    // marginLeft: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    borderColor: COLORS.ndonuBlueColor,
    borderStyle: 'dashed',
    borderRadius: 40,
    borderWidth: 1,
  },
  uploadImageArea: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  uploadedImage: {
    width: 67,
    height: 67,
    borderRadius: 40,
  },
});
