import React, { createContext, useContext, useState } from "react";
import { Platform } from "react-native";

import startingCategories from "../data/StartingCategories";

const DocumentsContext = createContext();

export function DocumentsProvider({ children }) {
  const [categories, setCategories] = useState(startingCategories);
  const [savedWithoutCategory, setSavedWithoutCategory] = useState([]);

  const totalDocuments =
    categories.reduce(
      (total, category) => total + category.documents.length,
      0
    ) + savedWithoutCategory.length;

  const addCategory = (categoryName) => {
    const trimmedName = categoryName.trim();

    if (!trimmedName) {
      return false;
    }

    const newCategory = {
      id: `${Date.now()}-${Math.random()}`,
      title: trimmedName,
      icon: "📁",
      color: "#ECEFF1",
      textColor: "#37474F",
      description: "Custom document category",
      documents: [],
    };

    setCategories((currentCategories) => [
      ...currentCategories,
      newCategory,
    ]);

    return true;
  };

  const createDocumentUrl = (file) => {
    if (
      Platform.OS !== "web" ||
      typeof URL === "undefined" ||
      typeof URL.createObjectURL !== "function"
    ) {
      return "";
    }

    const browserFile = file.webFile || file;

    if (
      typeof Blob !== "undefined" &&
      browserFile instanceof Blob
    ) {
      return URL.createObjectURL(browserFile);
    }

    return "";
  };

  const addDocumentsToCategory = (categoryId, files) => {
    const fileArray = Array.from(files || []);

    if (!categoryId || fileArray.length === 0) {
      return 0;
    }

    const newDocuments = fileArray.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      name: file.name || "Untitled document",
      size: file.size || 0,
      type: file.type || "application/octet-stream",
      savedAt: new Date().toLocaleDateString(),

      // Native device file location.
      uri: file.uri || "",
      localUri: file.localUri || file.uri || "",

      // Android content:// URI for other apps.
      shareUri: file.shareUri || "",

      // Temporary browser-only blob URL.
      url: createDocumentUrl(file),

      // Empty until you later add cloud storage.
      shareUrl: "",
    }));

    setCategories((currentCategories) =>
      currentCategories.map((category) => {
        if (category.id !== categoryId) {
          return category;
        }

        return {
          ...category,
          documents: [...category.documents, ...newDocuments],
        };
      })
    );

    return newDocuments.length;
  };

  const updateDocumentShareUrl = (
    categoryId,
    documentId,
    shareUrl
  ) => {
    setCategories((currentCategories) =>
      currentCategories.map((category) => {
        if (category.id !== categoryId) {
          return category;
        }

        return {
          ...category,
          documents: category.documents.map((document) => {
            if (document.id !== documentId) {
              return document;
            }

            return {
              ...document,
              shareUrl,
            };
          }),
        };
      })
    );
  };

  const deleteCategoryOnly = (categoryId) => {
    const categoryToDelete = categories.find(
      (category) => category.id === categoryId
    );

    if (!categoryToDelete) {
      return;
    }

    const documentsToKeep = categoryToDelete.documents.map(
      (document) => ({
        ...document,
        oldCategory: categoryToDelete.title,
      })
    );

    setSavedWithoutCategory((currentDocuments) => [
      ...currentDocuments,
      ...documentsToKeep,
    ]);

    setCategories((currentCategories) =>
      currentCategories.filter((category) => category.id !== categoryId)
    );
  };

  const deleteCategoryAndDocuments = (categoryId) => {
    setCategories((currentCategories) =>
      currentCategories.filter((category) => category.id !== categoryId)
    );
  };

  const getCategoryById = (categoryId) => {
    return categories.find((category) => category.id === categoryId);
  };

  return (
    <DocumentsContext.Provider
      value={{
        categories,
        savedWithoutCategory,
        totalDocuments,
        addCategory,
        addDocumentsToCategory,
        updateDocumentShareUrl,
        deleteCategoryOnly,
        deleteCategoryAndDocuments,
        getCategoryById,
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
}

export function useDocuments() {
  const context = useContext(DocumentsContext);

  if (!context) {
    throw new Error("useDocuments must be used inside DocumentsProvider");
  }

  return context;
}