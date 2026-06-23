import React, { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Share,
  Text,
  TextInput,
  View,
} from "react-native";

import * as Clipboard from "expo-clipboard";

import { useDocuments } from "../context/DocumentsContext";
import styles from "../styles/DocumentsScreenStyles";

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

function DocumentCard({
  document,
  isSelected,
  isWorking,
  onCopyLink,
  onDelete,
  onOpen,
  onRename,
  onShare,
  onToggleSelection,
}) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [draftName, setDraftName] = useState(document.name);

  useEffect(() => {
    setDraftName(document.name);
  }, [document.name]);

  const handleSaveName = async () => {
    const wasRenamed = await onRename(document, draftName);

    if (wasRenamed) {
      setIsRenaming(false);
    }
  };

  const cancelRename = () => {
    setDraftName(document.name);
    setIsRenaming(false);
  };

  return (
    <View
      style={[
        styles.documentCard,
        isSelected && styles.selectedDocumentCard,
      ]}
    >
      <View style={styles.documentHeader}>
        <View style={styles.documentTextColumn}>
          {isRenaming ? (
            <>
              <Text style={styles.renameLabel}>
                Document name
              </Text>

              <TextInput
                autoCorrect={false}
                editable={!isWorking}
                onChangeText={setDraftName}
                placeholder="Document name"
                placeholderTextColor="#90A4AE"
                style={styles.renameInput}
                value={draftName}
              />

              <View style={styles.renameActions}>
                <Pressable
                  disabled={isWorking}
                  onPress={cancelRename}
                  style={styles.cancelRenameButton}
                >
                  <Text style={styles.cancelRenameText}>
                    Cancel
                  </Text>
                </Pressable>

                <Pressable
                  disabled={isWorking}
                  onPress={handleSaveName}
                  style={[
                    styles.saveRenameButton,
                    isWorking && styles.buttonDisabled,
                  ]}
                >
                  <Text style={styles.saveRenameText}>
                    {isWorking ? "Saving..." : "Save Name"}
                  </Text>
                </Pressable>
              </View>
            </>
          ) : (
            <>
              <Text
                numberOfLines={2}
                style={styles.documentName}
              >
                {document.name}
              </Text>

              <Pressable
                disabled={isWorking}
                onPress={() => setIsRenaming(true)}
                style={styles.renameButton}
              >
                <Text style={styles.renameButtonText}>
                  Rename
                </Text>
              </Pressable>
            </>
          )}
        </View>

        <View style={styles.cardHeaderActions}>
          <Pressable
            disabled={isWorking}
            onPress={() => onToggleSelection(document.id)}
            style={[
              styles.selectButton,
              isSelected && styles.selectedButton,
              isWorking && styles.buttonDisabled,
            ]}
          >
            <Text
              style={[
                styles.selectButtonText,
                isSelected && styles.selectedButtonText,
              ]}
            >
              {isSelected ? "Selected" : "Select"}
            </Text>
          </Pressable>

          <Pressable
            accessibilityLabel={`Delete ${document.name}`}
            disabled={isWorking}
            onPress={() => onDelete(document)}
            style={({ pressed }) => [
              styles.deleteButton,
              pressed && styles.deleteButtonPressed,
              isWorking && styles.buttonDisabled,
            ]}
          >
            <Text style={styles.deleteButtonText}>
              ×
            </Text>
          </Pressable>
        </View>
      </View>

      <Text style={styles.documentMeta}>
        {formatFileSize(document.size)} • Saved {document.savedAt}
      </Text>

      <Pressable
        disabled={isWorking}
        onPress={() => onOpen(document)}
        style={[
          styles.openButton,
          isWorking && styles.buttonDisabled,
        ]}
      >
        <Text style={styles.openButtonText}>
          {isWorking ? "Working..." : "Open Document"}
        </Text>
      </Pressable>

      <View style={styles.actionRow}>
        <Pressable
          disabled={isWorking}
          onPress={() => onShare(document)}
          style={[
            styles.secondaryButtonLeft,
            isWorking && styles.buttonDisabled,
          ]}
        >
          <Text style={styles.secondaryButtonText}>
            Share
          </Text>
        </Pressable>

        <Pressable
          disabled={isWorking}
          onPress={() => onCopyLink(document)}
          style={[
            styles.secondaryButtonRight,
            isWorking && styles.buttonDisabled,
          ]}
        >
          <Text style={styles.secondaryButtonText}>
            Copy Link
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function DocumentsScreen({ route }) {
  const { categoryId } = route.params;

  const {
    categories,
    createSignedDocumentUrl,
    deleteDocument,
    getCategoryById,
    moveDocuments,
    renameDocument,
  } = useDocuments();

  const [activeDocumentId, setActiveDocumentId] = useState(null);
  const [selectedDocumentIds, setSelectedDocumentIds] = useState([]);
  const [isMoveDialogVisible, setIsMoveDialogVisible] = useState(false);
  const [destinationCategoryId, setDestinationCategoryId] = useState(null);
  const [isMovingDocuments, setIsMovingDocuments] = useState(false);

  const category = getCategoryById(categoryId);
  const destinationCategories = categories.filter(
    (candidate) => candidate.id !== categoryId
  );

  const runDocumentAction = async (
    document,
    action,
    errorTitle,
    fallbackMessage
  ) => {
    setActiveDocumentId(document.id);

    try {
      await action();
      return true;
    } catch (error) {
      console.error(`${errorTitle}:`, error);
      showMessage(errorTitle, error.message || fallbackMessage);
      return false;
    } finally {
      setActiveDocumentId(null);
    }
  };

  const toggleDocumentSelection = (documentId) => {
    setSelectedDocumentIds((currentIds) => {
      if (currentIds.includes(documentId)) {
        return currentIds.filter((id) => id !== documentId);
      }

      return [...currentIds, documentId];
    });
  };

  const closeMoveDialog = () => {
    if (isMovingDocuments) {
      return;
    }

    setDestinationCategoryId(null);
    setIsMoveDialogVisible(false);
  };

  const moveSelectedDocuments = async () => {
    if (selectedDocumentIds.length === 0) {
      return;
    }

    if (!destinationCategoryId) {
      showMessage(
        "Choose a Category",
        "Select the category that should receive these documents."
      );
      return;
    }

    setIsMovingDocuments(true);

    try {
      await moveDocuments(
        selectedDocumentIds,
        destinationCategoryId
      );

      setSelectedDocumentIds([]);
      setDestinationCategoryId(null);
      setIsMoveDialogVisible(false);
    } catch (error) {
      console.error("Move documents error:", error);
      showMessage(
        "Move Failed",
        error.message || "The selected documents could not be moved."
      );
    } finally {
      setIsMovingDocuments(false);
    }
  };

  const openDocument = async (document) => {
    const browserTab =
      Platform.OS === "web" &&
      typeof window !== "undefined"
        ? window.open("", "_blank")
        : null;

    const wasOpened = await runDocumentAction(
      document,
      async () => {
        const signedUrl = await createSignedDocumentUrl(document);

        if (Platform.OS === "web") {
          if (browserTab) {
            browserTab.location.href = signedUrl;
          } else {
            window.open(signedUrl, "_blank");
          }

          return;
        }

        await Linking.openURL(signedUrl);
      },
      "Open Failed",
      "The secure document link could not be created."
    );

    if (!wasOpened && browserTab) {
      browserTab.close();
    }
  };

  const shareDocument = async (document) => {
    await runDocumentAction(
      document,
      async () => {
        const signedUrl = await createSignedDocumentUrl(document);

        if (Platform.OS === "web") {
          if (
            typeof navigator !== "undefined" &&
            typeof navigator.share === "function"
          ) {
            await navigator.share({
              title: document.name,
              text: `Open ${document.name}`,
              url: signedUrl,
            });

            return;
          }

          await Clipboard.setStringAsync(signedUrl);
          showMessage(
            "Link Copied",
            "Browser sharing is unavailable, so the secure link was copied."
          );
          return;
        }

        await Share.share({
          title: document.name,
          message: `Open ${document.name}\n${signedUrl}`,
        });
      },
      "Share Failed",
      "The secure document link could not be created."
    );
  };

  const copyDocumentLink = async (document) => {
    await runDocumentAction(
      document,
      async () => {
        const signedUrl = await createSignedDocumentUrl(document);
        await Clipboard.setStringAsync(signedUrl);

        showMessage(
          "Copied",
          "Secure document link copied. It expires after one hour."
        );
      },
      "Copy Failed",
      "The secure document link could not be created."
    );
  };

  const renameSavedDocument = async (document, newName) => {
    return runDocumentAction(
      document,
      async () => {
        await renameDocument(document, newName);
      },
      "Rename Failed",
      "The document name could not be updated."
    );
  };

  const deleteDocumentNow = async (document) => {
    const wasDeleted = await runDocumentAction(
      document,
      async () => {
        await deleteDocument(document);
      },
      "Delete Failed",
      "The document could not be deleted."
    );

    if (wasDeleted) {
      setSelectedDocumentIds((currentIds) =>
        currentIds.filter((id) => id !== document.id)
      );
    }
  };

  const askToDeleteDocument = (document) => {
    const message =
      `Permanently delete "${document.name}" from cloud storage? ` +
      "This cannot be undone.";

    if (Platform.OS === "web" && typeof window !== "undefined") {
      if (window.confirm(message)) {
        deleteDocumentNow(document);
      }

      return;
    }

    Alert.alert("Delete Document?", message, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteDocumentNow(document),
      },
    ]);
  };

  if (!category) {
    return (
      <View style={styles.centeredScreen}>
        <Text style={styles.errorText}>
          Category not found.
        </Text>
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
              {
                backgroundColor: category.color,
              },
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

        {selectedDocumentIds.length > 0 && (
          <View style={styles.selectionBar}>
            <Text style={styles.selectionText}>
              {selectedDocumentIds.length} selected
            </Text>

            <View style={styles.selectionButtons}>
              <Pressable
                disabled={isMovingDocuments}
                onPress={() => setSelectedDocumentIds([])}
                style={styles.clearSelectionButton}
              >
                <Text style={styles.clearSelectionText}>
                  Clear
                </Text>
              </Pressable>

              <Pressable
                disabled={isMovingDocuments}
                onPress={() => setIsMoveDialogVisible(true)}
                style={[
                  styles.moveSelectionButton,
                  isMovingDocuments && styles.buttonDisabled,
                ]}
              >
                <Text style={styles.moveSelectionText}>
                  Move selected
                </Text>
              </Pressable>
            </View>
          </View>
        )}

        {category.documents.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No documents yet</Text>

            <Text style={styles.emptyText}>
              Go back to Home, upload documents, and assign them to this category.
            </Text>
          </View>
        ) : (
          category.documents.map((document) => (
            <DocumentCard
              document={document}
              isSelected={selectedDocumentIds.includes(document.id)}
              isWorking={
                activeDocumentId === document.id || isMovingDocuments
              }
              key={document.id}
              onCopyLink={copyDocumentLink}
              onDelete={askToDeleteDocument}
              onOpen={openDocument}
              onRename={renameSavedDocument}
              onShare={shareDocument}
              onToggleSelection={toggleDocumentSelection}
            />
          ))
        )}
      </ScrollView>

      <Modal
        animationType="fade"
        onRequestClose={closeMoveDialog}
        transparent
        visible={isMoveDialogVisible}
      >
        <View style={styles.dialogBackdrop}>
          <View style={styles.dialogCard}>
            <Text style={styles.dialogTitle}>
              Move Selected Documents
            </Text>

            <Text style={styles.dialogText}>
              Choose the category that should receive {selectedDocumentIds.length} selected document
              {selectedDocumentIds.length === 1 ? "" : "s"}.
            </Text>

            {destinationCategories.length === 0 ? (
              <Text style={styles.dialogText}>
                Create another category before moving documents.
              </Text>
            ) : (
              <ScrollView style={styles.destinationList}>
                {destinationCategories.map((destination) => {
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
                        isSelected && styles.destinationButtonSelected,
                      ]}
                    >
                      <Text style={styles.destinationIcon}>
                        {destination.icon}
                      </Text>

                      <Text style={styles.destinationText}>
                        {destination.title}
                      </Text>

                      {isSelected && (
                        <Text style={styles.destinationCheck}>✓</Text>
                      )}
                    </Pressable>
                  );
                })}
              </ScrollView>
            )}

            <View style={styles.dialogActions}>
              <Pressable
                disabled={isMovingDocuments}
                onPress={closeMoveDialog}
                style={styles.dialogCancelButton}
              >
                <Text style={styles.dialogCancelText}>Cancel</Text>
              </Pressable>

              <Pressable
                disabled={
                  isMovingDocuments ||
                  !destinationCategoryId ||
                  destinationCategories.length === 0
                }
                onPress={moveSelectedDocuments}
                style={[
                  styles.dialogMoveButton,
                  (isMovingDocuments || !destinationCategoryId) &&
                    styles.buttonDisabled,
                ]}
              >
                <Text style={styles.dialogMoveText}>
                  {isMovingDocuments ? "Moving..." : "Move Documents"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
