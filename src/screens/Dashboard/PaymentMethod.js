import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../components/common/HeaderTitle";
import HeaderText from "../../components/common/HeaderText";
import { COLORS } from "../../themes/themes";

const PaymentMethod = ({ navigation }) => {
  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={"arrow-back-outline"}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />
      <HeaderText headerTitle={"Payment Method"} />

      <View style={{ padding: 20 }}>
        <Text style={{ marginBottom: 10 }}>Debit Card</Text>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.set}
          onPress={() => {
            navigation.navigate("AddPaymentCard");
          }}
        >
          <View style={styles.setsContent}>
            <Ionicons name="card" size={20} color={COLORS.rendezvousRed} />
            <Text style={[styles.settingsText]}>Add Card</Text>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            size={20}
            color={"#ccc"}
            style={{ marginTop: 5 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaViewComponent>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  settings: {
    margin: 5,
    marginTop: 30,
    borderTopWidth: 1,
    marginBottom: 20,
    borderColor: "#999",
  },
  set: {
    marginBottom: 0,
    // borderBottomColor: '#999',
    // borderBottomWidth: 1,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 8,
    // backgroundColor: 'pink',
  },
  setsContent: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    margin: 5,
    // marginTop: 10,
  },
  settingsText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
    marginLeft: 17,
  },
});
