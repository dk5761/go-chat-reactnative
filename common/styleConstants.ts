import { PixelRatio } from "react-native";

const get_Ratio = (size: number) => {
  return PixelRatio.getPixelSizeForLayoutSize(size / PixelRatio.get());
};

export const stylesConstants = {
  ZERO: get_Ratio(0),
  ONE: get_Ratio(1),
  TWO: get_Ratio(2),
  THREE: get_Ratio(3),
  FOUR: get_Ratio(4),
  FIVE: get_Ratio(5),
  SIX: get_Ratio(6),
  EIGHT: get_Ratio(8),
  NINE: get_Ratio(9),
  TEN: get_Ratio(10),
  TWELVE: get_Ratio(12),
  THIRTEEN: get_Ratio(13),
  FOURTEEN: get_Ratio(14),
  FIFTEEN: get_Ratio(15),
  SIXTEEN: get_Ratio(16),
  SEVENTEEN: get_Ratio(17),
  EIGHTEEN: get_Ratio(18),
  TWENTY: get_Ratio(20),
  TWENTYTWO: get_Ratio(22),
  TWENTYFOUR: get_Ratio(24),
  TWENTYEIGHT: get_Ratio(28),
  THIRTYTWO: get_Ratio(32),
  THIRTYFOUR: get_Ratio(34),
  THIRTYSIX: get_Ratio(36),
  FORTY: get_Ratio(40),
  FORTYTHREE: get_Ratio(43),
  FORTYFOUR: get_Ratio(44),
  FORTYEIGHT: get_Ratio(48),
  FIFTY: get_Ratio(50),
  FIFTYTWO: get_Ratio(52),
  FIFTYSIX: get_Ratio(56),
  SIXTY: get_Ratio(60),
  SIXTYFOUR: get_Ratio(64),
  SIXTYFIVE: get_Ratio(65),
  SEVENTYFOUR: get_Ratio(74),
  EIGHTYSEVEN: get_Ratio(87),
  NINETYONE: get_Ratio(91),
  HUNDRED: get_Ratio(100),
  ONE_HUNDRED_TWO: get_Ratio(102),
  ONE_HUNDRED_TWENTY: get_Ratio(120),
  ONE_HUNDRED_TWENTYNINE: get_Ratio(129),
  ONE_HUNDRED_FIFTY: get_Ratio(150),
  ONE_HUNDRED_SIXTY: get_Ratio(160),
  TWO_HUNDRED_FIFTYNINE: get_Ratio(259),
  ONE_HUNDRED_EIGHTYSEVEN: get_Ratio(187),
  TWO_HUNDRED_TWELVE: get_Ratio(212),
  TWO_HUNDRED_TWENTYFOUR: get_Ratio(224),
  TWO_HUNDRED_FOURTYFOUR: get_Ratio(244),
  TWO_HUNDRED_FOURTYEIGHT: get_Ratio(248),
  TWO_HUNDRED_FIFTYSIX: get_Ratio(256),
  TWO_HUNDRED_FIFTYEIGHT: get_Ratio(258),
  TWO_HUNDRED_EIGHTYEIGHT: get_Ratio(288),
  THREE_HUNDRED_FIFTY: get_Ratio(350),
  FOUR_HUNDRED: get_Ratio(400),
  FIVE_HUNDRED: get_Ratio(500),
  SIX_HUNDRED: get_Ratio(600),
  SEVEN_HUNDRED: get_Ratio(700),
  ONE_THOUSAND: get_Ratio(1000),
};

export const colorConstantsText = {
  PRIMARY: "#000000", //text color
  NEUTRAL_1: "#2c2c2c", //text color
  NEUTRAL_2: "#4c4c4c", //text color
  NEUTRAL_3: "#6e6e6e", //text color
  NEUTRAL_4: "#8e8e8e", //placeholder,labels,icon
  NEUTRAL_5: "#b3b3b3", //disabled
  NEUTRAL_6: "#cacaca", //divider on bg
  NEUTRAL_7: "#e1e1e1", //outline on surface white/bg
  NEUTRAL_8: "#eaeaea", //divider on surface white
  NEUTRAL_9: "#f0f0f0", //base bg 1
  NEUTRAL_9a: "#F5F5F5", //base bg 2, disabled input
  NEUTRAL_10: "#fafafa", //base bg 3
  SURFACE_WHITE: "#ffffff", //background
  ERROR: "#D90429", //error text.
};
export const colorConstantVariantBlue = {
  PRIMARY: "#4588E4", //text color
  BLUE_1: "#293161", //text color
  BLUE_2: "#2F72CC", //text color
  BLUE_3: "#357BD9", //text color
  BLUE_4: "#7EABEB",
  BLUE_5: "#A1C3F2",
  BLUE_6: "#BAD4FA",
  BLUE_7: "#CDE2FF",
  BLUE_8: "#DDEBFF",
  BLUE_9: "#E6F4FF", //background
  BLUE_10: "#EAF2FE", //background
  BLUE_11: "#F5F9FF", //background
  BLUE_12: "#FBFDFF", //background
};

export const Colors = {
  PRIMARY: "#4588E4", //text color
  SECONDARY: "#293161", //text color
  ERROR: "#FF4C44", //error
};
export const BoxShadowConstants = {
  VARIANT_2: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.1,
    shadowRadius: 6.65,
    elevation: 2,
  },
  VARIANT_3: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6.65,
    elevation: 1,
  },
};

//Tab View Neutral 7

//font seleected - colorConstantsText.PRIMARY semiBold
//font non selected - colorConstantsText.NEUTRAL_2 medium
