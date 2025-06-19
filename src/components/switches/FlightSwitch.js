import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../themes/themes';
import {useTheme} from '../../Context/ThemeContext';

const FlightSwitch = ({arrayData, seletionMode, onSelectSwitch}) => {
  const {theme} = useTheme();

  const [getSelectionMode, setSelectionMode] = useState(seletionMode);

  const updateSwitchData = value => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.customSwitch}>
      {arrayData?.map((cur, i) => (
        <TouchableOpacity
          key={i}
          style={{
            backgroundColor:
              getSelectionMode == i ? COLORS.rendezvousRed : theme?.background,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            width: windowWidth / 3.5,
            borderWidth: 1,
            borderColor:
              getSelectionMode == i ? COLORS.rendezvousRed : theme?.borderColor,
            marginRight: 10,
            height: 50,
          }}
          activeOpacity={1}
          onPress={() => updateSwitchData(i)}>
          <Text
            style={[
              styles.switchText,
              {
                color: getSelectionMode == i ? COLORS.white : theme?.text,
                // marginBottom: 5,
              },
            ]}>
            {cur?.optionTitle}
          </Text>
          <Text
            style={[
              styles.switchText,
              {color: getSelectionMode == i ? COLORS.white : theme?.text},
            ]}>
            {cur?.optionPrice}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default FlightSwitch;

const styles = StyleSheet.create({
  //   customSwitch: {
  //     // backgroundColor: 'red',
  //     flexDirection: 'row',
  //     marginLeft: 10,
  //   },
});
