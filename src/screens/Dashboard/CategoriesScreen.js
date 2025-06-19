import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeAreaViewComponent from '../../components/common/SafeAreaViewComponent';
import HeaderTitle from '../../components/common/HeaderTitle';
import SearchBar from '../../components/search/SearchBar';
import CategoryCard from '../../components/cards/CategoryCard';

const categoriesSector = [
  {
    id: 1,
    title: "Assemble",
    image: require("../../assets/1.jpg"),
    bgColor: "#00C34E1A",
  },
  {
    id: 2,
    title: "Cleaners",
    image: require("../../assets/1.jpg"),
    bgColor: "#2465E11A",
  },
  {
    id: 3,
    title: "Bakers",
    image: require("../../assets/1.jpg"),
    bgColor: "#C369001A",
  },
  {
    id: 1,
    title: "Assemble",
    image: require("../../assets/1.jpg"),
    bgColor: "#00C34E1A",
  },
  {
    id: 2,
    title: "Cleaners",
    image: require("../../assets/1.jpg"),
    bgColor: "#2465E11A",
  },
  {
    id: 3,
    title: "Bakers",
    image: require("../../assets/1.jpg"),
    bgColor: "#C369001A",
  },
];

const CategoriesScreen = ({navigation}) => {
  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        headerTitle={'Top Categories'}
        leftIcon={'arrow-back-outline'}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />
      <SearchBar />

      <View style={styles.catView}>
        {categoriesSector.map((cur, i) => (
          <CategoryCard key={i} props={cur} />
        ))}
      </View>
    </SafeAreaViewComponent>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  catView: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
    flexWrap: 'wrap',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
