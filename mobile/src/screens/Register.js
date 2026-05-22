import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
import authService from "../services/auth.service";

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [school, setSchool] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (confirmPassword.length > 0 && text !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    if (text.length > 0 && text !== password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  // 3. API Submission Logic
  const handleRegister = async () => {
    if (!username || !password || !fullName || !school || !confirmPassword) {
      Alert.alert("Error!", "Please fill in all the required fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error!", "Your passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await authService.register(fullName, school, username, password);

      Alert.alert(
        "Registration Successful",
        "Your account has been created. Please log in to continue.",
        [
          {
            text: "Go to Login",
            onPress: () => navigation.navigate("Login"),
          },
        ],
      );
    } catch (error) {
      const errorMessage =
        error.message || "Something went wrong. Please try again.";

      Alert.alert("Registration Failed", errorMessage, [
        { text: "Try Again", style: "cancel" },
      ]);

      console.error("Failed to register:", error);
    } finally {
      setLoading(false);
    }
  };

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
            value={fullName}
            onChangeText={setFullName}
          />
          <AppTextInput
            label="School Name"
            weightLabel="medium"
            placeholder="Binus University"
            value={school}
            onChangeText={setSchool}
          />
          <AppTextInput
            label="Username"
            weightLabel="medium"
            placeholder="johndoe123"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
          />
          <AppTextInput
            label="Password"
            weightLabel="medium"
            placeholder="*************"
            secureTextEntry={true}
            value={password}
            onChangeText={handlePasswordChange}
          />
          <AppTextInput
            label="Confirm Password"
            weightLabel="medium"
            placeholder="*************"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
          />

          {passwordError ? (
            <AppText style={styles.errorText} weight="medium">
              {passwordError}
            </AppText>
          ) : null}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.colors.surface} />
            ) : (
              <AppText style={styles.buttonText} weight="bold">
                Register
              </AppText>
            )}
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
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
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
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: theme.colors.surface,
    fontSize: 16,
  },
  errorText: {
    color: "#ff3333",
    fontSize: 12,
    marginTop: -8,
    marginBottom: theme.spacing.m,
    marginLeft: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: theme.spacing.xl,
  },
  footerText: {
    color: theme.colors.textMuted,
  },
  footerLink: {
    color: theme.colors.primary,
  },
  icon: {
    width: 51,
    height: 51,
    resizeMode: "contain",
  },
});
