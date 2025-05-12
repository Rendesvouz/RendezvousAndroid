import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useState } from "react";
import { windowHeight, windowWidth } from "../../utils/Dimensions";
import { COLORS } from "../../themes/themes";
import { formatToUSD } from "../../Library/Common";

const GiftCard = ({ props, onPress }) => {
  const [loading, setloading] = useState(true);
  const onLoadEnd = () => {
    setloading(false);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={styles.giftcardContainer}
    >
      <Image
        style={styles.productImage}
        source={{ uri: props?.logoUrls[0] }}
        onLoad={onLoadEnd}
        onLoadEnd={onLoadEnd}
      />
      <View style={{ justifyContent: "space-between" }}>
        <Text numberOfLines={1} style={styles.cardName}>
          {props?.name}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.cardPrice}>
            {formatToUSD(props?.price?.length ? props?.price[0] : 0)}
          </Text>
          <Text style={{ color: COLORS.rendezvousRed, fontSize: 14 }}>
            Purchase
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GiftCard;

const styles = StyleSheet.create({
  giftcardContainer: {
    padding: 7,

    width: windowWidth / 2.2,
    height: 220,
    borderRadius: 8,
    // backgroundColor: "red",
    marginBottom: 3,
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
  cardName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    color: COLORS.rendezvousBlack2,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: "600",
  },
});
