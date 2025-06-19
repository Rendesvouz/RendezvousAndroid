import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeAreaViewComponent from '../../../components/common/SafeAreaViewComponent';
import HeaderTitle from '../../../components/common/HeaderTitle';
import axiosInstance from '../../../utils/api-client';
import GiftCard from '../../../components/cards/GiftCard';
import SearchBar from '../../../components/search/SearchBar';

const GiftCardScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const [giftcards, setGiftcards] = useState([]);

  // Search filter states
  const [clicked, setClicked] = useState(false);
  const [search, setSearch] = useState('');
  const [masterDataSource, setMasterDataSource] = useState();
  const [filteredDataSource, setFilteredDataSource] = useState();
  console.log('masterDataSource', masterDataSource);

  // Filter locations based on search text
  const searchFilterFunction = text => {
    if (text) {
      const newData = giftcards?.filter(cur => {
        const itemData = cur?.name ? cur?.name.toLowerCase() : ''.toLowerCase();
        const textData = text.toLowerCase();
        return itemData?.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(giftcards);
      setSearch(text);
    }
  };

  const fetchGiftCards = async () => {
    try {
      await axiosInstance({
        url: 'gift-card/list',
        method: 'GET',
      })
        .then(res => {
          console.log('fetchGiftCards res', res?.data);
          setLoading(false);
          setGiftcards(res?.data?.data);
          setFilteredDataSource(res?.data?.data);
        })
        .catch(err => {
          console.log('fetchGiftCards err', err);
          setLoading(false);
        });
    } catch (error) {
      console.log('fetchGiftCards error', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGiftCards();
  }, []);

  const renderItem = ({item}) => (
    <GiftCard
      props={item}
      onPress={() => navigation.navigate('GiftCardDetails', item)}
    />
  );

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        headerTitle={'Gift Cards'}
        leftIcon={'arrow-back-outline'}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />

      {/* SearchBar Section */}
      <SearchBar
        searchPlaceholder={'Search Giftcards'}
        searchPhrase={search}
        clicked={clicked}
        setClicked={setClicked}
        setSearchPhrase={text => {
          searchFilterFunction(text);
        }}
      />

      {loading ? (
        <Text style={styles.loadingText}>
          Please wait while we fetch your data
        </Text>
      ) : giftcards?.length ? (
        <FlatList
          data={filteredDataSource}
          renderItem={renderItem}
          keyExtractor={item => item?.id.toString()}
          contentContainerStyle={styles.products}
        />
      ) : (
        <Text style={styles.loadingText}>No giftcards at the moment</Text>
      )}
    </SafeAreaViewComponent>
  );
};

export default GiftCardScreen;

const styles = StyleSheet.create({
  products: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 10,
  },
  loadingText: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
});
