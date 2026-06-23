import { StyleSheet } from "react-native";

import {
  RADIUS,
  SHADOWS,
  SPACING,
} from "./theme";

const PAGE_PADDING = SPACING.xl;

export const createThemePickerStyles = (colors) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: RADIUS.xl,
      marginBottom: SPACING.sm,
      marginHorizontal: PAGE_PADDING,
      padding: SPACING.lg,
      ...SHADOWS.card,
    },

    title: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "800",
    },

    description: {
      color: colors.softText,
      fontSize: 14,
      lineHeight: 20,
      marginTop: 6,
    },

    options: {
      marginTop: SPACING.md,
    },

    option: {
      alignItems: "center",
      backgroundColor: colors.panelSubtle,
      borderColor: colors.border,
      borderRadius: RADIUS.md,
      borderWidth: 1,
      flexDirection: "row",
      marginBottom: SPACING.xs,
      minHeight: 66,
      padding: SPACING.sm,
    },

    optionSelected: {
      backgroundColor: colors.selectedBackground,
      borderColor: colors.primary,
      borderWidth: 2,
    },

    optionPressed: {
      opacity: 0.86,
    },

    swatch: {
      borderRadius: RADIUS.pill,
      height: 24,
      marginRight: SPACING.sm,
      width: 24,
    },

    optionTextBox: {
      flex: 1,
    },

    optionTitle: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "800",
    },

    optionDescription: {
      color: colors.mutedText,
      fontSize: 12,
      marginTop: 2,
    },

    check: {
      color: colors.primary,
      fontSize: 19,
      fontWeight: "900",
      marginLeft: SPACING.xs,
    },
  });
