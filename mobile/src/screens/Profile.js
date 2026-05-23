import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "../components/AppText";
import { theme } from "../constants/theme";
import { AuthContext } from "../context/AuthContext";
import contentService from "../services/content.service";

export default function ProfileScreen({ navigation, route }) {
  const { logout } = useContext(AuthContext);
  const { fullName, school, username, avatarUrl } = route.params || {};
  const [userContents, setUserContents] = useState([]);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const data = await contentService.getOwnedContents();
        setUserContents(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchContents();
  }, []);

  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.featuredCard}
      onPress={() =>
        item.type === "article"
          ? navigation.navigate("ArticleDetail", {
              contentId: item._id,
            })
          : navigation.navigate("VideoDetail", {
              contentId: item._id,
            })
      }
    >
      <ImageBackground
        source={{ uri: item.thumbnailUrl }}
        style={styles.featuredImagePlaceholder}
        imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
      >
        <View
          style={[
            styles.badge,
            item.type === "article" ? styles.badgeArticle : styles.badgeVideo,
          ]}
        >
          <AppText style={styles.badgeText} weight="bold">
            {item.type}
          </AppText>
        </View>
      </ImageBackground>

      <View style={styles.cardContent}>
        <AppText style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </AppText>

        <View style={styles.authorRow}>
          <Image
            source={{ uri: item.authorId?.avatarUrl }}
            style={styles.avatarSmall}
          />

          <View>
            <AppText style={styles.authorName} weight="bold">
              {item.authorId?.fullName}
            </AppText>
            <AppText style={styles.authorSchool}>
              {item.authorId?.school}
            </AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const showLogoutPopup = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out of your account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: () => logout(),
        },
      ],
    );
  };

  const renderProfileHeader = () => (
    <View>
      <View style={styles.profileHeader}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <AppText style={styles.fullName} weight="bold">
          {fullName || "User Name"}
        </AppText>
        <AppText style={styles.username}>@{username || "username"}</AppText>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <AppText style={styles.infoLabel} weight="bold">
            School
          </AppText>
          <AppText style={styles.infoValue}>{school || "Not Provided"}</AppText>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={showLogoutPopup}>
        <Ionicons name="log-out-outline" size={20} color="#EF4444" />
        <AppText style={styles.logoutText} weight="bold">
          Log Out
        </AppText>
      </TouchableOpacity>

      <AppText style={styles.sectionTitle} weight="bold">
        Your Posts
      </AppText>
    </View>
  );

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

      <FlatList
        data={userContents}
        keyExtractor={(item) => item._id}
        renderItem={renderCard}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderProfileHeader}
        ListEmptyComponent={
          <AppText
            style={{
              textAlign: "center",
              marginTop: 20,
              color: theme.colors.textMuted,
            }}
          >
            No content published yet.
          </AppText>
        }
      />
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
    marginBottom: theme.spacing.l,
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
    marginBottom: theme.spacing.m,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoRow: {
    marginBottom: 0,
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
    marginBottom: theme.spacing.xl,
  },
  logoutText: {
    color: "#EF4444",
    fontSize: 16,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  featuredCard: {
    width: "100%",
    backgroundColor: theme.colors.cardBackground || "#fff",
    borderRadius: theme.borderRadius.m,
    marginBottom: theme.spacing.m,
    overflow: "hidden",
  },
  featuredImagePlaceholder: { height: 140 },
  cardContent: { padding: theme.spacing.m },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    position: "absolute",
    top: 10,
    left: 10,
  },
  badgeArticle: { backgroundColor: theme.colors.primary },
  badgeVideo: { backgroundColor: theme.colors.secondary },
  badgeText: { color: "white", fontSize: 10 },

  authorRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  avatarSmall: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  authorName: { fontSize: 10, fontWeight: "bold", color: theme.colors.text },
  authorSchool: { fontSize: 9, color: theme.colors.textMuted },
});
