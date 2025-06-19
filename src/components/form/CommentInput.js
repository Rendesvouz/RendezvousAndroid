import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../themes/themes';
import {useTheme} from '../../Context/ThemeContext';

const CommentInput = ({
  leftIcon,
  iconColor = '#fff',
  rightIcon,
  inputStyle,
  containerStyle,
  placeholderTextColor = COLORS.appGrey5,
  handlePasswordVisibility,
  onPress,
  autoCapitalize,
  keyboardType,
  maxLength,
  editable,
  width,
  autoFocus,
  height,
  ...rest
}) => {
  const {theme} = useTheme();

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        {
          width: windowWidth / (width || 1.4),
          backgroundColor: theme?.borderColor,
        },
      ]}
      onPress={onPress}>
      {leftIcon ? (
        <Ionicons
          name={leftIcon}
          size={20}
          color="#bbb"
          style={styles.leftIcon}
        />
      ) : null}
      <TextInput
        {...rest}
        autoCorrect={false}
        placeholderTextColor={placeholderTextColor}
        style={[styles.input, inputStyle, {color: theme.text}]}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        maxLength={maxLength}
        editable={editable}
        autoFocus={autoFocus}
      />
      {rightIcon ? (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handlePasswordVisibility}>
          <Ionicons
            name={rightIcon}
            size={30}
            color={COLORS.rendezvousRed}
            style={styles.rightIcon}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default CommentInput;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: COLORS.appGrey3,
    // borderWidth: 1,
    // borderColor: "#333",
    height: 50,
    // backgroundColor: "green",
  },
  leftIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    width: '100%',
    fontSize: 16,
    color: 'black',
    height: 25,
    // backgroundColor: "red",
    // marginTop: 0,
    // marginBottom: 60,
  },
  rightIcon: {
    marginLeft: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 2,
  },
});
