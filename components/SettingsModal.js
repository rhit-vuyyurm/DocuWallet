import React, { useMemo } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../context/ThemeContext";
import { THEME_OPTIONS } from "../styles/theme";
import {
  createSettingsModalStyles,
  getSettingsSwatchStyle,
} from "../styles/SettingsModalStyles";

export default function SettingsModal({ onClose, visible }) {
  const {
    theme,
    themeId,
    setThemeId,
  } = useTheme();

  const styles = useMemo(
    () => createSettingsModalStyles(theme),
    [theme]
  );

  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.titleRow}>
              <View style={styles.titleTextBox}>
                <Text style={styles.title}>Settings</Text>

                <Text style={styles.subtitle}>
                  Choose an appearance. Changes apply immediately.
                </Text>
              </View>

              <View style={styles.settingsIconCircle}>
                <Ionicons
                  name="settings-outline"
                  size={26}
                  style={styles.settingsIcon}
                />
              </View>
            </View>

            <Text style={styles.sectionLabel}>Appearance</Text>

            <View style={styles.options}>
              {THEME_OPTIONS.map((option) => {
                const isSelected = option.id === themeId;

                return (
                  <Pressable
                    key={option.id}
                    onPress={() => setThemeId(option.id)}
                    style={({ pressed }) => [
                      styles.option,
                      isSelected && styles.optionSelected,
                      pressed && styles.optionPressed,
                    ]}
                  >
                    <View
                      style={[
                        styles.swatch,
                        getSettingsSwatchStyle(option.swatch),
                      ]}
                    />

                    <View style={styles.optionTextBox}>
                      <Text style={styles.optionTitle}>
                        {option.label}
                      </Text>

                      <Text style={styles.optionDescription}>
                        {option.description}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.selectionCircle,
                        isSelected && styles.selectionCircleSelected,
                      ]}
                    >
                      {isSelected && (
                        <Text style={styles.selectionCheck}>✓</Text>
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.livePreviewText}>
              The screen behind this panel updates as you select a theme.
            </Text>

            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.doneButton,
                pressed && styles.doneButtonPressed,
              ]}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
