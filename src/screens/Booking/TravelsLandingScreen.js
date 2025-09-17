import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import SafeAreaViewComponent from '../../components/common/SafeAreaViewComponent';
import HeaderTitle from '../../components/common/HeaderTitle';
import TravelsCarousels from '../../components/common/TravelsCarousel';
import TravelCard from '../../components/cards/TravelCard';
import ScrollViewSpace from '../../components/common/ScrollViewSpace';
import TravelDemo from '../../components/common/TravelDemo';
import {useSelector} from 'react-redux';

const cards = [
  {
    title: "Events",
    subtitle:
      "From electrifying concerts to championship games—find events that ignite your passion and connect you with unforgettable experiences.",
    status: "Ready to Book",
    statusColor: "#10b981",
    image:
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1920&h=1080&fit=crop&crop=center",
    items: [
      {
        icon: "shield-checkmark-outline",
        itemName: "Secure Payments",
      },
      {
        icon: "ticket-outline",
        itemName: "Instant Tickets",
      },
      {
        icon: "headset-outline",
        itemName: "24/7 Support",
      },
    ],

    ctaText: "Book Your Events",
    ctaColor: "#991b1b",
    navigate: "FlightsScreen",
  },
  {
    title: "Premium Flights",
    subtitle: "Book smart comfort, worldwide destinations",
    status: "Ready to Book",
    statusColor: "#10b981",
    image:
      "https://res.cloudinary.com/rendezvouscare/image/upload/v1749647252/bao-menglong--FhoJYnw-cg-unsplash_gj7cbk.jpg",
    items: [
      {
        icon: "earth-outline",
        itemName: "Global Airlines",
      },
      {
        icon: "shield-checkmark-outline",
        itemName: "Best Price Guarantee",
      },
      {
        icon: "checkmark-circle-outline",
        itemName: "Instant Confirmation",
      },
    ],

    ctaText: "Book Your Flight",
    ctaColor: "#991b1b",
    navigate: "FlightsScreen",
  },
  {
    title: "Explore the World, Your Way",
    subtitle: "Book a tour guide and explore with ease",
    status: "Ready to Book",
    statusColor: "#10b981",
    image:
      "https://res.cloudinary.com/rendezvouscare/image/upload/v1742595860/tourrr_lqazjb.png",
    items: [
      {
        icon: "man-outline",
        itemName: "100% private tours",
      },
      {
        icon: "map-outline",
        itemName: "Fully Customizable itineraries",
      },
      {
        icon: "phone-portrait-outline",
        itemName: "Flexible Cancellation",
      },
    ],

    ctaText: "Book Your Tours",
    ctaColor: "#991b1b",
    navigate: "TourguideScreen",
  },
  //   {
  //     title: 'Luxury Hotels',
  //     subtitle: '5-star accommodations, premium resorts',
  //     status: 'Coming Soon',
  //     statusColor: '#f97316',
  //     image:
  //       'https://res.cloudinary.com/rendezvouscare/image/upload/v1749647252/bao-menglong--FhoJYnw-cg-unsplash_gj7cbk.jpg',
  //     items: ['Premium Properties', 'Concierge Service', 'Spa & Wellness'],
  //     icons: [''],
  //     ctaText: 'Coming Soon',
  //     ctaColor: '#374151',
  //   },
  //   {
  //     title: 'Fine Dining',
  //     subtitle: 'Michelin starred restaurants, exclusive tables',
  //     status: 'Coming Soon',
  //     statusColor: '#10b981',
  //     image:
  //       'https://res.cloudinary.com/rendezvouscare/image/upload/v1749647252/bao-menglong--FhoJYnw-cg-unsplash_gj7cbk.jpg',
  //     items: ['Michelin Starred', 'Celebrity Chefs', 'Special Occasions'],
  //     icons: [''],
  //     ctaText: 'Coming Soon',
  //     ctaColor: '#374151',
  //   },
];

const TravelsLandingScreen = ({navigation}) => {
  const state = useSelector(state => state);
  const userProfle = state?.user?.user?.profile;

  return (
    <SafeAreaViewComponent>
      <HeaderTitle headerTitle={'Travels'} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <TravelsCarousels />

        <ScrollView
          vertical
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{padding: 10}}>
          {cards?.map((cur, i) => (
            <TravelCard
              key={i}
              props={cur}
              onPress={() => {
                userProfle
                  ? navigation.navigate(cur?.navigate)
                  : navigation.navigate('Login', {destination: cur?.navigate});
              }}
            />
          ))}
        </ScrollView>

        <TravelDemo />
        {/* <ScrollViewSpace /> */}
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default TravelsLandingScreen;

const styles = StyleSheet.create({});
