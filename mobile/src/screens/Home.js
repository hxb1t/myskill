import { Ionicons } from "@expo/vector-icons";
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
import { theme } from "../constants/theme";

const FEATURED_DATA = [
  {
    id: "1",
    title: "Membuat Website menggunakan React.JS",
    type: "Article",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Alvian Mangalik",
    authorAvatarUrl:
      "https://images.unsplash.com/photo-1740252117044-2af197eea287?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    school: "SMK Telkom Jakarta",
  },
  {
    id: "2",
    title: "Application Deployments",
    type: "Video",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1667372335962-5fd503a8ae5b?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    authorAvatarUrl:
      "https://images.unsplash.com/photo-1740252117044-2af197eea287?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Alvian Mangalik",
    school: "SMK Telkom Jakarta",
  },
  {
    id: "3",
    title: "Membuat Website menggunakan React.JS",
    type: "Article",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Alvian Mangalik",
    authorAvatarUrl:
      "https://images.unsplash.com/photo-1740252117044-2af197eea287?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    school: "SMK Telkom Jakarta",
  },
  {
    id: "4",
    title: "Application Deployments",
    type: "Video",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1667372335962-5fd503a8ae5b?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    authorAvatarUrl:
      "https://images.unsplash.com/photo-1740252117044-2af197eea287?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Alvian Mangalik",
    school: "SMK Telkom Jakarta",
  },
];

export default function HomeScreen({ navigation }) {
  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.featuredCard}
      onPress={() =>
        item.type === "Article"
          ? navigation.navigate("ArticleDetail")
          : navigation.navigate("VideoDetail")
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
            item.type === "Article" ? styles.badgeArticle : styles.badgeVideo,
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
            source={{ uri: item.authorAvatarUrl }}
            style={styles.avatarSmall}
          />

          <View>
            <AppText style={styles.authorName} weight="bold">
              {item.author}
            </AppText>
            <AppText style={styles.authorSchool}>{item.school}</AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <View>
          <AppText style={styles.greeting}>Hello, John Doe!</AppText>
          <AppText style={styles.subtitle} weight="bold">
            Sharpen Your Skills Today!
          </AppText>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
          <Image
            style={styles.avatarMain}
            source={{
              uri: "https://images.unsplash.com/photo-1772371272152-d1806d4351e0?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={FEATURED_DATA}
        keyExtractor={(item) => item.id}
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
