import React, { useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import DocumentsScreen from "./screens/DocumentsScreen";

import { DocumentsProvider } from "./context/DocumentsContext";
import {
  ThemeProvider,
  useTheme,
} from "./context/ThemeContext";

import { getNavigationScreenOptions } from "./styles/NavigationStyles";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { theme } = useTheme();

  const screenOptions = useMemo(
    () => getNavigationScreenOptions(theme),
    [theme]
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "DocuWallet" }}
        />

        <Stack.Screen
          name="Documents"
          component={DocumentsScreen}
          options={{ title: "Documents" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <DocumentsProvider>
        <AppNavigator />
      </DocumentsProvider>
    </ThemeProvider>
  );
}