import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },

  container: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 36,
  },

  headerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,

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

  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  iconText: {
    fontSize: 25,
  },

  headerTextBox: {
    flex: 1,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#263238",
  },

  subtitle: {
    fontSize: 14,
    color: "#78909C",
    marginTop: 4,
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 22,

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.06)",
      },
    }),
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#263238",
  },

  emptyText: {
    fontSize: 14,
    color: "#78909C",
    marginTop: 8,
    lineHeight: 20,
  },

  documentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,

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

  documentName: {
    fontSize: 17,
    fontWeight: "800",
    color: "#263238",
  },

  documentMeta: {
    fontSize: 13,
    color: "#78909C",
    marginTop: 5,
    marginBottom: 14,
  },

  linkButton: {
    backgroundColor: "#495E57",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 10,
  },

  linkButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  secondaryButton: {
    flex: 1,
    backgroundColor: "#ECEFF1",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    marginRight: 8,
  },

  secondaryButtonText: {
    color: "#455A64",
    fontSize: 14,
    fontWeight: "800",
  },

  noteCard: {
    backgroundColor: "#FFF8E1",
    borderRadius: 18,
    padding: 16,
    marginTop: 6,
  },

  noteTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#795548",
  },

  noteText: {
    fontSize: 13,
    color: "#795548",
    marginTop: 4,
    lineHeight: 18,
  },

  errorText: {
    padding: 24,
    fontSize: 18,
    fontWeight: "800",
    color: "#C62828",
  },
  
  linkButtonHover: {
    backgroundColor: "#3F5A51",
  },

  secondaryButtonHover: {
    backgroundColor: "#D9E1E5",
  },

  buttonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  linkButton: {
    overflow: "hidden",
  },

  secondaryButton: {
    overflow: "hidden",
  },
});

export default styles;