import React, { useMemo } from "react";
import {
  Pressable,
  Text,
  View,
} from "react-native";

import { useTheme } from "../context/ThemeContext";
import { THEME_OPTIONS } from "../styles/theme";
import { createThemePickerStyles } from "../styles/ThemePickerStyles";

export default function ThemePicker() {
  const {
    theme,
    themeId,
    setThemeId,
  } = useTheme();

  const styles = useMemo(
    () => createThemePickerStyles(theme),
    [theme]
  );

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Appearance</Text>

      <Text style={styles.description}>
        Choose the color scheme you prefer.
      </Text>

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
                  {
                    backgroundColor: option.swatch,
                  },
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

              {isSelected && (
                <Text style={styles.check}>✓</Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
