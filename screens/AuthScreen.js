import React, {
  useState,
} from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import AppButton from "../components/AppButton";
import { useAuth } from "../context/AuthContext";
import {
  getErrorMessage,
} from "../utils/documentUtils";
import styles from "../styles/AuthScreenStyles";

export default function AuthScreen() {
  const {
    signIn,
    signUp,
  } = useAuth();

  const [isSignUpMode, setIsSignUpMode] =
    useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleSubmit = async () => {
    const cleanedEmail =
      email.trim().toLowerCase();

    if (!cleanedEmail || !password) {
      Alert.alert(
        "Missing Information",
        "Enter both an email address and password."
      );
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        "Password Too Short",
        "Use at least 8 characters."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      if (isSignUpMode) {
        const data = await signUp(
          cleanedEmail,
          password
        );

        if (!data.session) {
          Alert.alert(
            "Check Your Email",
            "Confirm your email, then return to DocuWallet and sign in."
          );
        } else {
          Alert.alert(
            "Account Created",
            "Your DocuWallet account is ready."
          );
        }

        return;
      }

      await signIn(cleanedEmail, password);
    } catch (error) {
      console.error("Authentication error:", error);

      Alert.alert(
        "Account Error",
        getErrorMessage(error)
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = () => {
    setIsSignUpMode((currentMode) => !currentMode);
    setPassword("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Image
            source={require("../assets/docuwallet-logo.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />

          <Text style={styles.title}>
            DocuWallet
          </Text>

          <Text style={styles.subtitle}>
            {isSignUpMode
              ? "Create an account to securely access your documents across devices."
              : "Sign in to access your secure document wallet."}
          </Text>

          <TextInput
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            editable={!isSubmitting}
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="Email address"
            placeholderTextColor="#90A4AE"
            style={styles.input}
            value={email}
          />

          <TextInput
            autoCapitalize="none"
            autoComplete={
              isSignUpMode
                ? "new-password"
                : "current-password"
            }
            autoCorrect={false}
            editable={!isSubmitting}
            onChangeText={setPassword}
            onSubmitEditing={handleSubmit}
            placeholder="Password"
            placeholderTextColor="#90A4AE"
            secureTextEntry
            style={styles.input}
            value={password}
          />

          <AppButton
            disabled={isSubmitting}
            label={
              isSubmitting
                ? "Please wait..."
                : isSignUpMode
                  ? "Create Account"
                  : "Sign In"
            }
            onPress={handleSubmit}
            style={styles.submitButton}
          />

          <Pressable
            disabled={isSubmitting}
            onPress={switchMode}
            style={({ pressed }) => [
              styles.modeButton,
              pressed && styles.modeButtonPressed,
            ]}
          >
            <Text style={styles.modeButtonText}>
              {isSignUpMode
                ? "Already have an account? Sign in"
                : "New here? Create an account"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}