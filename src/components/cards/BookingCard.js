import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CategorySticker from "../common/CategorySticker";
import TransparentBtn from "../form/TransparentBtn";
import { windowWidth } from "../../utils/Dimensions";
import { COLORS } from "../../themes/themes";

const BookingCard = ({
  imageSource,
  servicceTitle,
  serviceType,
  servicePrice,
  vendorName,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.bookingCard}>
      <View style={styles.cardContents}>
        <Image source={imageSource} style={styles.cardImage} />
        <View>
          <View style={styles.cardTitle}>
            <Text style={styles.serviceName}>{servicceTitle}</Text>
            <CategorySticker categoryName={serviceType} />
          </View>
          <Text>{vendorName}</Text>
          <Text style={styles.servicePrice}>{servicePrice}</Text>
        </View>
      </View>
      <TransparentBtn
        title={"More Details"}
        marginTop={10}
        textColor={COLORS.rendezvousRed}
      />
    </TouchableOpacity>
  );
};

export default BookingCard;

const styles = StyleSheet.create({
  bookingCard: {
    width: windowWidth / 1.05,
    height: 167,
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
  },
  cardContents: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
  cardImage: {
    width: 93,
    height: 93,
    borderRadius: 8,
    marginRight: 10,
  },
  cardTitle: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: 'space-between',
    marginBottom: 10,
    display: "flex",
    width: windowWidth / 1.8,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "600",
    // marginBottom: 10,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: "600",
  },
});
