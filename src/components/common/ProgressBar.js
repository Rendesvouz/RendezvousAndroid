import { View } from "react-native";
import { COLORS } from "../../themes/themes";

const ProgressBar = ({ progress }) => (
  <View
    style={{
      flexDirection: "row",
      height: 4,
      width: "50%",
      backgroundColor: "#e0e0e0",
      borderRadius: 5,
    }}
  >
    <View
      style={{
        height: "100%",
        width: `${progress}%`,
        backgroundColor: COLORS.rendezvousRed,
        borderRadius: 5,
      }}
    />
  </View>
);

export default ProgressBar;
