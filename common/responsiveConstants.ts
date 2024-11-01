import { scale, verticalScale, moderateScale } from "react-native-size-matters";

export const getScale = (size: number) => {
  return scale(size);
};

export const getVerticalScale = (size: number) => {
  return verticalScale(size);
};

export const getModerateScale = (size: number, factor = 0.5) => {
  return moderateScale(size, factor);
};

export const Widths = {
  WIDTH_7: getScale(7),
  WIDTH_8: getScale(8),
  WIDTH_9: getScale(9),
  WIDTH_10: getScale(10),
  WIDTH_11: getScale(11),
  WIDTH_12: getScale(12),
  WIDTH_13: getScale(13),
  WIDTH_14: getScale(14),
  WIDTH_15: getScale(15),
  WIDTH_16: getScale(16),
  WIDTH_17: getScale(17),
  WIDTH_18: getScale(18),
  WIDTH_19: getScale(19),
  WIDTH_20: getScale(20),
  WIDTH_21: getScale(21),
  WIDTH_22: getScale(22),
  WIDTH_23: getScale(23),
  WIDTH_24: getScale(24),
  WIDTH_30: getScale(30),
};

export const Heights = {
  HEIGHT_7: getVerticalScale(7),
  HEIGHT_8: getVerticalScale(8),
  HEIGHT_9: getVerticalScale(9),
  HEIGHT_10: getVerticalScale(10),
  HEIGHT_11: getVerticalScale(11),
  HEIGHT_12: getVerticalScale(12),
  HEIGHT_13: getVerticalScale(13),
  HEIGHT_14: getVerticalScale(14),
  HEIGHT_15: getVerticalScale(15),
  HEIGHT_16: getVerticalScale(16),
  HEIGHT_17: getVerticalScale(17),
  HEIGHT_18: getVerticalScale(18),
  HEIGHT_19: getVerticalScale(19),
  HEIGHT_20: getVerticalScale(20),
  HEIGHT_21: getVerticalScale(21),
  HEIGHT_22: getVerticalScale(22),
  HEIGHT_23: getVerticalScale(23),
  HEIGHT_24: getVerticalScale(24),
  HEIGHT_30: getVerticalScale(30),
};

export const ModerateSizes = {
  MODERATE_7: getModerateScale(7),
  MODERATE_8: getModerateScale(8),
  MODERATE_9: getModerateScale(9),
  MODERATE_10: getModerateScale(10),
  MODERATE_11: getModerateScale(11),
  MODERATE_12: getModerateScale(12),
  MODERATE_13: getModerateScale(13),
  MODERATE_14: getModerateScale(14),
  MODERATE_15: getModerateScale(15),
  MODERATE_16: getModerateScale(16),
  MODERATE_17: getModerateScale(17),
  MODERATE_18: getModerateScale(18),
  MODERATE_19: getModerateScale(19),
  MODERATE_20: getModerateScale(20),
  MODERATE_21: getModerateScale(21),
  MODERATE_22: getModerateScale(22),
  MODERATE_23: getModerateScale(23),
  MODERATE_24: getModerateScale(24),
  MODERATE_30: getModerateScale(30),
};
