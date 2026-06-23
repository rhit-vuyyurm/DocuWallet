import { StyleSheet } from "react-native";

export const getNavigationScreenOptions = (theme) => ({
  headerStyle: {
    backgroundColor: theme.header,
    borderBottomColor: theme.surface,
    borderBottomWidth: 1,
  },

  headerTintColor: theme.surface,

  headerShadowVisible: true,

  headerTitleAlign: "left",

  contentStyle: {
    backgroundColor: theme.background,
  },
});

export const createNavigationStyles = (theme) =>
  StyleSheet.create({
    headerBrand: {
      alignItems: "center",
      flexDirection: "row",
    },

    headerBrandText: {
      color: theme.surface,
      fontSize: 22,
      fontWeight: "800",
    },

    headerLogo: {
      borderRadius: 20,
      height: 40,
      marginLeft: 10,
      width: 40,
    },
  });