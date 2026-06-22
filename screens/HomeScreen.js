import React, { useState } from "react";
import {
  ScrollView,
  Text,
  Pressable,
  View,
  TextInput,
  Alert,
  Platform,
  useWindowDimensions,
} from "react-native";

import * as DocumentPicker from "expo-document-picker";

import styles from "../styles/HomeScreenStyles";
import { useDocuments } from "../context/DocumentsContext";

export default function HomeScreen({ navigation }) {
  const {
    categories,
    savedWithoutCategory,
    totalDocuments,
    addCategory,
    addDocumentsToCategory,
    deleteCategoryOnly,
    deleteCategoryAndDocuments,
  } = useDocuments();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedUploadCategoryId, setSelectedUploadCategoryId] =
    useState(null);

  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const { width } = useWindowDimensions();

  const getNumberOfColumns = () => {
    if (width >= 1400) {
      return 4;
    }

    if (width >= 1000) {
      return 3;
    }

    if (width >= 600) {
      return 2;
    }

    return 1;
  };

  const columns = getNumberOfColumns();
  const horizontalPadding = 48;
  const gap = 16;

  const cardWidth =
    (width - horizontalPadding - gap * (columns - 1)) / columns;

  const selectedUploadCategory = categories.find(
    (category) => category.id === selectedUploadCategoryId
  );

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

  const preparePickedFile = (fileLike) => {
    const originalName = fileLike.name || "Untitled document";

    let fileUri = fileLike.uri || "";

    if (
      Platform.OS === "web" &&
      !fileUri &&
      typeof URL !== "undefined" &&
      typeof URL.createObjectURL === "function"
    ) {
      try {
        fileUri = URL.createObjectURL(fileLike);
      } catch {
        fileUri = "";
      }
    }

    return {
      name: originalName,
      size: fileLike.size || 0,
      type:
        fileLike.mimeType ||
        fileLike.type ||
        "application/octet-stream",

      uri: fileUri,
      localUri: fileUri,
      shareUri: fileUri,

      webFile:
        Platform.OS === "web"
          ? fileLike.file || fileLike
          : null,
    };
  };

  const chooseDocuments = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: true,
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets?.length) {
        return;
      }

      const preparedFiles = result.assets.map((asset) =>
        preparePickedFile(asset)
      );

      setSelectedFiles(preparedFiles);
    } catch (error) {
      console.error("Document picker error:", error);

      Alert.alert(
        "Upload Error",
        "Could not select the document. Please try again."
      );
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const droppedFiles = Array.from(
      event.dataTransfer?.files || []
    );

    const preparedFiles = droppedFiles.map((file) =>
      preparePickedFile(file)
    );

    setSelectedFiles(preparedFiles);
  };

  const saveUploadedDocuments = () => {
    if (selectedFiles.length === 0) {
      Alert.alert("No Documents", "Please upload at least one document.");
      return;
    }

    if (!selectedUploadCategoryId) {
      Alert.alert(
        "No Category",
        "Please choose a category for the documents."
      );
      return;
    }

    const categoryTitle =
      selectedUploadCategory?.title || "selected category";

    const savedCount = addDocumentsToCategory(
      selectedUploadCategoryId,
      selectedFiles
    );

    setSelectedFiles([]);
    setSelectedUploadCategoryId(null);

    Alert.alert(
      "Documents Saved",
      `${savedCount} document${
        savedCount === 1 ? "" : "s"
      } saved to ${categoryTitle}.`
    );
  };

  const clearSelectedFiles = () => {
    setSelectedFiles([]);
    setSelectedUploadCategoryId(null);
  };

  const handleAddCategory = () => {
    const wasAdded = addCategory(newCategoryName);

    if (!wasAdded) {
      Alert.alert(
        "Missing Category Name",
        "Please enter a category name."
      );
      return;
    }

    setNewCategoryName("");
    setShowCategoryForm(false);
  };

  const askToDeleteCategory = (event, category) => {
    event?.stopPropagation?.();

    Alert.alert(
      "Delete Category?",
      `What do you want to do with the documents inside "${category.title}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Keep Documents",
          onPress: () => deleteCategoryOnly(category.id),
        },
        {
          text: "Delete Documents Too",
          style: "destructive",
          onPress: () => deleteCategoryAndDocuments(category.id),
        },
      ]
    );
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <View>
              <Text style={styles.appName}>DocuWallet</Text>

              <Text style={styles.headerSubtitle}>
                Your campus document organizer
              </Text>
            </View>

            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>D</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{totalDocuments}</Text>
              <Text style={styles.statLabel}>Documents</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{categories.length}</Text>
              <Text style={styles.statLabel}>Categories</Text>
            </View>
          </View>
        </View>

        <View style={styles.uploadPanel}>
          <Text style={styles.uploadPanelTitle}>Upload Documents</Text>

          <Text style={styles.uploadPanelSubtitle}>
            Upload one or more documents, then assign them to a category.
          </Text>

          <View
            style={styles.dropZone}
            {...(Platform.OS === "web"
              ? {
                  onDragOver: handleDragOver,
                  onDrop: handleDrop,
                }
              : {})}
          >
            <Text style={styles.dropZoneIcon}>📤</Text>

            <Text style={styles.dropZoneTitle}>Drag documents here</Text>

            <Text style={styles.dropZoneText}>
              Or choose multiple files from your device
            </Text>

            <Pressable
              style={styles.uploadButton}
              onPress={chooseDocuments}
            >
              <Text style={styles.uploadButtonText}>
                Choose Documents
              </Text>
            </Pressable>
          </View>

          {selectedFiles.length > 0 && (
            <View style={styles.pendingFilesBox}>
              <View style={styles.pendingFilesHeader}>
                <Text style={styles.pendingFilesTitle}>
                  Ready to Save ({selectedFiles.length})
                </Text>

                <Pressable onPress={clearSelectedFiles}>
                  <Text style={styles.clearFilesText}>Clear</Text>
                </Pressable>
              </View>

              {selectedFiles.map((file, index) => (
                <View key={`${file.name}-${index}`} style={styles.fileRow}>
                  <Text style={styles.fileName} numberOfLines={1}>
                    {file.name}
                  </Text>

                  <Text style={styles.fileMeta}>
                    {formatFileSize(file.size)}
                  </Text>
                </View>
              ))}

              <Text style={styles.assignTitle}>Assign to Category</Text>

              <View style={styles.categoryChipWrap}>
                {categories.map((category) => (
                  <Pressable
                    key={category.id}
                    style={[
                      styles.categoryChip,
                      selectedUploadCategoryId === category.id &&
                        styles.selectedCategoryChip,
                    ]}
                    onPress={() =>
                      setSelectedUploadCategoryId(category.id)
                    }
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        selectedUploadCategoryId === category.id &&
                          styles.selectedCategoryChipText,
                      ]}
                    >
                      {category.icon} {category.title}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Pressable
                style={styles.saveDocumentsButton}
                onPress={saveUploadedDocuments}
              >
                <Text style={styles.saveDocumentsButtonText}>
                  Save to {selectedUploadCategory?.title || "Category"}
                </Text>
              </Pressable>
            </View>
          )}
        </View>

        <View style={styles.quickActionCard}>
          <Text style={styles.quickActionTitle}>
            Keep documents ready
          </Text>

          <Text style={styles.quickActionText}>
            Save address proofs, BMV files, university forms, receipts, and
            travel documents in organized categories.
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Document Categories</Text>

          <Text style={styles.sectionHint}>
            Click a category to view documents
          </Text>
        </View>

        <View style={styles.categoryGrid}>
          {categories.map((category, index) => (
            <Pressable
              key={category.id}
              style={[
                styles.categoryCard,
                {
                  width: cardWidth,
                  marginRight:
                    (index + 1) % columns === 0 ? 0 : gap,
                },
              ]}
              onPress={() =>
                navigation.navigate("Documents", {
                  categoryId: category.id,
                })
              }
            >
              <View style={styles.cardTopRow}>
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: category.color },
                  ]}
                >
                  <Text style={styles.iconText}>{category.icon}</Text>
                </View>

                <Pressable
                  style={styles.deleteButton}
                  onPress={(event) =>
                    askToDeleteCategory(event, category)
                  }
                >
                  <Text style={styles.deleteButtonText}>×</Text>
                </Pressable>
              </View>

              <Text style={styles.cardTitle}>{category.title}</Text>

              <Text style={styles.cardDescription}>
                {category.description}
              </Text>

              {category.documents.length > 0 && (
                <Text style={styles.latestDocument} numberOfLines={1}>
                  Latest:{" "}
                  {
                    category.documents[
                      category.documents.length - 1
                    ].name
                  }
                </Text>
              )}

              <View style={styles.cardBottomRow}>
                <View style={styles.documentBadge}>
                  <Text
                    style={[
                      styles.documentBadgeText,
                      { color: category.textColor },
                    ]}
                  >
                    {category.documents.length} documents
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        {savedWithoutCategory.length > 0 && (
          <View style={styles.savedWithoutCategoryCard}>
            <Text style={styles.savedWithoutCategoryTitle}>
              Saved Without Category
            </Text>

            <Text style={styles.savedWithoutCategoryText}>
              {savedWithoutCategory.length} document
              {savedWithoutCategory.length === 1 ? "" : "s"} were kept after
              deleting a category.
            </Text>
          </View>
        )}

        {showCategoryForm && (
          <View style={styles.addCategoryCard}>
            <Text style={styles.addCategoryTitle}>
              New Document Category
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Example: Insurance"
              placeholderTextColor="#90A4AE"
              value={newCategoryName}
              onChangeText={setNewCategoryName}
            />

            <View style={styles.formButtonRow}>
              <Pressable
                style={styles.cancelSmallButton}
                onPress={() => {
                  setNewCategoryName("");
                  setShowCategoryForm(false);
                }}
              >
                <Text style={styles.cancelSmallButtonText}>Cancel</Text>
              </Pressable>

              <Pressable
                style={styles.saveSmallButton}
                onPress={handleAddCategory}
              >
                <Text style={styles.saveSmallButtonText}>Save</Text>
              </Pressable>
            </View>
          </View>
        )}

        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.addButtonPressed,
          ]}
          onPress={() => setShowCategoryForm(true)}
        >
          <Text style={styles.addButtonText}>
            + Add Document Category
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}