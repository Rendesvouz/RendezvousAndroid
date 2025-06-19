import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../themes/themes';

const CategorySticker = ({categoryName}) => {
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
        {categoryName}
      </Text>
    </View>
  );
};

export default CategorySticker;

const styles = StyleSheet.create({});
