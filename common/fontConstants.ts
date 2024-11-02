import { Dimensions, PixelRatio } from "react-native";
const get_Ratio = (size: number) => {
  return PixelRatio.getPixelSizeForLayoutSize(size / PixelRatio.get());
};

const windowDimensions = Dimensions.get("window");
const { width, height } = windowDimensions;
const baseWidth = 360;
const baseHeight = 812;

export const getScaledDimensions = (
  dimension: number,
  type: "height" | "width" | "font"
) => {
  let ratio = 1;
  switch (type) {
    case "height":
      ratio = height / baseHeight;
      break;
    case "width":
    case "font":
      ratio = width / baseWidth;
      break;
  }
  return dimension * ratio;
};

export const FontSize = {
  FONT_SIZE_8: getScaledDimensions(8, "font"),
  FONT_SIZE_9: getScaledDimensions(9, "font"),
  FONT_SIZE_10: getScaledDimensions(10, "font"),
  FONT_SIZE_11: getScaledDimensions(11, "font"),
  FONT_SIZE_12: getScaledDimensions(12, "font"),
  FONT_SIZE_13: getScaledDimensions(13, "font"),
  FONT_SIZE_14: getScaledDimensions(14, "font"),
  FONT_SIZE_15: getScaledDimensions(15, "font"),
  FONT_SIZE_16: getScaledDimensions(16, "font"),
  FONT_SIZE_17: getScaledDimensions(17, "font"),
  FONT_SIZE_18: getScaledDimensions(18, "font"),
  FONT_SIZE_19: getScaledDimensions(19, "font"),
  FONT_SIZE_20: getScaledDimensions(20, "font"),
  FONT_SIZE_21: getScaledDimensions(21, "font"),
  FONT_SIZE_22: getScaledDimensions(22, "font"),
  FONT_SIZE_23: getScaledDimensions(23, "font"),
  FONT_SIZE_24: getScaledDimensions(24, "font"),
  FONT_SIZE_30: getScaledDimensions(30, "font"),
};
