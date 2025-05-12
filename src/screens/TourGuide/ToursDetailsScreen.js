import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import ImageView from "react-native-image-viewing";

import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../components/common/HeaderTitle";
import ScrollViewSpace from "../../components/common/ScrollViewSpace";
import { windowHeight, windowWidth } from "../../utils/Dimensions";
import FixedBottomContainer from "../../components/common/FixedBottomContainer";
import FormButton from "../../components/form/FormButton";
import { COLORS } from "../../themes/themes";
import TransparentBtn from "../../components/form/TransparentBtn";

const ToursDetailsScreen = ({ navigation, route }) => {
  const item = route?.params;
  console.log("eee", item);

  const [visible, setIsVisible] = useState(false);

  const transformedData = item?.pictures?.map((item) => ({
    uri: item,
  }));

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={"arrow-back-outline"}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        rightIcon={"heart-outline"}
        headerTitle={""}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            padding: 10,
            // flexDirection: 'row',
            // backgroundColor: 'green',
          }}
        >
          {item?.pictures?.map((cur, i) => (
            <View key={i}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={{ flexDirection: "row", marginRight: 10 }}
                onPress={() => {
                  setIsVisible(true);
                }}
              >
                <Image source={{ uri: cur }} style={styles.tourdetailsImage} />
              </TouchableOpacity>
              <ImageView
                images={transformedData}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
              />
            </View>
          ))}
        </ScrollView>

        <View>
          <Text numberOfLines={1} style={styles.detailsTitle}>
            {item?.title}
          </Text>
          <View style={styles.tourguideProfile2}>
            <Ionicons
              name="location-outline"
              size={15}
              style={{ marginRight: 6 }}
            />
            <Text>{item?.places}</Text>
          </View>
          <View style={styles.tourguideProfile2}>
            <Ionicons
              name="people-outline"
              size={15}
              style={{ marginRight: 6 }}
            />
            <Text>7 people max</Text>
          </View>
          <View style={styles.tourguideProfile2}>
            <Ionicons
              name="alarm-outline"
              size={15}
              style={{ marginRight: 6 }}
            />
            <Text>{item?.duration} hours</Text>
          </View>
          {/* <View style={styles.tourguideProfile2}>
            <Ionicons
              name="calendar-outline"
              size={15}
              style={{ marginRight: 6 }}
            />
            <Text>Available on Monday form 9am - 12am UTC</Text>
          </View> */}
        </View>
        <Text style={styles.detailsItenary}>Tour Itenary</Text>
        <Text style={styles.detailsItenaryText}>{item?.tour_itinerary}</Text>

        {/* Transportatio information */}
        <Text style={styles.detailsItenary}>Tour Transportation Details</Text>
        <Text style={styles.detailsItenaryText}>
          {item?.transportation_detail[0]}
        </Text>

        {/* tour guide profile */}
        <Text style={styles.detailsItenary}>Your Tourguide</Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            alignItems: "center",
            width: windowWidth / 1.5,
          }}
        >
          <Image
            source={{ uri: item?.tourguideProfile?.profile_pictures[0] }}
            style={{ width: 80, height: 80, borderRadius: 40, marginRight: 20 }}
          />
          <View>
            <Text numberOfLines={1} style={styles.tourguideProfileName}>
              {item?.tourguideProfile?.fullname}
            </Text>
            <Text numberOfLines={3} style={styles.tourguideProfileBio}>
              {item?.tourguideProfile?.bio}
            </Text>
            {/* <TransparentBtn width={3} height={40} title={'View Profile'} /> */}
          </View>
        </View>

        <ScrollViewSpace />
      </ScrollView>

      {/* Buttons */}
      <FixedBottomContainer top={1.1}>
        <FormButton
          title={"Book Now"}
          width={1.1}
          onPress={() => {
            navigation.navigate("TourguideBookingsScreen", item);
          }}
        />
      </FixedBottomContainer>
    </SafeAreaViewComponent>
  );
};

export default ToursDetailsScreen;

const styles = StyleSheet.create({
  tourdetailsImage: {
    width: windowWidth / 1.6,
    height: windowHeight / 7,
    borderRadius: 10,
    marginBottom: 10,
  },
  tourguideProfileName: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.rendezvousBlack,
    marginBottom: 5,
  },
  tourguideProfileBio: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.rendezvousBlack2,
  },
  tourguideProfile2: {
    flexDirection: "row",
    marginTop: 10,
  },
  detailsTitle: {
    color: COLORS?.rendezvousBlack,
    fontSize: 18,
    fontWeight: "500",
  },
  detailsItenary: {
    marginTop: 40,
    fontSize: 18,
    fontWeight: "600",
  },
  detailsItenaryText: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.rendezvousBlack,
    marginTop: 10,
  },
});
