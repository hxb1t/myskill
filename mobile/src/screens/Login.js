import { useState } from "react";
import {
    Image,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import { theme } from "../constants/theme";

export default function LoginScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/myskill-icon.png")}
            style={styles.icon}
          />
        </View>
        <AppText style={styles.title} weight="bold">
          Welcome to MySkill
        </AppText>

        <AppTextInput label="Username" placeholder="johndoeusr" />
        <AppTextInput
          label="Password"
          placeholder="*************"
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <AppText style={styles.buttonText} weight="bold">
            Login
          </AppText>
        </TouchableOpacity>

        <View style={styles.footer}>
          <AppText style={styles.footerText}>Don't have an account? </AppText>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <AppText style={styles.footerLink} weight="bold">
              Register here
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { flex: 1, padding: theme.spacing.l, justifyContent: "center" },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.xl,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: theme.spacing.m,
  },
  title: {
    fontSize: 24,
    color: theme.colors.text,
    textAlign: "center",
    marginBottom: theme.spacing.xl,
  },
  label: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 16,
    borderRadius: theme.borderRadius.m,
    alignItems: "center",
    marginTop: theme.spacing.m,
  },
  buttonText: { color: theme.colors.surface, fontSize: 16 },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: theme.spacing.xl,
  },
  footerText: { color: theme.colors.textMuted },
  footerLink: { color: theme.colors.primary },
  icon: {
    width: 51,
    height: 51,
    resizeMode: "contain",
  },
});
