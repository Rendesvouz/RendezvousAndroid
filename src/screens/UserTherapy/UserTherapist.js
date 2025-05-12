import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TherapistCard from "../../components/cards/TherapistCard";

const UserTherapist = ({ onPress }) => {
  return (
    <View>
      <TherapistCard onPress={onPress} />
    </View>
  );
};

export default UserTherapist;

const styles = StyleSheet.create({});
