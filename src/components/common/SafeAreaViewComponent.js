import {StyleSheet, SafeAreaView, Platform} from 'react-native';
import React from 'react';
import {useTheme} from '../../Context/ThemeContext';

const SafeAreaViewComponent = ({children, backgroundColor}) => {
  const {theme} = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : theme?.background,
        },
      ]}>
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaViewComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: Platform.OS == 'android' ? 0 : 20,
  },
});
