import { FontSize } from "@/common/fontConstants";
import React, { ReactNode } from "react";
import { Text as RNText, TextProps } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type FontSizeValue = "xxl" | "xl" | "lg" | "md" | "sm" | "xs" | "xxs";

export interface CustomTextProps extends TextProps {
  children: ReactNode;
  size?: FontSizeValue;
  numberOfLines?: number;
  fontSize?: number;

  weight?:
    | "xtraLight"
    | "light"
    | "regular"
    | "medium"
    | "bold"
    | "semiBold"
    | "xtraBold";
  color?: string;
  style?: [] | unknown | any;
}

const fontFamily = (weight: string) => {
  switch (weight) {
    case "xtraLight":
      return "Manrope_200ExtraLight";
    case "light":
      return "Manrope_300Light";
    case "regular":
      return "Manrope_400Regular";
    case "medium":
      return "Manrope_500Medium";
    case "bold":
      return "Manrope_700Bold";
    case "semiBold":
      return "Manrope_600SemiBold";
    case "xtraBold":
      return "Manrope_800ExtraBold";
    default:
      return "Manrope_400Regular"; // Default to regular if weight is not matched
  }
};

const Text = ({
  children,
  size,
  weight,
  color,
  fontSize,
  style,
  ...rest
}: CustomTextProps) => {
  const { styles, theme, breakpoint } = useStyles(stylesheet);
  let computedFontSize: number;
  const { fontSizes } = theme;

  switch (size) {
    case "xxl":
      computedFontSize = fontSize || fontSizes.xxl;
      break;
    case "xl":
      computedFontSize = fontSize || fontSizes.xl;
      break;
    case "lg":
      computedFontSize = fontSize || fontSizes.lg;
      break;
    case "md":
      computedFontSize = fontSize || fontSizes.md;
      break;
    case "sm":
      computedFontSize = fontSize || fontSizes.sm;
      break;
    case "xs":
      computedFontSize = fontSize || fontSizes.xs;
      break;
    case "xxs":
      computedFontSize = fontSize || fontSizes.xxs;
      break;

    default:
      computedFontSize = fontSize || fontSizes.xxs;
  }

  return (
    <RNText
      allowFontScaling={false}
      {...(rest.numberOfLines ? { numberOfLines: rest.numberOfLines } : {})}
      ellipsizeMode="tail"
      style={[
        styles.text,
        { color: theme.colors.typography, fontSize: computedFontSize },
        { fontFamily: fontFamily(weight ?? "regular") },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};

export default Text;

const stylesheet = createStyleSheet((theme, rt) => ({
  text: {
    textAlign: "left",
  },
}));
