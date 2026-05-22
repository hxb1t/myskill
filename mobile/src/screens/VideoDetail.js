import { Ionicons } from "@expo/vector-icons";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import RenderHTML from "react-native-render-html";
import AppText from "../components/AppText";
import Loading from "../components/Loading";
import { theme } from "../constants/theme";
import contentService from "../services/content.service";

export default function VideoDetailScreen({ navigation, route }) {
  const [data, setData] = useState({});
  const { contentId = 0 } = route.params || {};
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContentDetail = async () => {
      try {
        const data = await contentService.getContentDetail(contentId);
        setData(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContentDetail();
  }, []);

  const player = useVideoPlayer(data.videoUrl, (player) => {
    player.loop = true;
  });

  if (loading) {
    return <Loading container={styles.container} />;
  }

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
          Video
        </AppText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View>
          <VideoView
            player={player}
            style={styles.heroImage}
            fullscreenOptions={{ allowFullsreen: true }}
          />
        </View>

        <AppText style={styles.title} weight="bold">
          {data.title}
        </AppText>

        <View style={styles.authorRow}>
          <View>
            <Image
              source={{
                uri: data.authorId.avatarUrl,
              }}
              style={styles.avatar}
            />
          </View>
          <View>
            <AppText style={styles.authorName} weight="bold">
              {data.authorId.fullName}
            </AppText>
            <AppText style={styles.authorSchool}>
              {data.authorId.school}
            </AppText>
          </View>
        </View>

        <RenderHTML
          baseStyle={{
            fontSize: 14,
            textAlign: "left",
            color: theme.colors.text,
            lineHeight: 21,
            marginTop: 5,
          }}
          source={{ html: data.descriptionHtml }}
        />
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
    backgroundColor: theme.colors.backButtonBackground,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { fontSize: 18, color: theme.colors.text },
  content: { padding: theme.spacing.l },
  heroImage: {
    height: 300,
    backgroundColor: "#222",
    borderRadius: theme.borderRadius.m,
    marginBottom: theme.spacing.l,
  },
  title: {
    fontSize: 20,
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
    lineHeight: 28,
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.l,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: theme.spacing.m,
  },
  authorName: { fontSize: 14, color: theme.colors.text },
  authorSchool: { fontSize: 12, color: theme.colors.textMuted },
});
