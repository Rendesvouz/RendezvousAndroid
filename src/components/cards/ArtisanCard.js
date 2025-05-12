import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../../themes/themes";

const ArtisanCard = ({ props, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.container}
      onPress={onPress}
    >
      <View>
        <ImageBackground
          borderRadius={7}
          style={styles.artisanImage}
          source={props?.image}
        >
          <TouchableOpacity
            style={{
              left: 133,
              top: 4,
              backgroundColor: "white",
              height: 35,
              width: 35,
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="bookmark-outline" size={20} color={"black"} />
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: "#07BF0F",
              borderRadius: 15,
              padding: 8,
              alignSelf: "flex-start",
              top: 40,
              left: 6,
            }}
          >
            <Text style={styles.artisanPrice}>$20.00</Text>
          </View>
        </ImageBackground>
      </View>
      <View>
        <Text style={styles.artisanTitle}>{props?.title}</Text>
        <View style={styles.artisanInfo}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Ionicons name="person-circle-outline" size={15} color={"black"} />
            <Text style={styles.artisanName}>{props?.name}</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="star" size={15} color={"gold"} />
            <Text>4.3</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name="location-outline"
            size={15}
            color={COLORS.rendezvousRed}
          />
          <Text numberOfLines={1} style={styles.address}>
            12 sogunro estate, Ikeja
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ArtisanCard;

const styles = StyleSheet.create({
  container: {
    width: 173,
    height: 205,
    margin: 10,
  },
  artisanImage: {
    width: 183,
    height: 112,
    borderRadius: 8,
    marginBottom: 10,
  },
  artisanTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E1E1E",
    marginBottom: 10,
  },
  artisanPrice: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  artisanInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  artisanName: {
    fontSize: 14,
    fontWeight: "400",
    marginLeft: 10,
  },
  address: {
    marginLeft: 5,
  },
});
