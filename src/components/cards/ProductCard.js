import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder-expo";

import { windowWidth } from "../../utils/Dimensions";
import { setPriceTo2DecimalPlaces } from "../../Library/Common";
import { COLORS } from "../../themes/themes";

const ProductCard = ({
  navigation,
  onPress,
  productImage,
  productName,
  productPrice,
  props,
}) => {
  const [loading, setloading] = useState(true);
  const onLoadEnd = () => {
    setloading(false);
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={styles.productCard}
      >
        <Image
          style={styles.productImage}
          source={{ uri: productImage }}
          onLoad={onLoadEnd}
          onLoadEnd={onLoadEnd}
        />
        <Text numberOfLines={1} style={styles.productName}>
          {productName}
        </Text>
        <Text style={styles.productPrice}>
          <Text
            style={[
              styles.originalPrice,
              props.discounted_price && {
                textDecorationLine: "line-through",
                color: "gray",
              },
            ]}
          >
            {setPriceTo2DecimalPlaces(productPrice)}{" "}
          </Text>
          {props.discounted_price && (
            <Text style={styles.discountPrice}>
              {setPriceTo2DecimalPlaces(productPrice - props?.discounted_price)}
            </Text>
          )}
        </Text>
      </TouchableOpacity>

      {loading && (
        // This shows the skeletonLoader when the image hasn't fully loaded on the screen
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onPress}
          style={styles.productCard}
        >
          <SkeletonPlaceholder
            highlightColor={COLORS.skeletonHighlightColor}
            backgroundColor={COLORS.skeletonBgColor}
            speed={1900}
          >
            <Image style={styles.productImage} source={""} />
          </SkeletonPlaceholder>
          <Text numberOfLines={1} style={styles.productName}>
            {productName}
          </Text>
          <Text style={styles.productPrice}>
            {setPriceTo2DecimalPlaces(productPrice)}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productCard: {
    width: windowWidth / 2.2,
    // height: 200,
    borderRadius: 16,
    padding: 7,
    // backgroundColor: "red",
    marginBottom: 4,
    margin: 3,
    borderWidth: 1,
    borderColor: "#eee",
  },
  productImage: {
    width: windowWidth / 2.4,
    height: 140,
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    marginBottom: 5,
  },
  productPrice: {
    fontWeight: "700",
    fontSize: 15,
  },
  originalPrice: {
    fontSize: 14,
    color: "red",
  },
  discountPrice: {
    fontSize: 14,
    color: "red",
    fontWeight: "bold",
  },
});
