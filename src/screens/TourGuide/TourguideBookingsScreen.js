import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment';
import Toast from 'react-native-toast-message';

import SafeAreaViewComponent from '../../components/common/SafeAreaViewComponent';
import HeaderTitle from '../../components/common/HeaderTitle';
import {windowWidth} from '../../utils/Dimensions';
import ScrollViewSpace from '../../components/common/ScrollViewSpace';
import FormInput from '../../components/form/FormInput';
import FixedBottomContainer from '../../components/common/FixedBottomContainer';
import FormButton from '../../components/form/FormButton';
import PickerSelect from '../../components/pickerSelect/PickerSelect';
import {
  extractTime,
  generateTherapistAvailability,
  generateTimeSlots,
  RNToast,
  setPriceTo2DecimalPlaces,
} from '../../Library/Common';
import axiosInstance from '../../utils/api-client';
import {useTheme} from '../../Context/ThemeContext';

const TourguideBookingsScreen = ({navigation, route}) => {
  const item = route?.params;
  console.log('ddd', item);
  const {theme} = useTheme();

  const tourguideSchedules = item?.tourguideProfile?.scheduling;
  // console.log("tourguideSchedules", tourguideSchedules);

  // Parse the stringified objects into actual objects
  const weeklyAvailability = {};
  tourguideSchedules?.forEach(item => {
    const parsedItem = JSON?.parse(item);
    weeklyAvailability[parsedItem?.day] = parsedItem?.time;
  });

  const today = moment().format('YYYY-MM-DD');

  const [loading, setLoading] = useState(false);

  const [selectedDate, setSelectedDate] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [bookedAppointments, setBookedAppointments] = useState([]);

  const [tourTime, setTourTime] = useState();
  const [numberOfPeople, setNumberOfPeople] = useState('1');

  // Error states
  const [formError, setFormError] = useState('');
  const [tourTimeError, setTourTimeError] = useState('');
  const [numberOfPeopleError, setNumberOfPeopleError] = useState('');

  const totalTourPrice = () => {
    if (numberOfPeople > 1) {
      const morethanOnePerson = setPriceTo2DecimalPlaces(
        item?.price +
          item?.price *
            (item?.group_size_percentage / 100) *
            (numberOfPeople - 1),
      );

      return morethanOnePerson;
    } else {
      return setPriceTo2DecimalPlaces(item?.price * numberOfPeople);
    }
  };

  const availableTimeSlots = generateTimeSlots(
    availableTimes[0]?.time,
    availableTimes[1]?.time,
  );

  console.log('availableTimeSlots', availableTimeSlots, selectedDate);

  const transformedTourTimesData = availableTimeSlots?.map(item => ({
    label: item,
    value: item,
  }));

  // Example therapist availability data
  const therapistAvailability = {
    '2025-03-19': ['10:00 AM', '2:00 PM', '4:00 PM'],
    '2025-03-11': ['11:00 AM', '1:00 PM', '3:00 PM'],
  };

  const updatedAvailabilityDates = generateTherapistAvailability(
    moment,
    weeklyAvailability,
  );

  const handleDateSelect = day => {
    const date = day.dateString;
    if (!moment(date).isBefore(today)) {
      setSelectedDate(date);

      const availableSlots = updatedAvailabilityDates[date] || [];
      const bookedTimesForDate = bookedAppointments
        .filter(appt => appt.date === date)
        .map(appt => appt.time);

      // Mark booked times as disabled
      const updatedSlots = availableSlots?.map(time => ({
        time,
        disabled: bookedTimesForDate?.includes(time),
      }));

      console.log('updatedSlots', updatedSlots);

      setAvailableTimes(updatedSlots);
    } else {
      // If somehow a past date is selected (by a logic bug or manual intervention)
      setSelectedDate('');
      setAvailableTimes([]);
    }
  };

  // Filter out past dates
  const futureAvailability = Object.keys(updatedAvailabilityDates).reduce(
    (acc, date) => {
      if (!moment(date).isBefore(today)) {
        acc[date] = {
          marked: true,
          dotColor: '#BC0D35', // Color for future available dates
          selected: date === selectedDate,
          selectedColor: '#BC0D35',
          selectedTextColor: '#ffffff',
        };
      }
      return acc;
    },
    {},
  );

  const bookAppointment = async () => {
    const combinedDateTimeStr = `${selectedDate}T${extractTime(tourTime)}:00Z`;
    const bookingData = {
      title: item?.title,
      tourguide_id: item?.tourguide_id,
      offering_id: item?.id,
      date: combinedDateTimeStr,
      duration: item?.duration,
      group_size: parseInt(numberOfPeople),
      payment_type: 'price_per_location',
      action: 'request',
    };
    console.log('bookingData', bookingData);

    if (!selectedDate) {
      setFormError('Please select a date for your booking');
    } else if (!tourTime) {
      setTourTimeError('please select a time for your tour');
      // setFormError('please select a time for your tour');
    } else if (!numberOfPeople) {
      setFormError('Please select the number of participants');
    } else {
      setLoading(true);

      try {
        await axiosInstance({
          url: 'tour-guide/schedule',
          method: 'POST',
          data: bookingData,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(res => {
            console.log('bookAppointment res', res);
            setLoading(false);

            RNToast(Toast, 'Great, your appointment has been booked');
            navigation.navigate('TourSuccessScreen');
          })
          .catch(err => {
            console.log('bookAppointment err', err?.response);
            setLoading(false);

            if (err?.response?.status == 400) {
              RNToast(
                Toast,
                'Please activate/fund your wallet before performing this action',
              );
            } else if (err?.response?.status == 403) {
              RNToast(
                Toast,
                'Your subscription has expired, please renew to keep enjoying our services',
              );
            }
          });
      } catch (error) {
        console.log('bookAppointment error', error?.response);
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={'arrow-back-outline'}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        rightIcon={''}
        headerTitle={''}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: 0}}>
        <View style={{padding: 20, flexDirection: 'row'}}>
          <Image
            style={styles.tourguideBookingImage}
            source={{
              uri: item?.pictures[0]
                ? item?.pictures[0]
                : require('../../assets/skyImage.png'),
            }}
          />
          <View
            style={{
              marginLeft: 10,
              width: windowWidth / 1.45,
              // backgroundColor: "red",
              justifyContent: 'space-between',
            }}>
            <Text
              numberOfLines={1}
              style={[styles.tourguideBookingTitle, {color: theme?.text}]}>
              {item?.title}
            </Text>
            <View style={styles.tourguideProfile2}>
              <Ionicons
                name="location-outline"
                size={15}
                color={theme?.text}
                style={{marginRight: 6}}
              />
              <Text style={{color: theme?.text}}>{item?.city}</Text>
            </View>
            <Text style={{color: theme?.text}}>
              {setPriceTo2DecimalPlaces(item?.price)} / person
            </Text>
          </View>
        </View>

        <Calendar
          onDayPress={handleDateSelect}
          markedDates={futureAvailability}
          theme={{
            arrowColor: '#BC0D35',
            todayTextColor: '#BC0D35',
            selectedDayBackgroundColor: '#BC0D35',
            selectedDayTextColor: '#ffffff',
            dotColor: '#BC0D35',
            textMonthFontWeight: 'bold',
            textMonthFontSize: 18,
            backgroundColor: '#ffffff',
          }}
          style={{backgroundColor: theme?.background}}
          monthFormat={'MMMM yyyy'}
        />

        {selectedDate && (
          <View style={{marginTop: 20}}>
            <PickerSelect
              items={transformedTourTimesData}
              placeholder={'Select your tour time'}
              formInputTitle={'Select your preferred time'}
              onValueChange={value => {
                setTourTime(value);
                setFormError('');
                setTourTimeError('');
              }}
              errorMessage={tourTimeError}
            />

            <FormInput
              formInputTitle={'Number of People'}
              keyboardType={'number-pad'}
              placeholder="Enter your a number"
              value={numberOfPeople}
              onChangeText={txt => {
                setNumberOfPeople(txt);
                setNumberOfPeopleError('');
                setFormError('');
              }}
              errorMessage={numberOfPeopleError}
            />
          </View>
        )}

        <ScrollViewSpace />
      </ScrollView>

      {/* Buttons */}
      <FixedBottomContainer top={1.19}>
        <FormButton
          title={`Book Tour ${totalTourPrice()}`}
          width={1.1}
          onPress={bookAppointment}
          disabled={!numberOfPeople || loading}
          formError={formError}
          loading={loading}
        />
      </FixedBottomContainer>
    </SafeAreaViewComponent>
  );
};

export default TourguideBookingsScreen;

const styles = StyleSheet.create({
  tourguideBookingImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  tourguideBookingTitle: {
    fontSize: 16,
    fontWeight: '600',
    // marginBottom: 10,
  },
  tourguideProfile2: {
    flexDirection: 'row',
    // marginTop: 10,
  },
});
