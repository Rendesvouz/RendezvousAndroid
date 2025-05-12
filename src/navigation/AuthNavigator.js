import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen1 from "../screens/auth/RegisterScreen1";
import RegisterScreen2 from "../screens/auth/RegisterScreen2";
import VideoVerificationScreen from "../screens/auth/VideoVerificationScreen";
import EmailVerificationScreen from "../screens/auth/EmailVerification";
import ForgetPassword from "../screens/auth/ForgotPassword";
import ResetPassword from "../screens/auth/ResetPassword";
import AccountCreationSuccess from "../screens/auth/AccountCreationSuccess";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState } from "react-native";
import OnboardingScreen from "../screens/auth/OnboardingScreen";
import OnboardingFlow1 from "../screens/OnboardingProcesses/User/OnboardingFlow1";
import OnboardingFlow2 from "../screens/OnboardingProcesses/User/OnboardingFlow2";
import OnboardingFlow3 from "../screens/OnboardingProcesses/User/OnboardingFlow3";
import OnboardingFlow4 from "../screens/OnboardingProcesses/User/OnboardingFlow4";
import OnboardingFlow5 from "../screens/OnboardingProcesses/User/OnboardingFlow5";
import PreferenceFlow2 from "../screens/OnboardingProcesses/User/Preferences/PreferenceFlow2";
import PreferenceFlow1 from "../screens/OnboardingProcesses/User/Preferences/PreferenceFlow1";
import TherapistOnboardingFlow1 from "../screens/OnboardingProcesses/Therapist/TherapistOnboardingFlow1";
import TherapistOnboardingFlow2 from "../screens/OnboardingProcesses/Therapist/TherapistOnboardingFlow2";
import TherapistOnboardingFlow3 from "../screens/OnboardingProcesses/Therapist/TherapistOnboardingFlow3";
import TherapistOnboardingFlow4 from "../screens/OnboardingProcesses/Therapist/TherapistOnboardingFlow4";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const state = useSelector((state) => state);
  const reduxLaunchScreen = state?.user?.launchScreen;

  const [loading, setLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // To show the onboarding screen on just first launch
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      AsyncStorage.getItem("alreadyLaunched").then((value) => {
        console.log("launchVal", value);
        if (value === null) {
          AsyncStorage.setItem("alreadyLaunched", "true");
          setIsFirstLaunch(true);
          console.log("isFirstLaunch");
        } else {
          setIsFirstLaunch(false);
          console.log("notIsFirstLaunch");
        }
      });

      AppState.addEventListener("change", (state) =>
        console.log("AppState changed to", state)
      );
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setLoading(reduxLaunchScreen);
    setIsFirstLaunch(false);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [reduxLaunchScreen]);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {loading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen1} />
            <Stack.Screen name="Register2" component={RegisterScreen2} />
            <Stack.Screen
              name="EmailVerification"
              component={EmailVerificationScreen}
            />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen
              name="SuccessScreen"
              component={AccountCreationSuccess}
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

            <Stack.Screen
              name="PreferenceFlow2"
              component={PreferenceFlow2}
              options={{
                headerShown: false,
              }}
            />

            {/* for therapist onboarding */}
            <Stack.Screen
              name="TherapistOnboardingFlow1"
              component={TherapistOnboardingFlow1}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="TherapistOnboardingFlow2"
              component={TherapistOnboardingFlow2}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="TherapistOnboardingFlow3"
              component={TherapistOnboardingFlow3}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="TherapistOnboardingFlow4"
              component={TherapistOnboardingFlow4}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    );
  }
};

export default AuthStack;
