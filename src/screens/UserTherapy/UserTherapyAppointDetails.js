import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import ImageView from "react-native-image-viewing";
import Toast from "react-native-toast-message";

import HeaderTitle from "../../components/common/HeaderTitle";
import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import ScrollViewSpace from "../../components/common/ScrollViewSpace";
import FixedBottomContainer from "../../components/common/FixedBottomContainer";
import TransparentBtn from "../../components/form/TransparentBtn";
import {
  convertTo12HourFormat,
  formatDate,
  RNToast,
  setPriceTo2DecimalPlaces,
} from "../../Library/Common";
import { dummyImageUrl } from "../../data/dummyData";
import { windowHeight, windowWidth } from "../../utils/Dimensions";
import { COLORS } from "../../themes/themes";
import { appointmentTextPrecedence } from "../../Library/Precedence";
import BottomSheet from "../../components/bottomSheet/BottomSheet";
import FormInput from "../../components/form/FormInput";
import FormButton from "../../components/form/FormButton";
import axiosInstance from "../../utils/api-client";

const UserTherapyAppointDetails = ({ navigation, route }) => {
  const item = route?.params;
  console.log("tttt", item);

  const bottomSheetRef = useRef();

  const [loading, setLoading] = useState(false);

  const [visible, setIsVisible] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");

  // Error states
  const [formError, setFormError] = useState("");
  const [cancellationReasonError, setCancellationReasonError] = useState("");

  const transformedData = item?.providerProfile?.profile_pictures?.map(
    (item) => ({
      uri: item,
    })
  );

  const cancelAppointment = async () => {
    const cancellationData = {
      appointmentId: item?.id,
      cancellationReason: cancellationReason,
    };

    if (!cancellationReason) {
      setCancellationReasonError("Please provide your reason for cancellation");
    } else {
      setLoading(true);

      try {
        await axiosInstance({
          url: "appointment/cancel",
          method: "POST",
          data: cancellationData,
        })
          .then((res) => {
            console.log("cancelAppointment res", res?.data);
            setLoading(false);

            RNToast(Toast, "Great, your appointment has been cancelled");
            // navigate to the therapy home screen
            navigation.navigate("UserTherapy");
          })
          .catch((err) => {
            console.log("cancelAppointment err", err);
            setLoading(false);

            setFormError(err?.response?.data?.message);
          });
      } catch (error) {
        console.log("cancelAppointment error", error);
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={"arrow-back-outline"}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        rightIcon={""}
        headerTitle={"Appointment"}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 0, padding: 10 }}
      >
        {/* Appointment details */}
        <View style={{ padding: 10, marginBottom: 30 }}>
          <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 10 }}>
            Appointment Details
          </Text>
          <View style={styles.Q}>
            <Text style={styles.summaryQ}>Appointment Date</Text>
            <Text style={styles.summaryA}>
              {formatDate(item?.appointmentTime?.date)}
            </Text>
          </View>
          <View style={styles.Q}>
            <Text style={styles.summaryQ}>Appointment Time</Text>
            <Text style={styles.summaryA}>
              {convertTo12HourFormat(item?.appointmentTime?.time)}
            </Text>
          </View>
          <View style={styles.Q}>
            <Text style={styles.summaryQ}>Therapy Type</Text>
            <Text style={styles.summaryA}>{item?.category}</Text>
          </View>
          <View style={styles.Q}>
            <Text style={styles.summaryQ}>Status</Text>
            <Text style={styles.summaryA}>
              {appointmentTextPrecedence(item)}
            </Text>
          </View>
        </View>

        {/* About the therapist */}
        <View style={{ padding: 10, marginBottom: 30 }}>
          <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 10 }}>
            Know Your Therapist
          </Text>
        </View>

        <View style={styles.therapistProfile}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setIsVisible(true);
            }}
          >
            <Image
              style={styles.therapistImage}
              source={{
                uri: item?.providerProfile?.profile_pictures?.length
                  ? item?.providerProfile?.profile_pictures[0]
                  : dummyImageUrl,
              }}
            />
          </TouchableOpacity>

          <Text style={styles.therapistName}>
            {item?.providerProfile?.fullname}
          </Text>
          <ImageView
            images={transformedData}
            imageIndex={0}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
          />
        </View>

        <View style={styles.therapistExperience}>
          <Ionicons name="bag-check-outline" color={"#666"} size={20} />
          <Text style={styles.therapistExperienceName}>
            Experience:{" "}
            <Text style={styles.therapistExperienceNameValue}>
              {item?.providerProfile?.years_of_experience} years
            </Text>
          </Text>
        </View>
        <View style={styles.therapistExperience}>
          <Ionicons name="earth-outline" color={"#666"} size={20} />
          <Text style={styles.therapistExperienceName}>
            Country:{" "}
            <Text style={styles.therapistExperienceNameValue}>
              {item?.providerProfile?.country}
            </Text>
          </Text>
        </View>
        <View style={styles.therapistExperience}>
          <Ionicons name="checkbox-outline" color={"#666"} size={20} />
          <Text style={styles.therapistExperienceName}>
            Skills:{" "}
            <Text style={styles.therapistExperienceNameValue}>
              {item?.providerProfile?.skill[0]}
            </Text>
          </Text>
        </View>
        <View style={styles.therapistExperience}>
          <Ionicons name="pricetags-outline" color={"#666"} size={20} />
          <Text style={styles.therapistExperienceName}>
            Fixed Price:{" "}
            <Text style={styles.therapistExperienceNameValue}>
              {setPriceTo2DecimalPlaces(item?.providerProfile?.rate_per_hour)}
              /hr
            </Text>
          </Text>
        </View>

        {/* Therapist Bio */}
        <View style={{ padding: 10, paddingTop: 30 }}>
          <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 10 }}>
            Therapist Bio
          </Text>
          <Text>{item?.providerProfile?.bio}</Text>
        </View>

        <ScrollViewSpace />
      </ScrollView>

      {/* Buttons */}
      <FixedBottomContainer top={1.1}>
        <FormButton
          title={"Cancel appointment"}
          width={1.1}
          onPress={() => {
            bottomSheetRef.current.open();
          }}
        />
      </FixedBottomContainer>

      {/* BottomSheet */}
      <BottomSheet
        bottomSheetRef={bottomSheetRef}
        height={2.5}
        bottomsheetTitle={"Cancel Your Appointment"}
      >
        <View style={{ paddingTop: 30 }}>
          <FormInput
            formInputTitle={"What's your reason for cancellation"}
            keyboardType={"default"}
            placeholder="Enter your reason"
            value={cancellationReason}
            onChangeText={(txt) => {
              setCancellationReason(txt);
              setCancellationReasonError("");
              setFormError("");
            }}
            errorMessage={cancellationReasonError}
            numberOfLines={5}
            multiLine={true}
            height={100}
          />

          <FormButton
            title={"Cancel appointment"}
            width={1.1}
            onPress={cancelAppointment}
            formError={formError}
            loading={loading}
            disabled={loading}
          />
        </View>
      </BottomSheet>
    </SafeAreaViewComponent>
  );
};

export default UserTherapyAppointDetails;

const styles = StyleSheet.create({
  therapistProfile: {
    // justifyContent: "center",
    // alignItems: "center",
    marginBottom: 20,
    padding: 20,
  },
  therapistImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  therapistName: {
    // textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
  },
  therapistExperience: {
    padding: 10,
    // backgroundColor: "red",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    // marginLeft: 10,
  },
  therapistExperienceName: {
    marginLeft: 10,
  },
  therapistExperienceNameValue: {
    fontWeight: "600",
    fontSize: 14,
  },
  therapistTherapy: {
    // borderRadius: 20,
    padding: 10,
    marginBottom: 10,

    backgroundColor: "#FFD6DE",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "600",
  },
  therapistEducation: {
    fontSize: 14,
  },
  Q: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: windowHeight / 17,
    alignContent: "center",
    alignItems: "center",
    // backgroundColor: 'black',
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  summary: {
    fontSize: 17,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 10,
    color: "#fff",
  },
  summaryQ: {
    color: COLORS.btnBorderColor,
    // fontWeight: '500',
    fontSize: 14,
    // backgroundColor: 'red',
    // width: windowWidth / 1.3,
  },
  summaryA: {
    fontWeight: "500",
    fontSize: 16,
  },
});
