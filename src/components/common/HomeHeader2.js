import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ImageView from 'react-native-image-viewing';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../../themes/themes';
import axiosInstance from '../../utils/api-client';
import {setPriceTo2DecimalPlaces} from '../../Library/Common';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../Context/ThemeContext';

const HomeHeader2 = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  const {theme} = useTheme();

  const userProfle = state?.user?.user?.profile;
  console.log('userProfle', userProfle);

  const [visible, setIsVisible] = useState(false);

  const transformedData = userProfle?.profile_pictures?.map(item => ({
    uri: item,
  }));

  const [loading, setLoading] = useState(false);

  const [walletBalance, setWalletBalance] = useState('');
  const [noWalletBalance, setNoWalletBalance] = useState('');

  const fetchWalletBalance = async () => {
    setLoading(true);
    try {
      await axiosInstance({
        url: 'wallet',
        method: 'GET',
      })
        .then(res => {
          console.log('fetchWalletBalance res', res?.data);
          setLoading(false);

          setWalletBalance(res?.data?.data?.balance);
        })
        .catch(err => {
          console.log('fetchWalletBalance err', err);

          setLoading(false);

          if (err?.status == 404) {
            setNoWalletBalance('Activate Wallet');
          }
        });
    } catch (error) {
      console.log('fetchWalletBalance error', error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchWalletBalance();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={[styles.container]}>
      <View style={[styles.profileSection]}>
        <TouchableOpacity
          style={[styles.menuBorder, {backgroundColor: theme?.background}]}
          activeOpacity={0.9}>
          <Ionicons
            name="menu-outline"
            size={25}
            color={theme?.text}
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        </TouchableOpacity>

        <View style={styles.profileDetails}>
          <Text style={[styles.profileName, {color: 'white'}]}>
            Hello,{' '}
            <Text style={{fontWeight: '600'}}>{userProfle?.username} </Text>
          </Text>
        </View>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Ionicons
          name="wallet-outline"
          size={24}
          color={'white'}
          onPress={() => {
            navigation.navigate('Wallet');
          }}
        />
        <Ionicons
          name="notifications-outline"
          size={24}
          color={'white'}
          onPress={() => {
            navigation.navigate('Notification');
          }}
          style={{marginLeft: 24}}
        />
      </View>
    </View>
  );
};

export default HomeHeader2;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  profileSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 20,
  },
  profileDetails: {
    // alignItems: 'center',
    marginLeft: 10,
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 24,
  },
  profileEmail: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
    color: '#000',
  },
  wallet: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: COLORS.pinky,
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 6,
  },
  walletBalance: {
    color: 'black',
    fontWeight: '700',
    fontSize: 14,
    marginRight: 6,
  },
  menuBorder: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 6,
  },
});
