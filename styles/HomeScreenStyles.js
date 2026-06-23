import { StyleSheet } from "react-native";

import {
  RADIUS,
  SHADOWS,
  SPACING,
  THEMES,
} from "./theme";

const PAGE_PADDING = SPACING.xl;
const GRID_GAP = SPACING.md;

export const createHomeScreenStyles = (colors) =>
  StyleSheet.create({
    screen: {
      backgroundColor: colors.header,
      flex: 1,
    },

    statusScreen: {
      alignItems: "center",
      backgroundColor: colors.header,
      flex: 1,
      justifyContent: "center",
      padding: SPACING.xl,
    },

    statusTitle: {
      color: colors.surface,
      fontSize: 20,
      fontWeight: "800",
      marginTop: SPACING.md,
      textAlign: "center",
    },

    statusMessage: {
      color: colors.lightText,
      fontSize: 14,
      lineHeight: 20,
      marginTop: SPACING.sm,
      textAlign: "center",
    },

    retryButton: {
      alignItems: "center",
      backgroundColor: colors.primary,
      borderRadius: RADIUS.md,
      marginTop: 22,
      paddingHorizontal: 22,
      paddingVertical: 14,
    },

    retryButtonText: {
      color: colors.surface,
      fontSize: 15,
      fontWeight: "800",
    },

    container: {
      backgroundColor: colors.background,
      flexGrow: 1,
      paddingBottom: SPACING.xxl,
    },

    header: {
      backgroundColor: colors.header,
      borderBottomLeftRadius: RADIUS.xxl + SPACING.xs,
      borderBottomRightRadius: RADIUS.xxl + SPACING.xs,
      paddingBottom: 28,
      paddingHorizontal: PAGE_PADDING,
      paddingTop: 48,
    },

    headerTopRow: {
      alignItems: "center",
      flexDirection: "row",
      paddingRight: 62,
    },

    brandRow: {
      alignItems: "center",
      flexDirection: "row",
      flexShrink: 1,
    },

    headerTextBox: {
      flexShrink: 1,
    },

    appName: {
      color: colors.surface,
      fontSize: 34,
      fontWeight: "800",
    },

    headerSubtitle: {
      color: colors.lightText,
      fontSize: 15,
      marginTop: 6,
    },

    settingsButton: {
      alignItems: "center",
      backgroundColor: colors.headerOverlay,
      borderColor: colors.headerDivider,
      borderRadius: 25,
      borderWidth: 1,
      height: 50,
      justifyContent: "center",
      position: "absolute",
      right: PAGE_PADDING,
      top: 48,
      width: 50,
      zIndex: 2,
    },

    settingsButtonPressed: {
      opacity: 0.82,
      transform: [
        {
          scale: 0.96,
        },
      ],
    },

    settingsButtonIcon: {
      color: colors.surface,
      fontSize: 23,
      fontWeight: "700",
      lineHeight: 25,
    },

    logoImage: {
      borderRadius: 30,
      borderColor : "white",
      borderWidth : 2,
      height: 60,
      marginLeft: SPACING.sm,
      width: 60,
    },

    statsRow: {
      alignItems: "center",
      backgroundColor: colors.headerOverlay,
      borderRadius: RADIUS.xl,
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
      color: colors.surface,
      fontSize: 22,
      fontWeight: "800",
    },

    statLabel: {
      color: colors.lightText,
      fontSize: 12,
      marginTop: SPACING.xxs,
    },

    statDivider: {
      backgroundColor: colors.headerDivider,
      height: 34,
      width: 1,
    },

    uploadPanel: {
      backgroundColor: colors.surface,
      borderRadius: RADIUS.xxl,
      marginBottom: SPACING.md,
      marginHorizontal: PAGE_PADDING,
      marginTop: 22,
      padding: SPACING.lg,
      ...SHADOWS.card,
    },

    uploadPanelTitle: {
      color: colors.text,
      fontSize: 22,
      fontWeight: "800",
    },

    uploadPanelSubtitle: {
      color: colors.mutedText,
      fontSize: 14,
      lineHeight: 20,
      marginTop: 5,
    },

    dropZone: {
      alignItems: "center",
      backgroundColor: colors.panelSubtle,
      borderColor: colors.dropZoneBorder,
      borderRadius: RADIUS.lg + SPACING.xs,
      borderStyle: "dashed",
      borderWidth: 2,
      marginTop: SPACING.md,
      paddingHorizontal: SPACING.lg,
      paddingVertical: 30,
    },

    dropZoneIcon: {
      fontSize: 42,
      marginBottom: SPACING.sm,
    },

    dropZoneTitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "800",
    },

    dropZoneText: {
      color: colors.mutedText,
      fontSize: 13,
      marginBottom: RADIUS.lg,
      marginTop: 6,
      textAlign: "center",
    },

    uploadButton: {
      alignItems: "center",
      backgroundColor: colors.primary,
      borderRadius: RADIUS.md,
      paddingHorizontal: 22,
      paddingVertical: 14,
    },

    uploadButtonText: {
      color: colors.surface,
      fontSize: 15,
      fontWeight: "800",
    },

    takePhotoButton: {
      alignItems: "center",
      backgroundColor: colors.secondary,
      borderRadius: RADIUS.md,
      marginTop: SPACING.sm,
      paddingHorizontal: 22,
      paddingVertical: 14,
    },

    takePhotoButtonText: {
      color: colors.secondaryText,
      fontSize: 15,
      fontWeight: "800",
    },

    pendingFilesBox: {
      backgroundColor: colors.panelSubtle,
      borderRadius: RADIUS.lg,
      marginTop: RADIUS.lg,
      padding: RADIUS.md,
    },

    pendingFilesHeader: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: SPACING.sm,
    },

    pendingFilesTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "800",
    },

    clearFilesText: {
      color: colors.danger,
      fontSize: 13,
      fontWeight: "800",
    },

    fileRow: {
      alignItems: "center",
      backgroundColor: colors.surface,
      borderRadius: RADIUS.sm,
      flexDirection: "row",
      marginBottom: SPACING.xs,
      padding: SPACING.sm,
    },

    fileInfo: {
      flex: 1,
      marginRight: SPACING.sm,
    },

    fileLabel: {
      color: colors.softText,
      fontSize: 11,
      fontWeight: "800",
      marginBottom: SPACING.xxs,
    },

    fileNameInput: {
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
      color: colors.text,
      fontSize: 14,
      fontWeight: "700",
      paddingBottom: 5,
      paddingTop: 2,
    },

    fileMeta: {
      color: colors.mutedText,
      fontSize: 12,
      fontWeight: "700",
    },

    assignTitle: {
      color: colors.text,
      fontSize: 15,
      fontWeight: "800",
      marginBottom: SPACING.sm,
      marginTop: SPACING.sm,
    },

    categoryChipWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
    },

    categoryChip: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: RADIUS.pill,
      borderWidth: 1,
      marginBottom: SPACING.xs,
      marginRight: SPACING.xs,
      paddingHorizontal: SPACING.sm,
      paddingVertical: 9,
    },

    categoryChipPressed: {
      opacity: 0.82,
    },

    selectedCategoryChip: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },

    categoryChipText: {
      color: colors.secondaryText,
      fontSize: 13,
      fontWeight: "800",
    },

    selectedCategoryChipText: {
      color: colors.surface,
    },

    addUploadCategoryButton: {
      alignItems: "center",
      marginTop: SPACING.xxs,
      paddingVertical: SPACING.sm - 2,
    },

    addUploadCategoryButtonText: {
      color: colors.link,
      fontSize: 14,
      fontWeight: "800",
    },

    categoryForm: {
      backgroundColor: colors.surface,
      borderColor: colors.inputBorder,
      borderRadius: RADIUS.md + 2,
      borderWidth: 1,
      marginTop: SPACING.sm,
      padding: RADIUS.md,
    },

    categoryFormTitle: {
      color: colors.text,
      fontSize: 15,
      fontWeight: "800",
      marginBottom: SPACING.sm - 2,
    },

    categoryFormInput: {
      borderColor: colors.border,
      borderRadius: RADIUS.sm,
      borderWidth: 1,
      color: colors.text,
      fontSize: 14,
      padding: SPACING.sm,
    },

    categoryFormActions: {
      flexDirection: "row",
      marginTop: SPACING.sm - 2,
    },

    categoryFormCancelButton: {
      alignItems: "center",
      backgroundColor: colors.secondary,
      borderRadius: RADIUS.sm,
      flex: 1,
      marginRight: 5,
      paddingVertical: SPACING.sm,
    },

    categoryFormCancelText: {
      color: colors.secondaryText,
      fontSize: 13,
      fontWeight: "800",
    },

    categoryFormSaveButton: {
      alignItems: "center",
      backgroundColor: colors.primary,
      borderRadius: RADIUS.sm,
      flex: 1,
      marginLeft: 5,
      paddingVertical: SPACING.sm,
    },

    categoryFormSaveText: {
      color: colors.surface,
      fontSize: 13,
      fontWeight: "800",
    },

    saveDocumentsButton: {
      alignItems: "center",
      backgroundColor: colors.primary,
      borderRadius: RADIUS.md + 2,
      marginTop: SPACING.sm,
      paddingVertical: 15,
    },

    saveDocumentsButtonText: {
      color: colors.surface,
      fontSize: 16,
      fontWeight: "800",
    },

    buttonDisabled: {
      opacity: 0.55,
    },

    quickActionCard: {
      backgroundColor: colors.surface,
      borderRadius: RADIUS.xl,
      marginBottom: 10,
      marginHorizontal: PAGE_PADDING,
      padding: SPACING.lg,
      ...SHADOWS.card,
    },

    quickActionTitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "800",
    },

    quickActionText: {
      color: colors.softText,
      fontSize: 14,
      lineHeight: 20,
      marginTop: 6,
    },

    appearanceCard: {
      backgroundColor: colors.surface,
      borderRadius: RADIUS.xl,
      marginBottom: 10,
      marginHorizontal: PAGE_PADDING,
      padding: SPACING.lg,
      ...SHADOWS.card,
    },

    appearanceTitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "800",
    },

    appearanceText: {
      color: colors.softText,
      fontSize: 14,
      lineHeight: 20,
      marginTop: 6,
    },

    themeOptions: {
      flexDirection: "row",
      marginTop: SPACING.md,
    },

    themeOption: {
      alignItems: "center",
      backgroundColor: colors.panelSubtle,
      borderColor: colors.border,
      borderRadius: RADIUS.md,
      borderWidth: 1,
      flex: 1,
      flexDirection: "row",
      minHeight: 72,
      padding: SPACING.sm,
    },

    themeOptionLeft: {
      marginRight: SPACING.xs,
    },

    themeOptionRight: {
      marginLeft: SPACING.xs,
    },

    themeOptionSelected: {
      backgroundColor: colors.selectedBackground,
      borderColor: colors.primary,
      borderWidth: 2,
    },

    themeSwatch: {
      borderRadius: RADIUS.pill,
      height: 20,
      marginRight: SPACING.xs,
      width: 20,
    },

    themeSwatchClassic: {
      backgroundColor: THEMES.classic.primary,
    },

    themeSwatchPink: {
      backgroundColor: THEMES.pink.primary,
    },

    themeOptionTextBox: {
      flex: 1,
    },

    themeOptionTitle: {
      color: colors.text,
      fontSize: 13,
      fontWeight: "800",
    },

    themeOptionDescription: {
      color: colors.mutedText,
      fontSize: 11,
      marginTop: 2,
    },

    themeSelectedCheck: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: "900",
      marginLeft: SPACING.xs,
    },

    sectionHeader: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: SPACING.md - 2,
      marginHorizontal: PAGE_PADDING,
      marginTop: RADIUS.lg,
    },

    sectionTitle: {
      color: colors.text,
      fontSize: 22,
      fontWeight: "800",
    },

    sectionHint: {
      color: colors.mutedText,
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
      backgroundColor: colors.surface,
      borderRadius: RADIUS.xl,
      justifyContent: "space-between",
      marginBottom: GRID_GAP,
      minHeight: 190,
      padding: SPACING.md,
      ...SHADOWS.subtleCard,
    },

    categoryCardPressed: {
      opacity: 0.92,
      transform: [{ scale: 0.99 }],
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
      backgroundColor: colors.dangerBackground,
      borderRadius: RADIUS.md,
      height: 28,
      justifyContent: "center",
      width: 28,
    },

    deleteButtonPressed: {
      opacity: 0.7,
    },

    deleteButtonText: {
      color: colors.danger,
      fontSize: 22,
      fontWeight: "800",
      lineHeight: 24,
    },

    cardTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "800",
      marginBottom: 6,
      marginTop: SPACING.sm,
    },

    cardDescription: {
      color: colors.mutedText,
      fontSize: 12,
      lineHeight: 17,
      marginBottom: SPACING.sm - 2,
    },

    latestDocument: {
      color: colors.softText,
      fontSize: 11,
      fontWeight: "600",
      marginBottom: SPACING.sm - 2,
    },

    documentBadge: {
      backgroundColor: colors.panelSubtle,
      borderRadius: RADIUS.pill,
      maxWidth: "75%",
      paddingHorizontal: SPACING.sm - 2,
      paddingVertical: 6,
    },

    documentBadgeText: {
      fontSize: 11,
      fontWeight: "800",
    },

    addCategoryButton: {
      alignItems: "center",
      backgroundColor: colors.primary,
      borderRadius: RADIUS.lg,
      marginHorizontal: PAGE_PADDING,
      marginTop: SPACING.sm - 2,
      paddingVertical: 17,
    },

    addCategoryButtonText: {
      color: colors.surface,
      fontSize: 17,
      fontWeight: "800",
    },

    backdrop: {
      alignItems: "center",
      backgroundColor: colors.surfaceOverlay,
      flex: 1,
      justifyContent: "center",
      padding: SPACING.lg,
    },

    card: {
      backgroundColor: colors.surface,
      borderRadius: RADIUS.xxl,
      maxHeight: "84%",
      maxWidth: 520,
      padding: SPACING.lg,
      width: "100%",
    },

    title: {
      color: colors.text,
      fontSize: 21,
      fontWeight: "800",
    },

    text: {
      color: colors.softText,
      fontSize: 14,
      lineHeight: 20,
      marginTop: 7,
    },

    destinationList: {
      marginTop: SPACING.md,
    },

    destinationButton: {
      alignItems: "center",
      backgroundColor: colors.panelSubtle,
      borderColor: colors.border,
      borderRadius: RADIUS.md,
      borderWidth: 1,
      flexDirection: "row",
      marginBottom: SPACING.xs,
      padding: 13,
    },

    destinationButtonSelected: {
      backgroundColor: colors.selectedBackground,
      borderColor: colors.primary,
    },

    destinationIcon: {
      fontSize: 20,
      marginRight: SPACING.sm - 2,
    },

    destinationText: {
      color: colors.text,
      flex: 1,
      fontSize: 14,
      fontWeight: "800",
    },

    destinationCheck: {
      color: colors.primary,
      fontSize: 18,
      fontWeight: "900",
    },

    actionColumn: {
      marginTop: 14,
    },

    primaryAction: {
      alignItems: "center",
      backgroundColor: colors.primary,
      borderRadius: RADIUS.sm,
      marginBottom: SPACING.xs,
      paddingVertical: 13,
    },

    primaryActionText: {
      color: colors.surface,
      fontSize: 14,
      fontWeight: "800",
    },

    destructiveAction: {
      alignItems: "center",
      backgroundColor: colors.dangerBackground,
      borderRadius: RADIUS.sm,
      marginBottom: SPACING.xs,
      paddingVertical: 13,
    },

    destructiveActionText: {
      color: colors.danger,
      fontSize: 14,
      fontWeight: "800",
    },

    cancelAction: {
      alignItems: "center",
      backgroundColor: colors.secondary,
      borderRadius: RADIUS.sm,
      paddingVertical: 13,
    },

    cancelActionText: {
      color: colors.secondaryText,
      fontSize: 14,
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
) => ({
  marginRight:
    (index + 1) % columns === 0
      ? 0
      : GRID_GAP,
  width: cardWidth,
});

export const getCategoryIconStyle = (color) => ({
  backgroundColor: color,
});

export const getCategoryTextColorStyle = (color) => ({
  color,
});

export const getThemeSwatchStyle = (
  styles,
  themeId
) => {
  return themeId === "pink"
    ? styles.themeSwatchPink
    : styles.themeSwatchClassic;
};
