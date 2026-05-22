import { useContext, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import { theme } from "../constants/theme";
import { AuthContext } from "../context/AuthContext";
import authService from "../services/auth.service";

export default function LoginScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { accessToken } = await authService.login(username, password);
      if (accessToken) {
        await login(accessToken);
      } else {
        setError("Login failed");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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

        {error ? <AppText style={styles.errorText}>{error}</AppText> : null}

        <AppTextInput
          label="Username"
          placeholder="johndoeusr"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <AppTextInput
          label="Password"
          placeholder="*************"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={theme.colors.surface} />
          ) : (
            <AppText style={styles.buttonText} weight="bold">
              Login
            </AppText>
          )}
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
  button: {
    backgroundColor: theme.colors.primary,
    padding: 16,
    borderRadius: theme.borderRadius.m,
    alignItems: "center",
    marginTop: theme.spacing.m,
  },
  buttonText: { color: theme.colors.surface, fontSize: 16 },
  buttonDisabled: {
    opacity: 0.7,
  },
  errorText: {
    color: "#ff3333",
    textAlign: "center",
    marginBottom: theme.spacing.m,
  },
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
