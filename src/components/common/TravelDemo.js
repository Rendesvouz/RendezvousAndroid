import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import {windowWidth} from '../../utils/Dimensions';
import FormButton from '../form/FormButton';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const TravelDemo = ({}) => {
  const navigation = useNavigation();
  const state = useSelector(state => state);
  const userProfle = state?.user?.user?.profile;

  const handleBookFlight = () => {
    console.log('Book Premium Flight pressed');
    userProfle
      ? navigation.navigate('FlightsScreen')
      : navigation.navigate('Login', {destination: 'FlightsScreen'});
  };

  const handleWatchDemo = () => {
    console.log('Watch Demo pressed');
    // Add demo video logic here
  };

  return (
    <LinearGradient
      colors={['#1a1a1a', '#2d2d2d', '#1a1a1a']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.gradientBackground}>
      {/* Decorative Element */}
      <View style={styles.decorativeCircle}>
        <View style={styles.rocketIcon}>
          <Text style={styles.rocketEmoji}>🚀</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Headline */}
        <Text style={styles.headline}>
          Ready to <Text style={styles.highlightText}>Elevate</Text> Your
          Travel?
        </Text>

        {/* Subheadline */}
        <Text style={styles.subheadline}>
          Join thousands of discerning travelers who choose luxury, comfort, and
          exceptional service for their journeys.
        </Text>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <FormButton
            title={'Book Premium Flight'}
            onPress={handleBookFlight}
          />
          {/* Primary Button */}
          {/* <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleBookFlight}
            activeOpacity={0.8}>
            <LinearGradient
              colors={['#8B2635', '#A52A2A', '#8B2635']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.primaryButtonGradient}>
              <Text style={styles.primaryButtonIcon}>✈️</Text>
              <Text style={styles.primaryButtonText}>Book Premium Flight</Text>
              <Text style={styles.primaryButtonArrow}>→</Text>
            </LinearGradient>
          </TouchableOpacity> */}

          {/* Secondary Button */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleWatchDemo}
            activeOpacity={0.7}>
            <View style={styles.playIcon}>
              <Text style={styles.playIconText}>▶</Text>
            </View>
            <Text style={styles.secondaryButtonText}>Watch Demo</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Decorative Elements */}
      <View style={styles.bottomDecoration}>
        <View style={styles.bottomDot} />
        <View style={styles.bottomLine} />
      </View>
    </LinearGradient>
  );
};

export default TravelDemo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    backgroundColor: 'red',
    padding: 10,
  },
  gradientBackground: {
    flex: 1,
    // paddingHorizontal: 20,
    // paddingVertical: 60,
    position: 'relative',
    backgroundColor: 'green',
    marginBottom: 30,
  },
  decorativeCircle: {
    position: 'absolute',
    top: 20,
    right: windowWidth / 2.5,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(139, 38, 53, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  rocketIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rocketEmoji: {
    fontSize: 24,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 120,
  },
  headline: {
    fontSize: 30,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    // lineHeight: 50,
    letterSpacing: -0.5,
  },
  highlightText: {
    color: '#D4514F',
  },
  subheadline: {
    fontSize: 14,
    color: '#B0B0B0',
    textAlign: 'center',
    // lineHeight: 26,
    marginBottom: 50,
    paddingHorizontal: 10,
    fontWeight: '400',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
    flexWrap: 'wrap',
  },
  primaryButton: {
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#8B2635',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    // backgroundColor: 'green',
    overflow: 'hidden',
  },
  primaryButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    // backgroundColor: 'green',
  },
  primaryButtonIcon: {
    fontSize: 18,
  },
  primaryButtonText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  primaryButtonArrow: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  playIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  playIconText: {
    color: '#FFFFFF',
    fontSize: 10,
    marginLeft: 2,
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  bottomDecoration: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    transform: [{translateX: -20}],
    alignItems: 'center',
  },
  bottomDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8B2635',
    marginBottom: 10,
  },
  bottomLine: {
    width: 40,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});
