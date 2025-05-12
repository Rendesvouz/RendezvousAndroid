import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SafeAreaViewComponent from "../../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../../components/common/HeaderTitle";
import FixedBottomContainer from "../../../components/common/FixedBottomContainer";
import FormButton from "../../../components/form/FormButton";
import FormInput from "../../../components/form/FormInput";
import BottomSheet from "../../../components/bottomSheet/BottomSheet";
import KeyboardAvoidingComponent from "../../../components/form/KeyboardAvoidingComponent";
import { windowHeight } from "../../../utils/Dimensions";
import CountryPickerx from "../../../components/pickerSelect/CountryPicker";
import axiosInstance from "../../../utils/api-client";
import { RNToast, setPriceTo2DecimalPlaces } from "../../../Library/Common";
import Toast from "react-native-toast-message";
import {
  clearCartStore,
  saveProductToCart,
  signOut,
} from "../../../redux/features/user/userSlice";

const CheckoutScreen = ({ navigation, route }) => {
  // const item = route.params;
  // console.log('checkkk', item);

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const userProfle = state?.user?.user?.profile;
  const reduxCheckoutProducts = state?.user?.checkoutProducts;
  console.log("reduxCheckoutProducts", reduxCheckoutProducts);

  const bottomSheetRef = useRef();

  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [countryObject, setCountryObject] = useState("");
  const [shippingFee, setShippingFee] = useState("");

  console.log("ccr", country, countryObject);

  // Error states
  const [formError, setFormError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [cityError, setCityError] = useState("");
  const [postalCodeError, setPostalCodeError] = useState("");
  console.log("formError", formError);

  const calculateTotalPrice = () => {
    return reduxCheckoutProducts?.reduce((total, product) => {
      return total + product.price * product.count;
    }, 0);
  };

  const productsSubTotal = calculateTotalPrice();
  const totalPrice = productsSubTotal + shippingFee;

  const getShippingFees = async () => {
    if (!address) {
      setAddress("Please provide your address");
    } else if (!country) {
      setCountryError("Please provide your country");
    } else if (!city) {
      setCityError("Please provide your city");
    } else if (!postalCode) {
      setPostalCodeError("Please provide your postal code");
    } else {
      const shippingRatesData = {
        plannedShippingDateAndTime: "2025-02-16T10:00:00",
        productCode: "P",
        unitOfMeasurement: "metric",
        isCustomsDeclarable: true,
        nextBusinessDay: true,
        accounts: [{ number: "365621755", typeCode: "shipper" }],
        customerDetails: {
          shipperDetails: {
            addressLine1: "721 Broadway, New York",
            addressLine2: "Optional Address",
            addressLine3: "Additional Address Info",
            postalCode: "10003",
            cityName: "New York",
            countyName: "New York",
            countryCode: "US",
          },
          receiverDetails: {
            addressLine1: address,
            addressLine2: "Optional Address",
            addressLine3: "Additional Address Info",
            postalCode: postalCode,
            cityName: city,
            countyName: city,
            countryCode: countryObject.cca2,
          },
        },
        packages: [
          {
            weight: 0.5,
            dimensions: {
              length: 10,
              width: 10,
              height: 10,
            },
          },
        ],
      };

      setLoading(true);
      try {
        await axiosInstance({
          url: "dhl/shipping-rates",
          method: "POST",
          data: shippingRatesData,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            console.log("getShippingFees res", res?.data);
            setLoading(false);

            const shippingRateInEuros =
              res?.data?.data?.products[0]?.totalPrice?.find(
                (cur) => cur?.currencyType == "BASEC"
              );

            if (shippingRateInEuros) {
              console.log("shippingRateInEuros", shippingRateInEuros);

              setShippingFee(shippingRateInEuros?.price);
              bottomSheetRef.current.open();
            }
          })
          .catch((err) => {
            console.log("getShippingFees err", err?.response);
            setLoading(false);
            setFormError(
              "Failed to calculate shipping rates, please provide the valid shipping information to generate your shipping rates accurately"
            );

            Alert.alert(
              "Failed to calculate Shipping Rate",
              "Failed to calculate shipping rates, please provide the valid shipping information to generate your shipping rates accurately"
            );
          });
      } catch (error) {
        console.log("getShippingFees error", error?.reponse);
        setLoading(false);
      }
    }
  };

  const createOrder = async () => {
    const orderProductsData = {
      products: [],
      shippingfee: shippingFee,
    };

    reduxCheckoutProducts?.forEach((product, index) => {
      console.log("ppp", product);
      orderProductsData?.products?.push({
        productId: product?.id,
        quantity: product?.count,
        vendorId: product?.vendorId,
      });
    });

    setLoading(true);
    try {
      await axiosInstance({
        url: "order",
        method: "POST",
        data: orderProductsData,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("createOrder res", res?.data);
          setLoading(false);
          navigation.navigate("Shop", { screen: "ShopScreen" });
          bottomSheetRef.current.close();
          RNToast(Toast, "Your order has been created successful!");
          dispatch(clearCartStore());
        })
        .catch((err) => {
          console.log("createOrder err", err?.response);
          setLoading(false);

          if (err?.response?.status == 401) {
            Alert.alert(
              "Session Expired",
              "Your session has expired, please login to keep enjoying our services"
            );
            dispatch(signOut());
          } else if (err?.response?.status == 400) {
            setFormError(err?.response?.data?.message);
          } else {
            setFormError(err?.response?.data?.message);
          }
        });
    } catch (error) {
      console.log("createOrder error", error);
      setLoading(false);

      if (error?.response?.status == 401) {
        Alert.alert(
          "Session Expired",
          "Your session has expired, please login to keep enjoying our services"
        );
        dispatch(signOut());
      } else if (error?.response?.status == 400) {
        setFormError(error?.response?.data?.message);
      } else {
        setFormError(error?.response?.data?.message);
      }
    }
  };

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        headerTitle={"Checkout"}
        leftIcon={"arrow-back-outline"}
        onLeftIconPress={() => {
          navigation.navigate("ShopScreen");
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 0, padding: 10 }}
      >
        <FormInput
          formInputTitle={"Delivery Address"}
          placeholder=""
          keyboardType={"default"}
          value={address}
          width={1.1}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(txt) => {
            setAddress(txt);
            setFormError("");
            setAddressError("");
          }}
          errorMessage={addressError}
        />

        <FormInput
          formInputTitle={"City"}
          placeholder=""
          keyboardType={"default"}
          value={city}
          width={1.1}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(txt) => {
            setCity(txt);
            setFormError("");
            setCityError("");
          }}
          errorMessage={cityError}
        />
        <FormInput
          formInputTitle={"Postal Code"}
          placeholder=""
          keyboardType={"default"}
          value={postalCode}
          width={1.1}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(txt) => {
            setPostalCode(txt);
            setFormError("");
            setPostalCodeError("");
          }}
          errorMessage={postalCodeError}
        />
        <CountryPickerx
          formInputTitle={"Country"}
          countryError={countryError}
          setCountry={setCountry}
          setFormError={setFormError}
          setCountryObject={setCountryObject}
        />
      </ScrollView>

      {/* Buttons */}
      <FixedBottomContainer top={1.1}>
        <FormButton
          title={"Generate Shipping Fee"}
          width={1.1}
          onPress={() => {
            getShippingFees();
          }}
          formError={formError}
          disabled={loading}
          loading={loading}
        />
      </FixedBottomContainer>

      {/* Payment BottomSheet */}
      <BottomSheet
        bottomsheetTitle={""}
        bottomSheetRef={bottomSheetRef}
        height={2}
      >
        <KeyboardAvoidingComponent>
          {/* Order Summary */}
          <View style={styles.orderSummary}>
            <View style={styles.Q}>
              <Text style={styles.summaryQ}>Sub-total</Text>
              <Text style={styles.summaryA}>
                {setPriceTo2DecimalPlaces(productsSubTotal)}
              </Text>
            </View>
            <View style={styles.Q}>
              <Text style={styles.summaryQ}>Delivery Fee</Text>
              <Text style={styles.summaryA}>
                {setPriceTo2DecimalPlaces(shippingFee)}
              </Text>
            </View>
            <View style={styles.breaker} />
            <View style={styles.Q}>
              <Text style={styles.summaryQ}>Total</Text>
              <Text style={styles.summaryA}>
                {setPriceTo2DecimalPlaces(totalPrice)}
              </Text>
            </View>
          </View>

          <FormButton
            title={"Pay With Wallet"}
            width={1.1}
            onPress={createOrder}
            loading={loading}
            disabled={loading}
            formError={formError}
          />
          <FormButton
            title={"Pay With Escrow (Coming Soon)"}
            width={1.1}
            disabled={true}
          />
        </KeyboardAvoidingComponent>
      </BottomSheet>
    </SafeAreaViewComponent>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  orderSummary: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "whitesmoke",
  },
  Q: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    alignContent: "center",
    alignItems: "center",
    // backgroundColor: 'black',
  },
  breaker: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  summary: {
    fontSize: 17,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 10,
    color: "#fff",
  },
  summaryQ: {
    color: "#000",
    // fontWeight: '500',
    fontSize: 14,
    // backgroundColor: 'red',
    // width: windowWidth / 1.3,
  },
  summaryA: {
    color: "#000",
    fontWeight: "500",
    fontSize: 16,
  },
});
