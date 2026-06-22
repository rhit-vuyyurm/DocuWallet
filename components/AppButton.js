import React, { useState } from "react";
import {
  Pressable,
  Text,
} from "react-native";

import styles, {
  buttonVariants,
} from "../styles/AppButtonStyles";

export default function AppButton({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  style,
  textStyle,
  accessibilityLabel,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const selectedVariant =
    buttonVariants[variant] || buttonVariants.primary;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      onPress={onPress}
      style={({ pressed }) => [
        styles.buttonBase,
        selectedVariant.button,
        isHovered && selectedVariant.hovered,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text
        style={[
          selectedVariant.text,
          textStyle,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}