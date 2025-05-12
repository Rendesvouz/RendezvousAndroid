import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import HeaderTitle from "../../components/common/HeaderTitle";
import ScrollViewSpace from "../../components/common/ScrollViewSpace";
import SubscriptionCard from "../../components/cards/SubscriptionCard";
import { iosSubscriptionPlans, subscriptionPlans } from "../../data/dummyData";
import { COLORS } from "../../themes/themes";
import axiosInstance from "../../utils/api-client";
import { getUser } from "../../redux/features/user/userSlice";
import { RNToast } from "../../Library/Common";
import IosSubscriptionCard from "../../components/cards/IosSubscriptionCard";

const itemSkus = [
  "com.rendezvouscare.subscription.premium",
  "com.rendezvouscare.subscription.ultimate",
  "com.rendezvouscare.subscription.basic",
];

const isIos = Platform.OS === "ios";

const SubscriptionScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const userProfle = state?.user?.user?.profile;
  console.log("userProfle", userProfle);

  const whichSubscriptionPlan = userProfle?.User?.SubType;

  const [loading, setLoading] = useState(false);
  const [completeLoading, setCompleteLoading] = useState(false);

  const [userSubscriptionPlans, setUserSubscriptionPlans] = useState(
    isIos ? iosSubscriptionPlans : subscriptionPlans
  );
  const [enrichedSubscriptionPlans, setEnrichedSubscriptionPlans] = useState(
    []
  );

  const [selectedPlan, setSelectedPlan] = useState(null);
  console.log("selectedPlan", selectedPlan, userSubscriptionPlans);

  const [appStoreProducts, setAppStoreProducts] = useState([]);
  console.log("appStoreProducts", appStoreProducts);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const getSubscriptionPlans = async () => {
    setLoading(true);
    try {
      const getSubscriptionPlansRes = await axiosInstance({
        url: "subplan/subrole",
        method: "GET",
      });
      const fetchedPlans = Array.isArray(
        getSubscriptionPlansRes?.data?.data?.plans
      )
        ? getSubscriptionPlansRes.data.data.plans
        : [];

      console.log("Fetched Plans:", fetchedPlans);

      const updatedPlans = userSubscriptionPlans.map((plan) => {
        const planName = plan.subType.toLowerCase().trim();

        const matchedPlan = fetchedPlans.find((fetched) => {
          const fetchedName = fetched.name.toLowerCase().trim();
          return (
            fetchedName.includes(planName) || planName.includes(fetchedName)
          );
        });

        console.log("Matched Plan:", matchedPlan);
        return matchedPlan ? { ...plan, id: matchedPlan.id } : plan;
      });

      console.log("Updated Subscription Plans:", updatedPlans);
      setEnrichedSubscriptionPlans(updatedPlans);

      return updatedPlans;
    } catch (error) {
      console.log("getSubscriptionPlans error:", error?.response || error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getIosSubscriptionPlans = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance({
        url: "subplan/subrole",
        method: "GET",
      });

      console.log("Backend subscription plans:", response?.data?.data?.plans);

      const fetchedPlans = Array.isArray(response?.data?.data?.plans)
        ? response?.data?.data?.plans
        : [];

      setUserSubscriptionPlans(fetchedPlans);
      return fetchedPlans; // Return plans so we can use them
    } catch (error) {
      console.log("Error fetching subscription plans:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const completeSubscription = async (subscriptionPlan) => {
    console.log("subscriptionPlan", subscriptionPlan);
    setCompleteLoading(true);
    try {
      await axiosInstance({
        url: "subscription",
        method: "POST",
        data: {
          subscriptionPlanId: selectedPlan?.id
            ? selectedPlan?.id
            : subscriptionPlan?.id,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("completeSubscription res", res?.data);

          RNToast(
            Toast,
            `Great, You have subscribed to the ${res?.data?.data?.subscription?.name} plan`
          );
          setCompleteLoading(false);
          checkUserProfile();
        })
        .catch((err) => {
          console.log("completeSubscription err", err?.response);
          setCompleteLoading(false);
        });
    } catch (error) {
      console.log("completeSubscription error", error?.response);
      setCompleteLoading(false);
    }
  };

  const checkUserProfile = async () => {
    try {
      const profileResponse = await axiosInstance({
        url: "profile/private",
        method: "GET",
      });

      if (profileResponse?.data?.data && profileResponse?.data?.data?.profile) {
        dispatch(getUser(profileResponse?.data?.data));
        navigation.goBack();
      }
    } catch (error) {
      console.log("checkUserProfile check error:", error);
    }
  };

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={"arrow-back-outline"}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        headerTitle={"Available Plans"}
      />

      <ScrollView>
        <Text style={styles.subtitle}>
          We've got a plan that's perfect for you.{" "}
        </Text>
        <Text style={styles.subdescription}>
          You cannot alter your plan or examine costs via the app. Please visit
          our website to upgrade or make changes, as we understand this is not
          ideal.
        </Text>

        {loading ? (
          <Text style={styles.noData}>
            Please wait while we aggregate your subscription data
          </Text>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ padding: 10 }}
          >
            {userSubscriptionPlans?.map((cur, i) => {
              const normalize = (str) =>
                str
                  ?.toLowerCase()
                  .replace(/ plan$/, "")
                  .trim();

              const isCurrentPlan =
                normalize(cur.subType) === normalize(whichSubscriptionPlan);
              const isNilPlan = whichSubscriptionPlan === "nil";
              const isFreeTrial = whichSubscriptionPlan === "free_trial";
              const isSelected = cur.subType === selectedPlan?.subType;
              const isDisabled =
                !isNilPlan &&
                !isFreeTrial &&
                whichSubscriptionPlan &&
                !isCurrentPlan;

              console.log(
                "isCurrentPlan",
                isCurrentPlan,
                isNilPlan,
                isFreeTrial,
                isSelected,
                isDisabled,
                whichSubscriptionPlan
              );

              return (
                <SubscriptionCard
                  key={i}
                  props={cur}
                  borderColor={
                    isCurrentPlan || isSelected
                      ? COLORS.rendezvousRed
                      : COLORS.appGrey4
                  }
                  isSubscribed={isCurrentPlan}
                  onSubscriptionPressed={async () => {
                    completeSubscription(cur);
                  }}
                  onPress={() => !isDisabled && handleSelectPlan(cur)}
                  loading={completeLoading}
                  isDisabled={isDisabled}
                />
              );
            })}
            <ScrollViewSpace />
          </ScrollView>
        )}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ padding: 10 }}
        >
          {/* {enrichedPlans?.map((cur, i) => {
            const isCurrentPlan = cur.subType === whichSubscriptionPlan;
            const isNilPlan = whichSubscriptionPlan === 'nil';
            const isSelected = cur.subType === selectedPlan?.subType;
            const isDisabled =
              !isNilPlan && whichSubscriptionPlan && !isCurrentPlan;

            return (
              <SubscriptionCard
                key={i}
                props={cur}
                borderColor={
                  isCurrentPlan || isSelected
                    ? COLORS.rendezvousRed
                    : COLORS.appGrey4
                }
                isSubscribed={isCurrentPlan}
                onSubscriptionPressed={async () => {
                  // completeSubscription(cur);
                }}
                onPress={() => !isDisabled && handleSelectPlan(cur)}
                loading={loading}
                isDisabled={isDisabled}
              />
            );
          })} */}

          <ScrollViewSpace />
        </ScrollView>
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  subdescription: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 10,
    padding: 20,
  },
  noData: {
    fontWeight: "700",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
});
