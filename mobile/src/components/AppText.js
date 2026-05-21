import { StyleSheet, Text } from "react-native";
import { theme } from "../constants/theme";

export default function AppText({
  style,
  children,
  weight = "regular",
  ...props
}) {
  var fontFamily;
  switch (weight) {
    case "regular":
      fontFamily = "Poppins-Regular";
      break;
    case "bold":
      fontFamily = "Poppins-Bold";
      break;
    case "medium":
      fontFamily = "Poppins-Medium";
  }

  return (
    <Text style={[styles.defaultText, { fontFamily }, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  defaultText: {
    color: theme.colors.text,
    fontSize: 14,
  },
});
