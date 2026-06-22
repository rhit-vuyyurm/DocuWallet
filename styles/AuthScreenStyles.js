import { StyleSheet } from "react-native";

import {
  COLORS,
  RADIUS,
  SHADOWS,
  SPACING,
} from "./theme";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.header,
  },

  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: SPACING.xl,
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xxl,
    padding: SPACING.xl,
    ...SHADOWS.card,
  },

  logoImage: {
    width: 76,
    height: 76,
    alignSelf: "center",
    borderRadius: 38,
  },

  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "800",
    marginTop: SPACING.md,
    textAlign: "center",
  },

  subtitle: {
    color: "#607D8B",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: SPACING.lg,
    marginTop: SPACING.xs,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    color: COLORS.text,
    fontSize: 16,
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: 13,
  },

  submitButton: {
    marginTop: SPACING.xs,
  },

  modeButton: {
    alignItems: "center",
    marginTop: SPACING.md,
    padding: SPACING.xs,
  },

  modeButtonPressed: {
    opacity: 0.7,
  },

  modeButtonText: {
    color: "#1565C0",
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
  },
});

export default styles;