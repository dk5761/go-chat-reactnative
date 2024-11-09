import React, { isValidElement } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Platform,
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type ButtonVariant = "primary" | "secondary" | "inverse" | "disabled";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

type ButtonProps = TouchableOpacityProps & {
  title: string | React.ReactNode;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  variant,
  size,
  loading,
  ...props
}) => {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <TouchableOpacity
      disabled={variant == "disabled" || loading}
      style={[
        styles.button,
        styles.variant(variant ?? "primary"),
        styles.size(size ?? "sm"),
        style,
      ]}
      onPress={onPress}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size={Platform.select({ android: "large", default: "small" })}
          color={theme.colors.teal11}
        />
      ) : isValidElement(title) ? (
        title
      ) : (
        <Text
          style={[
            styles.buttonText,
            styles.textVariant(variant ?? "primary"),
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const stylesheet = createStyleSheet((theme) => ({
  button: {
    // paddingHorizontal: theme.margins.lg,

    borderRadius: 8,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: theme.fontSizes.xs,
    fontWeight: "600",
  },
  variant: (variant: ButtonVariant) => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: "#38CEE6",
        };
      case "secondary":
        return {
          backgroundColor: theme.colors.gray1,
        };

      case "inverse":
        return {
          backgroundColor: "#FFF",
        };

      case "disabled":
        return {
          backgroundColor: theme.colors.gray9,
        };

      default:
        return {};
    }
  },
  textVariant: (variant: ButtonVariant) => {
    switch (variant) {
      case "primary":
        return {
          color: "#FFF",
        };
      case "secondary":
        return {
          color: theme.colors.gray12,
        };

      case "inverse":
        return {
          color: "#38CEE6",
        };
      case "disabled":
        return {
          color: theme.colors.gray11,
        };
      default:
        return {};
    }
  },
  size: (size: ButtonSize) => {
    switch (size) {
      case "xs":
        return {
          paddingHorizontal: theme.spacing[1],
        };
      case "sm":
        return {
          paddingHorizontal: theme.spacing[2],
        };
      case "md":
        return {
          paddingHorizontal: theme.spacing[3],
        };
      case "lg":
        return {
          paddingHorizontal: theme.spacing[4],
        };
      case "xl":
        return {
          paddingHorizontal: theme.spacing[5],
        };
      default:
        return {};
    }
  },
}));
