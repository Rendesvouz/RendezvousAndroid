import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../themes/themes';
import {useTheme} from '../../Context/ThemeContext';

const PreferencesCard = ({
  category,
  selectedCategories,
  onToggleSelect,
  onPress,
}) => {
  const {theme} = useTheme();

  const isSelected = selectedCategories.includes(category);
  const isDisabled = selectedCategories.length >= 5 && !isSelected;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        [styles.option, {backgroundColor: theme?.background}],
        isSelected && styles.selectedOption,
        isDisabled && styles.disabledOption,
        // {backgroundColor: theme?.background},
      ]}
      onPress={() => {
        if (!isDisabled) {
          onToggleSelect(category);
        }
      }}
      disabled={isDisabled}>
      <Text
        style={[
          [styles.optionText, {color: theme?.text}],
          isSelected && styles.selectedText,
          isDisabled && styles.disabledText,
          // {color: theme?.text},
        ]}>
        {category}
      </Text>
    </TouchableOpacity>
  );
};

export default PreferencesCard;

const styles = StyleSheet.create({
  option: {
    backgroundColor: 'white',
    borderRadius: 10,
    // width: windowWidth / 2.6,
    alignSelf: 'center',
    alignItems: 'center',
    // height: windowHeight / 20,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.rendezvousRed,
    margin: 6,
    padding: 10,
    marginBottom: 10,
  },
  optionText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
  selectedText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  selectedOption: {
    backgroundColor: COLORS.rendezvousRed,
    borderRadius: 10,
    // width: windowWidth / 2.6,
    alignSelf: 'center',
    alignItems: 'center',
    // height: windowHeight / 20,
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: COLORS.formBtn,
    margin: 6,
    padding: 10,
    marginBottom: 20,
  },
  disabledOption: {
    backgroundColor: '#e0e0e0',
    borderColor: '#b0b0b0',
  },
  disabledText: {
    color: '#9e9e9e',
  },
});
