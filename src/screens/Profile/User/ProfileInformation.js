import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';

import SafeAreaViewComponent from '../../../components/common/SafeAreaViewComponent';
import HeaderTitle from '../../../components/common/HeaderTitle';
import {COLORS} from '../../../themes/themes';
import FormInput from '../../../components/form/FormInput';
import FixedBottomContainer from '../../../components/common/FixedBottomContainer';
import FormButton from '../../../components/form/FormButton';
import {windowWidth} from '../../../utils/Dimensions';
import ScrollViewSpace from '../../../components/common/ScrollViewSpace';
import axiosInstance from '../../../utils/api-client';
import {RNToast} from '../../../Library/Common';
import {checkUserProfile} from '../../../services/userServices';
import {getUser, signOut} from '../../../redux/features/user/userSlice';

const ProfileInformation = ({navigation}) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  const loggedInUserRole = state?.user?.userRole;
  console.log('loggedInUserRole', loggedInUserRole);

  const reduxTherapistProfile = state?.user?.therapistProfile?.profile;
  const reduxUserProfile = state?.user?.user?.profile;

  const userProfle =
    loggedInUserRole == 'User' ? reduxUserProfile : reduxTherapistProfile;
  console.log('userProfle', userProfle);

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState(
    userProfle?.User?.email ? userProfle?.User?.email : '',
  );
  const [fullName, setFullName] = useState(
    userProfle?.fullname ? userProfle?.fullname : '',
  );
  const [phoneNumber, setPhoneNumber] = useState(
    userProfle?.phone_number ? userProfle?.phone_number : '',
  );
  const [country, setCountry] = useState(
    userProfle?.country ? userProfle?.country : '',
  );
  const [dob, setDob] = useState(userProfle?.dob ? userProfle?.dob : '');
  const [city, setCity] = useState(userProfle?.city ? userProfle?.city : '');
  const [bio, setBio] = useState(userProfle?.bio ? userProfle?.bio : '');

  // Error states
  const [formError, setFormError] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [bioError, setBioError] = useState('');
  const [dobError, setDobError] = useState('');
  const [cityError, setCityError] = useState('');

  const updateProfile = async () => {
    const updateProfileData = {
      // fullname: fullName,
      // profile_pictures: userProfle?.profile_pictures,
      phone_number: phoneNumber,
      personality: !userProfle?.personality ? '' : userProfle?.personality,
      bio: bio,
      city: city,
      // country: userProfle?.country,
      // dob: userProfle?.dob,
      // relationship_status: !userProfle?.relationship_status
      //   ? ''
      //   : userProfle?.relationship_status,
      height: userProfle?.height,
      gender: userProfle?.gender,
      // degree: userProfle?.degree,
      // employmentStatus: userProfle?.employmentStatus,
      // occupation: !userProfle?.occupation ? '' : userProfle?.occupation,
      // religion: !userProfle?.religion ? '' : userProfle?.religion,
      // university: userProfle?.university,
      interest: userProfle?.interest || [],
      hobbies: userProfle?.hobbies || [],
    };

    console.log('updateProfileData', updateProfileData);

    // const formData = new FormData();
    // formData.append("profile_pictures", userProfle?.profile_pictures);
    // formData.append("phone_number", phoneNumber);
    // formData.append("personality", userProfle?.personality);
    // formData.append("bio", bio);
    // formData.append("city", city);
    // formData.append("fullname", fullName);
    // formData.append("dob", userProfle?.dob);
    // formData.append("country", userProfle?.country);

    // formData.append("relationship_status", userProfle?.relationship_status);
    // formData.append("height", userProfle?.height);
    // formData.append("gender", userProfle?.gender);

    // const interests = userProfle?.interest || [];
    // const hobbies = userProfle?.hobbies || [];

    // interests.forEach((interest, index) =>
    //   formData.append(`interest[${index}]`, interest)
    // );
    // hobbies.forEach((hobby, index) =>
    //   formData.append(`hobbies[${index}]`, hobby)
    // );

    // console.log("formData", formData);

    if (!fullName) {
      setFullNameError('Please provide your fullname');
    } else if (!phoneNumber) {
      setPhoneNumberError('Please provide your valid phone number');
    } else if (!city) {
      setCityError('Please provide your city');
    } else if (!bio) {
      setBioError('Please input your bio');
    } else {
      setLoading(true);
      try {
        await axiosInstance({
          url: 'profile',
          method: 'PUT',
          data: updateProfileData,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(res => {
            console.log('res', res?.data);
            setLoading(false);

            if (res?.data) {
              console.log('updateProfile data', res?.data);
              checkUserProfile(dispatch, getUser, axiosInstance);
              RNToast(Toast, 'Great, Your profile has been updated 😇');
              navigation.goBack();
            } else {
              console.log('message', res?.data?.message);
              setFormError(
                'An error occured while updating your profile, please try again later',
              );
            }
          })
          .catch(err => {
            console.log('updateProfile err', err?.response);
            setLoading(false);

            if (err?.status == 401) {
              Alert.alert(
                'Session Expired',
                'Your session has expired, please login',
              );
              dispatch(signOut());
              navigation.navigate('Login');
              setFormError('Your session has expired. Please log in again.');
            } else {
              setFormError(
                'An error occured while updating your profile, please try again later',
              );
            }
          });
      } catch (error) {
        console.log('updateProfile error', error?.response);
        setFormError(
          'An error occured while updating your profile, please try again later',
        );
      }
    }
  };

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={'arrow-back-outline'}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        headerTitle={'Profile Information'}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: 0}}>
        <View style={styles.profileImageSection}>
          <Image
            source={{uri: userProfle?.profile_pictures[0]}}
            style={styles.profileImage}
          />
        </View>
        <FormInput
          formInputTitle={'Full Name'}
          placeholder=""
          keyboardType={'default'}
          editable={false}
          value={fullName}
          width={1.1}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={txt => {
            setFullName(txt);
            setFormError('');
            setFullNameError('');
          }}
          errorMessage={fullNameError}
        />
        <FormInput
          formInputTitle={'Email Address'}
          placeholder=""
          keyboardType={'email-address'}
          editable={false}
          value={email}
          width={1.1}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={txt => {
            setEmail(txt);
            setFormError('');
          }}
        />
        <FormInput
          formInputTitle={'Phone Number'}
          placeholder="098463525"
          keyboardType={'number-pad'}
          value={phoneNumber}
          width={1.1}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={txt => {
            setPhoneNumber(txt);
            setFormError('');
            setPhoneNumberError('');
          }}
          errorMessage={phoneNumberError}
        />

        <FormInput
          formInputTitle={'Date of Birth'}
          placeholder="Date of Birth"
          keyboardType={'default'}
          editable={false}
          value={dob}
          width={1.1}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={txt => {
            setDob(txt);
            setFormError('');
            setDobError('');
          }}
          errorMessage={dobError}
        />
        <FormInput
          formInputTitle={'City'}
          placeholder=""
          keyboardType={'default'}
          value={city}
          width={1.1}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={txt => {
            setCity(txt);
            setFormError('');
            setCityError('');
          }}
          errorMessage={cityError}
        />
        <FormInput
          formInputTitle={'Country'}
          placeholder="Country"
          keyboardType={'default'}
          editable={false}
          value={country}
          width={1.1}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={txt => {
            setCountry(txt);
            setFormError('');
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
          width={1.1}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={txt => {
            setBio(txt);
            setFormError('');
            setBioError('');
          }}
          errorMessage={bioError}
        />

        <ScrollViewSpace />
      </ScrollView>

      {/* Buttons */}
      <FixedBottomContainer top={1.2}>
        <FormButton
          title={'Update Profile'}
          width={1.1}
          onPress={updateProfile}
          loading={loading}
          disabled={loading}
          formError={formError}
        />
      </FixedBottomContainer>
    </SafeAreaViewComponent>
  );
};

export default ProfileInformation;

const styles = StyleSheet.create({
  profileImageSection: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
  },
  editIcon: {
    bottom: 0,
    position: 'absolute',
    right: windowWidth / 2.5,
  },
});
