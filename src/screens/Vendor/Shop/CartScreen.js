import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";

import SafeAreaViewComponent from "../../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../../components/common/HeaderTitle";
import ScrollViewSpace from "../../../components/common/ScrollViewSpace";
import CartProductCard from "../../../components/cards/CartProductCard";
import FormButton from "../../../components/form/FormButton";
import FixedBottomContainer from "../../../components/common/FixedBottomContainer";
import { setPriceTo2DecimalPlaces } from "../../../Library/Common";
import {
  removeProductFromCart,
  saveCheckoutProducts,
} from "../../../redux/features/user/userSlice";

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const userProfle = state?.user?.user?.profile;

  const reduxCartProducts = state?.user?.cartProducts;
  console.log("reduxCartProducts", reduxCartProducts);

  const [cartProducts, setCartProducts] = useState(
    reduxCartProducts.map((product) => ({ ...product, count: 1 }))
  );
  // console.log("cartProducts", cartProducts);

  const updateProductCount = (productId, newCount) => {
    setCartProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, count: newCount } : product
      )
    );
  };

  const calculateTotalPrice = () => {
    return cartProducts.reduce((total, product) => {
      const discount = product?.discounted_price || 0;
      return total + (product.price - discount) * product.count;
    }, 0);
  };

  const removeItemFromCart = (props) => {
    console.log("cleae", props);
    dispatch(removeProductFromCart(props));
  };

  const checkoutProducts = () => {
    dispatch(saveCheckoutProducts(cartProducts));
    if (userProfle) {
      navigation.navigate("Checkout", cartProducts);
    } else {
      navigation.navigate("Login", { destination: "Checkout" });
    }
  };

  useEffect(() => {
    setCartProducts(
      reduxCartProducts.map((product) => ({ ...product, count: 1 }))
    );
  }, [reduxCartProducts]);

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        headerTitle={"Cart"}
        leftIcon={"arrow-back-outline"}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 0, padding: 10 }}
      >
        {cartProducts?.map((cur, i) => (
          <CartProductCard
            key={i}
            props={cur}
            updateProductCount={updateProductCount}
            onRemoveItemFromCart={() => {
              removeItemFromCart(cur);
            }}
          />
        ))}
        <ScrollViewSpace />
      </ScrollView>

      {/* Buttons */}
      <FixedBottomContainer top={1.1}>
        <FormButton
          title={`Checkout ${setPriceTo2DecimalPlaces(calculateTotalPrice())}`}
          width={1.1}
          onPress={checkoutProducts}
          disabled={!reduxCartProducts?.length}
        />
      </FixedBottomContainer>
    </SafeAreaViewComponent>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  cartImageProduct: {
    width: 70,
    height: 70,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  countText: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  productContainer: {
    backgroundColor: "red",
  },
});
