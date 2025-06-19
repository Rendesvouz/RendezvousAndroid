import React from 'react';

import {useDispatch, useSelector} from 'react-redux';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import AuthStack from './AuthNavigator';
import AppNavigation from './AppNavigator';

const MainNavigator = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  const loggedInUser = state?.user?.user;
  console.log('logged', loggedInUser);

  return <>{loggedInUser ? <AppNavigation /> : <AuthStack />}</>;
};

export default MainNavigator;
