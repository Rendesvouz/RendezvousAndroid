import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../components/common/HeaderTitle";
import FixedBottomContainer from "../../components/common/FixedBottomContainer";
import FormButton from "../../components/form/FormButton";
import FormInput from "../../components/form/FormInput";
import { COLORS } from "../../themes/themes";
import { windowWidth } from "../../utils/Dimensions";

const EditProfile = ({ navigation }) => {
  const updateProfile = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={"arrow-back-outline"}
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
            Personal Data
          </Text>
        </View>

        <View style={styles.profileImageSection}>
          <Image
            source={require("../../assets/1.jpg")}
            style={styles.profileImage}
          />
          <Ionicons
            name="create"
            color={COLORS.rendezvousRed}
            size={20}
            style={styles.editIcon}
          />
        </View>
        <FormInput
          formInputTitle={"Full Name"}
          placeholder=""
          keyboardType={"default"}
        />
        <FormInput
          formInputTitle={"Phone Number"}
          placeholder="098463525"
          keyboardType={"email-address"}
        />
        <FormInput
          formInputTitle={"Email Address"}
          placeholder=""
          keyboardType={"email-address"}
        />
        <FormInput
          formInputTitle={"Date of Birth"}
          placeholder="Date of Birth"
          keyboardType={"email-address"}
        />
      </ScrollView>

      {/* Buttons */}
      <FixedBottomContainer top={1.1}>
        <FormButton title={"Update"} width={1.1} onPress={updateProfile} />
      </FixedBottomContainer>
    </SafeAreaViewComponent>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  profileImageSection: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
  },
  editIcon: {
    bottom: 0,
    position: "absolute",
    right: windowWidth / 2.5,
  },
});
