import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Rating} from 'react-native-ratings';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import SafeAreaViewComponent from '../../components/common/SafeAreaViewComponent';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../themes/themes';
import FormButton from '../../components/form/FormButton';
import FixedBottomContainer from '../../components/common/FixedBottomContainer';
import HomeScreen from '../HomeScreen';
import ProfileScreen from '../Profile/ProfileScreen';

const Tab = createMaterialTopTabNavigator();

const DetailsScreen = ({navigation}) => {
  const CategorySticker = () => {
    return (
      <View
        style={{
          backgroundColor: '#2465E11A',
          borderRadius: 15,
          padding: 10,
          alignSelf: 'flex-start',
        }}>
        <Text
          style={[
            styles.artisanPrice,
            {color: COLORS.ndonuBlueColor, fontSize: 8},
          ]}>
          Cleaning
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/1.jpg')}
        style={styles.detailsImage}>
        <View style={styles.bgIcons}>
          <Ionicons
            name="arrow-back-outline"
            size={20}
            color="white"
            onPress={() => {
              navigation.goBack();
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              height: 35,
              width: 35,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons name="bookmark-outline" size={20} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={{padding: 20}}>
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>Car Washing</Text>
          <CategorySticker />
        </View>
        <Text style={{fontSize: 16, fontWeight: '400'}}>
          No 1, Lorem Ipsum str. Wallace Ave.
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text>Ratings:</Text>
          <Rating
            defaultRating={0}
            imageSize={17}
            style={{
              //   backgroundColor: 'black',
              marginTop: 10,
              marginBottom: 10,
              justifyContent: 'flex-start',
              width: windowWidth / 4,
              marginLeft: 5,
              marginRight: 10,
            }}
            ratingBackgroundColor="red"
            tintColor="whitesmoke"
            startingValue={4}
            minValue={3}
            ratingCount={5}
            readonly={true}
            unSelectedColor="red"
            starContainerStyle={{color: 'red'}}
          />
          <Text>(123 reviews)</Text>
        </View>
      </View>

      <Tab.Navigator>
        <Tab.Screen name="Info" component={HomeScreen} />
        <Tab.Screen name="Projects" component={ProfileScreen} />
        <Tab.Screen name="Reviews" component={ProfileScreen} />
      </Tab.Navigator>

      <FixedBottomContainer>
        <Text style={{marginLeft: 10}}>Starting price: $40:00 - $45:00</Text>
        <FormButton
          title={'Book Now'}
          onPress={() => {
            navigation.navigate('PaymentMethod');
          }}
        />
      </FixedBottomContainer>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  detailsImage: {
    height: windowHeight / 2.5,
    width: windowWidth,
  },
  bgIcons: {
    display: 'flex',
    top: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  titleSection: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  titleText: {
    marginRight: 10,
    fontSize: 24,
    fontWeight: '600',
  },
});
