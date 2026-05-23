import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
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
import fileService from "../services/file.service";

export default function RegisterScreen({ navigation }) {
  const [avatarUri, setAvatarUri] = useState(null);
  const [fullName, setFullName] = useState("");
  const [school, setSchool] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePickAvatar = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          "Permission Required",
          "Permission to access camera roll is required!",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setAvatarUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Image picker error:", error);
    }
  };

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
      const uploadRes = await fileService.uploadProfilePicture(avatarUri);
      await authService.register(
        fullName,
        school,
        username,
        password,
        uploadRes.url,
      );

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
          <AppText style={styles.title} weight="bold">
            Create your Account
          </AppText>

          <View style={styles.avatarSection}>
            <TouchableOpacity
              onPress={handlePickAvatar}
              disabled={loading}
              style={styles.avatarButton}
            >
              <View style={styles.avatarPlaceholder}>
                {avatarUri ? (
                  <Image
                    source={{ uri: avatarUri }}
                    style={styles.avatarImage}
                  />
                ) : (
                  <Ionicons name="camera-outline" size={32} color="#A0AEC0" />
                )}
              </View>
              <AppText style={styles.avatarText} weight="bold">
                {avatarUri ? "Change Photo" : "Upload Photo"}
              </AppText>
            </TouchableOpacity>
          </View>

          <AppTextInput
            label="Fullname"
            weightLabel="medium"
            placeholder="John Doe"
            value={fullName}
            onChangeText={setFullName}
            editable={!loading}
          />
          <AppTextInput
            label="School Name"
            weightLabel="medium"
            placeholder="Binus University"
            value={school}
            onChangeText={setSchool}
            editable={!loading}
          />
          <AppTextInput
            label="Username"
            weightLabel="medium"
            placeholder="johndoe123"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
            editable={!loading}
          />
          <AppTextInput
            label="Password"
            weightLabel="medium"
            placeholder="*************"
            secureTextEntry={true}
            value={password}
            onChangeText={handlePasswordChange}
            editable={!loading}
          />
          <AppTextInput
            label="Confirm Password"
            weightLabel="medium"
            placeholder="*************"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            editable={!loading}
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
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              disabled={loading}
            >
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
    marginTop: theme.spacing.l,
  },

  avatarSection: {
    alignItems: "center",
    marginBottom: theme.spacing.l,
    marginTop: theme.spacing.m,
  },
  avatarButton: {
    alignItems: "center",
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "#CBD5E1",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  avatarText: {
    color: theme.colors.primary,
    fontSize: 14,
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
