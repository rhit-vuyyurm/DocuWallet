import { StyleSheet } from "react-native";

import {
  RADIUS,
  SHADOWS,
  SPACING,
} from "./theme";

export const createSettingsModalStyles = (colors) =>
  StyleSheet.create({
    backdrop: {
      alignItems: "center",
      backgroundColor: colors.modalBackdrop,
      flex: 1,
      justifyContent: "center",
      padding: SPACING.xl,
    },

    card: {
      backgroundColor: colors.surface,
      borderRadius: RADIUS.xxl,
      maxHeight: "78%",
      maxWidth: 440,
      padding: SPACING.lg,
      width: "100%",
      ...SHADOWS.card,
    },

    content: {
      flexGrow: 1,
    },

    titleRow: {
      alignItems: "flex-start",
      flexDirection: "row",
      justifyContent: "space-between",
    },

    title: {
      color: colors.text,
      fontSize: 24,
      fontWeight: "800",
    },

    subtitle: {
      color: colors.mutedText,
      fontSize: 14,
      lineHeight: 20,
      marginTop: SPACING.xs,
      maxWidth: 280,
    },

    settingsIconCircle: {
      alignItems: "center",
      backgroundColor: colors.secondary,
      borderRadius: 22,
      height: 44,
      justifyContent: "center",
      width: 44,
    },

    settingsIcon: {
      color: colors.secondaryText,
      fontSize: 22,
      fontWeight: "700",
    },

    sectionLabel: {
      color: colors.text,
      fontSize: 15,
      fontWeight: "800",
      marginTop: SPACING.xl,
    },

    options: {
      marginTop: SPACING.sm,
    },

    option: {
      alignItems: "center",
      backgroundColor: colors.panelSubtle,
      borderColor: colors.border,
      borderRadius: RADIUS.lg,
      borderWidth: 1,
      flexDirection: "row",
      marginBottom: SPACING.sm,
      padding: SPACING.md,
    },

    optionSelected: {
      backgroundColor: colors.selectedBackground,
      borderColor: colors.primary,
      borderWidth: 2,
    },

    optionPressed: {
      opacity: 0.88,
      transform: [
        {
          scale: 0.99,
        },
      ],
    },

    swatch: {
      borderRadius: 22,
      height: 44,
      marginRight: SPACING.sm,
      width: 44,
    },

    optionTextBox: {
      flex: 1,
      paddingRight: SPACING.sm,
    },

    optionTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "800",
    },

    optionDescription: {
      color: colors.mutedText,
      fontSize: 13,
      marginTop: SPACING.xxs,
    },

    selectionCircle: {
      alignItems: "center",
      borderColor: colors.border,
      borderRadius: 12,
      borderWidth: 1,
      height: 24,
      justifyContent: "center",
      width: 24,
    },

    selectionCircleSelected: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },

    selectionCheck: {
      color: colors.surface,
      fontSize: 15,
      fontWeight: "900",
      lineHeight: 17,
    },

    livePreviewText: {
      color: colors.mutedText,
      fontSize: 12,
      lineHeight: 18,
      marginTop: SPACING.xs,
      textAlign: "center",
    },

    doneButton: {
      alignItems: "center",
      backgroundColor: colors.primary,
      borderRadius: RADIUS.md,
      marginTop: SPACING.lg,
      paddingVertical: 14,
    },

    doneButtonPressed: {
      backgroundColor: colors.primaryPressed,
      opacity: 0.92,
    },

    doneButtonText: {
      color: colors.surface,
      fontSize: 15,
      fontWeight: "800",
    },
  });

export const getSettingsSwatchStyle = (color) => ({
  backgroundColor: color,
});
