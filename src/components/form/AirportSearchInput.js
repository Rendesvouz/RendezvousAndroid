import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import debounce from 'lodash.debounce';
import BookingFormInput from './BookingFormInput';
import {COLORS} from '../../themes/themes';
import axiosInstance from '../../utils/api-client';
import {useTheme} from '../../Context/ThemeContext';

const AirportSearchInput = ({onSelect, formInputTitle}) => {
  const {theme} = useTheme();

  const [query, setQuery] = useState('');
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isSelected, setIsSelected] = useState(false);

  // Call API when query changes
  const fetchAirports = debounce(async text => {
    console.log('eeee', text?.length);
    if (!text || text.length < 3) {
      return;
    }

    try {
      setLoading(true);

      const res = await axiosInstance({
        url: `reservation/locations/search?keyword=${query}&subType=AIRPORT&subType=CITY`,
        method: 'GET',
      });

      //   const res = await axios.get(
      //     `https://api.example.com/airports?search=${text}`,
      //   );
      console.log('airport search', res?.data);
      setAirports(res?.data?.data?.data || []);
    } catch (error) {
      console.error('Airport search error:', error?.response);
    } finally {
      setLoading(false);
    }
  }, 400);

  useEffect(() => {
    if (!isSelected) {
      fetchAirports(query);
    }
  }, [query]);

  return (
    <View>
      <BookingFormInput
        formInputTitle={formInputTitle}
        placeholder="Search airport or city"
        leftIcon="airplane-outline"
        iconColor={COLORS.rendezvousRed}
        value={query}
        onChangeText={setQuery}
      />

      {loading && (
        <ActivityIndicator
          size="small"
          color={theme?.text}
          style={{marginTop: 10}}
        />
      )}

      {airports?.length > 0 && (
        <View
          style={{
            backgroundColor: theme?.borderColor,
            borderRadius: 4,
            marginTop: 10,
          }}>
          <FlatList
            data={airports}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  onSelect(item);
                  setQuery(`${item?.address?.cityName} (${item.iataCode})`);
                  setIsSelected(true);
                  setAirports([]);
                }}
                style={{
                  padding: 10,
                  borderBottomWidth: 0.5,
                  borderColor: '#ccc',
                }}>
                <Text style={{fontWeight: 'bold', color: theme?.text}}>
                  {item?.address?.cityName}, {item?.address?.countryName}
                </Text>
                <Text style={{color: theme?.text}}>
                  {item?.address?.cityName} ({item.iataCode})
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default AirportSearchInput;
