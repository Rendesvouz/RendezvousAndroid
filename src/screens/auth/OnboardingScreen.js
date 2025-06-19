import {
  Alert,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppIntroSlider from 'react-native-app-intro-slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../themes/themes';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {sliderData, sliderData2} from '../../data/dummyData';
import {useDispatch} from 'react-redux';
import {saveLaunchScreen} from '../../redux/features/user/userSlice';

const OnboardingScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [showRealApp, setShowRealApp] = useState(false);

  const onSkip = () => {
    setShowRealApp(true);
  };

  const slides = [
    {
      key: 's1',
      title: 'Let’s Find You The Right Professional For The Job',
      description:
        'Lorem ipsum dolor sit amet consectetur. Varius consectetur nullam vulputate turpis ac viverra tincidunt ut facilisis.',
      image: require('../../assets/1.jpg'),
    },
    {
      key: 's2',
      title: 'Find The Nearest Handyman Closest To You',
      description:
        'Lorem ipsum dolor sit amet consectetur. Varius consectetur nullam vulputate turpis ac viverra tincidunt ut facilisis.',
      image: require('../../assets/1.jpg'),
    },
    {
      key: 's3',
      title: 'Start A Conversation & Book A Service',
      description:
        'Lorem ipsum dolor sit amet consectetur. Varius consectetur nullam vulputate turpis ac viverra tincidunt ut facilisis.',
      image: require('../../assets/1.jpg'),
    },
  ];

  const RenderItem = ({item}) => {
    return (
      <View style={styles.renderContainer}>
        <View style={{alignItems: 'center', marginBottom: 0}}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: item.image}}
              style={styles.introImageStyle}
              resizeMode="cover"
            />
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.introTitleStyle}>{item.title}</Text>
            <Text style={styles.introTextStyle}>{item.description}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderNextButton = () => {
    return (
      <View
        style={[styles.buttonCircle, {backgroundColor: COLORS.rendezvousRed}]}>
        <Ionicons name="arrow-forward-outline" size={30} color="white" />
      </View>
    );
  };

  const renderPreviousButton = () => {
    return (
      <View
        style={[styles.buttonCircle, {backgroundColor: COLORS.rendezvousRed}]}>
        <Ionicons name="arrow-back-outline" size={30} color="white" />
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <TouchableOpacity
        style={[styles.buttonCircle, {backgroundColor: COLORS.rendezvousRed}]}
        onPress={() => {
          // Instead of navigating directly to "Login", we'll mark onboarding as complete
          AsyncStorage.setItem('alreadyLaunched', 'true').then(() => {
            console.log('its hereee');
            // Force a re-render of the navigation
            // navigation.replace("AuthStack", { screen: "Login" });
            // navigation.replace("Login");
            dispatch(saveLaunchScreen(true));
            navigation.navigate('Home');
          });
          // Alert.alert("pressed");
        }}>
        <Ionicons name="checkmark-outline" size={30} color="white" />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <AppIntroSlider
        data={sliderData2}
        renderItem={RenderItem}
        showSkipButton={false}
        showPrevButton={true}
        onSkip={onSkip}
        renderNextButton={renderNextButton}
        renderDoneButton={renderDoneButton}
        renderPrevButton={renderPreviousButton}
        // bottomButton
        activeDotStyle={{backgroundColor: COLORS.rendezvousRed}}
        dotStyle={{backgroundColor: '#D9D9D9'}}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom: 40,
  },
  buttonCircle: {
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionContainer: {
    flex: 1,
    zIndex: 1000,
    bottom: 0,
    // top: windowHeight / 1.15,
    // backgroundColor: 'red',
    marginTop: 50,
    // marginBottom: 60,
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },

  introTitleStyle: {
    fontSize: 24,
    color: COLORS.black,
    textAlign: 'center',
    fontWeight: '700',
    // marginTop: 40,
  },
  introTextStyle: {
    fontSize: 16,
    color: COLORS.ndonuGrey,
    textAlign: 'center',
    marginTop: 10,
    // marginBottom: 40,
    fontWeight: '500',
    padding: 30,
    paddingTop: 0,
    lineHeight: 27,
  },

  renderContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: 30,
    // paddingBottom: windowHeight / 2,
  },

  introImageStyle: {
    width: windowWidth,
    height: windowHeight / 1.7,
    // borderBottomLeftRadius: 50,
    // borderBottomRightRadius: 50,
  },
  imageContainer: {
    overflow: 'hidden', // Ensures rounded corners are visible
    // borderBottomLeftRadius: windowWidth / 4.6,
    // borderBottomRightRadius: windowWidth / 4.6,
    // backgroundColor: 'red',
  },
});
