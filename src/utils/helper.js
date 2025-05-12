export const checkPointFromLogin = (navigation, userData, item = {}) => {
  if (userData && item?.destination) {
    navigation.navigate(item?.destination);
  }
};
