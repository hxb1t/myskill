import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useVideoPlayer, VideoView } from "expo-video"; // Added for video preview
import { useRef, useState } from "react";
import {
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

export default function UploadVideoScreen({ navigation }) {
  const [videoUri, setVideoUri] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [contentHtml, setContentHtml] = useState("");

  const richText = useRef();

  const player = useVideoPlayer(videoUri, (player) => {
    player.loop = false;
    player.muted = false;
  });

  const pickVideo = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setVideoUri(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
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
  };

  const handlePostArticle = () => {
    navigation.goBack();
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
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color={theme.colors.text}
              />
            </TouchableOpacity>
            <AppText style={styles.headerTitle} weight="bold">
              Upload Video
            </AppText>
            <View style={{ width: 40 }} />
          </View>

          <View style={styles.inputGroup}>
            <AppText style={styles.label}>Select Video</AppText>
            {videoUri ? (
              <View>
                <VideoView
                  player={player}
                  style={styles.videoPreview}
                  nativeControls={true}
                  allowsFullscreen={true}
                />

                <TouchableOpacity onPress={pickVideo} style={styles.changeBtn}>
                  <Ionicons
                    name="refresh"
                    size={16}
                    color={theme.colors.primary}
                  />
                  <AppText style={styles.changeBtnText} weight="bold">
                    Change Video
                  </AppText>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.uploadPlaceholder}
                onPress={pickVideo}
              >
                <View style={styles.placeholderContent}>
                  <Ionicons
                    name="videocam-outline"
                    size={40}
                    color={"#A0AEC0"}
                  />
                  <AppText style={styles.placeholderText}>
                    Tap to select a video
                  </AppText>
                </View>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.inputGroup}>
            <AppText style={styles.label}>Upload Thumbnail</AppText>
            <TouchableOpacity
              style={styles.uploadPlaceholder}
              onPress={pickImage}
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
            <AppTextInput label="Title" />
          </View>

          <View style={[styles.inputGroup, { flex: 1 }]}>
            <AppText style={styles.label}>Description</AppText>

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
                onChange={(descriptionText) => setContentHtml(descriptionText)}
                placeholder="Write your video description here..."
                style={styles.richTextEditorStyle}
                initialHeight={250}
              />
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.button} onPress={handlePostArticle}>
              <AppText style={styles.buttonText} weight="bold">
                Publish Video
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
  },

  uploadPlaceholder: {
    height: 200,
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
  uploadedVideo: {
    width: "100%",
    height: "100%",
  },

  richTextContainer: {
    borderRadius: theme.borderRadius.m,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  richTextToolbar: {
    backgroundColor: "#F7FAFC",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  richTextEditorStyle: {
    backgroundColor: theme.colors.surface,
  },

  footer: { padding: theme.spacing.l, paddingBottom: theme.spacing.xl },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 16,
    borderRadius: theme.borderRadius.m,
    alignItems: "center",
  },
  buttonText: { color: theme.colors.surface, fontSize: 16 },
  videoPreview: {
    width: "100%",
    height: 220,
    borderRadius: theme.borderRadius.m,
    overflow: "hidden",
    backgroundColor: "#000", // Keeps the box black while loading
  },
  changeBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 6,
  },
  changeBtnText: {
    color: theme.colors.primary,
    fontSize: 14,
  },
});
