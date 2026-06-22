import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#263238",
  },

  container: {
    flexGrow: 1,
    backgroundColor: "#F4F6F8",
    paddingBottom: 32,
  },

  header: {
    backgroundColor: "#263238",
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 28,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  appName: {
    fontSize: 34,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },

  headerSubtitle: {
    fontSize: 15,
    color: "#CFD8DC",
    marginTop: 6,
  },

  logoCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#F4CE14",
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    fontSize: 26,
    fontWeight: "900",
    color: "#263238",
  },

  statsRow: {
    marginTop: 26,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 22,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  statBox: {
    alignItems: "center",
    flex: 1,
  },

  statNumber: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  statLabel: {
    fontSize: 12,
    color: "#CFD8DC",
    marginTop: 4,
  },

  statDivider: {
    width: 1,
    height: 34,
    backgroundColor: "rgba(255, 255, 255, 0.22)",
  },

  uploadPanel: {
    marginHorizontal: 24,
    marginTop: 22,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.08)",
      },
    }),
  },

  uploadPanelHeader: {
    marginBottom: 16,
  },

  uploadPanelTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#263238",
  },

  uploadPanelSubtitle: {
    fontSize: 14,
    color: "#78909C",
    marginTop: 5,
    lineHeight: 20,
  },

  dropZone: {
    borderWidth: 2,
    borderColor: "#B0BEC5",
    borderStyle: "dashed",
    borderRadius: 20,
    paddingVertical: 34,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "#F8FAFB",
  },

  dropZoneIcon: {
    fontSize: 42,
    marginBottom: 10,
  },

  dropZoneTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#263238",
  },

  dropZoneText: {
    fontSize: 13,
    color: "#78909C",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 18,
  },

  uploadButton: {
    backgroundColor: "#495E57",
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 14,
  },

  uploadButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  pendingFilesBox: {
    marginTop: 18,
    backgroundColor: "#F8FAFB",
    borderRadius: 18,
    padding: 14,
  },

  pendingFilesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  pendingFilesTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#263238",
  },

  clearFilesText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#C62828",
  },

  fileRow: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  fileName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: "#263238",
    marginRight: 12,
  },

  fileMeta: {
    fontSize: 12,
    color: "#78909C",
    fontWeight: "700",
  },

  assignTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#263238",
    marginTop: 12,
    marginBottom: 10,
  },

  categoryChipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  categoryChip: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CFD8DC",
    borderRadius: 999,
    paddingVertical: 9,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },

  selectedCategoryChip: {
    backgroundColor: "#495E57",
    borderColor: "#495E57",
  },

  categoryChipText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#455A64",
  },

  selectedCategoryChipText: {
    color: "#FFFFFF",
  },

  saveDocumentsButton: {
    backgroundColor: "#495E57",
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
  },

  saveDocumentsButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  quickActionCard: {
    marginHorizontal: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    marginBottom: 10,

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.08)",
      },
    }),
  },

  quickActionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#263238",
  },

  quickActionText: {
    fontSize: 14,
    color: "#607D8B",
    marginTop: 6,
    lineHeight: 20,
  },

  sectionHeader: {
    marginHorizontal: 24,
    marginTop: 18,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#263238",
  },

  sectionHint: {
    fontSize: 13,
    color: "#78909C",
    fontWeight: "600",
  },

  categoryGrid: {
    paddingHorizontal: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },

  categoryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 16,
    marginBottom: 16,
    minHeight: 190,
    justifyContent: "space-between",

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.07,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.07)",
      },
    }),
  },

  selectedCategoryCard: {
    borderWidth: 2,
    borderColor: "#495E57",
  },

  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },

  iconText: {
    fontSize: 23,
  },

  deleteButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFEBEE",
    alignItems: "center",
    justifyContent: "center",
  },

  deleteButtonText: {
    color: "#C62828",
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 24,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#263238",
    marginTop: 12,
    marginBottom: 6,
  },

  cardDescription: {
    fontSize: 12,
    color: "#78909C",
    lineHeight: 17,
    marginBottom: 10,
  },

  latestDocument: {
    fontSize: 11,
    color: "#607D8B",
    marginBottom: 10,
    fontWeight: "600",
  },

  cardBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },

  documentBadge: {
    backgroundColor: "#F5F7F9",
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
    maxWidth: "75%",
  },

  documentBadgeText: {
    fontSize: 11,
    fontWeight: "800",
  },

  categoryDocumentsPanel: {
    marginHorizontal: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.08)",
      },
    }),
  },

  categoryDocumentsTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#263238",
    marginBottom: 12,
  },

  emptyDocumentsText: {
    fontSize: 14,
    color: "#78909C",
    lineHeight: 20,
  },

  savedDocumentRow: {
    backgroundColor: "#F8FAFB",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },

  documentInfo: {
    flex: 1,
  },

  savedDocumentName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#263238",
  },

  savedDocumentMeta: {
    fontSize: 12,
    color: "#78909C",
    fontWeight: "700",
    marginTop: 4,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    fontSize: 14,
    color: "#263238",
    borderWidth: 1,
    borderColor: "#ECEFF1",
  },

  formButtonRow: {
    flexDirection: "row",
    marginTop: 12,
  },

  cancelSmallButton: {
    flex: 1,
    backgroundColor: "#ECEFF1",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    marginRight: 6,
  },

  cancelSmallButtonText: {
    color: "#455A64",
    fontSize: 13,
    fontWeight: "800",
  },

  saveSmallButton: {
    flex: 1,
    backgroundColor: "#495E57",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    marginLeft: 6,
  },

  saveSmallButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },

  savedWithoutCategoryCard: {
    marginHorizontal: 24,
    backgroundColor: "#FFF8E1",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },

  savedWithoutCategoryTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#795548",
  },

  savedWithoutCategoryText: {
    fontSize: 13,
    color: "#795548",
    marginTop: 4,
    lineHeight: 18,
  },

  addCategoryCard: {
    marginHorizontal: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    marginBottom: 12,

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.07,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.07)",
      },
    }),
  },

  addCategoryTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#263238",
    marginBottom: 12,
  },

  addButton: {
    marginHorizontal: 24,
    marginTop: 10,
    backgroundColor: "#495E57",
    paddingVertical: 17,
    borderRadius: 18,
    alignItems: "center",

    ...Platform.select({
      ios: {
        shadowColor: "#495E57",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: "0px 8px 18px rgba(73, 94, 87, 0.25)",
      },
    }),
  },

  addButtonPressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.9,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },
});

export default styles;