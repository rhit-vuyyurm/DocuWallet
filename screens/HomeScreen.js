import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";

import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

import { useDocuments } from "../context/DocumentsContext";
import { useTheme } from "../context/ThemeContext";
import SettingsModal from "../components/SettingsModal";
import {
  createHomeScreenStyles,
  getCategoryCardStyle,
  getCategoryGridLayout,
  getCategoryIconStyle,
  getCategoryTextColorStyle,
} from "../styles/HomeScreenStyles";

const formatFileSize = (size) => {
  const fileSize = Number(size || 0);

  if (!fileSize) {
    return "Unknown size";
  }

  if (fileSize < 1024) {
    return `${fileSize} B`;
  }

  if (fileSize < 1024 * 1024) {
    return `${(fileSize / 1024).toFixed(1)} KB`;
  }

  return `${(fileSize / (1024 * 1024)).toFixed(1)} MB`;
};

const createPendingFile = (fileLike) => {
  const originalName =
    fileLike.name ||
    fileLike.fileName ||
    "Untitled document";

  return {
    id: `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}`,
    originalName,
    name: originalName,
    size: Number(
      fileLike.size ||
        fileLike.fileSize ||
        0
    ),
    type:
      fileLike.mimeType ||
      fileLike.type ||
      "application/octet-stream",
    uri: fileLike.uri || "",
    webFile:
      Platform.OS === "web"
        ? fileLike.file || fileLike
        : null,
  };
};

const showMessage = (title, message) => {
  if (
    Platform.OS === "web" &&
    typeof window !== "undefined" &&
    typeof window.alert === "function"
  ) {
    window.alert(`${title}\n\n${message}`);
    return;
  }

  Alert.alert(title, message);
};

function PendingFileRow({
  disabled,
  file,
  onNameChange,
  styles,
  theme,
}) {
  return (
    <View style={styles.fileRow}>
      <View style={styles.fileInfo}>
        <Text style={styles.fileLabel}>
          Document name
        </Text>

        <TextInput
          autoCorrect={false}
          editable={!disabled}
          onChangeText={(value) =>
            onNameChange(file.id, value)
          }
          placeholder="Document name"
          placeholderTextColor={theme.mutedText}
          style={styles.fileNameInput}
          value={file.name}
        />
      </View>

      <Text style={styles.fileMeta}>
        {formatFileSize(file.size)}
      </Text>
    </View>
  );
}

