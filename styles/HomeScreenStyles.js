import { Platform, StyleSheet } from "react-native";

const PAGE_PADDING = 24;
const GRID_GAP = 16;

const cardShadow =
  Platform.select({
    ios: {
      shadowColor: "#000000",
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: {
        width: 0,
        height: 6,
      },
    },
    android: {
      elevation: 3,
    },
    web: {
      boxShadow:
        "0px 8px 20px rgba(0, 0, 0, 0.08)",
    },
  }) || {};

const subtleShadow =
  Platform.select({
    ios: {
      shadowColor: "#000000",
      shadowOpacity: 0.06,
      shadowRadius: 10,
      shadowOffset: {
        width: 0,
        height: 5,
      },
    },
    android: {
      elevation: 2,
    },
    web: {
      boxShadow:
        "0px 6px 16px rgba(0, 0, 0, 0.06)",
    },
  }) || {};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#263238",
  },

  statusScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#263238",
    padding: 24,
  },

  statusTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 16,
    textAlign: "center",
  },

  statusMessage: {
    color: "#CFD8DC",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 12,
    textAlign: "center",
  },

  retryButton: {
    alignItems: "center",
    backgroundColor: "#495E57",
    borderRadius: 14,
    marginTop: 22,
    paddingHorizontal: 22,
    paddingVertical: 14,
  },

  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  container: {
    flexGrow: 1,
    backgroundColor: "#F4F6F8",
    paddingBottom: 32,
  },

  header: {
    backgroundColor: "#263238",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingBottom: 28,
    paddingHorizontal: PAGE_PADDING,
    paddingTop: 48,
  },

  headerTopRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  appName: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
  },

  headerSubtitle: {
    color: "#CFD8DC",
    fontSize: 15,
    marginTop: 6,
  },

  logoImage: {
    borderRadius: 29,
    height: 58,
    width: 58,
  },

  statsRow: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 22,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 26,
    paddingVertical: 18,
  },

  statBox: {
    alignItems: "center",
    flex: 1,
  },

  statNumber: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
  },

  statLabel: {
    color: "#CFD8DC",
    fontSize: 12,
    marginTop: 4,
  },

  statDivider: {
    backgroundColor: "rgba(255, 255, 255, 0.22)",
    height: 34,
    width: 1,
  },

  uploadPanel: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    marginBottom: 16,
    marginHorizontal: PAGE_PADDING,
    marginTop: 22,
    padding: 20,
    ...cardShadow,
  },

  uploadPanelTitle: {
    color: "#263238",
    fontSize: 22,
    fontWeight: "800",
  },

  uploadPanelSubtitle: {
    color: "#78909C",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 5,
  },

  dropZone: {
    alignItems: "center",
    backgroundColor: "#F8FAFB",
    borderColor: "#B0BEC5",
    borderRadius: 20,
    borderStyle: "dashed",
    borderWidth: 2,
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  dropZoneIcon: {
    fontSize: 42,
    marginBottom: 10,
  },

  dropZoneTitle: {
    color: "#263238",
    fontSize: 18,
    fontWeight: "800",
  },

  dropZoneText: {
    color: "#78909C",
    fontSize: 13,
    marginBottom: 18,
    marginTop: 6,
    textAlign: "center",
  },

  uploadButton: {
    alignItems: "center",
    backgroundColor: "#495E57",
    borderRadius: 14,
    paddingHorizontal: 22,
    paddingVertical: 14,
  },

  uploadButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  takePhotoButton: {
    alignItems: "center",
    backgroundColor: "#E7ECEE",
    borderRadius: 14,
    marginTop: 12,
    paddingHorizontal: 22,
    paddingVertical: 14,
  },

  takePhotoButtonText: {
    color: "#31464D",
    fontSize: 15,
    fontWeight: "800",
  },

  pendingFilesBox: {
    backgroundColor: "#F8FAFB",
    borderRadius: 18,
    marginTop: 18,
    padding: 14,
  },

  pendingFilesHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  pendingFilesTitle: {
    color: "#263238",
    fontSize: 16,
    fontWeight: "800",
  },

  clearFilesText: {
    color: "#C62828",
    fontSize: 13,
    fontWeight: "800",
  },

  fileRow: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    flexDirection: "row",
    marginBottom: 8,
    padding: 12,
  },

  fileInfo: {
    flex: 1,
    marginRight: 12,
  },

  fileLabel: {
    color: "#607D8B",
    fontSize: 11,
    fontWeight: "800",
    marginBottom: 4,
  },

  fileNameInput: {
    borderBottomColor: "#CFD8DC",
    borderBottomWidth: 1,
    color: "#263238",
    fontSize: 14,
    fontWeight: "700",
    paddingBottom: 5,
    paddingTop: 2,
  },

  fileMeta: {
    color: "#78909C",
    fontSize: 12,
    fontWeight: "700",
  },

  assignTitle: {
    color: "#263238",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 10,
    marginTop: 12,
  },

  categoryChipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  categoryChip: {
    backgroundColor: "#FFFFFF",
    borderColor: "#CFD8DC",
    borderRadius: 999,
    borderWidth: 1,
    marginBottom: 8,
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },

  categoryChipPressed: {
    opacity: 0.82,
  },

  selectedCategoryChip: {
    backgroundColor: "#495E57",
    borderColor: "#495E57",
  },

  categoryChipText: {
    color: "#455A64",
    fontSize: 13,
    fontWeight: "800",
  },

  selectedCategoryChipText: {
    color: "#FFFFFF",
  },

  addUploadCategoryButton: {
    alignItems: "center",
    marginTop: 4,
    paddingVertical: 10,
  },

  addUploadCategoryButtonText: {
    color: "#1565C0",
    fontSize: 14,
    fontWeight: "800",
  },

  categoryForm: {
    backgroundColor: "#FFFFFF",
    borderColor: "#ECEFF1",
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 12,
    padding: 14,
  },

  categoryFormTitle: {
    color: "#263238",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 10,
  },

  categoryFormInput: {
    borderColor: "#CFD8DC",
    borderRadius: 12,
    borderWidth: 1,
    color: "#263238",
    fontSize: 14,
    padding: 12,
  },

  categoryFormActions: {
    flexDirection: "row",
    marginTop: 10,
  },

  categoryFormCancelButton: {
    alignItems: "center",
    backgroundColor: "#E7ECEE",
    borderRadius: 12,
    flex: 1,
    marginRight: 5,
    paddingVertical: 12,
  },

  categoryFormCancelText: {
    color: "#31464D",
    fontSize: 13,
    fontWeight: "800",
  },

  categoryFormSaveButton: {
    alignItems: "center",
    backgroundColor: "#495E57",
    borderRadius: 12,
    flex: 1,
    marginLeft: 5,
    paddingVertical: 12,
  },

  categoryFormSaveText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },

  saveDocumentsButton: {
    alignItems: "center",
    backgroundColor: "#495E57",
    borderRadius: 16,
    marginTop: 12,
    paddingVertical: 15,
  },

  saveDocumentsButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  buttonDisabled: {
    opacity: 0.55,
  },

  quickActionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    marginBottom: 10,
    marginHorizontal: PAGE_PADDING,
    padding: 20,
    ...cardShadow,
  },

  quickActionTitle: {
    color: "#263238",
    fontSize: 18,
    fontWeight: "800",
  },

  quickActionText: {
    color: "#607D8B",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },

  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
    marginHorizontal: PAGE_PADDING,
    marginTop: 18,
  },

  sectionTitle: {
    color: "#263238",
    fontSize: 22,
    fontWeight: "800",
  },

  sectionHint: {
    color: "#78909C",
    fontSize: 13,
    fontWeight: "600",
  },

  categoryGrid: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: PAGE_PADDING,
  },

  categoryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    justifyContent: "space-between",
    marginBottom: GRID_GAP,
    minHeight: 190,
    padding: 16,
    ...subtleShadow,
  },

  categoryCardPressed: {
    opacity: 0.92,
    transform: [
      {
        scale: 0.99,
      },
    ],
  },

  cardTopRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  iconCircle: {
    alignItems: "center",
    borderRadius: 23,
    height: 46,
    justifyContent: "center",
    width: 46,
  },

  iconText: {
    fontSize: 23,
  },

  deleteButton: {
    alignItems: "center",
    backgroundColor: "#FFEBEE",
    borderRadius: 14,
    height: 28,
    justifyContent: "center",
    width: 28,
  },

  deleteButtonPressed: {
    opacity: 0.7,
  },

  deleteButtonText: {
    color: "#C62828",
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 24,
  },

  cardTitle: {
    color: "#263238",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 6,
    marginTop: 12,
  },

  cardDescription: {
    color: "#78909C",
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 10,
  },

  latestDocument: {
    color: "#607D8B",
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 10,
  },

  documentBadge: {
    backgroundColor: "#F5F7F9",
    borderRadius: 999,
    maxWidth: "75%",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  documentBadgeText: {
    fontSize: 11,
    fontWeight: "800",
  },

  savedWithoutCategoryCard: {
    backgroundColor: "#FFF8E1",
    borderRadius: 18,
    marginBottom: 12,
    marginHorizontal: PAGE_PADDING,
    padding: 16,
  },

  savedWithoutCategoryTitle: {
    color: "#795548",
    fontSize: 15,
    fontWeight: "800",
  },

  savedWithoutCategoryText: {
    color: "#795548",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },

  addCategoryButton: {
    alignItems: "center",
    backgroundColor: "#495E57",
    borderRadius: 18,
    marginHorizontal: PAGE_PADDING,
    marginTop: 10,
    paddingVertical: 17,
  },

  addCategoryButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },
});

export const getCategoryGridLayout = (screenWidth) => {
  let columns = 1;

  if (screenWidth >= 1400) {
    columns = 4;
  } else if (screenWidth >= 1000) {
    columns = 3;
  } else if (screenWidth >= 600) {
    columns = 2;
  }

  const availableWidth =
    screenWidth -
    PAGE_PADDING * 2 -
    GRID_GAP * (columns - 1);

  return {
    columns,
    cardWidth: availableWidth / columns,
  };
};

export const getCategoryCardStyle = (
  cardWidth,
  index,
  columns
) => {
  return {
    width: cardWidth,
    marginRight:
      (index + 1) % columns === 0
        ? 0
        : GRID_GAP,
  };
};

export const getCategoryIconStyle = (color) => {
  return {
    backgroundColor: color,
  };
};

export const getCategoryTextColorStyle = (color) => {
  return {
    color,
  };
};

export default styles;
