import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../themes/themes';
import {useTheme} from '../../Context/ThemeContext';

const TravelCard = ({props, onPress}) => {
  const {theme} = useTheme();

  return (
    <View
      style={[
        styles.travelsCard,
        {
          borderColor: theme?.borderColor,
          backgroundColor: theme?.background,
        },
      ]}>
      <ImageBackground
        source={{uri: props?.image}}
        style={styles.image}
        imageStyle={styles.imageStyle}>
        <View style={[styles.badge, {backgroundColor: props?.statusColor}]}>
          <Text style={styles.badgeText}>{props?.status}</Text>
        </View>
        <View style={styles.titles}>
          <Text style={styles.title}>{props?.title}</Text>
          <Text style={styles.subtitle}>{props?.subtitle}</Text>
        </View>
      </ImageBackground>
      <View style={styles.content}>
        {props?.items.map((item, i) => (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 4,
            }}>
            <Ionicons
              name={item?.icon}
              size={15}
              color={theme?.secondaryText}
            />
            <Text
              key={i}
              style={[styles.listItem, {color: theme?.secondaryText}]}>
              {item?.itemName}
            </Text>
          </View>
        ))}
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={[styles.button, {backgroundColor: COLORS.rendezvousRed}]}>
        <Text style={styles.buttonText}>{props?.ctaText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TravelCard;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 10,
  },
  travelsCard: {
    width: windowWidth / 1.05,
    // marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    // elevation: 5,
    marginBottom: 10,
    borderColor: COLORS.appGrey2,
    borderWidth: 1,
  },
  titles: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    bottom: 5,
    position: 'absolute',
  },
  image: {
    height: 160,
    // justifyContent: 'flex-start',
    padding: 10,
  },
  imageStyle: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: COLORS.white,
  },
  subtitle: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 4,
  },
  listItem: {
    fontSize: 14,
    // marginBottom: 4,
    marginLeft: 6,
  },
  button: {
    paddingVertical: 10,
    alignItems: 'center',
    margin: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
