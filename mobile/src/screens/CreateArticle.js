import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRef, useState } from "react";
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
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import { theme } from "../constants/theme";

import contentService from "../services/content.service";
import fileService from "../services/file.service";

export default function CreateArticleScreen({ navigation }) {
  const [imageUri, setImageUri] = useState(null);
  const [title, setTitle] = useState("");
  const [contentHtml, setContentHtml] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const richText = useRef();

  const pickImage = async () => {
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
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Image picker error:", error);
    }
  };

  const handlePostArticle = async () => {
    if (!imageUri)
      return Alert.alert(
        "Missing Thumbnail",
        "Please upload a thumbnail image.",
      );
    if (!title.trim())
      return Alert.alert("Missing Title", "Please enter an article title.");
    if (!contentHtml.trim())
      return Alert.alert(
        "Missing Content",
        "Please write some content for your article.",
      );

    setIsSubmitting(true);

    try {
      const uploadResponse = await fileService.uploadFile(imageUri);

      const thumbnailUrl = uploadResponse.url;
      console.log("thumbnailUrl", thumbnailUrl);
      await contentService.createContent({
        title,
        contentHtml,
        thumbnailUrl,
        type: "article",
      });

      Alert.alert("Success", "Your article has been posted!", [
        { text: "Awesome", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert(
        "Upload Failed",
        error.message || "Something went wrong while posting.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
              disabled={isSubmitting}
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color={theme.colors.text}
              />
            </TouchableOpacity>
            <AppText style={styles.headerTitle} weight="bold">
              Create Article
            </AppText>
            <View style={{ width: 40 }} />
          </View>

          <View style={styles.inputGroup}>
            <AppText style={styles.label}>Upload Thumbnail</AppText>
            <TouchableOpacity
              style={styles.uploadPlaceholder}
              onPress={pickImage}
              disabled={isSubmitting}
            >
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  style={styles.uploadedImage}
                />
              ) : (
                <View style={styles.placeholderContent}>
                  <Ionicons name="image-outline" size={40} color={"#A0AEC0"} />
                  <AppText style={styles.placeholderText}>
                    Tap to upload thumbnail
                  </AppText>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <AppTextInput
              label="Title"
              placeholder="Enter article title..."
              value={title}
              onChangeText={setTitle}
              editable={!isSubmitting}
            />
          </View>

          <View style={[styles.inputGroup, { flex: 1 }]}>
            <AppText style={styles.label}>Content</AppText>

            <View style={styles.richTextContainer}>
              <RichToolbar
                editor={richText}
                selectedIconTint={theme.colors.primary}
                iconTint="#000000"
                actions={[
                  actions.setBold,
                  actions.setItalic,
                  actions.setUnderline,
                  actions.insertBulletsList,
                  actions.insertOrderedList,
                ]}
                style={styles.richTextToolbar}
              />
              <RichEditor
                ref={richText}
                onChange={(text) => setContentHtml(text)}
                placeholder="Write your article here..."
                style={styles.richTextEditorStyle}
                initialHeight={250}
                useContainer={true}
              />
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.button, isSubmitting && styles.buttonDisabled]}
              onPress={handlePostArticle}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color={theme.colors.surface} />
              ) : (
                <AppText style={styles.buttonText} weight="bold">
                  Post Article
                </AppText>
              )}
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
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
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
  content: { padding: theme.spacing.l, flexGrow: 1 },
  inputGroup: { marginBottom: theme.spacing.l },
  label: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
    fontWeight: "600",
  },

  uploadPlaceholder: {
    height: 180,
    backgroundColor: "#e8ebef",
    borderRadius: theme.borderRadius.m,
    overflow: "hidden",
  },
  placeholderContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    marginTop: 8,
    color: "#718096",
    fontSize: 14,
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  richTextContainer: {
    borderRadius: theme.borderRadius.m,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flex: 1,
  },
  richTextToolbar: {
    backgroundColor: "#F7FAFC",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  richTextEditorStyle: {
    backgroundColor: theme.colors.surface,
    flex: 1,
  },

  footer: { paddingBottom: theme.spacing.xl, paddingTop: theme.spacing.m },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 16,
    borderRadius: theme.borderRadius.m,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: { color: theme.colors.surface, fontSize: 16 },
});
