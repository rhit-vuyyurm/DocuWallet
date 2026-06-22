import { StyleSheet } from "react-native";

import {
  COLORS,
  SPACING,
} from "./theme";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.header,
    padding: SPACING.xl,
  },

  title: {
    color: COLORS.surface,
    fontSize: 20,
    fontWeight: "800",
    marginTop: SPACING.md,
    textAlign: "center",
  },

  message: {
    color: COLORS.lightText,
    fontSize: 14,
    lineHeight: 20,
    marginTop: SPACING.sm,
    textAlign: "center",
  },

  retryButton: {
    alignSelf: "stretch",
    marginTop: SPACING.lg,
  },
});

export default styles;