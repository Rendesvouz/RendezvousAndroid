import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import PassMeter from 'react-native-passmeter';

import SafeAreaViewComponent from '../../components/common/SafeAreaViewComponent';
import HeaderTitle from '../../components/common/HeaderTitle';
import {COLORS} from '../../themes/themes';
import FormInput from '../../components/form/FormInput';
import FixedBottomContainer from '../../components/common/FixedBottomContainer';
import FormButton from '../../components/form/FormButton';
import {checkPassword, checkPasswordMatch} from '../../Library/Validation';
import {windowWidth} from '../../utils/Dimensions';

const ChangePassword = ({navigation}) => {
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

  const [loading, setLoading] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [formError, setFormError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        onLeftIconPress={() => navigation.goBack()}
        leftIcon="arrow-back-outline"
      />
      <View style={{marginBottom: 20, padding: 20}}>
        <Text
          style={{
            color: COLORS.black,
            fontSize: 24,
            fontWeight: '600',
            lineHeight: 24,
          }}>
          Create Password
        </Text>
        <Text style={{color: '#1E1E1EB2', fontSize: 16, fontWeight: '400'}}>
          Choose a strong password to keep your account secure.
        </Text>
      </View>

      <FormInput
        formInputTitle={'Password'}
        placeholder="Enter New password"
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
          marginTop: -20,
        }}>
        Use at least 8 characters including 1 uppercase letter, a number and a
        special character like !@#$%%^&*
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
        placeholder="Enter New password"
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

      {/* Buttons */}
      <FixedBottomContainer top={1.2}>
        <FormButton
          title={loading ? <ActivityIndicator color="white" /> : 'Next'}
          loading={loading}
          //   onPress={onCodeVerification}
          onPress={() => {
            navigation.navigate('PasswordResetSuccess');
          }}
        />
      </FixedBottomContainer>
    </SafeAreaViewComponent>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
