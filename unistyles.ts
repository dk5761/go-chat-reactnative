import { UnistylesRegistry, UnistylesRuntime } from "react-native-unistyles";
import { nf } from "@/utils/scaling";

// Add any custom base style
const base = {
  // USAGE: padding: theme.margins.lg
  margins: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    superLarge: 20,
    tvLike: 24,
  },
  fontSizes: {
    // fontSize: theme.fontSizes.lg
    xxs: nf(8),
    xs: nf(12),
    sm: nf(14),
    md: nf(16),
    lg: nf(18),
    xl: nf(20),
    xxl: nf(24),
  },
  spacing: {
    // USAGE: padding: theme.spacing(1),
    1: 8,
    2: 16,
    3: 24,
    4: 32,
    5: 40,
    6: 48,
    7: 56,
    8: 64,
  },
} as const;

// You can name your breakpoints however you like. The only restriction is that the first breakpoint must start with 0:
//   USAGE:
//    backgroundColor: {
//      xs: 'pink',
//      sm: "skyblue",
//    }
export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  superLarge: 2000,
  tvLike: 4000,
} as const;

// You can define as many themes as you want. Each theme just needs to have a unique name and the same type. The library has no restrictions on the shape of the theme. You can use nested objects, functions, spread operators, and so on.
export const lightTheme = {
  colors: {
    // Teal shades
    teal1: "#f9fdfe",
    teal2: "#f1fbfc",
    teal3: "#dbf7fd",
    teal4: "#c5f2fb",
    teal5: "#aeeaf5",
    teal6: "#95dfed",
    teal7: "#70d0e1",
    teal8: "#00bbd3",
    teal9: "#00bcd4",
    teal10: "#00b0c8",
    teal11: "#007f94",
    teal12: "#003e47",

    // Teal alpha shades
    tealA1: "rgba(0, 170, 213, 0.02)",
    tealA2: "rgba(0, 183, 201, 0.05)",
    tealA3: "rgba(0, 199, 241, 0.14)",
    tealA4: "rgba(0, 198, 238, 0.23)",
    tealA5: "rgba(0, 189, 224, 0.32)",
    tealA6: "rgba(1, 179, 212, 0.42)",
    tealA7: "rgba(0, 172, 202, 0.56)",
    tealA8: "#00bbd3",
    tealA9: "#00bcd4",
    tealA10: "#00b0c8",
    tealA11: "#007f94",
    tealA12: "#003e47",

    // Gray shades
    gray1: "#fcfcfd",
    gray2: "#f9f9fb",
    gray3: "#eff0f3",
    gray4: "#e7e8ec",
    gray5: "#e0e1e6",
    gray6: "#d8d9e0",
    gray7: "#cdced7",
    gray8: "#b9bbc6",
    gray9: "#8b8d98",
    gray10: "#80828d",
    gray11: "#62636c",
    gray12: "#1e1f24",

    // Gray alpha shades
    grayA1: "rgba(0, 0, 85, 0.01)",
    grayA2: "rgba(0, 0, 85, 0.02)",
    grayA3: "rgba(0, 16, 64, 0.06)",
    grayA4: "rgba(0, 11, 54, 0.1)",
    grayA5: "rgba(0, 9, 50, 0.12)",
    grayA6: "rgba(0, 7, 53, 0.15)",
    grayA7: "rgba(0, 6, 51, 0.2)",
    grayA8: "rgba(0, 8, 48, 0.28)",
    grayA9: "rgba(0, 5, 29, 0.46)",
    grayA10: "rgba(0, 5, 27, 0.5)",
    grayA11: "rgba(0, 2, 17, 0.62)",
    grayA12: "rgba(0, 1, 7, 0.89)",

    // Contrast, surface, indicator, and track colors
    tealContrast: "#FFFFFF",
    tealSurface: "rgba(238, 250, 251, 0.8)",
    tealIndicator: "#00bcd4",
    tealTrack: "#00bcd4",

    grayContrast: "#FFFFFF",
    graySurface: "rgba(255, 255, 255, 0.8)",
    grayIndicator: "#8b8d98",
    grayTrack: "#8b8d98",
  },
  margins: base.margins,
  fontSizes: base.fontSizes,
  spacing: base.spacing,
} as const;

