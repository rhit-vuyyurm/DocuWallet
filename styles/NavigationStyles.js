export const getNavigationScreenOptions = (theme) => ({
  headerStyle: {
    backgroundColor: theme.header,
    borderBottomColor: theme.surface,
    borderBottomWidth: 1,
  },

  headerTintColor: theme.surface,

  headerTitleStyle: {
    color: theme.surface,
    fontWeight: "800",
  },

  headerShadowVisible: true,

  contentStyle: {
    backgroundColor: theme.background,
  },
});