import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import SafeAreaViewComponent from "../components/common/SafeAreaViewComponent";
import HomeHeader from "../components/common/HomeHeader";

import ScrollViewSpace from "../components/common/ScrollViewSpace";
import Carousels from "../components/common/Carousel";
import { useDispatch, useSelector } from "react-redux";
import {
  saveProductCatgeories,
  saveShopProducts,
} from "../redux/features/user/userSlice";
import axiosInstance, { baseURL } from "../utils/api-client";
import ServicesCard from "../components/cards/ServicesCard";
import MoreCard from "../components/cards/MoreCard";
import { COLORS } from "../themes/themes";
import axios from "axios";
import FlightListingCard from "../components/cards/FlightListingCard";

const rendezvousServices = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/rendezvouscare/image/upload/v1727131385/booking1_agr60w.jpg",
    title: "Booking",
    description:
      "Book flights, hotels, and unforgettable experiences all in one place.",
    navigate: "Booking",
    imagee:
      "https://res.cloudinary.com/rendezvouscare/image/upload/v1741344647/Frame_1-3_hclicq.png",
  },
  // {
  //   id: 2,
  //   image:
  //     'https://res.cloudinary.com/rendezvouscare/image/upload/v1727131407/giftcard3_lhowqu.png',
  //   title: 'GiftCards',
  //   description:
  //     'Give personalized gifts, from wellness experiences to luxury indulgences.',
  //   navigate: 'GiftCardScreen',
  //   imagee:
  //     'https://res.cloudinary.com/rendezvouscare/image/upload/v1734521568/popular-cards_xnetvh.jpg',
  // },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/rendezvouscare/image/upload/v1742596405/vietnam_k0sxif.jpg",
    title: "Tour Guides",
    description:
      "Book flights, hotels, and unforgettable experiences all in one place.",
    navigate: "TourguideScreen",
    imagee:
      "https://res.cloudinary.com/rendezvouscare/image/upload/v1742596405/vietnam_k0sxif.jpg",

    // 'https://res.cloudinary.com/rendezvouscare/image/upload/v1742595860/tourrr_lqazjb.png',
  },
  // {
  //   id: 4,
  //   image:
  //     'https://res.cloudinary.com/rendezvouscare/image/upload/v1734443460/31177_zra1ir.jpg',
  //   title: 'Car Rental',
  //   description:
  //     'Give personalized gifts, from wellness experiences to luxury indulgences.',
  //   navigate: 'CarRental',
  //   imagee:
  //     'https://res.cloudinary.com/rendezvouscare/image/upload/v1741374339/image_561-2_uwc3ff.png',
  // },
];

