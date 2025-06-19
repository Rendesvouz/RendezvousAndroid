import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageView from 'react-native-image-viewing';
import Toast from 'react-native-toast-message';

import {windowHeight, windowWidth} from '../../utils/Dimensions';
import PreferenceCard from '../../components/cards/PreferenceCard';
import {
  capitalizeFirstLetter,
  convertCmToFeetInches,
  getAge,
  normalizeGender,
  RNToast,
} from '../../Library/Common';
import InterestsCard from '../../components/cards/InterestCard';
import SVGIconCard from '../../components/cards/SVGIconCard';
import {COLORS} from '../../themes/themes';
import FixedBottomContainer from '../../components/common/FixedBottomContainer';
import FormButton from '../../components/form/FormButton';
import ScrollViewSpace from '../../components/common/ScrollViewSpace';
import axiosInstance from '../../utils/api-client';
import StringsProfileCard from '../../components/cards/StringsProfileCard';
import {useTheme} from '../../Context/ThemeContext';

const StringsProfileScreen = ({navigation, route}) => {
  const item = route?.params;
  console.log('profileitem', item);

  const {theme} = useTheme();

  const allPictures = [
    ...(item?.matchedUserProfile?.profile_pictures || []),
    ...(item?.matchedUserProfile?.additional_pictures || []),
  ];

  const transformedData = allPictures?.map(picture => ({
    uri: picture,
  }));

  const [visible, setIsVisible] = useState(false);
  const [stringLoading, setStringLoading] = useState(null);

  const matchAction = async (matchId, receiverId, action) => {
    console.log('action matched', matchId, receiverId, action);
    if (!matchId) {
      return;
    }

    const matchActionData = {
      matchId: matchId,
      action: action,
      receiverId: receiverId,
    };

    setStringLoading(matchId);

    try {
      const response = await axiosInstance({
        url: 'matchmaking/match/action',
        method: 'POST',
        data: matchActionData,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('matchAction response', response?.data);
      navigation.goBack();

      action == 'request' && RNToast(Toast, 'String request sent');
      setStringLoading(null);
    } catch (error) {
      console.error('Error matching user:', error?.response);
    } finally {
      setStringLoading(null);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: theme?.background}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StringsProfileCard
          item={item}
          onPress={() => {
            setIsVisible(true);
          }}
          onLeftIconPress={() => navigation.goBack()}
        />
        <ScrollView
          vertical
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{padding: 20}}>
          <View style={[styles.profileInfo, {color: theme?.background}]}>
            <Text style={styles.profileName}>
              {item?.matchedUserProfile?.username},{' '}
              {getAge(item?.matchedUserProfile?.dob)}
            </Text>

            <Text style={styles.profileName}>
              {convertCmToFeetInches(item?.matchedUserProfile?.height)}
            </Text>

            <View style={styles.displaySection}>
              <PreferenceCard
                iconName={'location-outline'}
                title={item?.matchedUserProfile?.country}
              />
              {item?.action !== 'request' && (
                <PreferenceCard
                  iconName={'flash-outline'}
                  title={`Match Accuracy: ${item?.accuracy?.toFixed(2)}%`}
                />
              )}
            </View>
          </View>

          <View
            style={[styles.cardSection, {backgroundColor: theme?.background}]}>
            <Text style={[styles.bioHeaders, {color: theme?.text}]}>Bio</Text>
            <Text style={[styles.bioDescription, {color: theme?.text}]}>
              {item?.matchedUserProfile?.bio}
            </Text>
            <Text style={[styles.bioHeaders, {color: theme?.text}]}>
              About Me
            </Text>

            <View style={styles.displaySection}>
              <SVGIconCard
                title={capitalizeFirstLetter(item?.match?.drinking_habits)}
                svgName={'drink'}
                iconColor={COLORS.rendezvousRed}
              />
              <SVGIconCard
                title={normalizeGender(item?.matchedUserProfile?.gender)}
                iconName={
                  normalizeGender(item?.matchedUserProfile?.gender) == 'Male'
                    ? 'man-outline'
                    : 'woman-outline'
                }
                iconColor={COLORS.black}
              />
              <SVGIconCard
                title={capitalizeFirstLetter(item?.match?.religion)}
                iconName={'moon-outline'}
                iconColor={COLORS.black}
              />
              <SVGIconCard
                title={capitalizeFirstLetter(
                  item?.matchedUserProfile?.relationship_status,
                )}
                iconName={'person-add-outline'}
                iconColor={COLORS.black}
              />
              <SVGIconCard
                title={capitalizeFirstLetter(item?.match?.smoking_habits)}
                svgName={'smoke'}
                iconColor={COLORS.black}
              />
              {/* <SVGIconCard
              title={capitalizeFirstLetter(item?.match?.kids)}
              svgName={'kid'}
              iconColor={COLORS.rendezvousRed}
            /> */}
            </View>
          </View>

          <View
            style={[styles.cardSection, {backgroundColor: theme?.background}]}>
            <Text style={[styles.bioHeaders, {color: theme?.text}]}>
              Interests
            </Text>

            <View style={styles.displaySection}>
              {item?.matchedUserProfile?.interest?.map((cur, i) => (
                <InterestsCard key={i} title={cur} />
              ))}
            </View>

            <Text style={[styles.bioHeaders, {color: theme?.text}]}>
              Hobbies
            </Text>

            <View style={styles.displaySection}>
              {item?.matchedUserProfile?.hobbies?.map((cur, i) => (
                <InterestsCard key={i} title={cur} />
              ))}
            </View>
          </View>

          <View
            style={[styles.cardSection, {backgroundColor: theme?.background}]}>
            <Text style={[styles.bioHeaders, {color: theme?.text}]}>
              Background
            </Text>

            <View style={styles.displaySection}>
              <SVGIconCard
                title={capitalizeFirstLetter(item?.matchedUserProfile?.degree)}
                iconName={'library-outline'}
                iconColor={COLORS.black}
              />

              <SVGIconCard
                title={capitalizeFirstLetter(
                  item?.matchedUserProfile?.university,
                )}
                iconName={'school-outline'}
                iconColor={COLORS.black}
              />

              <SVGIconCard
                title={capitalizeFirstLetter(
                  item?.matchedUserProfile?.employmentStatus,
                )}
                iconName={'briefcase-outline'}
                iconColor={COLORS.black}
              />

              <SVGIconCard
                title={capitalizeFirstLetter(
                  item?.matchedUserProfile?.occupation,
                )}
                iconName={'business-outline'}
                iconColor={COLORS.black}
              />
            </View>
          </View>

          <ImageView
            images={transformedData}
            imageIndex={0}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
          />
          <ScrollViewSpace />
        </ScrollView>
      </ScrollView>

      {/* Buttons */}
      {item?.action !== 'request' && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            top: windowHeight / 1.17,
            position: 'absolute',
            width: windowWidth,
            padding: 30,
            backgroundColor: theme?.background,
          }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              matchAction(item?.match?.id, item?.match?.userId, 'decline');
            }}
            disabled={stringLoading === item?.match?.id}
            style={[styles.hertless, {backgroundColor: COLORS.rendezvousRed}]}>
            {stringLoading ? (
              <ActivityIndicator size={'small'} color={'black'} />
            ) : (
              <Ionicons name="close" size={28} color={'white'} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              matchAction(item?.match?.id, item?.match?.userId, 'request');
            }}
            disabled={stringLoading === item?.match?.id}
            style={[styles.hertless, {backgroundColor: 'gold'}]}>
            {stringLoading ? (
              <ActivityIndicator size={'small'} color={'black'} />
            ) : (
              <Ionicons name="star-outline" size={28} color={'white'} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              matchAction(item?.match?.id, item?.match?.userId, 'request');
            }}
            disabled={stringLoading === item?.match?.id}
            style={[styles.hertless, {backgroundColor: COLORS.rendezvousBlue}]}>
            {stringLoading ? (
              <ActivityIndicator size={'small'} color={'black'} />
            ) : (
              <Ionicons name="heart" size={28} color={'white'} />
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default StringsProfileScreen;

const styles = StyleSheet.create({
  cardContainer: {
    width: windowWidth / 1.1,
    height: windowHeight / 2.8,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  heartIcon: {
    backgroundColor: '#3D3D3D99',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 15,
    position: 'absolute',
    top: 6,
    right: 6,
  },
  profileInfo: {
    // position: 'absolute',
    // bottom: 10,
    // left: 10,
    // right: 10,
    backgroundColor: '#00000088',
    padding: 8,
    borderRadius: 6,
  },
  profileName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  profileDetails: {
    color: '#fff',
    fontSize: 12,
  },
  infoCard: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  bioHeaders: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  cardSection: {
    padding: 20,
    borderRadius: 8,
    backgroundColor: 'whitesmoke',
    marginTop: 10,
  },
  bioDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  displaySection: {
    flexDirection: 'row',
    width: windowWidth / 1.2,
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  hertless: {
    // backgroundColor: 'black',
    // width: windowWidth / 2.5,
    padding: 10,
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    // borderWidth: 1,
    // borderColor: COLORS.appGrey,
  },
});
