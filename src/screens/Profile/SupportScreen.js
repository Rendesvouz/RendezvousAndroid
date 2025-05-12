import { StyleSheet, Text, View, ScrollView, Linking } from "react-native";
import React, { useRef } from "react";
import { openComposer } from "react-native-email-link";

import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../components/common/HeaderTitle";
import ProfileOptionsDisplay from "../../components/common/ProfileOptionsDisplay";
import BottomSheet from "../../components/bottomSheet/BottomSheet";
import SocialShareButton from "../../components/common/SocialShareButton";

const socialMediaLinks = [
  {
    id: 1,
    title: "YouTube",
    iconName: "logo-youtube",
    link: "https://www.youtube.com/@RendezvousLuxuryCare",
  },
  {
    id: 2,
    title: "X",
    iconName: "logo-twitter",
    link: "https://x.com/Rendezvouscare",
  },
  {
    id: 3,
    title: "Facebook",
    iconName: "logo-facebook",
    link: "https://www.facebook.com/share/1Yq4Sv7Fyo/?mibextid=wwXIfr",
  },
  {
    id: 4,
    title: "Instagram",
    iconName: "logo-instagram",
    link: "https://www.instagram.com/rendezvouscare?igsh=MWJ5c3A1ZWIycnh3NQ==",
  },
  {
    id: 5,
    title: "LinkedIn",
    iconName: "logo-linkedin",
    link: "https://www.linkedin.com/in/rendezvous-luxury-care-services",
  },
];

const SupportScreen = ({ navigation }) => {
  const bottomSheetRef = useRef();
  const openEmail = () => {
    console.log("ddd");
    openComposer({
      to: "enquiry@rendezvouscare.com",
      subject: "I have a question",
      body: "Hi, can you help me with...",
    });
  };
  const openWebsite = () => {
    Linking.openURL("https://rendezvouscare.com")
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openTwitterPage = () => {
    Linking.openURL("https://x.com/Rendezvouscare")
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openFacebookPage = () => {
    Linking.openURL(
      "https://www.facebook.com/share/1Yq4Sv7Fyo/?mibextid=wwXIfr"
    )
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={"arrow-back-outline"}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        headerTitle={"Contact Us"}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 10 }}
      >
        <ProfileOptionsDisplay
          onPress={openEmail}
          title={"Email Us"}
          iconName={"mail-outline"}
        />
        <ProfileOptionsDisplay
          onPress={() => bottomSheetRef.current.open()}
          title={"Social Media"}
          iconName={"logo-apple-ar"}
        />
      </ScrollView>
      <BottomSheet
        bottomSheetRef={bottomSheetRef}
        bottomsheetTitle={"Connect With Us"}
        height={4}
      >
        <View style={{ padding: 10 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* Social Buttons */}

            {socialMediaLinks.map((cur, i) => (
              <SocialShareButton
                key={i}
                name={cur.iconName}
                color="black"
                title={cur.title}
                onPress={() => {
                  Linking.openURL(`${cur.link}`);
                }}
              />
            ))}
          </ScrollView>
        </View>
      </BottomSheet>
    </SafeAreaViewComponent>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({});
