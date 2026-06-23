import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Platform } from "react-native";
import { File } from "expo-file-system";

import { supabase } from "../lib/supabase";

const DocumentsContext = createContext();

const DOCUMENTS_BUCKET = "documents";

const DEFAULT_CATEGORIES = [
  {
    title: "Address Proof",
    icon: "🏠",
    color: "#E8F5E9",
    text_color: "#2E7D32",
    description: "Bank, housing, campus letters",
  },
  {
    title: "BMV / License",
    icon: "🚗",
    color: "#E3F2FD",
    text_color: "#1565C0",
    description: "Permit and license documents",
  },
  {
    title: "University Forms",
    icon: "🎓",
    color: "#FFF3E0",
    text_color: "#EF6C00",
    description: "Campus and academic forms",
  },
  {
    title: "Internship",
    icon: "💼",
    color: "#F3E5F5",
    text_color: "#7B1FA2",
    description: "Work, offer, HR paperwork",
  },
  {
    title: "Receipts",
    icon: "🧾",
    color: "#FCE4EC",
    text_color: "#C2185B",
    description: "Payments and purchases",
  },
  {
    title: "Travel",
    icon: "✈️",
    color: "#E0F7FA",
    text_color: "#00838F",
    description: "Flights, visa, ID copies",
  },
];

const makeSafeFileName = (name) => {
  return String(name || "document")
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_+/g, "_");
};

const formatSavedDate = (dateValue) => {
  if (!dateValue) {
    return "today";
  }

  return new Date(dateValue).toLocaleDateString();
};

const mapDocument = (row) => {
  return {
    id: row.id,
    name: row.name,
    size: Number(row.size || 0),
    type: row.mime_type || "application/octet-stream",
    storagePath: row.storage_path,
    savedAt: formatSavedDate(row.created_at),
  };
};

const mapCategory = (row, documents) => {
  return {
    id: row.id,
    title: row.title,
    icon: row.icon,
    color: row.color,
    textColor: row.text_color,
    description: row.description,
    documents,
  };
};

const requireCloudSession = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  if (!session?.user || session.user.is_anonymous) {
    throw new Error(
      "Please sign in with your DocuWallet account."
    );
  }

  return session;
};

const getUploadBody = async (file) => {
  if (Platform.OS === "web") {
    if (!file.webFile) {
      throw new Error("The browser file could not be read.");
    }

    return file.webFile;
  }

  if (!file.uri) {
    throw new Error("The selected file does not have a readable URI.");
  }

  try {
    const pickedFile = new File(file.uri);
    return await pickedFile.arrayBuffer();
  } catch {
    const response = await fetch(file.uri);

    if (!response.ok) {
      throw new Error("Could not read the selected file.");
    }

    return response.arrayBuffer();
  }
};

