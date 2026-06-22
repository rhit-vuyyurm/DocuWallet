import React, { useEffect, useState } from "react";
import {
  Alert,
  Linking,
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

function DocumentCard({
  document,
  isWorking,
  onCopyLink,
  onDelete,
  onOpen,
  onRename,
  onShare,
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
    <View style={styles.documentCard}>
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

      <Text style={styles.documentMeta}>
        {formatFileSize(document.size)} • Saved{" "}
        {document.savedAt}
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
    createSignedDocumentUrl,
    deleteDocument,
    getCategoryById,
    renameDocument,
    savedWithoutCategory,
  } = useDocuments();

  const [activeDocumentId, setActiveDocumentId] =
    useState(null);

  const category = getCategoryById(categoryId);

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

      Alert.alert(
        errorTitle,
        error.message || fallbackMessage
      );

      return false;
    } finally {
      setActiveDocumentId(null);
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
        const signedUrl =
          await createSignedDocumentUrl(document);

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
        const signedUrl =
          await createSignedDocumentUrl(document);

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

          Alert.alert(
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
        const signedUrl =
          await createSignedDocumentUrl(document);

        await Clipboard.setStringAsync(signedUrl);

        Alert.alert(
          "Copied",
          "Secure document link copied. It expires after one hour."
        );
      },
      "Copy Failed",
      "The secure document link could not be created."
    );
  };

  const renameSavedDocument = async (
    document,
    newName
  ) => {
    return runDocumentAction(
      document,
      async () => {
        await renameDocument(document, newName);
      },
      "Rename Failed",
      "The document name could not be updated."
    );
  };

  const askToDeleteDocument = (document) => {
    Alert.alert(
      "Delete Document?",
      `"${document.name}" will be permanently deleted from this category and cloud storage.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () =>
            runDocumentAction(
              document,
              async () => {
                await deleteDocument(document);
              },
              "Delete Failed",
              "The document could not be deleted."
            ),
        },
      ]
    );
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
            <Text style={styles.iconText}>
              {category.icon}
            </Text>
          </View>

          <View style={styles.headerTextBox}>
            <Text style={styles.title}>
              {category.title}
            </Text>

            <Text style={styles.subtitle}>
              {category.documents.length} document
              {category.documents.length === 1
                ? ""
                : "s"}{" "}
              saved
            </Text>
          </View>
        </View>

        {category.documents.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              No documents yet
            </Text>

            <Text style={styles.emptyText}>
              Go back to Home, upload documents, and
              assign them to this category.
            </Text>
          </View>
        ) : (
          category.documents.map((document) => (
            <DocumentCard
              document={document}
              isWorking={
                activeDocumentId === document.id
              }
              key={document.id}
              onCopyLink={copyDocumentLink}
              onDelete={askToDeleteDocument}
              onOpen={openDocument}
              onRename={renameSavedDocument}
              onShare={shareDocument}
            />
          ))
        )}

        {savedWithoutCategory.length > 0 && (
          <View style={styles.noteCard}>
            <Text style={styles.noteTitle}>
              Saved Without Category
            </Text>

            <Text style={styles.noteText}>
              Some documents were kept after deleting a
              category.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
