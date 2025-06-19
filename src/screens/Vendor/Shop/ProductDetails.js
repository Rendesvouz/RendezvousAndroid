import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import ImageView from 'react-native-image-viewing';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Rating} from 'react-native-ratings';

import SafeAreaViewComponent from '../../../components/common/SafeAreaViewComponent';
import HeaderTitle from '../../../components/common/HeaderTitle';
import ScrollViewSpace from '../../../components/common/ScrollViewSpace';
import {windowHeight, windowWidth} from '../../../utils/Dimensions';
import FixedBottomContainer from '../../../components/common/FixedBottomContainer';
import FormButton from '../../../components/form/FormButton';
import TransparentBtn from '../../../components/form/TransparentBtn';
import {
  removeProductFromCart,
  removeProductFromWishlist,
  saveProductToCart,
  saveProductToWishList,
} from '../../../redux/features/user/userSlice';
import {sliderData} from '../../../data/dummyData';
import {COLORS} from '../../../themes/themes';
import {formatToUSD} from '../../../Library/Common';
import {useTheme} from '../../../Context/ThemeContext';

const ProductDetails = ({navigation, route}) => {
  const productItem = route.params;
  console.log('productItem', productItem);

  const dispatch = useDispatch();

  const state = useSelector(state => state);
  const reduxCartProducts = state?.user?.cartProducts;
  const reduxWishlistProducts = state?.user?.wishlistProducts;

  const {theme} = useTheme();

  console.log('reduxCartProducts', reduxCartProducts, reduxWishlistProducts);

  // Check if the product is in cart already
  const isProductInCart = reduxCartProducts?.some(
    savedProduct => savedProduct?.id === productItem?.id,
  );

  const isProductInWishlist = reduxWishlistProducts?.some(
    savedProduct => savedProduct?.id === productItem?.id,
  );

  const transformedData = productItem?.images_url?.map(item => ({
    uri: item,
  }));

  const [visible, setIsVisible] = useState(false);

  const addProductToCart = () => {
    // dispatch the data to redux
    isProductInCart
      ? dispatch(removeProductFromCart(productItem))
      : dispatch(saveProductToCart(productItem));
  };

  const buyProduct = () => {
    console.log('ppp');
    dispatch(saveProductToCart(productItem));
    navigation.navigate('Cart');
  };

  const addProductToWishlist = () => {
    isProductInWishlist
      ? dispatch(removeProductFromWishlist(productItem))
      : dispatch(saveProductToWishList(productItem));
  };

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        headerTitle={''}
        leftIcon={'arrow-back-outline'}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        rightIcon={'heart-outline'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: 0, padding: 10}}>
        <Image
          style={styles.detailsMainImage}
          source={{uri: productItem?.images_url[0]}}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{padding: 10}}>
          {productItem?.images_url?.map((cur, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                setIsVisible(true);
              }}>
              <Image style={styles.detailsImage} source={{uri: cur}} />
            </TouchableOpacity>
          ))}
          <ImageView
            images={transformedData}
            imageIndex={0}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
          />
        </ScrollView>

        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            numberOfLines={1}
            style={[styles.productdetailsTitle, {color: theme?.text}]}>
            {productItem?.title}
          </Text>
          <View
            style={{marginTop: 10, flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="checkmark-outline" size={20} color={'green'} />
            <Text style={{color: 'green'}}>In stock</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Rating
            defaultRating={0}
            imageSize={17}
            style={{
              //   backgroundColor: 'black',
              marginTop: 10,
              marginBottom: 10,
              justifyContent: 'flex-start',
              width: windowWidth / 4,
              // marginLeft: 5,
              // marginRight: 10,
            }}
            ratingBackgroundColor="red"
            tintColor={theme?.background}
            startingValue={4}
            minValue={3}
            ratingCount={5}
            readonly={true}
            unSelectedColor="red"
            starContainerStyle={{color: 'red'}}
          />
          <Text style={{color: COLORS.descriptionText2}}>0 (0 reviews)</Text>
        </View>

        <Text style={[styles.detailsPrice, {color: theme?.text}]}>
          {formatToUSD(productItem?.price)}
        </Text>

        <Text style={[styles.detailsItenary, {color: theme?.text}]}>
          Description
        </Text>
        <Text
          style={[styles.detailsItenaryText, {color: theme?.rendezvousText}]}>
          {productItem?.description}
        </Text>

        <ScrollViewSpace />
      </ScrollView>

      {/* Buttons */}
      <FixedBottomContainer
        top={1.2}
        alignItems={'center'}
        flexDirection={'row'}
        justifyContent={'space-between'}>
        <FormButton title={'Buy Now'} width={2.5} onPress={buyProduct} />
        <TransparentBtn
          title={isProductInCart ? 'Remove from Cart' : 'Add To Cart'}
          width={2.5}
          onPress={addProductToCart}
        />
      </FixedBottomContainer>
    </SafeAreaViewComponent>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  detailsImage: {
    width: 46,
    height: 46,
    marginRight: 6,
    borderRadius: 8,
  },
  detailsMainImage: {
    width: windowWidth / 1.05,
    height: windowHeight / 3,
    marginRight: 6,
    borderRadius: 20,
    objectFit: 'contain',
  },
  productdetailsTitle: {
    fontSize: 18,
    fontWeight: '500',
    width: windowWidth / 1.5,
  },
  detailsPrice: {
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 10,
  },
  detailsItenary: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
  },
  detailsItenaryText: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.rendezvousBlack,
    marginTop: 10,
  },
});
