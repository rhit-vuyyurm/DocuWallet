import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Platform } from "react-native";
import { File } from "expo-file-system";

import startingCategories from "../data/StartingCategories";
import { supabase } from "../lib/supabase";

const DocumentsContext = createContext(null);

const DOCUMENTS_BUCKET = "documents";
const SIGNED_URL_EXPIRATION_SECONDS = 60 * 60;

/*
  Converts your existing StartingCategories format into
  the column names Supabase expects.
*/
const DEFAULT_CATEGORY_ROWS = startingCategories.map(
  (category) => ({
    title: category.title,
    icon: category.icon,
    color: category.color,
    text_color:
      category.text_color ||
      category.textColor ||
      "#37474F",
    description: category.description,
  })
);

const getErrorMessage = (error) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "An unexpected error occurred.";
};

const formatSavedDate = (dateValue) => {
  if (!dateValue) {
    return "today";
  }

  return new Date(dateValue).toLocaleDateString();
};

const getFileExtension = (fileName) => {
  const name = String(fileName || "");
  const lastDotIndex = name.lastIndexOf(".");

  if (
    lastDotIndex <= 0 ||
    lastDotIndex === name.length - 1
  ) {
    return "";
  }

  return name.slice(lastDotIndex);
};

/*
  Keeps the original extension when a user types only a title.

  Example:
  Original: passport.pdf
  Typed: My Passport
  Saved: My Passport.pdf
*/
const normalizeDocumentName = (
  enteredName,
  originalName
) => {
  const cleanedName = String(
    enteredName || ""
  ).trim();

  const fallbackName = String(
    originalName || "Untitled document"
  ).trim();

  if (!cleanedName) {
    return fallbackName;
  }

  const originalExtension =
    getFileExtension(fallbackName);

  const enteredExtension =
    getFileExtension(cleanedName);

  if (originalExtension && !enteredExtension) {
    return `${cleanedName}${originalExtension}`;
  }

  return cleanedName;
};

const makeSafeFileName = (name) => {
  return String(name || "document")
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_+/g, "_");
};

const createStoragePath = (
  userId,
  originalFileName,
  index
) => {
  return (
    `${userId}/${Date.now()}-${index}-` +
    makeSafeFileName(originalFileName)
  );
};

const requireAuthenticatedSession = async () => {
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

const readUriAsArrayBuffer = async (uri) => {
  const response = await fetch(uri);

  if (!response.ok) {
    throw new Error(
      "Could not read the selected document."
    );
  }

  return response.arrayBuffer();
};

const getUploadBody = async (file) => {
  if (Platform.OS === "web") {
    if (file.webFile) {
      return file.webFile;
    }

    if (file.uri) {
      return readUriAsArrayBuffer(file.uri);
    }

    throw new Error(
      "The browser file could not be read."
    );
  }

  if (!file.uri) {
    throw new Error(
      "The selected document does not have a readable URI."
    );
  }

  try {
    const pickedFile = new File(file.uri);

    return await pickedFile.arrayBuffer();
  } catch {
    return readUriAsArrayBuffer(file.uri);
  }
};

const fetchCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return data || [];
};

const fetchDocuments = async () => {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return data || [];
};

const ensureDefaultCategories = async () => {
  let categories = await fetchCategories();

  if (categories.length > 0) {
    return categories;
  }

  const { error } = await supabase
    .from("categories")
    .insert(DEFAULT_CATEGORY_ROWS);

  if (error) {
    throw error;
  }

  categories = await fetchCategories();

  return categories;
};

const buildDocumentLibrary = (
  categoryRows,
  documentRows
) => {
  const documentsByCategory = new Map();
  const savedWithoutCategory = [];

  documentRows.forEach((documentRow) => {
    const document = {
      id: documentRow.id,
      name: documentRow.name,
      size: Number(documentRow.size || 0),
      type:
        documentRow.mime_type ||
        "application/octet-stream",
      storagePath: documentRow.storage_path,
      savedAt: formatSavedDate(
        documentRow.created_at
      ),
    };

    if (!documentRow.category_id) {
      savedWithoutCategory.push(document);
      return;
    }

    const categoryDocuments =
      documentsByCategory.get(
        documentRow.category_id
      ) || [];

    documentsByCategory.set(
      documentRow.category_id,
      [...categoryDocuments, document]
    );
  });

  const categories = categoryRows.map(
    (categoryRow) => ({
      id: categoryRow.id,
      title: categoryRow.title,
      icon: categoryRow.icon,
      color: categoryRow.color,
      textColor: categoryRow.text_color,
      description: categoryRow.description,
      documents:
        documentsByCategory.get(categoryRow.id) ||
        [],
    })
  );

  return {
    categories,
    savedWithoutCategory,
  };
};

