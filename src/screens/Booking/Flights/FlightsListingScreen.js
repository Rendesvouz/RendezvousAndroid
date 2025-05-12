import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import SafeAreaViewComponent from "../../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../../components/common/HeaderTitle";
import FlightSwitch from "../../../components/switches/FlightSwitch";
import {
  groupIntoPriceTiers,
  groupFlightsIntoThreeCategories,
} from "../../../Library/Common";
import axiosInstance from "../../../utils/api-client";
import FlightListingCard from "../../../components/cards/FlightListingCard";
import ScrollViewSpace from "../../../components/common/ScrollViewSpace";

const FlightsListingScreen = ({ navigation, route }) => {
  const item = route?.params;
  console.log("flightItem", item);

  const [enrichedOptions, setEnrichedOptions] = useState([]);
  console.log("enrichedOptions", enrichedOptions);

  const switchData = groupFlightsIntoThreeCategories(
    item?.groupedFlightsBasedOnPrices
  );
  console.log("switchData", switchData);

  const [orderTab, setOrderTab] = useState();
  console.log("orderTab", orderTab);

  const getAirlinesDetails = async (airlineCode) => {
    try {
      const response = await axiosInstance({
        url: `reservation/airlines/lookup?airlineCodes=${airlineCode}`,
        method: "GET",
      });
      console.log("getAirlinesDetails res", response?.data);
      return response?.data?.data?.data;
    } catch (error) {
      console.log(
        `getAirlinesDetails error for airlineCode ${airlineCode}:`,
        error?.response
      );

      return null;
    }
  };

  const enrichFlightOptionsWithAirlines = async (flightOptions) => {
    console.log("flightOption", flightOptions);
    const uniqueCodes = new Set();

    // Step 1: Collect unique airline codes
    flightOptions.forEach((option) => {
      option.data.forEach((flight) => {
        // Collect validatingAirlineCodes
        flight.validatingAirlineCodes?.forEach((code) => uniqueCodes.add(code));

        // Collect carrierCode from segments
        flight.itineraries?.forEach((itinerary) => {
          itinerary.segments?.forEach((segment) => {
            if (segment.carrierCode) {
              uniqueCodes.add(segment.carrierCode);
            }
          });
        });
      });
    });

    // Step 2: Fetch airline info from backend
    const codeList = Array.from(uniqueCodes).join(",");
    // console.log('codeList', codeList);

    const airlineData = await getAirlinesDetails(codeList);
    // console.log('airlineData', airlineData);

    if (!Array.isArray(airlineData)) {
      return flightOptions;
    }

    // Step 3: Create lookup map
    const airlineMap = {};
    airlineData.forEach((info) => {
      airlineMap[info.iataCode] = info;
    });

    // Step 4: Append details
    return flightOptions.map((option) => ({
      ...option,
      data: option.data.map((flight) => {
        const validatingAirlineDetails =
          flight.validatingAirlineCodes?.map((code) => airlineMap[code]) || [];

        const enrichedItineraries =
          flight.itineraries?.map((itinerary) => ({
            ...itinerary,
            segments:
              itinerary.segments?.map((segment) => ({
                ...segment,
                airlineDetails: airlineMap[segment.carrierCode] || null,
              })) || [],
          })) || [];

        console.log(
          "validatingAirlineDetails",
          validatingAirlineDetails,
          enrichedItineraries
        );

        return {
          ...flight,
          validatingAirlineDetails,
          itineraries: enrichedItineraries,
        };
      }),
    }));
  };

  const confirmBooking = async (datax) => {
    navigation.navigate("FlightBookingScreen", datax);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const enrichData = async () => {
        const enriched = await enrichFlightOptionsWithAirlines(switchData);
        setEnrichedOptions(enriched);

        if (enriched.length > 0) {
          setOrderTab(enriched[0]);
        }
      };

      if (switchData && switchData.length > 0) {
        enrichData();
      }

      console.log("enrichedOptions", enrichedOptions);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        headerTitle={"Flights Booking"}
        leftIcon={"arrow-back-outline"}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />
      <View style={{ padding: 20 }}>
        {enrichedOptions.length > 0 ? (
          <FlightSwitch
            arrayData={enrichedOptions}
            seletionMode={0}
            onSelectSwitch={(selectedIndex) => {
              const selectedOption = enrichedOptions[selectedIndex];
              console.log("Selected Flight Option:", selectedOption);
              setOrderTab(selectedOption);
            }}
          />
        ) : (
          <Text style={styles.noData}>
            No flight options available for this search.
          </Text>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
      >
        {orderTab?.optionTitle === "Cheapest" &&
          orderTab?.data?.map((cur, i) => (
            <FlightListingCard
              key={i}
              props={cur}
              destinationProps={item?.flightSearchData}
              onBookingPress={() => {
                confirmBooking(cur);
              }}
            />
          ))}

        {orderTab?.optionTitle === "Best" &&
          orderTab?.data?.map((cur, i) => (
            <FlightListingCard
              key={i}
              props={cur}
              destinationProps={item?.flightSearchData}
              onBookingPress={() => {
                confirmBooking(cur);
              }}
            />
          ))}

        {orderTab?.optionTitle === "Fastest" &&
          orderTab?.data?.map((cur, i) => (
            <FlightListingCard
              key={i}
              props={cur}
              destinationProps={item?.flightSearchData}
              onBookingPress={() => {
                confirmBooking(cur);
              }}
            />
          ))}

        <ScrollViewSpace />
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default FlightsListingScreen;

const styles = StyleSheet.create({
  noData: {
    fontWeight: "700",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
});
