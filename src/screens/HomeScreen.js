import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeAreaViewComponent from '../components/common/SafeAreaViewComponent';
import HomeHeader from '../components/common/HomeHeader';

import ScrollViewSpace from '../components/common/ScrollViewSpace';
import Carousels from '../components/common/Carousel';
import {useDispatch, useSelector} from 'react-redux';
import {
  saveProductCatgeories,
  saveShopProducts,
} from '../redux/features/user/userSlice';
import axiosInstance, {baseURL} from '../utils/api-client';
import MoreCard from '../components/cards/MoreCard';
import {COLORS} from '../themes/themes';
import axios from 'axios';
import {useTheme} from '../Context/ThemeContext';
import FeedsCard from '../components/cards/FeedsCard';
import ProductCard from '../components/cards/ProductCard';
import StringsCard from '../components/cards/StringsCard';
import HomeHeader2 from '../components/common/HomeHeader2';

const rendezvousServices = [
  {
    id: 1,
    image:
      'https://res.cloudinary.com/rendezvouscare/image/upload/v1727131385/booking1_agr60w.jpg',
    title: 'Booking',
    description:
      'Book flights, hotels, and unforgettable experiences all in one place.',
    navigate: 'Booking',
    imagee:
      'https://res.cloudinary.com/rendezvouscare/image/upload/v1741344647/Frame_1-3_hclicq.png',
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
      'https://res.cloudinary.com/rendezvouscare/image/upload/v1742596405/vietnam_k0sxif.jpg',
    title: 'Tour Guides',
    description:
      'Book flights, hotels, and unforgettable experiences all in one place.',
    navigate: 'TourguideScreen',
    imagee:
      'https://res.cloudinary.com/rendezvouscare/image/upload/v1742596405/vietnam_k0sxif.jpg',

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
    headerTitle: "Strings of Connections",
    image:
      "https://res.cloudinary.com/rendezvouscare/image/upload/v1748444885/dating_ppc9eu.jpg",
    title: "Find Strings of Connections",
    navigate: "Strings",
    description:
      "Strings is a connection-focused dating space designed to help you build meaningful relationships, with supportive tools to guide you toward lasting, intentional love.",
    sliderImages: [
      "https://res.cloudinary.com/rendezvouscare/image/upload/v1748444885/dating_ppc9eu.jpg",
    ],
  },
  {
    id: 2,
    headerTitle: "Wellness",
    image:
      "https://res.cloudinary.com/rendezvouscare/image/upload/v1741344648/image_564_vo61ca.png",
    title: "Invest in Yourself",
    navigate: "Therapy",
    description:
      "Take charge of your growth with expert guidance. Book a session with a therapist or life coach.",
    sliderImages: [
      "https://res.cloudinary.com/rendezvouscare/image/upload/v1745839879/therapy3_vav8a3.jpg",
    ],
  },
  {
    id: 3,
    headerTitle: "Events",
    image:
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1920&h=1080&fit=crop&crop=center",
    // 'https://res.cloudinary.com/rendezvouscare/image/upload/v1742595860/tourrr_lqazjb.png',
    title: "Discover Your Next Adventure",
    navigate: "BookingScreen",
    description:
      "From electrifying concerts to championship games—find events that ignite your passion and connect you with unforgettable experiences.",
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
  {
    id: 4,
    headerTitle: "Travel",
    image:
      "https://res.cloudinary.com/rendezvouscare/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1749647252/bao-menglong--FhoJYnw-cg-unsplash_gj7cbk.jpg",
    // 'https://res.cloudinary.com/rendezvouscare/image/upload/v1741344647/Frame_1-3_hclicq.png',
    title: "Book the best Flights and Places",
    navigate: "BookingScreen",
    description:
      "Book flights, hotels, and unforgettable experiences all in one place.",
    sliderImages: [
      "https://res.cloudinary.com/rendezvouscare/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1749647252/bao-menglong--FhoJYnw-cg-unsplash_gj7cbk.jpg",
      "https://res.cloudinary.com/rendezvouscare/image/upload/v1749650487/pietro-de-grandi-T7K4aEPoGGk-unsplash_pemfc4.jpg",
      "https://res.cloudinary.com/rendezvouscare/image/upload/v1749650479/mesut-kaya-eOcyhe5-9sQ-unsplash_ogyolk.jpg",
      "https://res.cloudinary.com/rendezvouscare/image/upload/v1749650632/logan-armstrong-hVhfqhDYciU-unsplash_pogexw.jpg",
    ],
  },
  {
    id: 5,
    headerTitle: "Store",
    image:
      "https://res.cloudinary.com/rendezvouscare/image/upload/v1747317785/brands_nb2vbj.jpg",
    // 'https://res.cloudinary.com/rendezvouscare/image/upload/v1745839922/freestocks-_3Q3tsJ01nc-unsplash_kunezi.jpg',
    title: "Explore a World of Extraordinary Products",
    navigate: "Shop",
    description:
      "Shop unique gift items for your loved ones from our carefully curated marketplace.",
    sliderImages: [
      "https://res.cloudinary.com/rendezvouscare/image/upload/v1745839922/freestocks-_3Q3tsJ01nc-unsplash_kunezi.jpg",
      "https://res.cloudinary.com/rendezvouscare/image/upload/v1745839939/alisa-anton-D4Blldtly00-unsplash_dptz7m.jpg",
    ],
  },
];

const rendezvousFeeds = [
  {
    id: 1,
    postUserProfile: {
      username: 'rendezvouscare',
      profile_pictures: [
        'https://res.cloudinary.com/rendezvouscare/image/upload/v1749763351/Rendezvous_logomark_modified_WhiteBG_2_ddqa4y.png',
      ],
    },
    feed_pictures: [
      'https://pub-08be10b6cc074c21b638af3d8ff441f0.r2.dev/feed_pictures/36a60834-344f-4abd-94be-893d4e49a254-feedPost-image-1748371303526-0.jpg',
      'https://pub-08be10b6cc074c21b638af3d8ff441f0.r2.dev/feed_pictures/36a60834-344f-4abd-94be-893d4e49a254-feedPost-image-1748371303526-1.jpg',
    ],
    caption: 'Best Feed',
  },
];

const rendezvousStrings = [
  {
    id: 1,
    matchedUserProfile: {
      username: 'Faux',
      dob: '1996-03-22',
      height: '184',
      city: 'Ontario',
      country: 'Canada',
      profile_pictures: [
        'https://res.cloudinary.com/rendezvouscare/image/upload/v1749759325/sexy-woman-6826763_xeli3g.jpg',
      ],
    },
  },
  {
    id: 2,
    matchedUserProfile: {
      username: 'Trevor',
      dob: '1989-03-22',
      height: '189',
      city: 'Dubai',
      country: 'UAE',
      profile_pictures: [
        'https://res.cloudinary.com/rendezvouscare/image/upload/v1749761537/beard-5216825_1280_f7h4rw.jpg',
      ],
    },
  },
  {
    id: 3,
    matchedUserProfile: {
      username: 'Katarina',
      dob: '1997-03-22',
      height: '164',
      city: 'New Orleans',
      country: 'United States',
      profile_pictures: [
        'https://res.cloudinary.com/rendezvouscare/image/upload/v1749759324/playing-poker-4286439_vm8h74.jpg',
      ],
    },
  },
  {
    id: 4,
    matchedUserProfile: {
      username: 'Malik',
      dob: '1987-03-22',
      height: '187',
      city: 'London',
      country: 'UK',
      profile_pictures: [
        'https://res.cloudinary.com/rendezvouscare/image/upload/v1749761538/pexels-lazarus-ziridis-351891426-28580367_za5fwh.jpg',
      ],
    },
  },
  {
    id: 5,
    matchedUserProfile: {
      username: 'Allana',
      dob: '1994-03-22',
      height: '164',
      city: 'New York',
      country: 'United States',
      profile_pictures: [
        'https://res.cloudinary.com/rendezvouscare/image/upload/v1749759342/woman-9095076_mu9b5x.jpg',
      ],
    },
  },
  {
    id: 6,
    matchedUserProfile: {
      username: 'Cindy',
      dob: '1994-03-22',
      height: '164',
      city: 'Texas',
      country: 'United States',
      profile_pictures: [
        'https://res.cloudinary.com/rendezvouscare/image/upload/v1749759330/woman-7897053_q4ye9l.jpg',
      ],
    },
  },
];

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const userProfle = state?.user?.user?.profile;

  const {theme} = useTheme();

  const reduxProducts = state?.user?.shopProduct;

  const reduxProductCategories = state?.user?.productCategories;
  // console.log('reduxProductCategories', reduxProductCategories);

  const [search, setSearch] = useState('');
  const [masterDataSource, setMasterDataSource] = useState(reduxProducts);
  const [filteredDataSource, setFilteredDataSource] = useState(reduxProducts);
  // console.log('masterDataSource', masterDataSource);

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
        .then(res => {
          console.log('productCategories res', res);
          dispatch(saveProductCatgeories(res?.data?.data?.categories));
        })
        .catch(err => {
          console.log('productCategories err', err?.response);
        });
    } catch (error) {
      console.log('productCategories error', error);
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
        .then(res => {
          console.log('fetchProducts res', res?.data);
          dispatch(saveShopProducts(res?.data?.data?.products));
        })
        .catch(err => {
          console.log('fetchProducts err', err?.response?.data);
        });
    } catch (error) {
      console.log('fetchProducts error', error);
    }
  };

  const renderItem = ({item}) => (
    <StringsCard props={item} matchedUserProfile={item?.matchedUserProfile} />
  );

  useEffect(() => {
    productCategories();
    fetchProducts();
  }, []);

  return (
    <SafeAreaViewComponent>
      {userProfle ? <HomeHeader /> : <HomeHeader2 />}
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
            marginBottom: 10,
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

        <View>
          {rendezvousFeeds?.map((cur, i) => (
            <FeedsCard key={i} props={cur} />
          ))}
        </View>

        <Text style={[styles.additionText, { color: theme?.text }]}>
          What can you do here?{" "}
        </Text>

        <View style={{ padding: 10 }}>
          {rendezvousServices2?.map((cur, i) => (
            <View key={i}>
              {/* Service Card */}
              <MoreCard
                props={cur}
                onPress={() => {
                  navigation.navigate(cur?.navigate);
                  if (!userProfle) {
                    navigation.navigate("Login", {
                      destination: cur?.navigate,
                    });
                  }
                }}
              />

              {/* Strings horizontal scroll under "Strings of Connections" */}
              {/*  {cur?.title?.toLowerCase().includes('strings') && (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    marginBottom: 15,
                    marginTop: 10,
                    flexDirection: 'row',
                  }}>
                  {rendezvousStrings?.map((item, j) => (
                    <StringsCard
                      key={j}
                      props={item}
                      matchedUserProfile={item?.matchedUserProfile}
                    />
                  ))}
                </ScrollView>
              )} */}

              {/* Store horizontal scroll under "Store" */}
              {cur?.headerTitle?.toLowerCase().includes("store") && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {reduxProducts?.slice(0, 5)?.map((product, k) => (
                    <ProductCard
                      key={k}
                      props={product}
                      productName={product?.title}
                      productImage={product?.images_url[0]}
                      productPrice={product?.price}
                      onPress={() =>
                        navigation.navigate("ProductDetails", product)
                      }
                    />
                  ))}
                </ScrollView>
              )}
            </View>
          ))}
        </View>

        <ScrollViewSpace />
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  additionText: {
    padding: 10,
    fontSize: 24,
    fontWeight: '400',
    color: COLORS.rendezvousBlack,
  },
});
