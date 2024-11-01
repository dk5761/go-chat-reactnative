import { FontSize } from "@/common/fontConstants";
import React, { ReactNode } from "react";
import { Text as RNText, TextProps } from "react-native";

type FontSizeValue =
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "21"
  | "22"
  | "23"
  | "24"
  | "30";

export interface CustomTextProps extends TextProps {
  children: ReactNode;
  size?: FontSizeValue;
  numberOfLines?: number;
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
export interface CustomTextPropsWithoutChildren extends TextProps {
  size?: FontSizeValue;
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
const fontSize = (size: string) => {
  switch (size) {
    case "8":
      return FontSize.FONT_SIZE_8;
    case "9":
      return FontSize.FONT_SIZE_9;
    case "10":
      return FontSize.FONT_SIZE_10;
    case "11":
      return FontSize.FONT_SIZE_11;
    case "12":
      return FontSize.FONT_SIZE_12;
    case "13":
      return FontSize.FONT_SIZE_13;
    case "14":
      return FontSize.FONT_SIZE_14;
    case "15":
      return FontSize.FONT_SIZE_15;
    case "16":
      return FontSize.FONT_SIZE_16;
    case "17":
      return FontSize.FONT_SIZE_17;
    case "18":
      return FontSize.FONT_SIZE_18;
    case "19":
      return FontSize.FONT_SIZE_19;
    case "20":
      return FontSize.FONT_SIZE_20;
    case "21":
      return FontSize.FONT_SIZE_21;
    case "22":
      return FontSize.FONT_SIZE_22;
    case "23":
      return FontSize.FONT_SIZE_23;
    case "24":
      return FontSize.FONT_SIZE_24;
    case "30":
      return FontSize.FONT_SIZE_30;
    default:
      return FontSize.FONT_SIZE_14;
  }
};

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
  style,
  ...rest
}: CustomTextProps) => {
  return (
    <RNText
      allowFontScaling={true}
      {...(rest.numberOfLines ? { numberOfLines: rest.numberOfLines } : {})}
      ellipsizeMode="tail"
      style={[
        {
          fontFamily: fontFamily(weight ?? "regular"),
          fontSize: fontSize(size ?? "14"),
          color: color ?? "#000", // Use provided color or default to "#fff"
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};

export default Text;
