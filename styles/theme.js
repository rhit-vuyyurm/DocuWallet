import { Platform } from "react-native";

export const COLORS = {
  background: "#F4F6F8",
  surface: "#FFFFFF",
  header: "#263238",
  primary: "#495E57",
  primaryPressed: "#314A42",
  primaryHovered: "#3F5A51",
  secondary: "#E7ECEE",
  secondaryPressed: "#CBD5D9",
  secondaryHovered: "#D8E1E4",
  text: "#263238",
  mutedText: "#78909C",
  lightText: "#CFD8DC",
  border: "#CFD8DC",
  inputBorder: "#ECEFF1",
  danger: "#C62828",
  dangerBackground: "#FFEBEE",
  warningBackground: "#FFF8E1",
  warningText: "#795548",
  accent: "#F4CE14",
};

export const SPACING = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const RADIUS = {
  sm: 12,
  md: 14,
  lg: 18,
  xl: 22,
  xxl: 24,
  pill: 999,
};

export const SHADOWS = {
  card:
    Platform.select({
      ios: {
        shadowColor: "#000000",
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
    }) || {},

  subtleCard:
    Platform.select({
      ios: {
        shadowColor: "#000000",
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
    }) || {},
};