export const checkUserProfile = async (dispatch, getUser, axiosInstance) => {
  try {
    const profileResponse = await axiosInstance({
      url: "profile/private",
      method: "GET",
    });

    if (profileResponse?.data?.data && profileResponse?.data?.data?.profile) {
      dispatch(getUser(profileResponse?.data?.data));
    } else {
      // navigation.navigate("OnboardingFlow1");
    }
  } catch (error) {
    console.log("checkUserProfile check error:", error);
    // navigation.navigate("OnboardingFlow1");
  }
};

export const checkUserPreferences = async (
  axiosInstance,
  userId,
  dispatch,
  saveUserPreferences
) => {
  try {
    const preferenceResponse = await axiosInstance({
      url: `matchmaking/preference/${userId}`,
      method: "GET",
    });

    if (preferenceResponse?.data) {
      console.log("checkUserPreferences res", preferenceResponse?.data);
      dispatch(saveUserPreferences(preferenceResponse?.data));
    }
  } catch (error) {
    console.log("User preference check error:", error);
  }
};
