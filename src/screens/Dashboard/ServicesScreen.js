import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import SafeAreaViewComponent from '../../components/common/SafeAreaViewComponent';
import HeaderTitle from '../../components/common/HeaderTitle';
import SearchBar from '../../components/search/SearchBar';
import CustomSwitch from '../../components/switches/CustomSwitch';
import {windowHeight} from '../../utils/Dimensions';
import ArtisanCard from '../../components/cards/ArtisanCard';
import ScrollViewSpace from '../../components/common/ScrollViewSpace';

const servicesArrayData = [
  {
    optionTitle: 'All Services',
  },
  {
    optionTitle: 'Cleaning',
  },
  {
    optionTitle: 'Fixing',
  },
  {
    optionTitle: 'Painting',
  },
];

const artisans = [
  {
    id: 1,
    title: 'Car Washing',
    name: 'Bimbooo',
    image: require('../../assets/1.jpg'),
  },
  {
    id: 2,
    title: 'House Cleaning',
    name: 'Bimbooo',
    image: require('../../assets/1.jpg'),
  },
  {
    id: 3,
    title: 'House Cleaning',
    name: 'Bimbooo',
    image: require('../../assets/1.jpg'),
  },
  {
    id: 2,
    title: 'House Cleaning',
    name: 'Bimbooo',
    image: require('../../assets/1.jpg'),
  },
  {
    id: 3,
    title: 'House Cleaning',
    name: 'Bimbooo',
    image: require('../../assets/1.jpg'),
  },
];

const ServicesScreen = ({navigation}) => {
  const [orderTab, setOrderTab] = useState(0);
  const onSelectSwitch = value => {
    setOrderTab(value);
  };

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        headerTitle={'Services'}
        leftIcon={'arrow-back-outline'}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />
      <SearchBar />

      <View style={{height: windowHeight / 19, marginBottom: 20}}>
        <CustomSwitch
          arrayData={servicesArrayData}
          seletionMode={0}
          onSelectSwitch={onSelectSwitch}
        />
      </View>

      <View>
        <FlatList
          data={artisans}
          renderItem={({item}) => (
            <ArtisanCard
              props={item}
              onPress={() => {
                navigation.navigate('Details');
              }}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <ScrollViewSpace />}
        />
      </View>
      <Text>ServicesScreen</Text>
    </SafeAreaViewComponent>
  );
};

export default ServicesScreen;

const styles = StyleSheet.create({
  servicesWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    // padding: 4,
    backgroundColor: 'red',
    flexDirection: 'row',
  },
});
