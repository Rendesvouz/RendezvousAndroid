import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: null,
  userRole: null,
  userPreferences: null,
  token: null,
  launchScreen: null,
  accessToken: null,
  refreshToken: null,
  error: null,
  destination: null,
  lastAPIFetchTime: null,
  lastLoginTime: null,
  productCategories: null,
  shopProduct: null,
  cartProducts: [],
  wishlistProducts: [],
  checkoutProducts: [],
  userTherapyPreference: null,
  userTherapists: [],
  userLifeCoachPreference: null,
  userLifeCoaches: [],

  // tours section
  toursLocations: null,

  // therapist section
  therapistProfile: null,
  weeklyAvailability: {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    saveUserRole: (state, action) => {
      state.userRole = action.payload;
    },
    saveUserPreferences: (state, action) => {
      state.userPreferences = action.payload;
    },
    saveAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    saveRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    saveLaunchScreen: (state, action) => {
      state.launchScreen = action.payload;
    },
    saveLoginTime: (state, action) => {
      state.lastLoginTime = action.payload;
    },
    setLoading: (state, action) => {
      state.loading =
        action.payload?.loading !== undefined
          ? action.payload?.loading
          : state.loading;
    },
    signOut: (state, action) => {
      state.user = null;
      state.userToken = null;
      state.userRole = null;
      state.userPreferences = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.lastLoginTime = null;
      state.userTherapyPreference = null;
      state.userLifeCoachPreference = null;
      state.cartProducts = [];
      state.wishlistProducts = [];
      // state.shopProduct = null;
      // state.productCategories = null;
      state.checkoutProducts = [];

      // therapist section
      state.weeklyAvailability = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
      };
    },
    setUserDestination: (state, action) => {
      state.destination = action.payload;
    },
    APILastFetchTime: (state, action) => {
      state.lastAPIFetchTime = action.payload;
    },
    saveProductCatgeories: (state, action) => {
      state.productCategories = action.payload;
    },
    saveShopProducts: (state, action) => {
      state.shopProduct = action.payload;
    },
    saveProductToCart: (state, action) => {
      state.cartProducts = [...state.cartProducts, action.payload];
    },
    clearCartStore: (state, action) => {
      state.cartProducts = [];
      state.checkoutProducts = [];
    },

    saveCheckoutProducts: (state, action) => {
      state.checkoutProducts = action.payload;
    },
    removeProductFromCart: (state, action) => {
      const updatedSavedItems = state.cartProducts.filter(
        (item) => item.id !== action.payload.id
      );

      state.cartProducts = updatedSavedItems;
    },
    saveProductToWishList: (state, action) => {
      state.wishlistProducts = [...state.wishlistProducts, action.payload];
    },
    removeProductFromWishlist: (state, action) => {
      const updatedSavedItems = state.wishlistProducts.filter(
        (item) => item.id !== action.payload.id
      );

      state.wishlistProducts = updatedSavedItems;
    },
    saveUserTherapyPreference: (state, action) => {
      state.userTherapyPreference = action.payload;
    },
    saveUserTherapists: (state, action) => {
      state.userTherapists = action.payload;
    },
    saveUserLifeCoachPreference: (state, action) => {
      state.userLifeCoachPreference = action.payload;
    },
    saveUserLifeCoaches: (state, action) => {
      state.userLifeCoaches = action.payload;
    },

    // therapist section
    saveTherapistProfile: (state, action) => {
      state.therapistProfile = action.payload;
    },
    updateWeeklyAvailability: (state, action) => {
      console.log("acccc", action.payload);
      const { day, times } = action.payload;
      if (state.weeklyAvailability[day]) {
        state.weeklyAvailability[day] = times;
      }
    },

    // tourguide section
    saveTourLocations: (state, action) => {
      state.toursLocations = action.payload;
    },
  },
});

export const {
  getUser,
  saveUserRole,
  saveUserPreferences,
  saveAccessToken,
  saveRefreshToken,
  setLoading,
  saveLaunchScreen,
  signOut,
  registerUser,
  setUserDestination,
  APILastFetchTime,
  saveLoginTime,
  saveProductCatgeories,
  saveShopProducts,
  saveProductToCart,
  removeProductFromCart,
  saveCheckoutProducts,
  saveProductToWishList,
  removeProductFromWishlist,
  saveUserTherapyPreference,
  saveUserTherapists,
  saveUserLifeCoachPreference,
  saveUserLifeCoaches,

  // therapist section
  saveTherapistProfile,
  updateWeeklyAvailability,

  // tourguide
  saveTourLocations,
} = userSlice.actions;
export default userSlice.reducer;
