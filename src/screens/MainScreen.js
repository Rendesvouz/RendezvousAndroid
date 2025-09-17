import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import HomeScreen from "./HomeScreen";
import SearchScreen from "./SearchScreen";
import ProfileScreen from "./Profile/ProfileScreen";
import { COLORS } from "../themes/themes";
import EditProfile from "./Profile/EditProfile";
import ResetPassword from "./auth/ResetPassword";
import AccountSettings from "./Profile/AccountSettings";
import ChangePassword from "./Profile/ChangePassword";
import PasswordResetSuccess from "./Profile/PasswordResetConfirmation";
import ServicesScreen from "./Dashboard/ServicesScreen";
import CategoriesScreen from "./Dashboard/CategoriesScreen";
import SplashScreen from "./SplashScreen";
import LoginScreen from "./auth/LoginScreen";
import DetailsScreen from "./Dashboard/DetailsScreen";
import PaymentMethod from "./Dashboard/PaymentMethod";
import AddPaymentCard from "./Dashboard/AddPaymentCard";
import OrderSummary from "./Dashboard/OrderSummary";
import OrderSuccessfulScreen from "./Dashboard/OrderSuccessfulScreen";
import ReceiptScreen from "./Dashboard/ReceiptScreen";
import Bookings from "./Profile/Bookings";
import OnboardingScreen from "./auth/OnboardingScreen";
import RegisterScreen1 from "./auth/RegisterScreen1";
import RegisterScreen2 from "./auth/RegisterScreen2";
import VideoVerificationScreen from "./auth/VideoVerificationScreen";
import EmailVerificationScreen from "./auth/EmailVerification";
import ForgetPassword from "./auth/ForgotPassword";
import AccountCreationSuccess from "./auth/AccountCreationSuccess";
import OnboardingFlow1 from "./OnboardingProcesses/User/OnboardingFlow1";
import ProfileInfo from "./Profile/ProfileInfo";
import ProfileInformation from "./Profile/User/ProfileInformation";
import BasicInformation from "./Profile/User/BasicInformation";
import AdditionalImages from "./Profile/User/AdditionalImages";
import AdditionalInformation from "./Profile/User/AdditionalInformation";
import UserPreferences from "./Profile/User/UserPreferences";
import WalletScreen from "./Profile/WalletScreen";
import UserTherapyHomeScreen from "./UserTherapy/UserTherapyHomeScreen";
import UserTherapyOnboardingFlow1 from "./UserTherapy/Onboarding/OnboardingFlow1";
import UserTherapyOnboardingFlow2 from "./UserTherapy/Onboarding/OnboardingFlow2";
import Complete from "./UserTherapy/Onboarding/Complete";
import UserTherapistDetails from "./UserTherapy/UserTherapistDetails";
import UserTherapistBooking from "./UserTherapy/UserTherapistBooking";
import ShopScreen from "./Vendor/Shop/ShopScreen";
import ProductDetails from "./Vendor/Shop/ProductDetails";
import AddProduct from "./Vendor/AddProduct";
import CartScreen from "./Vendor/Shop/CartScreen";
import UserLifeCoachHomeScreen from "./UserLifeCoach/UserLifeCoachHomeScreen";
import UserLifeCoachOnboardingFlow1 from "./UserLifeCoach/Onboarding/OnboardingFlow1";
import UserLifeCoachOnboardingFlow2 from "./UserLifeCoach/Onboarding/OnboardingFlow2";
import UserLifeCoachDetails from "./UserLifeCoach/UserLifeCoachDetails";
import UserLifeCoachBooking from "./UserLifeCoach/UserLifeCoachBooking";
import UserLifeCoachComplete from "./UserLifeCoach/Onboarding/Complete";
import CheckoutScreen from "./Vendor/Shop/CheckoutScreen";
import SupportScreen from "./Profile/SupportScreen";
import NotificationsScreen from "./NotificationsScreen";
import BlogScreen from "./Profile/BlogScreen";
import BlogDetailsScreen from "./Profile/BlogDetailsScreen";
import GiftCardScreen from "./Vendor/Shop/GiftCardScreen";
import UserTherapyAppointDetails from "./UserTherapy/UserTherapyAppointDetails";
import StringsScreen from "./Strings/StringsScreen";
import TourguideHomeScreen from "./TourGuide/TourguideHomeScreen";
import TourPlacesScreen from "./TourGuide/TourPlacesScreen";
import ToursDetailsScreen from "./TourGuide/ToursDetailsScreen";
import TourguideBookingsScreen from "./TourGuide/TourguideBookingsScreen";
import TourSuccessScreen from "./TourGuide/TourSuccessScreen";
import BookedToursScreen from "./TourGuide/BookedToursScreen";
import LegalScreen from "./Profile/LegalScreen";
import SubscriptionScreen from "./Profile/SubscriptionScreen";
import GiftCardDetails from "./Vendor/Shop/GiftCardDetails";
import UserTherapyAppointments from "./UserTherapy/UserTherapyAppointments";
import UserLifeCoachAppointments from "./UserLifeCoach/UserLifeCoachAppointments";
import TourguideAppointments from "./TourGuide/TourguideAppointments";
import OnboardingFlow2 from "./OnboardingProcesses/User/OnboardingFlow2";
import OnboardingFlow3 from "./OnboardingProcesses/User/OnboardingFlow3";
import OnboardingFlow4 from "./OnboardingProcesses/User/OnboardingFlow4";
import OnboardingFlow5 from "./OnboardingProcesses/User/OnboardingFlow5";
import PreferenceFlow1 from "./OnboardingProcesses/User/Preferences/PreferenceFlow1";
import StringsProfileScreen from "./Strings/StringsProfileScreen";
import StringsFriendRequest from "./Strings/StringsFriendRequest";
import StringsMessagingScreen from "./Strings/StringsMessagingScreen";
import StringsChattingScreen from "./Strings/StringsChattingScreen";
import BookingScreen from "./Booking/BookingScreen";
import WellnessScreen from "./UserTherapy/WellnessScreen";
import FlightsScreen from "./Booking/Flights/FlightsScreen";
import FlightsListingScreen from "./Booking/Flights/FlightsListingScreen";
import FlightBookingScreen from "./Booking/Flights/FlightBookingScreen";
import HotelsScreen from "./Booking/Hotels/HotelsScreen";
import PreferenceFlow2 from "./OnboardingProcesses/User/Preferences/PreferenceFlow2";
import StringsLandingScreen from "./Strings/StringsLandingScreen";
import WellnessLandingPage from "./UserTherapy/WellnessLandingPage";
import FeedsScreen from "./Feeds/FeedsScreen";
import GridsScreen from "./Feeds/GridsScreen";
import { useTheme } from "../Context/ThemeContext";
import TravelsLandingScreen from "./Booking/TravelsLandingScreen";
import AddFeedScreen from "./Feeds/AddFeedScreen";
import ReviewFeedScreen from "./Feeds/ReviewFeedScreen";
import ViewProfileScreen from "./Profile/ViewProfileScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
        headerLeft: () => (
          <View style={{ marginLeft: 10 }}>
            <Ionicons
              name="menu-outline"
              size={30}
              color="#333"
              onPress={() => navigation.navigate("Drawer")}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen1}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Register2"
      component={RegisterScreen2}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="EmailVerification"
      component={EmailVerificationScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ForgetPassword"
      component={ForgetPassword}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ResetPassword"
      component={ResetPassword}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="SuccessScreen"
      component={AccountCreationSuccess}
      options={{
        headerShown: false,
      }}
    />

    {/* onboarding */}
    <Stack.Screen
      name="OnboardingFlow1"
      component={OnboardingFlow1}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="OnboardingFlow2"
      component={OnboardingFlow2}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="OnboardingFlow3"
      component={OnboardingFlow3}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="OnboardingFlow4"
      component={OnboardingFlow4}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="OnboardingFlow5"
      component={OnboardingFlow5}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="PreferenceFlow1"
      component={PreferenceFlow1}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="Details"
      component={DetailsScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Services"
      component={ServicesScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Categories"
      component={CategoriesScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="PaymentMethod"
      component={PaymentMethod}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="AddPaymentCard"
      component={AddPaymentCard}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="OrderSummary"
      component={OrderSummary}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="OrderSuccessful"
      component={OrderSuccessfulScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="OrderReceipt"
      component={ReceiptScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Notification"
      component={NotificationsScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="GiftCardScreen"
      component={GiftCardScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="GiftCardDetails"
      component={GiftCardDetails}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    {/* tourguide section */}
    <Stack.Screen
      name="TourguideScreen"
      component={TourguideHomeScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="TourPlaces"
      component={TourPlacesScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="ToursDetailsScreen"
      component={ToursDetailsScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="TourguideBookingsScreen"
      component={TourguideBookingsScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="TourSuccessScreen"
      component={TourSuccessScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    <Stack.Screen
      name="BookedToursScreen"
      component={BookedToursScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    <Stack.Screen
      name="TourguideAppointments"
      component={TourguideAppointments}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    <Stack.Screen
      name="Strings"
      component={StringsScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    {/* Car Rental section */}
    <Stack.Screen
      name="Booking"
      component={BookingScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    {/* Profile section */}
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="ViewProfileScreen"
      component={ViewProfileScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="ProfileInfo"
      component={ProfileInfo}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="ProfileInformation"
      component={ProfileInformation}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="BasicProfile"
      component={BasicInformation}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="AdditionalImages"
      component={AdditionalImages}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="AdditionalInformation"
      component={AdditionalInformation}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="UserPreferences"
      component={UserPreferences}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Account"
      component={AccountSettings}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="ChangePassword"
      component={ChangePassword}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="PasswordResetSuccess"
      component={PasswordResetSuccess}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Bookings"
      component={Bookings}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Wallet"
      component={WalletScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Cart"
      component={CartScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Checkout"
      component={CheckoutScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Support"
      component={SupportScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Blog"
      component={BlogScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="BlogDetails"
      component={BlogDetailsScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Legal"
      component={LegalScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Subscription"
      component={SubscriptionScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    {/* Flight Booking */}
    <Stack.Screen
      name="BookingScreen"
      component={BookingScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
  </Stack.Navigator>
);

const AuthStack = ({}) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen1} />
    <Stack.Screen name="Register2" component={RegisterScreen2} />
    <Stack.Screen
      name="EmailVerification"
      component={EmailVerificationScreen}
    />
    <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    <Stack.Screen name="ResetPassword" component={ResetPassword} />
    <Stack.Screen name="SuccessScreen" component={AccountCreationSuccess} />

    <Stack.Screen
      name="OnboardingFlow1"
      component={OnboardingFlow1}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="OnboardingFlow2"
      component={OnboardingFlow2}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="OnboardingFlow3"
      component={OnboardingFlow3}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="OnboardingFlow4"
      component={OnboardingFlow4}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="OnboardingFlow5"
      component={OnboardingFlow5}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="PreferenceFlow1"
      component={PreferenceFlow1}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const UserTherapyStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="UserWellness"
      component={WellnessScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="UserTherapy"
      component={UserTherapyHomeScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="UserTherapyOnboardingFlow1"
      component={UserTherapyOnboardingFlow1}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="UserTherapyOnboardingFlow2"
      component={UserTherapyOnboardingFlow2}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Complete"
      component={Complete}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="UserTherapistDetails"
      component={UserTherapistDetails}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="UserTherapyAppointments"
      component={UserTherapyAppointments}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="UserTherapistBooking"
      component={UserTherapistBooking}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="UserTherapyAppointmentDetails"
      component={UserTherapyAppointDetails}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
  </Stack.Navigator>
);

const UserLifeCoachStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="UserLifeCoach"
      component={UserLifeCoachHomeScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="UserLifeCoachOnboardingFlow1"
      component={UserLifeCoachOnboardingFlow1}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="UserLifeCoachOnboardingFlow2"
      component={UserLifeCoachOnboardingFlow2}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Complete"
      component={UserLifeCoachComplete}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="UserLifeCoachAppointments"
      component={UserLifeCoachAppointments}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="UserLifeCoachDetails"
      component={UserLifeCoachDetails}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="UserLifeCoachBooking"
      component={UserLifeCoachBooking}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
  </Stack.Navigator>
);

const UserWellnessStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="UserWellness"
      component={WellnessScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    {/* UserTherapy section */}
    <Stack.Screen
      name="UserTherapy"
      component={UserTherapyHomeScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="UserTherapyOnboardingFlow1"
      component={UserTherapyOnboardingFlow1}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="UserTherapyOnboardingFlow2"
      component={UserTherapyOnboardingFlow2}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Complete"
      component={Complete}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="UserTherapistDetails"
      component={UserTherapistDetails}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="UserTherapyAppointments"
      component={UserTherapyAppointments}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="UserTherapistBooking"
      component={UserTherapistBooking}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="UserTherapyAppointmentDetails"
      component={UserTherapyAppointDetails}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    {/* lifecoaches begin here */}
    <Stack.Screen
      name="UserLifeCoach"
      component={UserLifeCoachHomeScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="UserLifeCoachOnboardingFlow1"
      component={UserLifeCoachOnboardingFlow1}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="UserLifeCoachOnboardingFlow2"
      component={UserLifeCoachOnboardingFlow2}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="UserLifeCoachComplete"
      component={UserLifeCoachComplete}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="UserLifeCoachAppointments"
      component={UserLifeCoachAppointments}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="UserLifeCoachDetails"
      component={UserLifeCoachDetails}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="UserLifeCoachBooking"
      component={UserLifeCoachBooking}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
  </Stack.Navigator>
);

const UserShopStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="ShopScreen"
      component={ShopScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="ProductDetails"
      component={ProductDetails}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="AddProduct"
      component={AddProduct}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Cart"
      component={CartScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Checkout"
      component={CheckoutScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
  </Stack.Navigator>
);

const ToursStack = ({}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="TourguideScreen"
      component={TourguideHomeScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="TourPlaces"
      component={TourPlacesScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="ToursDetailsScreen"
      component={ToursDetailsScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="TourguideBookingsScreen"
      component={TourguideBookingsScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="TourSuccessScreen"
      component={TourSuccessScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    <Stack.Screen
      name="BookedToursScreen"
      component={BookedToursScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    <Stack.Screen
      name="TourguideAppointments"
      component={TourguideAppointments}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen name="Register" component={RegisterScreen1} />
    <Stack.Screen name="Register2" component={RegisterScreen2} />
    <Stack.Screen
      name="EmailVerification"
      component={EmailVerificationScreen}
    />
    <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    <Stack.Screen name="ResetPassword" component={ResetPassword} />
    <Stack.Screen name="SuccessScreen" component={AccountCreationSuccess} />
  </Stack.Navigator>
);

const BookingsStack = ({}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="BookingScreen"
      component={TravelsLandingScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    {/* Tours and Tourguide section */}
    <Stack.Screen
      name="TourguideScreen"
      component={TourguideHomeScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="TourPlaces"
      component={TourPlacesScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="ToursDetailsScreen"
      component={ToursDetailsScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="TourguideBookingsScreen"
      component={TourguideBookingsScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="TourSuccessScreen"
      component={TourSuccessScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    <Stack.Screen
      name="BookedToursScreen"
      component={BookedToursScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    <Stack.Screen
      name="TourguideAppointments"
      component={TourguideAppointments}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    {/* Flight Booking section */}
    <Stack.Screen
      name="FlightsScreen"
      component={FlightsScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    <Stack.Screen
      name="FlightsListingScreen"
      component={FlightsListingScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    <Stack.Screen
      name="FlightBookingScreen"
      component={FlightBookingScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    {/* Hotels Booking Section */}
    <Stack.Screen
      name="HotelsScreen"
      component={HotelsScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    {/* auth section */}
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen1}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Register2"
      component={RegisterScreen2}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="EmailVerification"
      component={EmailVerificationScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ForgetPassword"
      component={ForgetPassword}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ResetPassword"
      component={ResetPassword}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="SuccessScreen"
      component={AccountCreationSuccess}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="OnboardingFlow1"
      component={OnboardingFlow1}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="OnboardingFlow2"
      component={OnboardingFlow2}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="OnboardingFlow3"
      component={OnboardingFlow3}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="OnboardingFlow4"
      component={OnboardingFlow4}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="OnboardingFlow5"
      component={OnboardingFlow5}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="PreferenceFlow1"
      component={PreferenceFlow1}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const ProfileStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
        headerLeft: () => (
          <View style={{ marginLeft: 10 }}>
            <Ionicons
              name="menu-outline"
              size={30}
              color="#333"
              onPress={() => navigation.navigate("Drawer")}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="ProfileInfo"
      component={ProfileInfo}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
        headerLeft: () => (
          <View style={{ marginLeft: 10 }}>
            <Ionicons
              name="menu-outline"
              size={30}
              color="#333"
              onPress={() => navigation.navigate("Drawer")}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="ProfileInformation"
      component={ProfileInformation}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="BasicProfile"
      component={BasicInformation}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="AdditionalImages"
      component={AdditionalImages}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="AdditionalInformation"
      component={AdditionalInformation}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="UserPreferences"
      component={UserPreferences}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Account"
      component={AccountSettings}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="ChangePassword"
      component={ChangePassword}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="PasswordResetSuccess"
      component={PasswordResetSuccess}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Bookings"
      component={Bookings}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Wallet"
      component={WalletScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Cart"
      component={CartScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Checkout"
      component={CheckoutScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Support"
      component={SupportScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Blog"
      component={BlogScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="BlogDetails"
      component={BlogDetailsScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
  </Stack.Navigator>
);

const StringsStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="StringsScreen"
      component={StringsScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="StringsProfile"
      component={StringsProfileScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="StringsFriendRequest"
      component={StringsFriendRequest}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="StringsMessagingScreen"
      component={StringsMessagingScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    <Stack.Screen
      name="StringsChattingScreen"
      component={StringsChattingScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    {/* strings preferences */}
    <Stack.Screen
      name="PreferenceFlow1"
      component={PreferenceFlow1}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="PreferenceFlow2"
      component={PreferenceFlow2}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const FeedsStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="FeedsScreen"
      component={FeedsScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
  </Stack.Navigator>
);

const GridsStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="GridsScreen"
      component={GridsScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    <Stack.Screen
      name="AddFeedScreen"
      component={AddFeedScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    <Stack.Screen
      name="ReviewFeedScreen"
      component={ReviewFeedScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    <Stack.Screen
      name="Auth"
      component={AuthStack}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    <Stack.Screen
      name="StringsStack"
      component={StringsStack}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    {/* Auth section */}
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen1}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen name="Register2" component={RegisterScreen2} />
    <Stack.Screen
      name="EmailVerification"
      component={EmailVerificationScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ForgetPassword"
      component={ForgetPassword}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ResetPassword"
      component={ResetPassword}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="SuccessScreen"
      component={AccountCreationSuccess}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="OnboardingFlow1"
      component={OnboardingFlow1}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="OnboardingFlow2"
      component={OnboardingFlow2}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="OnboardingFlow3"
      component={OnboardingFlow3}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="OnboardingFlow4"
      component={OnboardingFlow4}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="OnboardingFlow5"
      component={OnboardingFlow5}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="PreferenceFlow1"
      component={PreferenceFlow1}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const MainScreen = () => {
  const state = useSelector((state) => state);
  const loggedInUserRole = state?.user?.userRole;
  const userProfle = state?.user?.user?.profile;
  const reduxStringsLandingPage = state?.user?.stringsLandingPage;
  const reduxWellnessLandingPage = state?.user?.wellnessLandingPage;

  const { theme } = useTheme();

  console.log("loggedInUserRole", loggedInUserRole, userProfle, theme);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarStyle: ((route) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "";
          const routeWithNoTarBar = [
            "Details",
            "EditProfile",
            "ChangePassword",
            "PasswordResetSuccess",
            "PaymentMethod",
            "AddPaymentCard",
            "OrderSummary",
            "OrderSuccessful",
            "OrderReceipt",
            "Bookings",

            "Booking",
            "Subscription",
            "GiftCardDetails",
            "Wallet",

            // UserTherapy sections
            "UserTherapyOnboardingFlow1",
            "UserTherapyOnboardingFlow2",
            "Complete",
            "UserTherapistDetails",
            "UserTherapistBooking",
            "UserTherapyAppointmentDetails",
            "UserTherapyAppointments",

            // Shop section
            "ProductDetails",
            "AddProduct",
            "Cart",
            "Checkout",

            // UserLifecoach section
            "UserLifeCoachOnboardingFlow1",
            "UserLifeCoachOnboardingFlow2",
            "Complete",
            "UserLifeCoachDetails",
            "UserLifeCoachBooking",
            "UserLifeCoachAppointments",

            // tourguide section
            "ToursDetailsScreen",
            "TourguideBookingsScreen",
            "TourSuccessScreen",

            // Profiles section
            "SchedulingScreen",
            "EditAppointmentDates",

            // Strings section
            "StringsProfile",
            "StringsChattingScreen",

            // Bookings
            "FlightsScreen",
            "FlightBookingScreen",
            "FlightsListingScreen",

            // Auth section
            "OnboardingFlow1",
            "OnboardingFlow2",
            "OnboardingFlow3",
            "OnboardingFlow4",
            "OnboardingFlow5",
            "PreferenceFlow1",
            "PreferenceFlow2",
            "EmailVerification",
            "ForgetPassword",

            // User Profile Section
            "AdditionalImages",
            "ProfileInformation",
            "BasicProfile",
            "AdditionalInformation",
            "UserPreferences",
          ];
          if (routeWithNoTarBar.includes(routeName)) {
            return { display: "none" };
          }
          return {
            backgroundColor: theme.background,
            borderTopColor: theme.background,
          };
        })(route),
        tabBarActiveTintColor: COLORS.rendezvousRed,
        tabBarColor: COLORS.rendezvousRed,
        tabBarInActiveBackgroundColor: COLORS.rendezvousRed,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({ route }) => ({
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" color={color} size={26} />
          ),
          headerShown: false,
        })}
      />

      {/* <Tab.Screen
        name="Feeds"
        component={FeedsStack}
        options={{
          tabBarLabel: 'Grids',
          tabBarIcon: ({color}) => (
            <Ionicons name="layers-outline" color={color} size={26} />
          ),
          headerShown: false,
        }}
      /> */}

      <Tab.Screen
        name="Grids"
        component={GridsStack}
        options={{
          tabBarLabel: "Grids",
          tabBarIcon: ({ color }) => (
            <Ionicons name="layers-outline" color={color} size={20} />
          ),
          headerShown: false,
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleStyle: {
            color: "#ccc",
          },
        }}
      />

      <Tab.Screen
        name="Strings"
        component={
          !reduxStringsLandingPage
            ? StringsLandingScreen
            : userProfle
            ? StringsStack
            : AuthStack
        }
        options={{
          tabBarLabel: "Strings",
          tabBarIcon: ({ focused }) => (
            // <Ionicons name="contract-outline" color={color} size={26} />
            <Image
              source={
                focused
                  ? require("../assets/stringsActive.png")
                  : require("../assets/strings.png")
              }
              style={{ width: 20, height: 20 }}
            />
          ),
          headerShown: false,
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleStyle: {
            color: "#ccc",
          },
        }}
      />

      <Tab.Screen
        name="Therapy"
        component={
          !reduxWellnessLandingPage
            ? WellnessLandingPage
            : userProfle
            ? UserWellnessStack
            : AuthStack
        }
        options={{
          tabBarLabel: "Wellness",
          tabBarIcon: ({ focused }) => (
            // <Ionicons name="medical-outline" color={color} size={26} />
            <Image
              source={
                focused
                  ? require("../assets/wellness.png")
                  : require("../assets/wellnessInactive.png")
              }
              style={{ width: 20, height: 20 }}
            />
          ),
          headerShown: false,
        }}
      />

      {/* <Tab.Screen
        name="LifeCoach"
        component={loggedInUserRole ? UserLifeCoachStack : AuthStack}
        options={{
          tabBarLabel: 'LifeCoach',
          tabBarIcon: ({color}) => (
            <Ionicons name="body-outline" color={color} size={26} />
          ),
          headerShown: false,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: {
            color: '#ccc',
          },
        }}
      /> */}

      {/* <Tab.Screen
        name="Tours"
        component={loggedInUserRole ? ToursStack : AuthStack}
        options={{
          tabBarLabel: 'Tours',
          tabBarIcon: ({color}) => (
            <Ionicons name="trail-sign-outline" color={color} size={26} />
          ),
          headerShown: false,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: {
            color: '#ccc',
          },
        }}
      /> */}

      <Tab.Screen
        name="Bookings"
        component={BookingsStack}
        // component={userProfle ? BookingsStack : AuthStack}
        options={{
          tabBarLabel: "Bookings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="receipt-outline" color={color} size={20} />
          ),
          headerShown: false,
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleStyle: {
            color: "#ccc",
          },
        }}
      />

      <Tab.Screen
        name="Shop"
        component={UserShopStack}
        options={{
          tabBarLabel: "Store",
          tabBarIcon: ({ focused }) => (
            // <Ionicons name="basket-outline" color={color} size={26} />
            <Image
              source={
                focused
                  ? require("../assets/shopActive.png")
                  : require("../assets/shop.png")
              }
              style={{ width: 20, height: 20 }}
            />
          ),
          headerShown: false,
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleStyle: {
            color: "#ccc",
          },
        }}
      />

      {/* {loggedInUserRole == 'User' && (
        <Tab.Screen
          name="Strings"
          component={StringsScreen}
          options={{
            tabBarLabel: 'Strings',
            tabBarIcon: ({color}) => (
              <Ionicons name="options-outline" color={color} size={26} />
            ),
            headerShown: false,
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              color: '#ccc',
            },
          }}
        />
      )} */}

      {/* <Tab.Screen
        name={loggedInUserRole ? 'Profile' : 'Login'}
        component={loggedInUserRole ? ProfileStack : LoginScreen}
        options={{
          tabBarLabel: loggedInUserRole ? 'Profile' : 'Login',
          tabBarIcon: ({color}) =>
            loggedInUserRole ? (
              <Ionicons name="person-outline" color={color} size={26} />
            ) : (
              <Ionicons name="options-outline" color={color} size={26} />
            ),
          headerShown: false,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: {
            color: '#ccc',
          },
        }}
      /> */}

      {/* {loggedInUserRole == "Therapist" && (
        <Tab.Screen
          name="Clients"
          component={
            loggedInUserRole == "User" ? ProfileStack : TherapistProfileStack
          }
          options={({ route }) => ({
            tabBarLabel: "My Clients",
            tabBarIcon: ({ color }) => (
              <Ionicons name="people-outline" color={color} size={26} />
            ),
            headerShown: false,
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              color: "#ccc",
              fontFamily: "ClashDisplay-Bold",
            },
          })}
        />
      )} */}
      {/* <Tab.Screen
        name={
          loggedInUserRole == "User" ? "ProfileStack" : "TherapistProfileStack"
        }
        component={
          loggedInUserRole == "User" ? ProfileStack : TherapistProfileStack
        }
        options={({ route }) => ({
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" color={color} size={26} />
          ),
          headerShown: false,
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleStyle: {
            color: "#ccc",
            fontFamily: "ClashDisplay-Bold",
          },
        })}
      />  */}
    </Tab.Navigator>
  );
};

export default MainScreen;
