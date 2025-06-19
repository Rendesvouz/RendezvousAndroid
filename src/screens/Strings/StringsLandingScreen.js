import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';

import SafeAreaViewComponent from '../../components/common/SafeAreaViewComponent';
import HeaderTitle from '../../components/common/HeaderTitle';
import SecondaryBtn from '../../components/form/SecondaryBtn';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../themes/themes';
import {setStringsLandingPage} from '../../redux/features/user/userSlice';
import {useTheme} from '../../Context/ThemeContext';

const StringsLandingScreen = () => {
  const dispatch = useDispatch();
  const {theme} = useTheme();

  return (
    <SafeAreaViewComponent>
      <HeaderTitle headerTitle={'Strings'} />
      <Image
        source={require('../../assets/striings.png')}
        style={styles.wellnessImage}
      />
      <View style={styles.promotional}>
        <Text style={[styles.promotionalHeader, {color: theme?.text}]}>
          The Easier Way To Build And Sustain Healthy Relationships.
        </Text>
        <Text style={styles.promotionalSubHeader}>
          Strings is a connection-focused dating space designed to help you
          build meaningful relationships, with supportive tools to guide you
          toward lasting, intentional love.
        </Text>

        <SecondaryBtn
          title={'Find Your Match'}
          onPress={() => dispatch(setStringsLandingPage(true))}
          height={50}
        />
      </View>
    </SafeAreaViewComponent>
  );
};

export default StringsLandingScreen;

const styles = StyleSheet.create({
  wellnessImage: {
    width: windowWidth,
    height: windowHeight / 2.5,
    objectFit: 'contain',
  },
  promotional: {
    padding: 20,
  },
  promotionalHeader: {
    fontSize: 30,
    fontWeight: '500',
  },
  promotionalSubHeader: {
    fontSize: 15,
    fontWeight: '400',
    color: COLORS.appGrey5,
    marginTop: 10,
    marginBottom: 20,
  },
  promo: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    width: windowWidth / 1.1,
    marginBottom: 10,
  },
  promoImage: {
    height: 20,
    width: windowWidth / 6,
    objectFit: 'contain',
    // backgroundColor: 'green',
  },
  promoText: {
    fontSize: 13,
    fontWeight: '400',
  },
});
