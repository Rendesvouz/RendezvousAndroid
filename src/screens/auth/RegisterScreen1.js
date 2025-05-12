import {
  StyleSheet,
  Text,
  Platform,
  ScrollView,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../../components/form/FormInput";
import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../components/common/HeaderTitle";
import { COLORS } from "../../themes/themes";
import FormButton from "../../components/form/FormButton";
import FixedBottomContainer from "../../components/common/FixedBottomContainer";
import ScrollViewSpace from "../../components/common/ScrollViewSpace";
import { setUserDestination } from "../../redux/features/user/userSlice";
import { emailValidator } from "../../Library/Validation";
import KeyboardAvoidingComponent from "../../components/form/KeyboardAvoidingComponent";
import PickerSelect from "../../components/pickerSelect/PickerSelect";
import { rendezvousRoles } from "../../data/dummyData";

const RegisterScreen1 = ({ navigation }) => {
  const dispatch = useDispatch();

  const userOptions = [
    {
      label: "Find Love",
      value: "User",
    },
    {
      label: "Find Therapists",
      value: "User",
    },
    {
      label: "Find LifeCoaches",
      value: "User",
    },
  ];

  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  // Error states
  const [formError, setFormError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [roleError, setRoleError] = useState("");

  const registerUser = () => {
    const stage1Data = {
      username: username,
      email: email,
      role: "User",
    };

    if (!username || !email) {
      setFormError("Please fill all the details");
      setUsernameError("Provide your full name");
      setEmailError("Provide your email address");
      // setRoleError("Provide select a role from the options");
    } else if (!email) {
      setEmailError("Provide your email address");
    } else if (!username) {
      setUsernameError("Provide your full name");
    } else {
      navigation.navigate("Register2", stage1Data);
    }
  };

  return (
    <SafeAreaViewComponent>
      <KeyboardAvoidingComponent>
        <HeaderTitle
          leftIcon={"arrow-back-outline"}
          progress={50}
          onLeftIconPress={() => {
            navigation.goBack();
          }}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 0 }}
        >
          <View style={{ marginBottom: 20, padding: 20 }}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 24,
                fontWeight: "600",
                lineHeight: 24,
              }}
            >
              Create an Account
            </Text>
            <Text
              style={{ color: "#1E1E1EB2", fontSize: 16, fontWeight: "400" }}
            >
              Please fill in your information to create an account{" "}
            </Text>
          </View>

          <FormInput
            formInputTitle={"Email Address"}
            placeholder="Enter your email address"
            keyboardType={"email-address"}
            value={email}
            onChangeText={(txt) => {
              setEmail(txt);
              setFormError("");
              if (!emailValidator(txt)) {
                setEmailError("Please enter a valid email");
              } else {
                setEmailError("");
              }
            }}
            errorMessage={emailError}
          />
          <FormInput
            formInputTitle={"Username"}
            keyboardType={"default"}
            placeholder="Enter your Username"
            value={username}
            onChangeText={(txt) => {
              setUsername(txt);
              setUsernameError("");
              setFormError("");
            }}
            errorMessage={usernameError}
          />

          {/* <PickerSelect
            items={userOptions}
            placeholder={"Select Your Role"}
            formInputTitle={"What do you want to do on the platform"}
            onValueChange={(value) => {
              setRole(value);
              setFormError("");
              setRoleError("");
            }}
            errorMessage={roleError}
          /> */}
          <ScrollViewSpace />
        </ScrollView>

        {/* Buttons */}
        <FixedBottomContainer top={1.4}>
          <FormButton
            title={"Next"}
            width={1.1}
            onPress={registerUser}
            formError={formError}
          />

          <View style={styles.alreadySection}>
            <Text style={[styles.alreadyText]}>
              Already have an account?{"  "}
            </Text>
            <TouchableOpacity
              style={styles.signup}
              onPress={() => {
                dispatch(setUserDestination(null));
                navigation.navigate("Login");
              }}
            >
              <Text
                style={{
                  color: COLORS.rendezvousRed,
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </FixedBottomContainer>
      </KeyboardAvoidingComponent>
    </SafeAreaViewComponent>
  );
};

export default RegisterScreen1;

const styles = StyleSheet.create({
  alreadySection: {
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    // position: "absolute",
    bottom: 0,
    flexDirection: "row",
    marginTop: 20,
  },
  alreadyText: {
    color: "black",
    fontSize: 16,
    fontWeight: "400",
  },
  signup: {
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    // backgroundColor: "red",
    // marginTop: 10,
  },
});
