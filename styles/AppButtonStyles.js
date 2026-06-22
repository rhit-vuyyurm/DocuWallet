import { StyleSheet } from "react-native";

import {
  COLORS,
  RADIUS,
  SPACING,
} from "./theme";

const styles = StyleSheet.create({
  buttonBase: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
    overflow: "hidden",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
  },

  primaryButton: {
    backgroundColor: COLORS.primary,
  },

  primaryButtonHovered: {
    backgroundColor: COLORS.primaryHovered,
  },

  primaryButtonText: {
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },

  secondaryButton: {
    backgroundColor: COLORS.secondary,
  },

  secondaryButtonHovered: {
    backgroundColor: COLORS.secondaryHovered,
  },

  secondaryButtonText: {
    color: "#31464D",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },

  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },

  disabled: {
    opacity: 0.55,
  },
});

export const buttonVariants = {
  primary: {
    button: styles.primaryButton,
    hovered: styles.primaryButtonHovered,
    text: styles.primaryButtonText,
  },

  secondary: {
    button: styles.secondaryButton,
    hovered: styles.secondaryButtonHovered,
    text: styles.secondaryButtonText,
  },
};

export default styles;