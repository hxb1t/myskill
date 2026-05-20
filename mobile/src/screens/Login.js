import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppTextInput from "../components/AppTextInput";
import { theme } from "../constants/theme";

export default function LoginScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}></View>
        <Text style={styles.title}>Welcome to MySkill</Text>

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
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.footerLink}>Register here</Text>
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
    fontWeight: "bold",
    color: theme.colors.text,
    textAlign: "center",
    marginBottom: theme.spacing.xl,
  },
  label: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
    fontWeight: "500",
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 16,
    borderRadius: theme.borderRadius.m,
    alignItems: "center",
    marginTop: theme.spacing.m,
  },
  buttonText: { color: theme.colors.surface, fontSize: 16, fontWeight: "bold" },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: theme.spacing.xl,
  },
  footerText: { color: theme.colors.textMuted },
  footerLink: { color: theme.colors.primary, fontWeight: "bold" },
});
