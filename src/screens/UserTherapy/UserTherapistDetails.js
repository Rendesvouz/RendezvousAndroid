import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageView from 'react-native-image-viewing';

import SafeAreaViewComponent from '../../components/common/SafeAreaViewComponent';
import HeaderTitle from '../../components/common/HeaderTitle';
import ScrollViewSpace from '../../components/common/ScrollViewSpace';
import FixedBottomContainer from '../../components/common/FixedBottomContainer';
import FormButton from '../../components/form/FormButton';
import {dummyImageUrl} from '../../data/dummyData';
import {setPriceTo2DecimalPlaces} from '../../Library/Common';
import {useTheme} from '../../Context/ThemeContext';

const UserTherapistDetails = ({navigation, route}) => {
  const item = route.params;
  console.log('item', item);
  const {theme} = useTheme();

  const [visible, setIsVisible] = useState(false);

  const transformedData = item?.profile_pictures.map(item => ({
    uri: item,
  }));

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={'arrow-back-outline'}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        rightIcon={'bookmark-outline'}
        headerTitle={item?.fullname}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: 0, padding: 10}}>
        <View style={styles.therapistProfile}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setIsVisible(true);
            }}>
            <Image
              style={styles.therapistImage}
              source={{
                uri: item?.profile_pictures?.length
                  ? item?.profile_pictures[0]
                  : dummyImageUrl,
              }}
            />
          </TouchableOpacity>

          <Text style={[styles.therapistName, {color: theme?.text}]}>
            {item?.fullname}
          </Text>
          <ImageView
            images={transformedData}
            imageIndex={0}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
          />
        </View>

        <View style={styles.therapistExperience}>
          <Ionicons name="bag-check-outline" color={'#666'} size={20} />
          <Text style={[styles.therapistExperienceName, {color: theme?.text}]}>
            Experience:{' '}
            <Text style={styles.therapistExperienceNameValue}>
              {item.years_of_experience} years
            </Text>
          </Text>
        </View>
        <View style={styles.therapistExperience}>
          <Ionicons name="earth-outline" color={'#666'} size={20} />
          <Text style={[styles.therapistExperienceName, {color: theme?.text}]}>
            Country:{' '}
            <Text style={styles.therapistExperienceNameValue}>
              {item.country}
            </Text>
          </Text>
        </View>
        <View style={styles.therapistExperience}>
          <Ionicons name="checkbox-outline" color={'#666'} size={20} />
          <Text style={[styles.therapistExperienceName, {color: theme?.text}]}>
            Skills:{' '}
            <Text style={styles.therapistExperienceNameValue}>
              {item.skill[0]}
            </Text>
          </Text>
        </View>
        <View style={styles.therapistExperience}>
          <Ionicons name="pricetags-outline" color={'#666'} size={20} />
          <Text style={[styles.therapistExperienceName, {color: theme?.text}]}>
            Fixed Price:{' '}
            <Text style={styles.therapistExperienceNameValue}>
              {setPriceTo2DecimalPlaces(item.rate_per_hour)}/hr
            </Text>
          </Text>
        </View>

        {/* About */}
        <View style={{padding: 10}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              marginBottom: 10,
              color: theme?.text,
            }}>
            About
          </Text>
          <Text style={{color: theme?.rendezvousText}}>{item.bio}</Text>
        </View>

        {/* Therapy Method */}
        <View style={{padding: 10}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              marginBottom: 10,
              color: theme?.text,
            }}>
            Therapy Method
          </Text>
          {item?.counseling_type?.map((cur, i) => (
            <Text key={i} style={styles.therapistTherapy}>
              {cur}
            </Text>
          ))}
        </View>

        {/* Education */}
        <View style={{padding: 10}}>
          <Text style={{fontSize: 18, fontWeight: '700', marginBottom: 10}}>
            Education
          </Text>
          <Text style={styles.therapistEducation}>
            {item?.highest_qualification}
          </Text>
        </View>
        <ScrollViewSpace />
      </ScrollView>

      {/* Buttons */}
      <FixedBottomContainer top={1.19}>
        <FormButton
          title={'Book a Session'}
          width={1.1}
          onPress={() => {
            navigation.navigate('UserTherapistBooking', item);
          }}
          // formError={formError}
        />
      </FixedBottomContainer>
    </SafeAreaViewComponent>
  );
};

export default UserTherapistDetails;

const styles = StyleSheet.create({
  therapistProfile: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  therapistImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  therapistName: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
  },
  therapistExperience: {
    padding: 10,
    // backgroundColor: "red",
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    // marginLeft: 10,
  },
  therapistExperienceName: {
    marginLeft: 10,
  },
  therapistExperienceNameValue: {
    fontWeight: '600',
    fontSize: 14,
  },
  therapistTherapy: {
    // borderRadius: 20,
    padding: 10,
    marginBottom: 10,

    backgroundColor: '#FFD6DE',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: 'flex-start',
    fontSize: 14,
    fontWeight: '600',
  },
  therapistEducation: {
    fontSize: 14,
  },
});