const rendezvousServices2 = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/rendezvouscare/image/upload/v1741344648/image_564_vo61ca.png",
    title: "Invest in Yourself",
    navigate: "Therapy",
    description:
      "Take charge of your growth with expert guidance. Book a session with a therapist or life coach.",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/rendezvouscare/image/upload/v1742595860/tourrr_lqazjb.png",
    title: "Plan unforgettable tour experiences",
    navigate: "TourguideScreen",
    description: "Book a tour guide and explore with ease.",
  },
  // {
  //   id: 3,
  //   image:
  //     'https://res.cloudinary.com/rendezvouscare/image/upload/v1742596405/vietnam_k0sxif.jpg',
  //   title: 'Tour Guides',
  //   description:
  //     'Connect with experienced local tour guides to explore hidden gems, popular attractions, and authentic cultural experiences tailored to your journey.',
  //   navigate: 'TourguideScreen',
  //   imagee:
  //     'https://res.cloudinary.com/rendezvouscare/image/upload/v1742596405/vietnam_k0sxif.jpg',

  //   // 'https://res.cloudinary.com/rendezvouscare/image/upload/v1742595860/tourrr_lqazjb.png',
  // },
  // {
  //   id: 3,
  //   image:
  //     'https://res.cloudinary.com/rendezvouscare/image/upload/v1741374339/image_561-2_uwc3ff.png',
  //   title: 'Rent the sleekest rides',
  //   navigate: 'CarRental',
  //   description:
  //     'Explore, book, and elevate your journey with seamless car rental services across the globe',
  // },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/rendezvouscare/image/upload/v1741344647/Frame_1-3_hclicq.png",
    title: "Book the best Flights and Places",
    navigate: "BookingScreen",
    description:
      "Book flights, hotels, and unforgettable experiences all in one place.",
  },
  {
    id: 5,
    image:
      "https://res.cloudinary.com/rendezvouscare/image/upload/v1727131434/store_y9y927.jpg",
    title: "Explore a World of Extraordinary Products",
    navigate: "Shop",
    description:
      "Shop unique gift items for your loved ones from our carefully curated marketplace.",
  },
];

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const userProfle = state?.user?.user?.profile;

  const reduxProductCategories = state?.user?.productCategories;
  console.log("reduxProductCategories", reduxProductCategories);

  const productCategories = async () => {
    // axiosInstance({
    //   url: 'category',
    //   method: 'GET',
    // })
    //   .then(res => {
    //     console.log('productCategories res', res);
    //     dispatch(saveProductCatgeories(res?.data?.data?.categories));
    //   })
    //   .catch(err => {
    //     console.log('productCategories err', err?.response);
    //   });

    try {
      axios
        .get(`${baseURL}category`)
        .then((res) => {
          console.log("productCategories res", res);
          dispatch(saveProductCatgeories(res?.data?.data?.categories));
        })
        .catch((err) => {
          console.log("productCategories err", err?.response);
        });
    } catch (error) {
      console.log("productCategories error", error);
    }
  };

  const fetchProducts = async () => {
    // try {
    //   await axiosInstance({
    //     url: 'product',
    //     method: 'GET',
    //   })
    //     .then(res => {
    //       console.log('fetchProducts res', res?.data);
    //       dispatch(saveShopProducts(res?.data?.data?.products));
    //     })
    //     .catch(err => {
    //       console.log('fetchProducts err', err?.response?.data);
    //     });
    // } catch (error) {
    //   console.log('fetchProducts error', error);
    // }

    try {
      axios
        .get(`${baseURL}product`)
        .then((res) => {
          console.log("fetchProducts res", res?.data);
          dispatch(saveShopProducts(res?.data?.data?.products));
        })
        .catch((err) => {
          console.log("fetchProducts err", err?.response?.data);
        });
    } catch (error) {
      console.log("fetchProducts error", error);
    }
  };

  useEffect(() => {
    productCategories();
    fetchProducts();
  }, []);

  return (
    <SafeAreaViewComponent>
      {userProfle && <HomeHeader />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 10 }}
      >
        <Carousels />

        <View
          style={{
            flexDirection: "row",
            // padding: 10,
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: 32,
          }}
        >
          {/* {rendezvousServices?.map((cur, i) => (
            <ServicesCard
              key={i}
              props={cur}
              onPress={() => {
                if (userProfle) {
                  navigation.navigate(cur?.navigate);
                } else {
                  navigation.navigate('Login', {destination: cur?.navigate});
                }
              }}
            />
          ))} */}
        </View>

        <Text style={styles.additionText}>What can you do here? </Text>

        <View style={{ padding: 10 }}>
          {rendezvousServices2?.map((cur, i) => (
            <MoreCard
              key={i}
              props={cur}
              onPress={() => {
                navigation.navigate(cur?.navigate);

                if (!userProfle) {
                  navigation.navigate("Login", { destination: cur?.navigate });
                }
              }}
            />
          ))}
        </View>

        {/* <ScrollViewSpace /> */}
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  additionText: {
    padding: 10,
    fontSize: 24,
    fontWeight: "400",
    color: COLORS.rendezvousBlack,
  },
});
