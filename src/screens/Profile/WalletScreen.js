import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { Paystack, paystackProps } from "react-native-paystack-webview";
// import { PAYSTACK_LIVE_SECRET_KEY, PAYSTACK_LIVE_PUBLIC_KEY } from "@env";

import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../components/common/HeaderTitle";
import { windowWidth } from "../../utils/Dimensions";
import { setPriceTo2DecimalPlaces } from "../../Library/Common";
import FormButton from "../../components/form/FormButton";
import axiosInstance from "../../utils/api-client";
import BottomSheet from "../../components/bottomSheet/BottomSheet";
import FormInput from "../../components/form/FormInput";
import { COLORS } from "../../themes/themes";
import ScrollViewSpace from "../../components/common/ScrollViewSpace";
import TransactionsCard from "../../components/cards/TransactionsCard";
import { useTheme } from "../../Context/ThemeContext";

const WalletScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const loggedInUserEmail = state?.user?.user?.profile?.User?.email;
  const loggedinUserCountry = state?.user?.user?.profile?.country;

  const bottomSheetRef = useRef();
  const { theme } = useTheme();

  const PAYSTACK_LIVE_SECRET_KEY =
    process.env.EXPO_PUBLIC_PAYSTACK_LIVE_SECRET_KEY;
  const PAYSTACK_LIVE_PUBLIC_KEY =
    process.env.EXPO_PUBLIC_PAYSTACK_LIVE_PUBLIC_KEY;

  const [loading, setLoading] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const [price, setPrice] = useState("");

  const [walletBalance, setWalletBalance] = useState("");
  const [noWalletBalance, setNoWalletBalance] = useState("");
  const [transactionsList, setTransactionsList] = useState();

  let reverseTransactionList = [];
  if (transactionsList) {
    reverseTransactionList = [...transactionsList].reverse();
  }

  // Error states
  const [formError, setFormError] = useState("");
  const [priceError, setPriceError] = useState("");

  // Paystack Integration
  const paystackWebViewRef = useRef(paystackProps.PayStackRef);

  const fetchWalletBalance = async () => {
    setLoading(true);
    try {
      await axiosInstance({
        url: "wallet",
        method: "GET",
      })
        .then((res) => {
          console.log("fetchWalletBalance res", res?.data);
          setLoading(false);

          setWalletBalance(res?.data?.data?.balance);
        })
        .catch((err) => {
          console.log("fetchWalletBalance err", err?.response);

          setLoading(false);

          if (err?.status == 404) {
            setNoWalletBalance("Activate Wallet");
          }
        });
    } catch (error) {
      console.log("fetchWalletBalance error", error?.response);
    }
  };

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      await axiosInstance({
        url: "transaction",
        method: "GET",
      })
        .then((res) => {
          console.log("fetchTransactions res", res?.data);
          setLoading(false);
          setTransactionsList(res?.data?.data);
        })
        .catch((err) => {
          console.log("fetchTransactions err", err);

          setLoading(false);
        });
    } catch (error) {
      console.log("fetchTransactions error", error);
    }
  };

  const activateWallet = async () => {
    setLoading(true);
    try {
      await axiosInstance({
        url: "wallet",
        method: "POST",
      })
        .then((res) => {
          console.log("activateWallet res", res?.data);
          setLoading(false);
          bottomSheetRef.current.close();

          setWalletBalance(res?.data?.data?.wallet?.balance);
          fetchWalletBalance();
        })
        .catch((err) => {
          console.log("activateWallet err", err);
          setLoading(false);
        });
    } catch (error) {
      console.log("activateWallet error", error);
    }
  };

  const fundWallet = async (transactionReference) => {
    setLoading(true);

    const addFundsData = {
      reference: transactionReference,
    };
    try {
      await axiosInstance({
        url: "wallet/add-funds",
        method: "POST",
        data: addFundsData,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("fundWallet res", res?.data);
          setLoading(false);
          fetchWalletBalance();
          fetchTransactions();

          bottomSheetRef.current.close();
        })
        .catch((err) => {
          console.log("fundWallet err", err);
          setLoading(false);
        });
    } catch (error) {
      console.log("fundWallet error", error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchWalletBalance();
      fetchTransactions();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={"arrow-back-outline"}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        headerTitle={"My Wallet"}
      />

      {/* <View style={styles.cardContainer}>
        <View style={styles.rowCard}>
          <Text style={styles.text}>Wallet Balance</Text>
        </View>
        <Text style={[styles.text2]}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : noWalletBalance ? (
            setPriceTo2DecimalPlaces(0)
          ) : (
            setPriceTo2DecimalPlaces(walletBalance)
          )}
        </Text>
      </View> */}

      <View
        style={[
          styles.walletBalanceContainer,
          { borderBottomColor: theme?.borderColor },
        ]}
      >
        <View>
          <Text
            style={{ fontSize: 14, fontWeight: "400", color: COLORS.appGrey2 }}
          >
            Current Balance
          </Text>
          <Text style={[styles.walletBalance, { color: theme?.text }]}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : walletBalance ? (
              setPriceTo2DecimalPlaces(walletBalance)
            ) : (
              setPriceTo2DecimalPlaces(0)
            )}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current.open();
          }}
          style={{
            padding: 10,
            backgroundColor: COLORS.rendezvousRed,
            width: 44,
            height: 44,
            borderRadius: 8,
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="add-outline" color="white" size={25} />
        </TouchableOpacity>
      </View>

      {/* <FormButton
        title={noWalletBalance ? 'Activate Wallet' : 'Fund Wallet'}
        onPress={() => {
          bottomSheetRef.current.open();
        }}
      /> */}

      <View style={{ padding: 10, marginTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Text style={{ color: COLORS.appGrey2 }}>Recent Transactions</Text>
          <Text
            style={{
              borderBottomWidth: 1,
              borderBottomColor: theme?.borderColor,
              color: theme?.borderColor,
            }}
          >
            See all
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {reverseTransactionList?.map((cur, i) => (
            <TransactionsCard key={i} props={cur} />
          ))}
          <ScrollViewSpace />
        </ScrollView>
      </View>

      <BottomSheet
        bottomSheetRef={bottomSheetRef}
        height={2.5}
        bottomsheetTitle={
          !walletBalance ? "Activate Your Wallet" : "Fund Your Wallet"
        }
      >
        {walletBalance ? (
          <View style={{ paddingTop: 30 }}>
            <FormInput
              formInputTitle={"Fund you account"}
              keyboardType={"number-pad"}
              placeholder="Enter your amount"
              value={price}
              onChangeText={(txt) => {
                setPrice(txt);
                setPriceError("");
                setFormError("");
              }}
              errorMessage={priceError}
            />

            <FormButton
              title={"Make Payment"}
              width={1.1}
              // onPress={fundWallet}
              formError={formError}
              loading={loading}
              disabled={loading || !price}
              onPress={() => {
                if (!price) {
                  setPriceError("Please provide the amount for funding");
                } else {
                  paystackWebViewRef.current.startTransaction();
                }
              }}
            />

            <Paystack
              paystackKey={PAYSTACK_LIVE_PUBLIC_KEY}
              paystackSecretKey={PAYSTACK_LIVE_SECRET_KEY}
              amount={price}
              currency={loggedinUserCountry == "Nigeria" ? "NGN" : "USD"}
              billingEmail={loggedInUserEmail}
              activityIndicatorColor="green"
              onCancel={(ref) => {
                // handle response here
                console.log(ref);
              }}
              onSuccess={(res) => {
                console.log("paystack response ", res?.data);
                fundWallet(res?.data?.transactionRef?.trxref);
              }}
              autoStart={false}
              ref={paystackWebViewRef}
              // postPayAction={preparePaymentData}
            />
          </View>
        ) : (
          <View style={{ paddingTop: 30 }}>
            <FormButton
              title={"Activate Wallet"}
              onPress={activateWallet}
              disabled={loading}
              loading={loading}
            />
          </View>
        )}
      </BottomSheet>
    </SafeAreaViewComponent>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  cardContainer: {
    width: windowWidth / 1.1,
    height: 120,
    borderRadius: 12,
    padding: 20,
    backgroundColor: "black",
    justifyContent: "space-between",
    marginBottom: 30,
    alignSelf: "center",
  },
  rowCard: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mastercardLogo: {
    width: 54,
    height: 30,
    objectFit: "contain",
  },
  text: {
    color: "white",
  },
  text2: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: "400",
    color: "white",
  },
  cvvSection: {
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
    // backgroundColor: 'red',
    width: windowWidth / 1.1,
    justifyContent: "space-between",
    alignContent: "center",
    marginLeft: 10,
  },
  walletBalanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    // backgroundColor: 'green',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.appGrey4,
  },
  walletBalance: {
    fontSize: 28,
    fontWeight: "400",
  },
});
