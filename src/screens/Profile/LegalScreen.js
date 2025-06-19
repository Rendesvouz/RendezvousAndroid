import {Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeAreaViewComponent from '../../components/common/SafeAreaViewComponent';
import HeaderTitle from '../../components/common/HeaderTitle';
import ScrollViewSpace from '../../components/common/ScrollViewSpace';
import ProfileOptionsDisplay from '../../components/common/ProfileOptionsDisplay';

const settings = [
  {
    iconName: 'information-circle-outline',
    name: 'Terms & Conditions',
    link: 'https://www.rendezvouscare.com/terms-of-use',
  },
  {
    iconName: 'document-lock-outline',
    name: 'Privacy Policy',
    link: 'https://www.rendezvouscare.com/privacy-policy',
  },
];

const LegalScreen = ({navigation}) => {
  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={'arrow-back-outline'}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 10}}>
        {settings?.map((cur, i) => (
          <ProfileOptionsDisplay
            key={i}
            title={cur?.name}
            iconName={cur?.iconName}
            onPress={() => {
              Linking.openURL(`${cur.link}`);
            }}
          />
        ))}

        <ScrollViewSpace />
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default LegalScreen;

const styles = StyleSheet.create({});