export const darkTheme = {
  colors: {
    // Teal shades
    teal1: "#071315",
    teal2: "#0e1b1e",
    teal3: "#012d33",
    teal4: "#003a44",
    teal5: "#004753",
    teal6: "#005663",
    teal7: "#006978",
    teal8: "#008395",
    teal9: "#00bcd4",
    teal10: "#00b0c8",
    teal11: "#38cee6",
    teal12: "#b2edf8",

    // Teal alpha shades
    tealA1: "rgba(0, 120, 222, 0.02)",
    tealA2: "rgba(0, 200, 254, 0.05)",
    tealA3: "rgba(0, 210, 251, 0.14)",
    tealA4: "rgba(0, 208, 254, 0.22)",
    tealA5: "rgba(0, 211, 255, 0.28)",
    tealA6: "rgba(0, 217, 255, 0.35)",
    tealA7: "rgba(0, 219, 253, 0.44)",
    tealA8: "rgba(0, 221, 254, 0.56)",
    tealA9: "rgba(0, 226, 255, 0.82)",
    tealA10: "rgba(0, 223, 254, 0.77)",
    tealA11: "rgba(60, 227, 254, 0.91)",
    tealA12: "rgba(183, 244, 255, 0.97)",

    // Gray shades
    gray1: "#111113",
    gray2: "#19191b",
    gray3: "#222325",
    gray4: "#292a2e",
    gray5: "#303136",
    gray6: "#393a40",
    gray7: "#46484f",
    gray8: "#5f606a",
    gray9: "#6c6e79",
    gray10: "#797b86",
    gray11: "#b2b3bd",
    gray12: "#eeeef0",

    // Gray alpha shades
    grayA1: "rgba(17, 17, 187, 0.01)",
    grayA2: "rgba(203, 203, 249, 0.04)",
    grayA3: "rgba(214, 226, 249, 0.09)",
    grayA4: "rgba(209, 217, 249, 0.13)",
    grayA5: "rgba(215, 221, 253, 0.16)",
    grayA6: "rgba(217, 222, 252, 0.20)",
    grayA7: "rgba(218, 226, 253, 0.26)",
    grayA8: "rgba(224, 227, 253, 0.38)",
    grayA9: "rgba(224, 228, 253, 0.44)",
    grayA10: "rgba(227, 231, 253, 0.49)",
    grayA11: "rgba(239, 240, 254, 0.73)",
    grayA12: "rgba(253, 253, 255, 0.94)",

    // Contrast, surface, indicator, and track colors
    tealContrast: "#FFFFFF",
    tealSurface: "rgba(12, 37, 43, 0.5)",
    tealIndicator: "#00bcd4",
    tealTrack: "#00bcd4",

    grayContrast: "#FFFFFF",
    graySurface: "rgba(0, 0, 0, 0.05)",
    grayIndicator: "#6c6e79",
    grayTrack: "#6c6e79",
  },
  margins: base.margins,
  fontSizes: base.fontSizes,
  spacing: base.spacing,
} as const;

// If you’re using TypeScript, create types for your breakpoints and/or themes. This step is required to achieve perfect Intellisense support across all StyleSheets.
type AppBreakpoints = typeof breakpoints;
type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
};

declare module "react-native-unistyles" {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

// The final step is to call UnistylesRegistry to pass your themes, breakpoints and optional config.
UnistylesRegistry.addBreakpoints(breakpoints)
  .addThemes({
    light: lightTheme,
    dark: darkTheme,
  })
  .addConfig({
    // disableAnimatedInsets: false,
    adaptiveThemes: true, // themes based on device color scheme settings
    // initialTheme: app_theme_mmkv || UnistylesRuntime.colorScheme,
  });

// UnistylesRuntime.setRootViewBackgroundColor("black");
