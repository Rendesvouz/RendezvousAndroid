import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import SafeAreaViewComponent from '../../../components/common/SafeAreaViewComponent';
import HeaderTitle from '../../../components/common/HeaderTitle';
import ProductCard from '../../../components/cards/ProductCard';
import ScrollViewSpace from '../../../components/common/ScrollViewSpace';
import SearchBar from '../../../components/search/SearchBar';
import PickerSelect from '../../../components/pickerSelect/PickerSelect';
import ShopPicker from '../../../components/pickerSelect/ShopPicker';
import StoreHeaderTitle from '../../../components/common/StoreHeaderTitle';
import CategoriesCard from '../../../components/cards/CategoriesCard';
import axios from 'axios';
import {baseURL} from '../../../utils/api-client';
import {saveShopProducts} from '../../../redux/features/user/userSlice';
import {useTheme} from '../../../Context/ThemeContext';

const ShopScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const {theme} = useTheme();

  const reduxProducts = state?.user?.shopProduct;
  console.log('reduxProducts', reduxProducts);

  const reduxProductCategories = state?.user?.productCategories;
  console.log('reduxProductCategories', reduxProductCategories);

  const transformedData = reduxProductCategories?.map(item => ({
    label: item?.name,
    value: item,
  }));

  const [productCategory, setProductCategory] = useState('');

  // Search filter states
  const [clicked, setClicked] = useState(false);
  const [search, setSearch] = useState('');
  const [masterDataSource, setMasterDataSource] = useState(reduxProducts);
  const [filteredDataSource, setFilteredDataSource] = useState(reduxProducts);
  console.log('masterDataSource', masterDataSource);

  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(item => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  // Combined filter function
  const applyFilters = () => {
    let filteredData = reduxProducts;

    // Apply category filter if selected
    if (productCategory) {
      filteredData = filteredData?.filter(
        product => product?.categoryId === productCategory?.id,
      );
    }

    // Apply search filter if search text is entered
    if (search) {
      filteredData = filteredData?.filter(product =>
        product?.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilteredDataSource(filteredData);
  };

  const renderItem = ({item}) => (
    <ProductCard
      props={item}
      productName={item?.title}
      productImage={item?.images_url[0]}
      productPrice={item?.price}
      onPress={() => navigation.navigate('ProductDetails', item)}
    />
  );

  const fetchProducts = async () => {
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

  useEffect(() => {
    applyFilters();
  }, [productCategory, search]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaViewComponent>
      <StoreHeaderTitle
        headerTitle={'Store'}
        onRightIconPress3={() => {
          navigation.navigate('Cart');
        }}
      />

      <View style={{padding: 15}}>
        <Text style={{fontSize: 16, fontWeight: '400'}}>Top Categories</Text>
        <ScrollView horizontal contentContainerStyle={{flexDirection: 'row'}}>
          {reduxProductCategories?.map((cur, i) => (
            <CategoriesCard key={i} props={cur} />
          ))}
        </ScrollView>
      </View>

      {/* SearchBar Section */}
      <SearchBar
        searchPlaceholder={'Search Products'}
        searchPhrase={search}
        setSearchPhrase={text => setSearch(text)}
      />

      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
          // backgroundColor: 'red',
        }}>
        <Text style={[styles.catText, {color: theme?.text}]}>All Products</Text>

        {transformedData && (
          <ShopPicker
            placeholder={'Categories'}
            items={transformedData}
            value={productCategory}
            onValueChange={value => {
              setProductCategory(value);
            }}
          />
        )}
      </View>
      <FlatList
        data={filteredDataSource}
        renderItem={renderItem}
        keyExtractor={item => item?.id.toString()}
        contentContainerStyle={styles.products}
      />
    </SafeAreaViewComponent>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  products: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 10,
  },
  catText: {
    fontSize: 20,
    fontWeight: '400',
  },
});
