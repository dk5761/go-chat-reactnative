import React, { forwardRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
  TextStyle,
  StyleProp,
  DimensionValue,
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type InputProps = TextInputProps & {
  label?: string;
  style?: StyleProp<TextStyle>;
  width?: DimensionValue | undefined;
  flex?: number;
};

const Input = forwardRef<TextInput, InputProps>(
  ({ label, style, width = "100%", flex, ...props }, ref) => {
    // Default width to 100% to fit container
    const { styles, theme } = useStyles(stylesheet);

    return (
      <View style={[styles.container, { width, flex }]}>
        <TextInput
          ref={ref}
          style={[styles.input, style]}
          selectionColor={theme.colors.gray12}
          placeholderTextColor={theme.colors.gray7}
          {...props}
        />
      </View>
    );
  }
);

export default Input;

const stylesheet = createStyleSheet((theme) => ({
  container: {
    marginVertical: theme.margins.sm,

    overflow: "hidden",
  },
  input: {
    height: 44, // Fixed height to avoid stretching
    borderColor: theme.colors.gray8,
    width: "100%", // Ensures input takes full width of its container
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: theme.spacing[1],
    color: theme.colors.gray12,
    backgroundColor: theme.colors.gray1,
  },
}));