export function DocumentsProvider({ children }) {
  const [categories, setCategories] = useState([]);

  const [savedWithoutCategory, setSavedWithoutCategory] =
    useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const refreshDocuments = useCallback(
    async (showLoading = true) => {
      if (showLoading) {
        setIsLoading(true);
      }

      setLoadError("");

      try {
        await requireAuthenticatedSession();

        const categoryRows =
          await ensureDefaultCategories();

        const documentRows = await fetchDocuments();

        const library = buildDocumentLibrary(
          categoryRows,
          documentRows
        );

        setCategories(library.categories);

        setSavedWithoutCategory(
          library.savedWithoutCategory
        );
      } catch (error) {
        console.error("Supabase load error:", error);

        setCategories([]);
        setSavedWithoutCategory([]);

        setLoadError(getErrorMessage(error));
      } finally {
        if (showLoading) {
          setIsLoading(false);
        }
      }
    },
    []
  );

  useEffect(() => {
    refreshDocuments();
  }, [refreshDocuments]);

  /*
    Creates a category and returns its Supabase row.

    Example returned value:
    {
      id: "uuid",
      title: "Insurance",
      ...
    }
  */
  const createCategory = useCallback(
    async (categoryName) => {
      const title = String(
        categoryName || ""
      ).trim();

      if (!title) {
        return null;
      }

      await requireAuthenticatedSession();

      const { data, error } = await supabase
        .from("categories")
        .insert({
          title,
          description: "Custom document category",
          icon: "📁",
          color: "#ECEFF1",
          text_color: "#37474F",
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      await refreshDocuments(false);

      return data;
    },
    [refreshDocuments]
  );

  /*
    Uploads all selected files.

    Each file can have:
    - originalName: actual uploaded filename
    - name: name typed by the user
  */
  const uploadDocuments = useCallback(
    async (categoryId, files) => {
      const selectedFiles = Array.from(files || []);

      if (!categoryId || selectedFiles.length === 0) {
        return {
          savedCount: 0,
          failedFiles: [],
        };
      }

      const session =
        await requireAuthenticatedSession();

      let savedCount = 0;
      const failedFiles = [];

      for (
        let index = 0;
        index < selectedFiles.length;
        index += 1
      ) {
        const file = selectedFiles[index];

        const originalFileName =
          file.originalName ||
          file.name ||
          "Untitled document";

        const displayName = normalizeDocumentName(
          file.name,
          originalFileName
        );

        const storagePath = createStoragePath(
          session.user.id,
          originalFileName,
          index
        );

        try {
          const uploadBody =
            await getUploadBody(file);

          const { error: uploadError } =
            await supabase.storage
              .from(DOCUMENTS_BUCKET)
              .upload(storagePath, uploadBody, {
                contentType:
                  file.type ||
                  "application/octet-stream",
                cacheControl: "3600",
                upsert: false,
              });

          if (uploadError) {
            throw uploadError;
          }

          const { error: databaseError } =
            await supabase
              .from("documents")
              .insert({
                category_id: categoryId,
                name: displayName,
                size: file.size || 0,
                mime_type:
                  file.type ||
                  "application/octet-stream",
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
          console.error(
            `Upload failed for ${displayName}:`,
            error
          );

          failedFiles.push({
            id: file.id,
            name: displayName,
            message: getErrorMessage(error),
          });
        }
      }

      await refreshDocuments(false);

      return {
        savedCount,
        failedFiles,
      };
    },
    [refreshDocuments]
  );

  /*
    Renames only the displayed document name.
    Its cloud storage location stays unchanged.
  */
  const renameDocument = useCallback(
    async (document, newName) => {
      const enteredName = String(
        newName || ""
      ).trim();

      if (!enteredName) {
        throw new Error(
          "Enter a name before saving."
        );
      }

      const finalName = normalizeDocumentName(
        enteredName,
        document.name
      );

      const { error } = await supabase
        .from("documents")
        .update({ name: finalName })
        .eq("id", document.id);

      if (error) {
        throw error;
      }

      await refreshDocuments(false);

      return finalName;
    },
    [refreshDocuments]
  );

  /*
    Deletes the cloud file and its database record.
  */
  const deleteDocument = useCallback(
    async (document) => {
      if (!document?.id || !document.storagePath) {
        throw new Error(
          "This document does not have a valid cloud record."
        );
      }

      await requireAuthenticatedSession();

      const { error: storageError } =
        await supabase.storage
          .from(DOCUMENTS_BUCKET)
          .remove([document.storagePath]);

      if (storageError) {
        throw storageError;
      }

      const { error: databaseError } =
        await supabase
          .from("documents")
          .delete()
          .eq("id", document.id);

      if (databaseError) {
        throw databaseError;
      }

      await refreshDocuments(false);
    },
    [refreshDocuments]
  );

  const createSignedDocumentUrl = useCallback(
    async (document) => {
      if (!document.storagePath) {
        throw new Error(
          "This document has no cloud storage path."
        );
      }

      const { data, error } = await supabase.storage
        .from(DOCUMENTS_BUCKET)
        .createSignedUrl(
          document.storagePath,
          SIGNED_URL_EXPIRATION_SECONDS
        );

      if (error) {
        throw error;
      }

      if (!data?.signedUrl) {
        throw new Error(
          "Could not create a secure document link."
        );
      }

      return data.signedUrl;
    },
    []
  );

  const deleteCategoryOnly = useCallback(
    async (categoryId) => {
      const { error: updateError } = await supabase
        .from("documents")
        .update({ category_id: null })
        .eq("category_id", categoryId);

      if (updateError) {
        throw updateError;
      }

      const { error: deleteError } = await supabase
        .from("categories")
        .delete()
        .eq("id", categoryId);

      if (deleteError) {
        throw deleteError;
      }

      await refreshDocuments(false);
    },
    [refreshDocuments]
  );

  const deleteCategoryAndDocuments = useCallback(
    async (categoryId) => {
      const {
        data: documentsToDelete,
        error: findDocumentsError,
      } = await supabase
        .from("documents")
        .select("storage_path")
        .eq("category_id", categoryId);

      if (findDocumentsError) {
        throw findDocumentsError;
      }

      const storagePaths = (documentsToDelete || [])
        .map((document) => document.storage_path)
        .filter(Boolean);

      if (storagePaths.length > 0) {
        const { error: storageError } =
          await supabase.storage
            .from(DOCUMENTS_BUCKET)
            .remove(storagePaths);

        if (storageError) {
          throw storageError;
        }
      }

      const { error: documentsError } =
        await supabase
          .from("documents")
          .delete()
          .eq("category_id", categoryId);

      if (documentsError) {
        throw documentsError;
      }

      const { error: categoryError } =
        await supabase
          .from("categories")
          .delete()
          .eq("id", categoryId);

      if (categoryError) {
        throw categoryError;
      }

      await refreshDocuments(false);
    },
    [refreshDocuments]
  );

  const getCategoryById = useCallback(
    (categoryId) => {
      return categories.find(
        (category) => category.id === categoryId
      );
    },
    [categories]
  );

  const totalDocuments = useMemo(() => {
    const categorizedDocuments = categories.reduce(
      (total, category) => {
        return total + category.documents.length;
      },
      0
    );

    return (
      categorizedDocuments +
      savedWithoutCategory.length
    );
  }, [categories, savedWithoutCategory]);

  const value = useMemo(
    () => ({
      categories,
      savedWithoutCategory,
      totalDocuments,
      isLoading,
      loadError,

      refreshDocuments,
      createCategory,
      uploadDocuments,

      renameDocument,
      deleteDocument,
      createSignedDocumentUrl,

      deleteCategoryOnly,
      deleteCategoryAndDocuments,
      getCategoryById,
    }),
    [
      categories,
      createCategory,
      createSignedDocumentUrl,
      deleteCategoryAndDocuments,
      deleteCategoryOnly,
      deleteDocument,
      getCategoryById,
      isLoading,
      loadError,
      refreshDocuments,
      renameDocument,
      savedWithoutCategory,
      totalDocuments,
      uploadDocuments,
    ]
  );

  return (
    <DocumentsContext.Provider value={value}>
      {children}
    </DocumentsContext.Provider>
  );
}

export function useDocuments() {
  const context = useContext(DocumentsContext);

  if (!context) {
    throw new Error(
      "useDocuments must be used inside DocumentsProvider."
    );
  }

  return context;
}