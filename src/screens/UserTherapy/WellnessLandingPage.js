import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';

import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../themes/themes';
import SafeAreaViewComponent from '../../components/common/SafeAreaViewComponent';
import HeaderTitle from '../../components/common/HeaderTitle';
import SecondaryBtn from '../../components/form/SecondaryBtn';
import {setWellnessLandingPage} from '../../redux/features/user/userSlice';
import {wellnessData} from '../../data/dummyData';
import {useTheme} from '../../Context/ThemeContext';

const WellnessLandingPage = () => {
  const dispatch = useDispatch();

  const {theme} = useTheme();

  return (
    <SafeAreaViewComponent>
      <HeaderTitle headerTitle={'Wellness'} />
      <Image
        source={require('../../assets/frame11.png')}
        style={styles.wellnessImage}
      />
      <View style={styles.promotional}>
        <Text style={[styles.promotionalHeader, {color: theme?.text}]}>
          Professional Therapy & Life Coaches For Your Well-being.
        </Text>
        <Text style={styles.promotionalSubHeader}>
          Find clarity, heal, and grow with the care and guidance you need to
          nurture your mind.
        </Text>

        {/* things i can do */}
        {wellnessData?.map((cur, i) => (
          <View key={i} style={styles.promo}>
            <Image source={cur?.image} style={styles.promoImage} />
            <Text style={[styles.promoText, {color: theme?.text}]}>
              {cur?.text}
            </Text>
          </View>
        ))}

        <SecondaryBtn
          title={'Find Your Wellness Coach'}
          onPress={() => dispatch(setWellnessLandingPage(true))}
          height={50}
        />
      </View>
    </SafeAreaViewComponent>
  );
};

export default WellnessLandingPage;

const styles = StyleSheet.create({
  wellnessImage: {
    width: windowWidth,
    height: windowHeight / 3,
    objectFit: 'contain',
  },
  promotional: {
    padding: 20,
  },
  promotionalHeader: {
    fontSize: 25,
    fontWeight: '500',
  },
  promotionalSubHeader: {
    fontSize: 13,
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
