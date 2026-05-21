import { Ionicons } from "@expo/vector-icons";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import AppText from "../components/AppText";
import { theme } from "../constants/theme";

export default function ArticleDetailScreen({ navigation }) {
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
          Article
        </AppText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={styles.heroImage}
          />
        </View>

        <AppText style={styles.title} weight="bold">
          Membuat Website menggunakan React.JS
        </AppText>

        <View style={styles.authorRow}>
          <View>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1740252117044-2af197eea287?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
              style={styles.avatar}
            />
          </View>
          <View>
            <AppText style={styles.authorName} weight="bold">
              Alvian Mangalik
            </AppText>
            <AppText style={styles.authorSchool}>SMK Telkom Jakarta</AppText>
          </View>
        </View>

        <AppText style={styles.bodyText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          risus ligula, commodo vel ex in, scelerisque semper tellus. Integer
          quis purus imperdiet, pharetra lorem a, feugiat enim.
          {"\n\n"}
          Vestibulum mollis sapien in eros cursus aliquet. Sed nec quam felis.
          In condimentum mi ac eleifend lobortis.
        </AppText>
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
    height: 200,
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
    backgroundColor: "#000",
    marginRight: theme.spacing.m,
  },
  authorName: { fontSize: 14, color: theme.colors.text },
  authorSchool: { fontSize: 12, color: theme.colors.textMuted },
  bodyText: {
    fontSize: 14,
    textAlign: "left",
    color: theme.colors.text,
    lineHeight: 21,
    marginTop: 5,
  },
});
