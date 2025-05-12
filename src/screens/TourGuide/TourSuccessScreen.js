import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import FixedBottomContainer from "../../components/common/FixedBottomContainer";
import FormButton from "../../components/form/FormButton";
import { windowHeight, windowWidth } from "../../utils/Dimensions";
import TransparentBtn from "../../components/form/TransparentBtn";

const TourSuccessScreen = ({ navigation }) => {
  return (
    <SafeAreaViewComponent>
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          alignSelf: "center",
          display: "flex",
          height: windowHeight / 1.4,
        }}
      >
        <Image
          source={require("../../assets/tick.png")}
          style={{
            width: windowWidth / 2,
            height: windowHeight / 3,
            marginBottom: 10,
            objectFit: "contain",
          }}
        />
        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10 }}>
          Booking Successful!
        </Text>
        <Text>Please check your email for details. See you soon! 🎉</Text>
      </View>

      {/* Buttons */}
      <FixedBottomContainer top={1.4}>
        <FormButton
          title={"See your booked tours"}
          width={1.1}
          onPress={() => {
            navigation.navigate("BookedToursScreen");
          }}
        />
        <TransparentBtn
          title={"Discover locations"}
          width={1.1}
          onPress={() => {
            navigation.navigate("TourguideScreen");
          }}
        />
      </FixedBottomContainer>
    </SafeAreaViewComponent>
  );
};

export default TourSuccessScreen;

const styles = StyleSheet.create({});
