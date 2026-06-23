import React, { useMemo } from "react";
import { Image, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import DocumentsScreen from "./screens/DocumentsScreen";
import AuthScreen from "./screens/AuthScreen";

import { DocumentsProvider } from "./context/DocumentsContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

import {
  createNavigationStyles,
  getNavigationScreenOptions,
} from "./styles/NavigationStyles";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { theme } = useTheme();

  const screenOptions = useMemo(
    () => getNavigationScreenOptions(theme),
    [theme]
  );

  const navigationStyles = useMemo(
    () => createNavigationStyles(theme),
    [theme]
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="DocuWallet"
          component={HomeScreen}
          options={{
            headerTitle: () => (
              <View style={navigationStyles.headerBrand}>
                <Text style={navigationStyles.headerBrandText}>DocuWallet</Text>
                <Image
                  accessibilityLabel="DocuWallet logo"
                  resizeMode="contain"
                  source={require("./assets/docuwallet-logo.png")}
                  style={navigationStyles.headerLogo}
                />
              </View>
            ),
          }}
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

function RootContent() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!session) {
    return <AuthScreen />;
  }

  return (
    <DocumentsProvider>
      <AppNavigator />
    </DocumentsProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RootContent />
      </ThemeProvider>
    </AuthProvider>
  );
}