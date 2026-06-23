import { StyleSheet } from "react-native";

import {
  RADIUS,
  SHADOWS,
  SPACING,
} from "./theme";

export const createDocumentsScreenStyles = (colors) =>
  StyleSheet.create({
    screen: {
      backgroundColor: colors.background,
      flex: 1,
    },

    centeredScreen: {
      alignItems: "center",
      backgroundColor: colors.background,
      flex: 1,
      justifyContent: "center",
      padding: SPACING.xl,
    },

    errorText: {
      color: colors.danger,
      fontSize: 18,
      fontWeight: "800",
      textAlign: "center",
    },

    container: {
      flexGrow: 1,
      padding: SPACING.xl,
      paddingBottom: 36,
    },

    headerCard: {
      alignItems: "center",
      backgroundColor: colors.surface,
      borderRadius: RADIUS.xxl,
      flexDirection: "row",
      marginBottom: 18,
      padding: SPACING.lg,
      ...SHADOWS.card,
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
      color: colors.text,
      fontSize: 26,
      fontWeight: "800",
    },

    subtitle: {
      color: colors.mutedText,
      fontSize: 14,
      marginTop: SPACING.xxs,
    },

    emptyCard: {
      backgroundColor: colors.surface,
      borderRadius: RADIUS.xl,
      padding: 22,
      ...SHADOWS.subtleCard,
    },

    emptyTitle: {
      color: colors.text,
      fontSize: 19,
      fontWeight: "800",
    },

    emptyText: {
      color: colors.mutedText,
      fontSize: 14,
      lineHeight: 20,
      marginTop: SPACING.xs,
    },

    documentCard: {
      backgroundColor: colors.surface,
      borderRadius: RADIUS.xl,
      marginBottom: 14,
      padding: 18,
      ...SHADOWS.subtleCard,
    },

    selectedDocumentCard: {
      borderColor: colors.primary,
      borderWidth: 2,
    },

    documentHeader: {
      alignItems: "flex-start",
      flexDirection: "row",
      justifyContent: "space-between",
    },

    documentTextColumn: {
      flex: 1,
      marginRight: SPACING.sm,
    },

    cardHeaderActions: {
      alignItems: "center",
      flexDirection: "row",
      gap: SPACING.xs,
    },

    documentName: {
      color: colors.text,
      fontSize: 17,
      fontWeight: "800",
    },

    renameButton: {
      alignSelf: "flex-start",
      marginTop: 5,
      paddingVertical: 2,
    },

    renameButtonText: {
      color: colors.link,
      fontSize: 13,
      fontWeight: "800",
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

    selectButton: {
      backgroundColor: colors.secondary,
      borderRadius: RADIUS.pill,
      paddingHorizontal: 10,
      paddingVertical: 7,
    },

    selectedButton: {
      backgroundColor: colors.primary,
    },

    selectButtonText: {
      color: colors.secondaryText,
      fontSize: 12,
      fontWeight: "800",
    },

    selectedButtonText: {
      color: colors.surface,
    },

    renameLabel: {
      color: colors.secondaryText,
      fontSize: 13,
      fontWeight: "800",
      marginBottom: 6,
    },

    renameInput: {
      borderColor: colors.border,
      borderRadius: RADIUS.sm,
      borderWidth: 1,
      color: colors.text,
      fontSize: 16,
      paddingHorizontal: SPACING.sm,
      paddingVertical: 11,
    },

    renameActions: {
      flexDirection: "row",
      marginTop: 10,
    },

    cancelRenameButton: {
      alignItems: "center",
      backgroundColor: colors.secondary,
      borderRadius: RADIUS.sm,
      flex: 1,
      marginRight: 6,
      paddingVertical: SPACING.sm,
    },

    cancelRenameText: {
      color: colors.secondaryText,
      fontSize: 14,
      fontWeight: "800",
    },

    saveRenameButton: {
      alignItems: "center",
      backgroundColor: colors.primary,
      borderRadius: RADIUS.sm,
      flex: 1,
      marginLeft: 6,
      paddingVertical: SPACING.sm,
    },

    saveRenameText: {
      color: colors.surface,
      fontSize: 14,
      fontWeight: "800",
    },

    documentMeta: {
      color: colors.mutedText,
      fontSize: 13,
      marginBottom: 14,
      marginTop: SPACING.xs,
    },

    openButton: {
      alignItems: "center",
      backgroundColor: colors.primary,
      borderRadius: RADIUS.md,
      marginBottom: 10,
      paddingVertical: 14,
    },

    openButtonText: {
      color: colors.surface,
      fontSize: 15,
      fontWeight: "800",
    },

    actionRow: {
      flexDirection: "row",
    },

    secondaryButtonLeft: {
      alignItems: "center",
      backgroundColor: colors.secondary,
      borderRadius: RADIUS.md,
      flex: 1,
      marginRight: 4,
      paddingVertical: SPACING.sm,
    },

    secondaryButtonRight: {
      alignItems: "center",
      backgroundColor: colors.secondary,
      borderRadius: RADIUS.md,
      flex: 1,
      marginLeft: 4,
      paddingVertical: SPACING.sm,
    },

    secondaryButtonText: {
      color: colors.secondaryText,
      fontSize: 14,
      fontWeight: "800",
    },

    selectionBar: {
      alignItems: "center",
      backgroundColor: colors.selectedBackground,
      borderColor: colors.selectedBorder,
      borderRadius: RADIUS.lg,
      borderWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 14,
      padding: 14,
    },

    selectionText: {
      color: colors.selectedText,
      fontSize: 14,
      fontWeight: "800",
    },

    selectionButtons: {
      alignItems: "center",
      flexDirection: "row",
    },

    clearSelectionButton: {
      paddingHorizontal: 10,
      paddingVertical: SPACING.xs,
    },

    clearSelectionText: {
      color: colors.secondaryText,
      fontSize: 13,
      fontWeight: "800",
    },

    moveSelectionButton: {
      backgroundColor: colors.primary,
      borderRadius: RADIUS.sm,
      marginLeft: 6,
      paddingHorizontal: SPACING.sm,
      paddingVertical: 10,
    },

    moveSelectionText: {
      color: colors.surface,
      fontSize: 13,
      fontWeight: "800",
    },

    dialogBackdrop: {
      alignItems: "center",
      backgroundColor: colors.surfaceOverlay,
      flex: 1,
      justifyContent: "center",
      padding: SPACING.lg,
    },

    dialogCard: {
      backgroundColor: colors.surface,
      borderRadius: RADIUS.xxl,
      maxHeight: "84%",
      maxWidth: 520,
      padding: SPACING.lg,
      width: "100%",
    },

    dialogTitle: {
      color: colors.text,
      fontSize: 21,
      fontWeight: "800",
    },

    dialogText: {
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
      marginRight: 10,
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

    dialogActions: {
      flexDirection: "row",
      marginTop: 14,
    },

    dialogCancelButton: {
      alignItems: "center",
      backgroundColor: colors.secondary,
      borderRadius: RADIUS.sm,
      flex: 1,
      marginRight: 6,
      paddingVertical: 13,
    },

    dialogCancelText: {
      color: colors.secondaryText,
      fontSize: 14,
      fontWeight: "800",
    },

    dialogMoveButton: {
      alignItems: "center",
      backgroundColor: colors.primary,
      borderRadius: RADIUS.sm,
      flex: 1.35,
      marginLeft: 6,
      paddingVertical: 13,
    },

    dialogMoveText: {
      color: colors.surface,
      fontSize: 14,
      fontWeight: "800",
    },

    buttonDisabled: {
      opacity: 0.55,
    },
  });
