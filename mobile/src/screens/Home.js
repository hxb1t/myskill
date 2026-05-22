import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "../components/AppText";
import Loading from "../components/Loading";
import { theme } from "../constants/theme";
import contentService from "../services/content.service";
import profileService from "../services/profile.service";

export default function HomeScreen({ navigation }) {
  const [userData, setUserData] = useState({});
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchContents = async () => {
      try {
        const data = await contentService.getContents();
        setData(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    const fetchProfile = async () => {
      try {
        const data = await profileService.getUserProfile();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
    fetchContents();
    setLoading(false);
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
            source={{ uri: item.authorId.avatarUrl }}
            style={styles.avatarSmall}
          />

          <View>
            <AppText style={styles.authorName} weight="bold">
              {item.authorId.fullName}
            </AppText>
            <AppText style={styles.authorSchool}>
              {item.authorId.school}
            </AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <View>
          <AppText style={styles.greeting}>Hello, {userData.fullName}</AppText>
          <AppText style={styles.subtitle} weight="bold">
            Sharpen Your Skills Today!
          </AppText>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Profile", {
              fullName: userData.fullName,
              username: userData.username,
              school: userData.school,
              avatarUrl: userData.avatarUrl,
            })
          }
        >
          <Image
            style={styles.avatarMain}
            source={{
              uri: userData.avatarUrl,
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: theme.colors.primary }]}
          onPress={() => navigation.navigate("CreateArticle")}
        >
          <Ionicons name="document-text-outline" size={20} color="white" />
          <Text style={styles.actionBtnText}>Create Article</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.actionBtn,
            { backgroundColor: theme.colors.secondary },
          ]}
          onPress={() => navigation.navigate("UploadVideo")}
        >
          <Ionicons name="videocam-outline" size={20} color="white" />
          <Text style={styles.actionBtnText}>Upload Video</Text>
        </TouchableOpacity>
      </View>

      <AppText style={styles.sectionTitle} weight="bold">
        Discover
      </AppText>
    </>
  );

  if (loading) {
    return <Loading container={styles.container} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={renderCard}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.l,
          paddingBottom: theme.spacing.xl,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: theme.spacing.l,
    paddingTop: theme.spacing.xl,
  },
  greeting: { fontSize: 16, color: theme.colors.textMuted, marginBottom: 4 },
  subtitle: { fontSize: 20, fontWeight: "bold", color: theme.colors.text },
  avatarMain: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  actionRow: {
    flexDirection: "row",
    gap: theme.spacing.m,
    marginBottom: theme.spacing.xl,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 14,
    borderRadius: theme.borderRadius.m,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  actionBtnText: { color: "white", fontWeight: "bold", fontSize: 14 },
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
