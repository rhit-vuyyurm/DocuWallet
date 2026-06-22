import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  ActivityIndicator,
  Text,
  View,
} from "react-native";

import AuthScreen from "../screens/AuthScreen";
import {
  useAuth,
} from "../context/AuthContext";
import AppButton from "./AppButton";
import styles from "../styles/AuthGateStyles";

function LoadingState({ message }) {
  return (
    <View style={styles.screen}>
      <ActivityIndicator
        size="large"
        color="#F4CE14"
      />

      <Text style={styles.title}>
        {message}
      </Text>
    </View>
  );
}

export default function AuthGate({ children }) {
  const {
    session,
    isAnonymous,
    isAuthLoading,
    signOut,
  } = useAuth();

  const [anonymousSignOutError, setAnonymousSignOutError] =
    useState("");

  const clearAnonymousSession = useCallback(async () => {
    try {
      setAnonymousSignOutError("");
      await signOut();
    } catch (error) {
      setAnonymousSignOutError(
        error.message ||
          "Could not clear the temporary anonymous session."
      );
    }
  }, [signOut]);

  useEffect(() => {
    if (isAnonymous) {
      clearAnonymousSession();
    }
  }, [clearAnonymousSession, isAnonymous]);

  if (isAuthLoading) {
    return (
      <LoadingState message="Preparing DocuWallet..." />
    );
  }

  if (isAnonymous && anonymousSignOutError) {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>
          Account setup error
        </Text>

        <Text style={styles.message}>
          {anonymousSignOutError}
        </Text>

        <AppButton
          label="Try Again"
          onPress={clearAnonymousSession}
          style={styles.retryButton}
        />
      </View>
    );
  }

  if (isAnonymous) {
    return (
      <LoadingState message="Preparing your sign-in screen..." />
    );
  }

  if (!session) {
    return <AuthScreen />;
  }

  return children;
}