import { ActivityIndicator, SafeAreaView } from "react-native";
import { theme } from "../constants/theme";

export default function Loading({ container }) {
  return (
    <SafeAreaView
      style={[container, { justifyContent: "center", alignItems: "center" }]}
    >
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </SafeAreaView>
  );
}
