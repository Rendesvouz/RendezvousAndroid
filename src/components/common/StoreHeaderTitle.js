import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProgressBar from './ProgressBar';
import {useSelector} from 'react-redux';
import {windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../themes/themes';
import {useTheme} from '../../Context/ThemeContext';

const StoreHeaderTitle = ({
  onLeftIconPress,
  leftIcon,
  headerTitle,
  onRightIconPress1,
  onRightIconPress2,
  onRightIconPress3,
}) => {
  const state = useSelector(state => state);
  const userDestination = state.user.destination;
  const {theme} = useTheme();

  const reduxCartProducts = state?.user?.cartProducts;
  console.log('reduxCartProducts', reduxCartProducts);

  return (
    <View style={styles.container}>
      {headerTitle && (
        <Text style={[styles.headerTitle, {color: theme?.rendezvousText}]}>
          {headerTitle}
        </Text>
      )}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          //   backgroundColor: 'green',
          width: windowWidth / 3.4,
        }}>
        <TouchableOpacity
          onPress={onRightIconPress1}
          activeOpacity={0.9}
          style={[styles.iconContainer, {borderColor: theme?.borderColor}]}>
          <Ionicons name={'search-outline'} size={24} color={COLORS.appGrey2} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onRightIconPress2}
          activeOpacity={0.9}
          style={[styles.iconContainer, {borderColor: theme?.borderColor}]}>
          <Ionicons name={'heart-outline'} size={24} color={COLORS.appGrey2} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onRightIconPress3}
          activeOpacity={0.9}
          style={[styles.iconContainer, {borderColor: theme?.borderColor}]}>
          <Ionicons name={'cart-outline'} size={24} color={COLORS.appGrey2} />
          {reduxCartProducts?.length > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{reduxCartProducts.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StoreHeaderTitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: COLORS.rendezvousBlack,
    fontWeight: '400',
  },
  leftIconContainer: {
    // backgroundColor: 'red',
    borderRadius: 10,
    padding: 5,
  },
  iconContainer: {
    padding: 5,
    // backgroundColor: 'red',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.appGrey3,
  },
  badgeContainer: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: COLORS.rendezvousRed,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
