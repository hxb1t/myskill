import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import { theme } from "../constants/theme";

export default function RegisterScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/myskill-icon.png")}
              style={styles.icon}
            />
          </View>
          <AppText style={styles.title} weight="bold">
            Create your Account
          </AppText>

          <AppTextInput
            label="Fullname"
            weightLabel="medium"
            placeholder="John Doe"
          />
          <AppTextInput
            label="School Name"
            weightLabel="medium"
            placeholder="Binus University"
          />
          <AppTextInput
            label="Username"
            weightLabel="medium"
            placeholder="johndoe123"
            autoCapitalize="none"
          />
          <AppTextInput
            label="Password"
            weightLabel="medium"
            placeholder="*************"
            secureTextEntry={true}
          />
          <AppTextInput
            label="Confirm Password"
            weightLabel="medium"
            placeholder="*************"
            secureTextEntry={true}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
          >
            <AppText style={styles.buttonText} weight="bold">
              Register
            </AppText>
          </TouchableOpacity>

          <View style={styles.footer}>
            <AppText style={styles.footerText}>
              Already have an account?{" "}
            </AppText>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <AppText style={styles.footerLink} weight="bold">
                Login here
              </AppText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },

  contentContainer: {
    flexGrow: 1,
    padding: theme.spacing.l,
    justifyContent: "center",
    paddingBottom: theme.spacing.xl,
  },

  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.xl,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: theme.spacing.s,
    marginTop: theme.spacing.xl,
  },
  title: {
    fontSize: 24,
    color: theme.colors.text,
    textAlign: "center",
    marginBottom: theme.spacing.m,
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
