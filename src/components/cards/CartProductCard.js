import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {windowWidth} from '../../utils/Dimensions';
import {setPriceTo2DecimalPlaces} from '../../Library/Common';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../../themes/themes';
import {useTheme} from '../../Context/ThemeContext';

const CartProductCard = ({props, updateProductCount, onRemoveItemFromCart}) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  const {theme} = useTheme();

  const reduxCartProducts = state?.user?.cartProducts;

  // Check if the product is in cart already
  const isProductInCart = reduxCartProducts?.some(
    savedProduct => savedProduct?.id === props?.id,
  );
  console.log('isProductInCart', isProductInCart);

  const totalItemPrice =
    (props?.price - props?.discounted_price) * props?.count;

  // Increase item count
  const increaseCount = () => {
    updateProductCount(props?.id, props?.count + 1);
  };

  // Decrease item count
  const decreaseCount = () => {
    if (props?.count > 1) {
      updateProductCount(props?.id, props?.count - 1);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.productContainer, {borderColor: theme?.borderColor}]}>
      <View style={styles.productInfo}>
        <Image
          source={{uri: props?.images_url[0]}}
          // source={require('../../assets/1.jpg')}
          style={styles.cartImageProduct}
        />
        <View
          style={{
            justifyContent: 'space-between',
            marginLeft: 10,
            flexDirection: 'row',
            // backgroundColor: 'red',
            width: windowWidth / 1.3,
          }}>
          <Text
            numberOfLines={1}
            style={[styles.productTitle, {color: theme?.text}]}>
            {props?.title}
          </Text>
          <Text style={[styles.productPrice, {color: theme?.text}]}>
            {setPriceTo2DecimalPlaces(totalItemPrice)}
          </Text>
        </View>
      </View>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          // backgroundColor: 'red',
          marginTop: 10,
          justifyContent: 'space-between',
          alignContent: 'center',
        }}>
        <Ionicons
          name="trash-outline"
          size={20}
          color={COLORS.rendezvousRed}
          onPress={onRemoveItemFromCart}
        />
        <View
          style={[styles.counterContainer, {borderColor: theme?.borderColor}]}>
          <Ionicons
            name="remove-outline"
            size={15}
            color={theme?.text}
            onPress={decreaseCount}
          />
          <Text style={[styles.countText, {color: theme?.text}]}>
            {props?.count}
          </Text>
          <Ionicons
            name="add-outline"
            size={15}
            color={theme?.text}
            onPress={increaseCount}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartProductCard;

const styles = StyleSheet.create({
  productContainer: {
    // backgroundColor: "red",
    padding: 10,
    width: windowWidth / 1.05,
    // flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderColor: COLORS.appGrey4,
    borderWidth: 1,
    borderRadius: 16,
  },
  productInfo: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  cartImageProduct: {
    width: 44,
    height: 44,
    borderRadius: 8,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.appGrey4,
    padding: 10,
    borderRadius: 10,
    width: windowWidth / 4,
    justifyContent: 'space-between',
  },
  countText: {
    fontSize: 15,
    marginHorizontal: 10,
  },
  productPrice: {
    fontWeight: '500',
    fontSize: 16,
    color: COLORS.rendezvousBlack,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.appGrey5,
    width: windowWidth / 1.7,
  },
});
