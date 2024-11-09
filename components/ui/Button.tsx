import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type ButtonProps = TouchableOpacityProps & {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  backgroundColor = "#007AFF",
  textColor = "#FFFFFF",
  style,
  textStyle,
  ...props
}) => {
  const { styles } = useStyles(stylesheet);

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      {...props}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const stylesheet = createStyleSheet((theme) => ({
  button: {
    paddingHorizontal: theme.margins.lg,
    borderRadius: 8,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    fontSize: theme.fontSizes.xs,
    fontWeight: "600",
    color: theme.colors.primaryText,
  },
}));
