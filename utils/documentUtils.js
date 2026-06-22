import { Platform } from "react-native";

export const DOCUMENTS_BUCKET = "documents";
export const SIGNED_URL_EXPIRATION_SECONDS = 60 * 60;
export const SIGNED_URL_EXPIRATION_LABEL = "one hour";

export const getErrorMessage = (error) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "An unexpected error occurred.";
};

export const formatFileSize = (size) => {
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

export const formatSavedDate = (dateValue) => {
  if (!dateValue) {
    return "today";
  }

  return new Date(dateValue).toLocaleDateString();
};

export const makeSafeFileName = (name) => {
  return String(name || "document")
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_+/g, "_");
};

export const createStoragePath = (userId, fileName, index) => {
  return `${userId}/${Date.now()}-${index}-${makeSafeFileName(fileName)}`;
};

export const createPendingFile = (fileLike) => {
  const size = Number(fileLike.size || fileLike.fileSize || 0);

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name: fileLike.name || "Untitled document",
    size: Number.isFinite(size) ? size : 0,
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

export const createPhotoPendingFile = (asset) => {
  return createPendingFile({
    ...asset,
    name: asset.fileName || `photo-${Date.now()}.jpg`,
    mimeType: asset.mimeType || "image/jpeg",
    size: asset.fileSize || 0,
  });
};

const mapDocumentRow = (row) => {
  return {
    id: row.id,
    name: row.name,
    size: Number(row.size || 0),
    type: row.mime_type || "application/octet-stream",
    storagePath: row.storage_path,
    savedAt: formatSavedDate(row.created_at),
  };
};

export const buildDocumentLibrary = (
  categoryRows,
  documentRows
) => {
  const documentsByCategory = new Map();
  const savedWithoutCategory = [];

  documentRows.forEach((documentRow) => {
    const document = mapDocumentRow(documentRow);

    if (!documentRow.category_id) {
      savedWithoutCategory.push(document);
      return;
    }

    const categoryDocuments =
      documentsByCategory.get(documentRow.category_id) || [];

    documentsByCategory.set(documentRow.category_id, [
      ...categoryDocuments,
      document,
    ]);
  });

  const categories = categoryRows.map((categoryRow) => ({
    id: categoryRow.id,
    title: categoryRow.title,
    icon: categoryRow.icon,
    color: categoryRow.color,
    textColor: categoryRow.text_color,
    description: categoryRow.description,
    documents: documentsByCategory.get(categoryRow.id) || [],
  }));

  return {
    categories,
    savedWithoutCategory,
  };
};