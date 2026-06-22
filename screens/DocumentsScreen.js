import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Pressable,
  Alert,
  Linking,
  Share,
  Platform,
} from "react-native";

import * as Sharing from "expo-sharing";
import * as Clipboard from "expo-clipboard";

import styles from "../styles/DocumentsScreenStyles";
import { useDocuments } from "../context/DocumentsContext";

function DocumentButton({ label, primary = false, onPress }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      android_ripple={{
        color: primary
          ? "rgba(255, 255, 255, 0.25)"
          : "rgba(38, 50, 56, 0.15)",
      }}
      style={({ pressed }) => [
        primary ? styles.linkButton : styles.secondaryButton,
        {
          minHeight: 58,
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          backgroundColor: pressed
            ? primary
              ? "#314A42"
              : "#CBD5D9"
            : hovered
              ? primary
                ? "#3F5A51"
                : "#D8E1E4"
              : primary
                ? "#4F6B62"
                : "#E7ECEE",
          opacity: pressed ? 0.9 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <Text
        style={[
          primary ? styles.linkButtonText : styles.secondaryButtonText,
          {
            color: primary ? "#FFFFFF" : "#31464D",
            fontSize: 17,
            fontWeight: "800",
            textAlign: "center",
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default function DocumentsScreen({ route }) {
  const { categoryId } = route.params;

  const { getCategoryById, savedWithoutCategory } = useDocuments();

  const category = getCategoryById(categoryId);

  const formatFileSize = (size) => {
    if (!size) {
      return "Unknown size";
    }

    if (size < 1024) {
      return `${size} B`;
    }

    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getCloudUrl = (document) => {
    const url = document.shareUrl || document.cloudUrl || "";

    return /^https?:\/\//i.test(url) ? url : "";
  };

  const getBrowserLocalUrl = (document) => {
    const url = document.url || "";

    return url.startsWith("blob:") ? url : "";
  };

  const getNativeFileUri = (document) => {
    const uri = document.localUri || document.uri || "";

    return uri.startsWith("file:") ? uri : "";
  };

  const getExternalUri = (document) => {
    const uri = document.shareUri || "";

    return uri.startsWith("content:") || uri.startsWith("file:")
      ? uri
      : "";
  };

  const openDocument = async (document) => {
    const cloudUrl = getCloudUrl(document);

    if (Platform.OS === "web") {
      const browserUrl = getBrowserLocalUrl(document);
      const target = browserUrl || cloudUrl;

      if (!target) {
        Alert.alert(
          "Document Unavailable",
          "This document has no usable file location."
        );
        return;
      }

      window.open(target, "_blank");
      return;
    }

    const externalUri = getExternalUri(document);
    const target = externalUri || cloudUrl;

    if (!target) {
      Alert.alert(
        "Re-upload Required",
        "This document was saved before secure file access was added. Delete it and upload it again."
      );
      return;
    }

    try {
      await Linking.openURL(target);
    } catch (error) {
      console.error("Open document error:", error);

      Alert.alert(
        "Open Failed",
        "Your device could not find an app that can open this file."
      );
    }
  };

  const shareDocument = async (document) => {
    try {
      const cloudUrl = getCloudUrl(document);

      // Public HTTPS link: works in email, WhatsApp, texts, etc.
      if (cloudUrl) {
        if (Platform.OS === "web") {
          if (
            typeof navigator !== "undefined" &&
            typeof navigator.share === "function"
          ) {
            await navigator.share({
              title: document.name,
              text: `Open ${document.name}`,
              url: cloudUrl,
            });

            return;
          }

          await Clipboard.setStringAsync(cloudUrl);

          Alert.alert(
            "Link Copied",
            "Browser sharing is unavailable, so the document link was copied."
          );

          return;
        }

        await Share.share({
          title: document.name,
          message: `Open ${document.name}\n${cloudUrl}`,
        });

        return;
      }

      if (Platform.OS === "web") {
        Alert.alert(
          "No Shareable Link Yet",
          "This file exists only in this browser. Upload it to cloud storage before sharing it as a link."
        );
        return;
      }

      const nativeFileUri = getNativeFileUri(document);
      const externalUri = getExternalUri(document);

      if (!nativeFileUri) {
        Alert.alert(
          "Re-upload Required",
          "This file was saved before safe Android sharing was added. Delete it and upload it again."
        );
        return;
      }

      const isAvailable = await Sharing.isAvailableAsync();

      if (!isAvailable) {
        Alert.alert(
          "Sharing Unavailable",
          "This device does not support the native share menu."
        );
        return;
      }

      try {
        await Sharing.shareAsync(nativeFileUri, {
          mimeType: document.type || "application/octet-stream",
          dialogTitle: `Share ${document.name}`,
        });

        return;
      } catch (firstError) {
        // Android fallback using File.contentUri.
        if (externalUri && externalUri !== nativeFileUri) {
          await Sharing.shareAsync(externalUri, {
            mimeType: document.type || "application/octet-stream",
            dialogTitle: `Share ${document.name}`,
          });

          return;
        }

        throw firstError;
      }
    } catch (error) {
      console.error("Share error:", error);

      Alert.alert(
        "Share Failed",
        "The file could not be shared. Delete it, upload it again, and try once more."
      );
    }
  };

  const copyDocumentLink = async (document) => {
    const cloudUrl = getCloudUrl(document);

    if (!cloudUrl) {
      Alert.alert(
        "No Shareable Link Yet",
        "This document is saved locally. A link that works on another phone requires cloud storage."
      );
      return;
    }

    try {
      await Clipboard.setStringAsync(cloudUrl);

      Alert.alert("Copied", "Shareable document link copied.");
    } catch (error) {
      console.error("Copy link error:", error);

      Alert.alert("Copy Failed", "The link could not be copied.");
    }
  };

  if (!category) {
    return (
      <View style={styles.screen}>
        <Text style={styles.errorText}>Category not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerCard}>
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: category.color },
            ]}
          >
            <Text style={styles.iconText}>{category.icon}</Text>
          </View>

          <View style={styles.headerTextBox}>
            <Text style={styles.title}>{category.title}</Text>

            <Text style={styles.subtitle}>
              {category.documents.length} document
              {category.documents.length === 1 ? "" : "s"} saved
            </Text>
          </View>
        </View>

        {category.documents.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No documents yet</Text>

            <Text style={styles.emptyText}>
              Go back to Home, upload documents, and assign them to this
              category.
            </Text>
          </View>
        ) : (
          category.documents.map((document) => (
            <View key={document.id} style={styles.documentCard}>
              <Text style={styles.documentName}>{document.name}</Text>

              <Text style={styles.documentMeta}>
                {formatFileSize(document.size)} • Saved {document.savedAt}
              </Text>

              <DocumentButton
                primary
                label="Open Document"
                onPress={() => openDocument(document)}
              />

              <View style={styles.actionRow}>
                <DocumentButton
                  label="Share"
                  onPress={() => shareDocument(document)}
                />

                <DocumentButton
                  label="Copy Link"
                  onPress={() => copyDocumentLink(document)}
                />
              </View>
            </View>
          ))
        )}

        {savedWithoutCategory.length > 0 && (
          <View style={styles.noteCard}>
            <Text style={styles.noteTitle}>
              Saved Without Category
            </Text>

            <Text style={styles.noteText}>
              Some documents were kept after deleting a category.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}