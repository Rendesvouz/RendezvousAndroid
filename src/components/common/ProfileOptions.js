import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const ProfileOptions = ({ onPress, iconName, name }) => {
  return (
    <TouchableOpacity style={styles.set} onPress={onPress}>
      <View style={styles.setsContent}>
        <Ionicons name={iconName} size={20} color={"#292D32"} />
        <Text style={[styles.settingsText]}>{name}</Text>
      </View>
      <Ionicons
        name="chevron-forward-outline"
        size={20}
        color={"#333"}
        style={{ marginTop: 5 }}
      />
    </TouchableOpacity>
  );
};

export default ProfileOptions;

const styles = StyleSheet.create({
  settings: {
    margin: 5,
    marginTop: 30,
    borderTopWidth: 1,
    marginBottom: 20,
    borderColor: "#999",
  },
  set: {
    marginBottom: 0,
    // borderBottomColor: '#999',
    // borderBottomWidth: 1,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: 'pink',
  },
  setsContent: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    margin: 5,
    marginTop: 10,
  },
  settingsText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
    marginLeft: 17,
  },
});
