import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import DocumentsScreen from "./screens/DocumentsScreen";
import { DocumentsProvider } from "./context/DocumentsContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <DocumentsProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#263238",
            },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: {
              fontWeight: "800",
            },
          }}
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
  );
}