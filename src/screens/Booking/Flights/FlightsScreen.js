import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import DatePicker from "react-native-date-picker";

import SafeAreaViewComponent from "../../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../../components/common/HeaderTitle";
import { COLORS } from "../../../themes/themes";
import { windowWidth } from "../../../utils/Dimensions";
import PickerSelect from "../../../components/pickerSelect/PickerSelect";
import BookingFormInput from "../../../components/form/BookingFormInput";
import AirportSearchInput from "../../../components/form/AirportSearchInput";
import moment from "moment";
import ScrollViewSpace from "../../../components/common/ScrollViewSpace";
import FormButton from "../../../components/form/FormButton";
import axiosInstance from "../../../utils/api-client";
import FormInput from "../../../components/form/FormInput";
import FixedBottomContainer from "../../../components/common/FixedBottomContainer";

const flightOptions = [
  {
    id: 1,
    type: "One Way",
  },
  {
    id: 1,
    type: "Round Trip",
  },
  {
    id: 1,
    type: "Multi City",
  },
];

const flightClasses = [
  { value: "Economy", label: "Economy" },
  { value: "Business", label: "Business" },
  { value: "First Class", label: "First Class" },
];

const FlightsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const [flightType, setFlightType] = useState("One Way");
  const [flightClass, setFlightClass] = useState("Economy");

  // flight or airport search
  const [flightSearchFrom, setFlightSearchFrom] = useState("");
  const [flightSearchTo, setFlightSearchTo] = useState("");
  console.log("flightsss", flightSearchFrom, flightSearchTo);

  // Date range states
  const [startDate, setStartDate] = useState(new Date());
  const [startOpen, setStartOpen] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [endOpen, setEndOpen] = useState(false);

  const [passengers, setPassengers] = useState("1");

  // Error states
  const [formError, setFormError] = useState("");
  const [flightClassError, setFlightClassError] = useState("");
  const [passengersError, setPassengersError] = useState("");

  const searchFlights = async () => {
    const flightSearchFromLatitude = flightSearchFrom?.iataCode;
    const flightSearchToLatitude = flightSearchTo?.iataCode;
    const selectedFlightClass = flightClass?.toLocaleUpperCase();
    const departureDate = moment(startDate, "MMM D, YYYY").format("YYYY-MM-DD");
    const arrivalDate = moment(startDate, "MMM D, YYYY").format("YYYY-MM-DD");

    console.log(
      "flightData",
      flightSearchFromLatitude,
      flightSearchToLatitude,
      selectedFlightClass,
      departureDate,
      arrivalDate
    );

    const flightSearchData = {
      flightSearchFrom: flightSearchFrom,
      flightSearchTo: flightSearchTo,
      departureDate: departureDate,
      arrivalDate: arrivalDate,
    };

    setLoading(true);

    try {
      const res = await axiosInstance({
        url: arrivalDate
          ? `reservation/flights/search?originLocationCode=${flightSearchFromLatitude}&destinationLocationCode=${flightSearchToLatitude}&departureDate=${departureDate}&returnDate=${arrivalDate}&adults=${passengers}&travelClass=${selectedFlightClass}`
          : `reservation/flights/search?originLocationCode=${flightSearchFromLatitude}&destinationLocationCode=${flightSearchToLatitude}&returnDate=${arrivalDate}&adults=${passengers}&travelClass=${selectedFlightClass}`,
        method: "GET",
      });

      console.log("flightsearch res", res?.data);
      setLoading(false);

      const groupedFlights = groupByOperatingCarrier(res?.data?.data);
      const groupedFlightsBasedOnPrices = groupByGrandTotal(res?.data?.data);
      console.log(
        "groupedFlights",
        groupedFlights,
        groupedFlightsBasedOnPrices
      );

      navigation.navigate("FlightsListingScreen", {
        flightSearchData: flightSearchData,
        groupedFlights: groupedFlights,
        groupedFlightsBasedOnPrices: groupedFlightsBasedOnPrices,
      });
    } catch (error) {
      console.log("searchFlights error", error?.response);
      setLoading(false);
    }
  };

  function groupByGrandTotal(flightResponse) {
    const grouped = {};
    const flightData = flightResponse?.data;

    flightData?.forEach((datax) => {
      const grandTotal = datax?.price?.grandTotal;

      if (grandTotal) {
        if (!grouped[grandTotal]) {
          grouped[grandTotal] = [];
        }

        // Avoid duplicates by checking ID
        const alreadyExists = grouped[grandTotal].some(
          (entry) => entry?.id === datax?.id
        );

        if (!alreadyExists) {
          grouped[grandTotal].push(datax);
        }
      }
    });

    // Format into array for flexibility
    const result = Object.keys(grouped).map((total) => ({
      price: total,
      data: grouped[total],
    }));

    return result;
  }

  function groupByOperatingCarrier(flightResponse) {
    const grouped = {};
    const carriersDict = flightResponse?.dictionaries?.carriers;
    const flightData = flightResponse?.data;

    //   here i am iterating through the flight response to each itenaries
    flightData?.forEach((datax) => {
      // Extract all unique operating carrierCodes from first segment of each itinerary
      // created a new object set here to store the first segment of the itenaries
      const operatingCarriers = new Set();

      datax?.itineraries?.forEach((itinerary) => {
        //   the itenariy has data of this manner: itenary?.segments?.[]?.operating?.carrierCode
        const firstSegment = itinerary?.segments?.[0];
        const operatingCode = firstSegment?.operating?.carrierCode;

        // console.log('firstSegment', firstSegment, operatingCode);

        if (operatingCode) {
          operatingCarriers.add(operatingCode);
        }
      });

      // Group the full datax object under each unique operating carrier
      operatingCarriers.forEach((code) => {
        if (!grouped[code]) {
          grouped[code] = [];
        }

        // Avoid duplicates
        const alreadyExists = grouped[code].some(
          (entry) => entry?.id === datax?.id
        );
        if (!alreadyExists) {
          grouped[code]?.push(datax);
        }
      });
    });

    // My final regrouped dataset to display to the users
    const result = Object.keys(grouped)?.map((code) => ({
      name: carriersDict?.[code] || code,
      data: grouped[code],
    }));

    return result;
  }

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        headerTitle={"Flights Booking"}
        leftIcon={"arrow-back-outline"}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
      >
        {/* Flight Type section */}
        <View style={styles.flightTypes}>
          {flightOptions?.map((cur, i) => (
            <TouchableOpacity
              key={i}
              style={
                flightType === cur?.type ? styles.activeCat : styles.priceCat
              }
              onPress={() => {
                console.log("prseesd", cur);
                setFlightType(cur?.type);
              }}
            >
              <RadioButton.Android
                value={cur?.type}
                status={flightType === cur?.type ? "checked" : "unchecked"}
                onPress={() => {
                  setFlightType(cur?.type);
                }}
                color={COLORS.rendezvousRed}
                uncheckedColor={COLORS.appGrey2}
              />
              <Text style={styles.priceRange}>{cur?.type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Flight class section */}
        <PickerSelect
          items={flightClasses}
          placeholder={"Select your class"}
          value={flightClass}
          onValueChange={(value) => {
            setFlightClass(value);
            setFormError("");
            setFlightClassError("");
          }}
          errorMessage={flightClassError}
        />

        {/* <SearchablePicker /> */}
        <AirportSearchInput
          formInputTitle={"From"}
          onSelect={(airport) => {
            console.log("User selected:", airport);
            setFlightSearchFrom(airport);
          }}
        />
        <AirportSearchInput
          formInputTitle={"To"}
          onSelect={(airport) => {
            console.log("User selected:", airport);
            setFlightSearchTo(airport);
          }}
        />

        <Text style={styles.formTitle}>Departure</Text>
        <TouchableOpacity
          onPress={() => setStartOpen(true)}
          style={styles.rangePicker}
        >
          <Text style={styles.dateRange}>
            {startDate !== null
              ? moment(startDate).format("MMM D, YYYY")
              : new Date(new Date().getFullYear(), 0, 1).toISOString()}
          </Text>
          <Ionicons
            name="calendar-outline"
            size={20}
            color="black"
            onPress={() => setStartOpen(true)}
          />
          <DatePicker
            mode="date"
            modal
            open={startOpen}
            date={startDate}
            onConfirm={(dat) => {
              setStartOpen(false);
              setStartDate(dat);
              console.log("ddd", dat);
            }}
            onCancel={() => {
              setStartOpen(false);
            }}
          />
        </TouchableOpacity>

        {flightType === "Round Trip" && (
          <View>
            <Text style={styles.formTitle}>Arrival</Text>
            <TouchableOpacity
              onPress={() => setEndOpen(true)}
              style={styles.rangePicker}
            >
              <Text style={styles.dateRange}>
                {endDate !== null
                  ? moment(endDate).format("MMM D, YYYY")
                  : new Date(new Date().getFullYear(), 0, 1).toISOString()}
              </Text>
              <Ionicons
                name="calendar-outline"
                size={20}
                color="black"
                onPress={() => setEndOpen(true)}
              />
              <DatePicker
                mode="date"
                modal
                open={endOpen}
                date={endDate}
                onConfirm={(dat) => {
                  setEndOpen(false);
                  setEndDate(dat);
                }}
                onCancel={() => {
                  setEndOpen(false);
                }}
              />
            </TouchableOpacity>
          </View>
        )}

        <FormInput
          formInputTitle={"Passengers"}
          keyboardType={"number-pad"}
          value={passengers}
          onChangeText={(txt) => {
            setPassengers(txt);
            setFormError("");
            setPassengersError("");
          }}
        />

        <ScrollViewSpace />
      </ScrollView>

      {/* Buttons */}
      <FixedBottomContainer top={1.1}>
        <FormButton
          title={"Search"}
          width={1.1}
          onPress={searchFlights}
          loading={loading}
          disabled={loading}
        />
      </FixedBottomContainer>
    </SafeAreaViewComponent>
  );
};

export default FlightsScreen;

const styles = StyleSheet.create({
  flightTypes: {
    flexDirection: "row",
    width: windowWidth / 1.1,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  priceCat: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.appGrey2,
    borderRadius: 8,
    padding: 3,
  },
  activeCat: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.rendezvousRed,
    borderRadius: 8,
    padding: 3,
  },
  priceCat2: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    padding: 5,
  },
  priceRange: {
    // marginLeft: 5,
    fontSize: 15,
    fontWeight: "500",
    // marginRight: 5,
  },
  formTitle: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 10,
    marginTop: 10,
  },
  rangePicker: {
    flexDirection: "row",
    // alignContent: 'flex-end',
    alignItems: "center",
    // alignSelf: 'flex-end',
    // marginBottom: 20,
    padding: 15,
    // marginRight: 20,
    justifyContent: "space-between",
    // backgroundColor: 'red',
    borderWidth: 1,
    borderColor: COLORS.appGrey4,
    borderRadius: 8,
    marginBottom: 20,
  },
  dateRange: {
    fontSize: 13,
    fontWeight: "500",
    color: "black",
  },
});
