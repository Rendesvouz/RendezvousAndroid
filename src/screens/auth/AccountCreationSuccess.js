import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import FixedBottomContainer from "../../components/common/FixedBottomContainer";
import FormButton from "../../components/form/FormButton";
import { COLORS } from "../../themes/themes";
import { useDispatch, useSelector } from "react-redux";
import { setUserDestination } from "../../redux/features/user/userSlice";
import { windowWidth } from "../../utils/Dimensions";

const AccountCreationSuccess = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const userDestination = state.user.destination;

  const resetPasswordSuccessMessage = {
    messageTitle: "Password Changed Successfully",
    messageBody: "Your password has been created successfully",
  };

  const registrationSuccessMessage = {
    messageTitle: "Account created Successfully",
    messageBody:
      "Your account has been created successfully, please login to continue enjoying our services",
  };

  return (
    <SafeAreaViewComponent>
      <FixedBottomContainer top={1.7}>
        <View
          style={{
            marginBottom: 20,
            padding: 20,
            alignItems: "center",
            justifyContent: "center",
            width: windowWidth / 1.1,
          }}
        >
          <Text
            style={{
              color: COLORS.black,
              fontSize: 24,
              fontWeight: "600",
              lineHeight: 24,
              textAlign: "center",
              width: windowWidth / 1.1,
            }}
          >
            {userDestination == "Registration"
              ? registrationSuccessMessage?.messageTitle
              : resetPasswordSuccessMessage?.messageTitle}
          </Text>
          <Text
            style={{
              color: "#1E1E1EB2",
              fontSize: 16,
              fontWeight: "400",
              textAlign: "center",
              marginTop: 20,
              width: windowWidth / 1.3,
            }}
          >
            {userDestination == "Registration"
              ? registrationSuccessMessage?.messageBody
              : resetPasswordSuccessMessage?.messageBody}
          </Text>
        </View>
      </FixedBottomContainer>
      <FixedBottomContainer>
        <FormButton
          title={"Back to Login"}
          onPress={() => {
            dispatch(setUserDestination(null));
            navigation.navigate("Login");
          }}
        />
      </FixedBottomContainer>
    </SafeAreaViewComponent>
  );
};

export default AccountCreationSuccess;

const styles = StyleSheet.create({});
