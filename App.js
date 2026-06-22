import React from "react";
import {
  NavigationContainer,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import AuthGate from "./components/AuthGate";
import {
  AuthProvider,
} from "./context/AuthContext";
import {
  DocumentsProvider,
} from "./context/DocumentsContext";

import HomeScreen from "./screens/HomeScreen";
import DocumentsScreen from "./screens/DocumentsScreen";
import {
  navigationScreenOptions,
} from "./styles/NavigationStyles";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <AuthGate>
        <DocumentsProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={navigationScreenOptions}
            >
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
        </DocumentsProvider>
      </AuthGate>
    </AuthProvider>
  );
}