function CategoryForm({
  categoryName,
  disabled,
  onCancel,
  onChangeCategoryName,
  onSave,
  styles,
  theme,
  title,
}) {
  return (
    <View style={styles.categoryForm}>
      <Text style={styles.categoryFormTitle}>
        {title}
      </Text>

      <TextInput
        autoCorrect={false}
        editable={!disabled}
        onChangeText={onChangeCategoryName}
        placeholder="Example: Insurance"
        placeholderTextColor={theme.mutedText}
        style={styles.categoryFormInput}
        value={categoryName}
      />

      <View style={styles.categoryFormActions}>
        <Pressable
          disabled={disabled}
          onPress={onCancel}
          style={styles.categoryFormCancelButton}
        >
          <Text style={styles.categoryFormCancelText}>
            Cancel
          </Text>
        </Pressable>

        <Pressable
          disabled={disabled}
          onPress={onSave}
          style={[
            styles.categoryFormSaveButton,
            disabled && styles.buttonDisabled,
          ]}
        >
          <Text style={styles.categoryFormSaveText}>
            {disabled ? "Saving..." : "Save Category"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function CategoryCard({
  category,
  cardStyle,
  onDelete,
  onOpen,
  styles,
}) {
  return (
    <Pressable
      onPress={onOpen}
      style={({ pressed }) => [
        styles.categoryCard,
        cardStyle,
        pressed && styles.categoryCardPressed,
      ]}
    >
      <View style={styles.cardTopRow}>
        <View
          style={[
            styles.iconCircle,
            getCategoryIconStyle(category.color),
          ]}
        >
          <Text style={styles.iconText}>{category.icon}</Text>
        </View>

        <Pressable
          onPress={(event) => onDelete(event, category)}
          style={({ pressed }) => [
            styles.deleteButton,
            pressed && styles.deleteButtonPressed,
          ]}
        >
          <Text style={styles.deleteButtonText}>×</Text>
        </Pressable>
      </View>

      <Text style={styles.cardTitle}>{category.title}</Text>

      <Text style={styles.cardDescription}>
        {category.description}
      </Text>

      {category.documents.length > 0 && (
        <Text
          numberOfLines={1}
          style={styles.latestDocument}
        >
          Latest: {category.documents[category.documents.length - 1].name}
        </Text>
      )}

      <View style={styles.documentBadge}>
        <Text
          style={[
            styles.documentBadgeText,
            getCategoryTextColorStyle(category.textColor),
          ]}
        >
          {category.documents.length} documents
        </Text>
      </View>
    </Pressable>
  );
}

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();

  const styles = useMemo(
    () => createHomeScreenStyles(theme),
    [theme]
  );

  const {
    categories,
    createCategory,
    deleteCategoryAndDocuments,
    isLoading,
    loadError,
    moveCategoryDocumentsAndDelete,
    refreshDocuments,
    totalDocuments,
    uploadDocuments,
  } = useDocuments();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedUploadCategoryId, setSelectedUploadCategoryId] =
    useState(null);
  const [categoryFormLocation, setCategoryFormLocation] =
    useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isSavingDocuments, setIsSavingDocuments] = useState(false);
  const [isSavingCategory, setIsSavingCategory] = useState(false);
  const [categoryPendingDeletion, setCategoryPendingDeletion] =
    useState(null);
  const [destinationCategoryId, setDestinationCategoryId] =
    useState(null);
  const [isDeletingCategory, setIsDeletingCategory] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  const { width } = useWindowDimensions();
  const { columns, cardWidth } = getCategoryGridLayout(width);

  const selectedUploadCategory = categories.find(
    (category) => category.id === selectedUploadCategoryId
  );

  const deletionDestinationCategories = categoryPendingDeletion
    ? categories.filter(
        (category) => category.id !== categoryPendingDeletion.id
      )
    : [];

  const addSelectedFiles = (files) => {
    setSelectedFiles((currentFiles) => [
      ...currentFiles,
      ...files,
    ]);
  };

  const updateSelectedFileName = (fileId, name) => {
    setSelectedFiles((currentFiles) =>
      currentFiles.map((file) => {
        if (file.id !== fileId) {
          return file;
        }

        return {
          ...file,
          name,
        };
      })
    );
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

      addSelectedFiles(result.assets.map(createPendingFile));
    } catch (error) {
      console.error("Document picker error:", error);
      showMessage("Upload Error", "Could not select the document.");
    }
  };

  const takePhoto = async () => {
    try {
      const permission =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        showMessage(
          "Camera Permission Needed",
          "Allow camera access to photograph a document."
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        exif: false,
        quality: 0.85,
      });

      if (result.canceled || !result.assets?.length) {
        return;
      }

      const photo = result.assets[0];

      addSelectedFiles([
        createPendingFile({
          ...photo,
          name: photo.fileName || `photo-${Date.now()}.jpg`,
          mimeType: photo.mimeType || "image/jpeg",
          size: photo.fileSize || 0,
        }),
      ]);
    } catch (error) {
      console.error("Camera error:", error);
      showMessage("Camera Error", "Could not take the photo.");
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

    addSelectedFiles(droppedFiles.map(createPendingFile));
  };

  const clearSelectedFiles = () => {
    setSelectedFiles([]);
    setSelectedUploadCategoryId(null);
  };

  const openCategoryForm = (location) => {
    setNewCategoryName("");
    setCategoryFormLocation(location);
  };

  const closeCategoryForm = () => {
    setNewCategoryName("");
    setCategoryFormLocation(null);
  };

  const saveNewCategory = async () => {
    setIsSavingCategory(true);

    try {
      const createdCategory = await createCategory(newCategoryName);

      if (!createdCategory) {
        showMessage(
          "Missing Category Name",
          "Enter a name for the category."
        );
        return;
      }

      if (categoryFormLocation === "upload") {
        setSelectedUploadCategoryId(createdCategory.id);
      }

      closeCategoryForm();
    } catch (error) {
      console.error("Create category error:", error);
      showMessage(
        "Category Error",
        error.message || "The category could not be created."
      );
    } finally {
      setIsSavingCategory(false);
    }
  };

  const saveUploadedDocuments = async () => {
    if (selectedFiles.length === 0) {
      showMessage(
        "No Documents",
        "Choose at least one document or photo."
      );
      return;
    }

    if (!selectedUploadCategoryId) {
      showMessage(
        "No Category",
        "Choose a category before saving."
      );
      return;
    }

    const categoryTitle =
      selectedUploadCategory?.title || "selected category";

    setIsSavingDocuments(true);

    try {
      const { savedCount, failedFiles } = await uploadDocuments(
        selectedUploadCategoryId,
        selectedFiles
      );

      const failedFileIds = new Set(
        failedFiles.map((file) => file.id)
      );

      setSelectedFiles((currentFiles) =>
        currentFiles.filter((file) => failedFileIds.has(file.id))
      );

      if (failedFiles.length === 0) {
        setSelectedUploadCategoryId(null);
        showMessage(
          "Documents Saved",
          `${savedCount} document${
            savedCount === 1 ? "" : "s"
          } uploaded to ${categoryTitle}.`
        );
        return;
      }

      showMessage(
        "Upload Partially Complete",
        `${savedCount} document${
          savedCount === 1 ? "" : "s"
        } uploaded successfully.\n\n` +
          `${failedFiles.length} file${
            failedFiles.length === 1 ? "" : "s"
          } remain in the upload list.\n\n` +
          `${failedFiles[0].name}: ${failedFiles[0].message}`
      );
    } catch (error) {
      console.error("Cloud upload error:", error);
      showMessage(
        "Upload Failed",
        error.message || "The documents could not be uploaded."
      );
    } finally {
      setIsSavingDocuments(false);
    }
  };

  const openCategoryDeleteDialog = (event, category) => {
    event?.stopPropagation?.();
    setDestinationCategoryId(null);
    setCategoryPendingDeletion(category);
  };

  const closeCategoryDeleteDialog = () => {
    if (isDeletingCategory) {
      return;
    }

    setDestinationCategoryId(null);
    setCategoryPendingDeletion(null);
  };

  const deleteCategoryWithDocuments = async () => {
    if (!categoryPendingDeletion) {
      return;
    }

    setIsDeletingCategory(true);

    try {
      await deleteCategoryAndDocuments(categoryPendingDeletion.id);
      setDestinationCategoryId(null);
      setCategoryPendingDeletion(null);
    } catch (error) {
      console.error("Delete category error:", error);
      showMessage(
        "Delete Failed",
        error.message || "The category could not be deleted."
      );
    } finally {
      setIsDeletingCategory(false);
    }
  };

  const saveDocumentsAndDeleteCategory = async () => {
    if (!categoryPendingDeletion) {
      return;
    }

    if (!destinationCategoryId) {
      showMessage(
        "Choose a Category",
        "Select the category that should receive these documents."
      );
      return;
    }

    setIsDeletingCategory(true);

    try {
      await moveCategoryDocumentsAndDelete(
        categoryPendingDeletion.id,
        destinationCategoryId
      );

      setDestinationCategoryId(null);
      setCategoryPendingDeletion(null);
    } catch (error) {
      console.error("Move and delete category error:", error);
      showMessage(
        "Delete Failed",
        error.message || "The category could not be deleted."
      );
    } finally {
      setIsDeletingCategory(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.statusScreen}>
        <ActivityIndicator color={theme.accent} size="large" />
        <Text style={styles.statusTitle}>
          Connecting to secure cloud storage...
        </Text>
      </View>
    );
  }

  if (loadError) {
    return (
      <View style={styles.statusScreen}>
        <Text style={styles.statusTitle}>Cloud connection error</Text>
        <Text style={styles.statusMessage}>{loadError}</Text>
        <Pressable
          onPress={() => refreshDocuments()}
          style={styles.retryButton}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            accessibilityLabel="Open settings"
            accessibilityRole="button"
            onPress={() => setIsSettingsVisible(true)}
            style={({ pressed }) => [
              styles.settingsButton,
              pressed && styles.settingsButtonPressed,
            ]}
          >
            <Text style={styles.settingsButtonIcon}>⚙</Text>
          </Pressable>

          <View style={styles.headerTopRow}>
            <View style={styles.headerTextBox}>
              <Text style={styles.appName}>DocuWallet</Text>

              <Text style={styles.headerSubtitle}>
                Your campus document organizer
              </Text>
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
            Choose files or take photos, name them, and save them to a category.
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
              Or choose files or take a document photo
            </Text>

            <Pressable
              disabled={isSavingDocuments}
              onPress={chooseDocuments}
              style={[
                styles.uploadButton,
                isSavingDocuments && styles.buttonDisabled,
              ]}
            >
              <Text style={styles.uploadButtonText}>Choose Documents</Text>
            </Pressable>

            <Pressable
              disabled={isSavingDocuments}
              onPress={takePhoto}
              style={[
                styles.takePhotoButton,
                isSavingDocuments && styles.buttonDisabled,
              ]}
            >
              <Text style={styles.takePhotoButtonText}>Take Photo</Text>
            </Pressable>
          </View>

          {selectedFiles.length > 0 && (
            <View style={styles.pendingFilesBox}>
              <View style={styles.pendingFilesHeader}>
                <Text style={styles.pendingFilesTitle}>
                  Ready to Save ({selectedFiles.length})
                </Text>

                <Pressable
                  disabled={isSavingDocuments}
                  onPress={clearSelectedFiles}
                >
                  <Text style={styles.clearFilesText}>Clear</Text>
                </Pressable>
              </View>

              {selectedFiles.map((file) => (
                <PendingFileRow
                  disabled={isSavingDocuments}
                  styles={styles}
                  theme={theme}
                  file={file}
                  key={file.id}
                  onNameChange={updateSelectedFileName}
                />
              ))}

              <Text style={styles.assignTitle}>Assign to Category</Text>

              <View style={styles.categoryChipWrap}>
                {categories.map((category) => {
                  const isSelected =
                    selectedUploadCategoryId === category.id;

                  return (
                    <Pressable
                      disabled={isSavingDocuments}
                      key={category.id}
                      onPress={() => setSelectedUploadCategoryId(category.id)}
                      style={({ pressed }) => [
                        styles.categoryChip,
                        isSelected && styles.selectedCategoryChip,
                        pressed && styles.categoryChipPressed,
                      ]}
                    >
                      <Text
                        style={[
                          styles.categoryChipText,
                          isSelected && styles.selectedCategoryChipText,
                        ]}
                      >
                        {category.icon} {category.title}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              {categoryFormLocation === "upload" ? (
                <CategoryForm
                  categoryName={newCategoryName}
                  styles={styles}
                  theme={theme}
                  disabled={isSavingCategory}
                  onCancel={closeCategoryForm}
                  onChangeCategoryName={setNewCategoryName}
                  onSave={saveNewCategory}
                  title="Create a Category for This Upload"
                />
              ) : (
                <Pressable
                  disabled={isSavingDocuments}
                  onPress={() => openCategoryForm("upload")}
                  style={styles.addUploadCategoryButton}
                >
                  <Text style={styles.addUploadCategoryButtonText}>
                    + Add a New Category
                  </Text>
                </Pressable>
              )}

              <Pressable
                disabled={isSavingDocuments}
                onPress={saveUploadedDocuments}
                style={[
                  styles.saveDocumentsButton,
                  isSavingDocuments && styles.buttonDisabled,
                ]}
              >
                <Text style={styles.saveDocumentsButtonText}>
                  {isSavingDocuments
                    ? "Uploading..."
                    : `Save to ${
                        selectedUploadCategory?.title || "Category"
                      }`}
                </Text>
              </Pressable>
            </View>
          )}
        </View>

        <View style={styles.quickActionCard}>
          <Text style={styles.quickActionTitle}>Keep documents ready</Text>
          <Text style={styles.quickActionText}>
            Save address proofs, BMV files, university forms, receipts, and travel documents in organized categories.
          </Text>
        </View>


        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Document Categories</Text>
          <Text style={styles.sectionHint}>
            Tap a category to view documents
          </Text>
        </View>

        <View style={styles.categoryGrid}>
          {categories.map((category, index) => (
            <CategoryCard
              cardStyle={getCategoryCardStyle(cardWidth, index, columns)}
              styles={styles}
              category={category}
              key={category.id}
              onDelete={openCategoryDeleteDialog}
              onOpen={() =>
                navigation.navigate("Documents", {
                  categoryId: category.id,
                })
              }
            />
          ))}
        </View>

        {categoryFormLocation === "page" && (
          <CategoryForm
            categoryName={newCategoryName}
            styles={styles}
            theme={theme}
            disabled={isSavingCategory}
            onCancel={closeCategoryForm}
            onChangeCategoryName={setNewCategoryName}
            onSave={saveNewCategory}
            title="New Document Category"
          />
        )}

        <Pressable
          onPress={() => openCategoryForm("page")}
          style={styles.addCategoryButton}
        >
          <Text style={styles.addCategoryButtonText}>
            + Add Document Category
          </Text>
        </Pressable>
      </ScrollView>

      <SettingsModal
        onClose={() => setIsSettingsVisible(false)}
        visible={isSettingsVisible}
      />

      <Modal
        animationType="fade"
        onRequestClose={closeCategoryDeleteDialog}
        transparent
        visible={Boolean(categoryPendingDeletion)}
      >
        <View style={styles.backdrop}>
          <View style={styles.card}>
            <Text style={styles.title}>Delete Category?</Text>

            {categoryPendingDeletion && (
              <>
                {categoryPendingDeletion.documents.length > 0 ? (
                  <>
                    <Text style={styles.text}>
                      "{categoryPendingDeletion.title}" contains {categoryPendingDeletion.documents.length} document
                      {categoryPendingDeletion.documents.length === 1 ? "" : "s"}.
                      Choose another category to save them, or permanently delete them with this category.
                    </Text>

                    {deletionDestinationCategories.length > 0 && (
                      <ScrollView style={styles.destinationList}>
                        {deletionDestinationCategories.map((destination) => {
                          const isSelected =
                            destination.id === destinationCategoryId;

                          return (
                            <Pressable
                              key={destination.id}
                              onPress={() =>
                                setDestinationCategoryId(destination.id)
                              }
                              style={[
                                styles.destinationButton,
                                isSelected &&
                                  styles.destinationButtonSelected,
                              ]}
                            >
                              <Text style={styles.destinationIcon}>
                                {destination.icon}
                              </Text>

                              <Text style={styles.destinationText}>
                                {destination.title}
                              </Text>

                              {isSelected && (
                                <Text style={styles.destinationCheck}>
                                  ✓
                                </Text>
                              )}
                            </Pressable>
                          );
                        })}
                      </ScrollView>
                    )}
                  </>
                ) : (
                  <Text style={styles.text}>
                    "{categoryPendingDeletion.title}" is empty. Delete this category?
                  </Text>
                )}

                <View style={styles.actionColumn}>
                  {categoryPendingDeletion.documents.length > 0 &&
                    deletionDestinationCategories.length > 0 && (
                      <Pressable
                        disabled={isDeletingCategory || !destinationCategoryId}
                        onPress={saveDocumentsAndDeleteCategory}
                        style={[
                          styles.primaryAction,
                          (isDeletingCategory || !destinationCategoryId) &&
                            styles.buttonDisabled,
                        ]}
                      >
                        <Text style={styles.primaryActionText}>
                          {isDeletingCategory
                            ? "Saving..."
                            : "Save Documents and Delete Category"}
                        </Text>
                      </Pressable>
                    )}

                  <Pressable
                    disabled={isDeletingCategory}
                    onPress={deleteCategoryWithDocuments}
                    style={[
                      styles.destructiveAction,
                      isDeletingCategory && styles.buttonDisabled,
                    ]}
                  >
                    <Text style={styles.destructiveActionText}>
                      {categoryPendingDeletion.documents.length > 0
                        ? "Delete Category and Documents"
                        : "Delete Category"}
                    </Text>
                  </Pressable>

                  <Pressable
                    disabled={isDeletingCategory}
                    onPress={closeCategoryDeleteDialog}
                    style={styles.cancelAction}
                  >
                    <Text style={styles.cancelActionText}>
                      Cancel
                    </Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
