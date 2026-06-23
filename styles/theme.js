import { Platform } from "react-native";

export const THEME_IDS = {
  classic: "classic",
  softPink: "pink",
};

const sharedThemeValues = {
  surface: "#FFFFFF",
  headerOverlay: "rgba(255, 255, 255, 0.12)",
  headerDivider: "rgba(255, 255, 255, 0.22)",
  modalBackdrop: "rgba(0, 0, 0, 0.45)",
};

export const THEMES = {
  [THEME_IDS.classic]: {
    id: THEME_IDS.classic,
    label: "Classic",
    description: "Green and charcoal",
    swatch: "#495E57",
    ...sharedThemeValues,
    background: "#F4F6F8",
    header: "#263238",
    primary: "#495E57",
    primaryPressed: "#314A42",
    primaryHovered: "#3F5A51",
    secondary: "#E7ECEE",
    secondaryPressed: "#CBD5D9",
    secondaryHovered: "#D8E1E4",
    secondaryText: "#31464D",
    text: "#263238",
    mutedText: "#78909C",
    softText: "#607D8B",
    lightText: "#CFD8DC",
    border: "#CFD8DC",
    inputBorder: "#ECEFF1",
    panelSubtle: "#F8FAFB",
    dropZoneBorder: "#B0BEC5",
    selectedBackground: "#E8F5E9",
    selectedBorder: "#A5D6A7",
    selectedText: "#1B5E20",
    link: "#1565C0",
    danger: "#C62828",
    dangerBackground: "#FFEBEE",
    accent: "#F4CE14",
  },

  [THEME_IDS.softPink]: {
    id: THEME_IDS.softPink,
    label: "Soft Pink",
    description: "Muted rose and plum",
    swatch: "#95556F",
    ...sharedThemeValues,
    background: "#FFF7FA",
    header: "#863456",
    primary: "#95556F",
    primaryPressed: "#84264d",
    primaryHovered: "#874963",
    secondary: "#F6E4EB",
    secondaryPressed: "#EBCDD9",
    secondaryHovered: "#F0D9E3",
    secondaryText: "#563241",
    text: "#3D2831",
    mutedText: "#8E6D7A",
    softText: "#725562",
    lightText: "#F9EDF2",
    border: "#E7C9D4",
    inputBorder: "#F0DCE4",
    panelSubtle: "#FFF2F6",
    dropZoneBorder: "#DDB6C5",
    selectedBackground: "#FCE7EF",
    selectedBorder: "#E8B9C9",
    selectedText: "#71354D",
    link: "#9B4262",
    danger: "#B63759",
    dangerBackground: "#FDECEF",
    accent: "#EFB3C7",
  },
};

export const THEME_OPTIONS = [
  THEMES[THEME_IDS.classic],
  THEMES[THEME_IDS.softPink],
];

export const DEFAULT_THEME_ID = THEME_IDS.classic;

export const getTheme = (themeId) => {
  return THEMES[themeId] || THEMES[DEFAULT_THEME_ID];
};

// Existing static style files can keep importing COLORS during the transition.
export const COLORS = THEMES[DEFAULT_THEME_ID];

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
