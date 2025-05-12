import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";

import MoreCard from "../../components/cards/MoreCard";
import ScrollViewSpace from "../../components/common/ScrollViewSpace";
import HeaderTitle from "../../components/common/HeaderTitle";

const rendezvousServices2 = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/rendezvouscare/image/upload/v1741344647/Frame_1-3_hclicq.png",
    title: "Book Flights",
    navigate: "FlightsScreen",
    description:
      "Book flights, hotels, and unforgettable experiences all in one place.",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/rendezvouscare/image/upload/v1742595860/tourrr_lqazjb.png",
    title: "Plan unforgettable tour experiences",
    navigate: "TourguideScreen",
    description: "Book a tour guide and explore with ease.",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/rendezvouscare/image/upload/v1742596405/vietnam_k0sxif.jpg",
    title: "Tour Guides",
    description:
      "Connect with experienced local tour guides to explore hidden gems, popular attractions, and authentic cultural experiences tailored to your journey.",
    navigate: "TourguideScreen",
    imagee:
      "https://res.cloudinary.com/rendezvouscare/image/upload/v1742596405/vietnam_k0sxif.jpg",
  },
  // {
  //   id: 3,
  //   image:
  //     'https://res.cloudinary.com/rendezvouscare/image/upload/v1741374339/image_561-2_uwc3ff.png',
  //   title: 'Rent the sleekest rides',
  //   navigate: 'CarRental',
  //   description:
  //     'Explore, book, and elevate your journey with seamless car rental services across the globe',
  // },
  // {
  //   id: 4,
  //   image:
  //     'https://res.cloudinary.com/rendezvouscare/image/upload/v1741344647/Frame_1-3_hclicq.png',
  //   title: 'Book the best Flights and Places',
  //   navigate: 'BookingScreen',
  //   description:
  //     'Book flights, hotels, and unforgettable experiences all in one place.',
  // },
];

const BookingScreen = ({ navigation }) => {
  return (
    <SafeAreaViewComponent>
      <HeaderTitle headerTitle={"Travels"} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 10 }}
      >
        <View style={{ padding: 10 }}>
          {rendezvousServices2?.map((cur, i) => (
            <MoreCard
              key={i}
              props={cur}
              onPress={() => {
                navigation.navigate(cur?.navigate);
              }}
            />
          ))}
        </View>

        <ScrollViewSpace />
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({});
