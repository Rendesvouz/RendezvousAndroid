import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import RNPickerSelect from "react-native-picker-select";
import Ionicons from "react-native-vector-icons/Ionicons";

import { windowHeight, windowWidth } from "../../utils/Dimensions";

const ShopPicker = ({
  value,
  onValueChange,
  placeholder,
  items,
  formInputTitle,
  errorMessage,
}) => {
  const pickerSelectStyles2 = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,

      borderRadius: 8,
      color: "black",
      paddingRight: 30, // to ensure the text is never behind the icon
      width: windowWidth / 2,
      height: 50,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: "gray",
      borderRadius: 8,
      color: "black",
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    viewContainer: {
      borderWidth: 1,
      borderColor: "#ccc",
      width: windowWidth / 2.8,
      height: Platform.OS == "android" ? 46 : 30,
      color: "black",
      borderRadius: 4,
      justifyContent: "center",
      alignSelf: "center",

      marginTop: 0,
    //   backgroundColor: "red",
    },
    pickerIcon: {
      marginTop: 30,
      marginRight: 90,
      // backgroundColor: "red",
    },
  });

  return (
    <View style={[styles.auth]}>
      {formInputTitle && (
        <Text style={styles.inputTitle}>{formInputTitle}</Text>
      )}

      <RNPickerSelect
        style={pickerSelectStyles2}
        onValueChange={onValueChange}
        value={value}
        placeholder={{
          label: placeholder,
          color: "#666",
        }}
        items={items}
        Icon={() => {
          return (
            Platform.OS === "ios" && (
              <Ionicons
                name="chevron-down-outline"
                size={24}
                color={"#ccc"}
                style={{ marginTop: 15, marginRight: 10 }}
              />
            )
          );
        }}
      />
    </View>
  );
};

export default ShopPicker;

const styles = StyleSheet.create({
  auth: {
    width: windowWidth / 2.7,
    alignSelf: "center",
    // backgroundColor: "green",
  },
  inputTitle: {
    marginBottom: 10,
    fontSize: 16,
    color: "#1E1E1E",
    fontWeight: "600",
  },
  validationError: {
    color: "red",
    fontWeight: "500",
    marginBottom: 5,
    fontSize: 13,
    // textAlign: 'center',
  },
});
