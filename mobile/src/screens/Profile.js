import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import AppText from "../components/AppText";
import { theme } from "../constants/theme";

export default function ProfileScreen({ navigation }) {
  const [userData] = useState({
    avatarUri:
      "https://images.unsplash.com/photo-1772371272152-d1806d4351e0?q=80&w=880&auto=format&fit=crop",
    fullName: "John Doe",
    username: "johndoe123",
    school: "Binus University",
  });

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out of your account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle} weight="bold">
          Profile
        </AppText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <Image source={{ uri: userData.avatarUri }} style={styles.avatar} />
          <AppText style={styles.fullName} weight="bold">
            {userData.fullName}
          </AppText>
          <AppText style={styles.username}>@{userData.username}</AppText>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <AppText style={styles.infoLabel} weight="bold">
              School / University
            </AppText>
            <AppText style={styles.infoValue}>{userData.school}</AppText>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            <AppText style={styles.logoutText} weight="bold">
              Log Out
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing.m,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.backButtonBackground || "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    color: theme.colors.text,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.l,
    paddingBottom: theme.spacing.xl,
  },

  profileHeader: {
    alignItems: "center",
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.xl,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#E2E8F0",
    marginBottom: theme.spacing.m,
  },
  fullName: {
    fontSize: 22,
    color: theme.colors.text,
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: theme.colors.textMuted,
  },

  infoCard: {
    backgroundColor: theme.colors.surface || "#FFFFFF",
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.l,
    marginBottom: theme.spacing.xl,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoRow: {
    marginBottom: theme.spacing.s,
  },
  infoLabel: {
    fontSize: 13,
    color: theme.colors.textMuted,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border || "#F1F5F9",
    marginVertical: theme.spacing.m,
  },

  footer: {
    marginTop: "auto",
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    padding: 16,
    borderRadius: theme.borderRadius.m,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  logoutText: {
    color: "#EF4444",
    fontSize: 16,
  },
});
