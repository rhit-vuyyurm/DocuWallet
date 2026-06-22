import { Platform, StyleSheet } from "react-native";

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
    backgroundColor: "#F4F6F8",
  },

  centeredScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4F6F8",
    padding: 24,
  },

  errorText: {
    color: "#C62828",
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },

  container: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 36,
  },

  headerCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    flexDirection: "row",
    marginBottom: 18,
    padding: 20,
    ...cardShadow,
  },

  iconCircle: {
    alignItems: "center",
    borderRadius: 27,
    height: 54,
    justifyContent: "center",
    marginRight: 14,
    width: 54,
  },

  iconText: {
    fontSize: 25,
  },

  headerTextBox: {
    flex: 1,
  },

  title: {
    color: "#263238",
    fontSize: 26,
    fontWeight: "800",
  },

  subtitle: {
    color: "#78909C",
    fontSize: 14,
    marginTop: 4,
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 22,
    ...subtleShadow,
  },

  emptyTitle: {
    color: "#263238",
    fontSize: 19,
    fontWeight: "800",
  },

  emptyText: {
    color: "#78909C",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },

  documentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    marginBottom: 14,
    padding: 18,
    ...subtleShadow,
  },

  documentHeader: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  documentTextColumn: {
    flex: 1,
    marginRight: 12,
  },

  documentName: {
    color: "#263238",
    fontSize: 17,
    fontWeight: "800",
  },

  renameButton: {
    alignSelf: "flex-start",
    marginTop: 5,
    paddingVertical: 2,
  },

  renameButtonText: {
    color: "#1565C0",
    fontSize: 13,
    fontWeight: "800",
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

  renameLabel: {
    color: "#455A64",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 6,
  },

  renameInput: {
    borderColor: "#CFD8DC",
    borderRadius: 12,
    borderWidth: 1,
    color: "#263238",
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },

  renameActions: {
    flexDirection: "row",
    marginTop: 10,
  },

  cancelRenameButton: {
    alignItems: "center",
    backgroundColor: "#E7ECEE",
    borderRadius: 12,
    flex: 1,
    marginRight: 6,
    paddingVertical: 12,
  },

  cancelRenameText: {
    color: "#31464D",
    fontSize: 14,
    fontWeight: "800",
  },

  saveRenameButton: {
    alignItems: "center",
    backgroundColor: "#495E57",
    borderRadius: 12,
    flex: 1,
    marginLeft: 6,
    paddingVertical: 12,
  },

  saveRenameText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  documentMeta: {
    color: "#78909C",
    fontSize: 13,
    marginBottom: 14,
    marginTop: 8,
  },

  openButton: {
    alignItems: "center",
    backgroundColor: "#495E57",
    borderRadius: 14,
    marginBottom: 10,
    paddingVertical: 14,
  },

  openButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  actionRow: {
    flexDirection: "row",
  },

  secondaryButtonLeft: {
    alignItems: "center",
    backgroundColor: "#E7ECEE",
    borderRadius: 14,
    flex: 1,
    marginRight: 4,
    paddingVertical: 12,
  },

  secondaryButtonRight: {
    alignItems: "center",
    backgroundColor: "#E7ECEE",
    borderRadius: 14,
    flex: 1,
    marginLeft: 4,
    paddingVertical: 12,
  },

  secondaryButtonText: {
    color: "#31464D",
    fontSize: 14,
    fontWeight: "800",
  },

  buttonDisabled: {
    opacity: 0.55,
  },

  noteCard: {
    backgroundColor: "#FFF8E1",
    borderRadius: 18,
    marginTop: 6,
    padding: 16,
  },

  noteTitle: {
    color: "#795548",
    fontSize: 15,
    fontWeight: "800",
  },

  noteText: {
    color: "#795548",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },
});

export default styles;