export function DocumentsProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const totalDocuments = categories.reduce(
    (total, category) => total + category.documents.length,
    0
  );

  const refreshDocuments = useCallback(async () => {
    setIsLoading(true);
    setLoadError("");

    try {
      await requireCloudSession();

      let {
        data: categoryRows,
        error: categoriesError,
      } = await supabase
        .from("categories")
        .select("*")
        .order("created_at", { ascending: true });

      if (categoriesError) {
        throw categoriesError;
      }

      if (!categoryRows?.length) {
        const { error: seedError } = await supabase
          .from("categories")
          .insert(DEFAULT_CATEGORIES);

        if (seedError) {
          throw seedError;
        }

        const {
          data: seededCategoryRows,
          error: seededCategoriesError,
        } = await supabase
          .from("categories")
          .select("*")
          .order("created_at", { ascending: true });

        if (seededCategoriesError) {
          throw seededCategoriesError;
        }

        categoryRows = seededCategoryRows || [];
      }

      const {
        data: documentRows,
        error: documentsError,
      } = await supabase
        .from("documents")
        .select("*")
        .order("created_at", { ascending: true });

      if (documentsError) {
        throw documentsError;
      }

      const documentsByCategory = new Map();

      (documentRows || []).forEach((documentRow) => {
        const currentDocuments =
          documentsByCategory.get(documentRow.category_id) || [];

        documentsByCategory.set(documentRow.category_id, [
          ...currentDocuments,
          mapDocument(documentRow),
        ]);
      });

      setCategories(
        categoryRows.map((categoryRow) =>
          mapCategory(
            categoryRow,
            documentsByCategory.get(categoryRow.id) || []
          )
        )
      );
    } catch (error) {
      console.error("Supabase load error:", error);
      setCategories([]);
      setLoadError(
        error.message ||
          "Could not connect to your Supabase cloud storage."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshDocuments();
  }, [refreshDocuments]);

  const createCategory = async (categoryName) => {
    const trimmedName = String(categoryName || "").trim();

    if (!trimmedName) {
      return null;
    }

    const { data, error } = await supabase
      .from("categories")
      .insert({
        title: trimmedName,
        description: "Custom document category",
        icon: "📁",
        color: "#ECEFF1",
        text_color: "#37474F",
      })
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    await refreshDocuments();

    return mapCategory(data, []);
  };

  const addCategory = async (categoryName) => {
    return Boolean(await createCategory(categoryName));
  };

  const uploadDocuments = async (categoryId, files) => {
    const fileArray = Array.from(files || []);

    if (!categoryId || fileArray.length === 0) {
      return {
        savedCount: 0,
        failedFiles: [],
      };
    }

    const session = await requireCloudSession();
    let savedCount = 0;
    const failedFiles = [];

    for (let index = 0; index < fileArray.length; index += 1) {
      const file = fileArray[index];
      const fileName = String(file.name || "Untitled document").trim() ||
        "Untitled document";
      const mimeType = file.type || "application/octet-stream";
      const storagePath =
        `${session.user.id}/${Date.now()}-${index}-` +
        makeSafeFileName(fileName);

      try {
        const uploadBody = await getUploadBody(file);

        const { error: uploadError } = await supabase.storage
          .from(DOCUMENTS_BUCKET)
          .upload(storagePath, uploadBody, {
            contentType: mimeType,
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        const { error: databaseError } = await supabase
          .from("documents")
          .insert({
            category_id: categoryId,
            name: fileName,
            size: file.size || 0,
            mime_type: mimeType,
            storage_path: storagePath,
          });

        if (databaseError) {
          await supabase.storage
            .from(DOCUMENTS_BUCKET)
            .remove([storagePath]);
          throw databaseError;
        }

        savedCount += 1;
      } catch (error) {
        console.error(`Upload failed for ${fileName}:`, error);
        failedFiles.push({
          id: file.id,
          name: fileName,
          message: error.message || "Unknown upload error.",
        });
      }
    }

    await refreshDocuments();

    return {
      savedCount,
      failedFiles,
    };
  };

  const addDocumentsToCategory = uploadDocuments;

  const createSignedDocumentUrl = async (
    document,
    expiresInSeconds = 60 * 60
  ) => {
    if (!document.storagePath) {
      throw new Error("This document has no cloud storage path.");
    }

    const { data, error } = await supabase.storage
      .from(DOCUMENTS_BUCKET)
      .createSignedUrl(
        document.storagePath,
        expiresInSeconds
      );

    if (error) {
      throw error;
    }

    return data.signedUrl;
  };

  const renameDocument = async (document, nextName) => {
    const trimmedName = String(nextName || "").trim();

    if (!trimmedName) {
      throw new Error("Enter a document name.");
    }

    const { error } = await supabase
      .from("documents")
      .update({ name: trimmedName })
      .eq("id", document.id);

    if (error) {
      throw error;
    }

    await refreshDocuments();
  };

  const deleteDocument = async (document) => {
    if (!document?.id) {
      throw new Error("This document could not be identified.");
    }

    if (document.storagePath) {
      const { error: storageDeleteError } = await supabase.storage
        .from(DOCUMENTS_BUCKET)
        .remove([document.storagePath]);

      if (storageDeleteError) {
        throw storageDeleteError;
      }
    }

    const { error: databaseDeleteError } = await supabase
      .from("documents")
      .delete()
      .eq("id", document.id);

    if (databaseDeleteError) {
      throw databaseDeleteError;
    }

    await refreshDocuments();
  };

  const moveDocuments = async (
    documentIds,
    destinationCategoryId
  ) => {
    const ids = [...new Set(documentIds || [])].filter(Boolean);

    if (ids.length === 0) {
      throw new Error("Select at least one document to move.");
    }

    if (!destinationCategoryId) {
      throw new Error("Choose a destination category.");
    }

    const { error } = await supabase
      .from("documents")
      .update({ category_id: destinationCategoryId })
      .in("id", ids);

    if (error) {
      throw error;
    }

    await refreshDocuments();
  };

  const moveCategoryDocumentsAndDelete = async (
    categoryId,
    destinationCategoryId
  ) => {
    if (!categoryId || !destinationCategoryId) {
      throw new Error("Choose a destination category.");
    }

    if (categoryId === destinationCategoryId) {
      throw new Error(
        "Choose a different category for these documents."
      );
    }

    const { error: moveDocumentsError } = await supabase
      .from("documents")
      .update({ category_id: destinationCategoryId })
      .eq("category_id", categoryId);

    if (moveDocumentsError) {
      throw moveDocumentsError;
    }

    const { error: deleteCategoryError } = await supabase
      .from("categories")
      .delete()
      .eq("id", categoryId);

    if (deleteCategoryError) {
      throw deleteCategoryError;
    }

    await refreshDocuments();
  };

  const deleteCategoryAndDocuments = async (categoryId) => {
    const {
      data: documentsToDelete,
      error: findDocumentsError,
    } = await supabase
      .from("documents")
      .select("id, storage_path")
      .eq("category_id", categoryId);

    if (findDocumentsError) {
      throw findDocumentsError;
    }

    const storagePaths = (documentsToDelete || [])
      .map((document) => document.storage_path)
      .filter(Boolean);

    if (storagePaths.length > 0) {
      const { error: storageDeleteError } = await supabase.storage
        .from(DOCUMENTS_BUCKET)
        .remove(storagePaths);

      if (storageDeleteError) {
        throw storageDeleteError;
      }
    }

    const { error: deleteDocumentsError } = await supabase
      .from("documents")
      .delete()
      .eq("category_id", categoryId);

    if (deleteDocumentsError) {
      throw deleteDocumentsError;
    }

    const { error: deleteCategoryError } = await supabase
      .from("categories")
      .delete()
      .eq("id", categoryId);

    if (deleteCategoryError) {
      throw deleteCategoryError;
    }

    await refreshDocuments();
  };

  const getCategoryById = (categoryId) => {
    return categories.find(
      (category) => category.id === categoryId
    );
  };

  return (
    <DocumentsContext.Provider
      value={{
        categories,
        totalDocuments,
        isLoading,
        loadError,
        refreshDocuments,
        createCategory,
        addCategory,
        uploadDocuments,
        addDocumentsToCategory,
        createSignedDocumentUrl,
        renameDocument,
        deleteDocument,
        moveDocuments,
        moveCategoryDocumentsAndDelete,
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
    throw new Error(
      "useDocuments must be used inside DocumentsProvider"
    );
  }

  return context;
}