import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../components/common/HeaderTitle";
import { COLORS } from "../../themes/themes";
import ProfileOptionsDisplay from "../../components/common/ProfileOptionsDisplay";

const settings = [
  {
    iconName: "lock-closed-outline",
    name: "Change Passsword",
    navigate: "ChangePassword",
  },
];

const AccountSettings = ({ navigation }) => {
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
        contentContainerStyle={{ padding: 10 }}
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
            Account Settings
          </Text>
        </View>
        {settings?.map((cur, i) => (
          <ProfileOptionsDisplay
            key={i}
            onPress={() => navigation.navigate(cur?.navigate)}
            title={cur?.name}
            iconName={cur?.iconName}
          />
        ))}
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default AccountSettings;

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
    // backgroundColor: 'pink',
  },
  setsContent: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    margin: 5,
    marginTop: 10,
  },
  settingsText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
    marginLeft: 17,
  },
});
