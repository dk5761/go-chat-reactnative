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
    typography: "#2c2c2c",
    background: "#ffffff",
    primary: "#3498db",
    secondary: "#2ecc71",
    accent: "#e74c3c",
    info: "#3498db",
    success: "#2ecc71",
    warning: "#f39c12",
    error: "#7676a7",
    darkGrey: "#333333",
    textOnPrimary: "#fff",
  },
  margins: base.margins,
  fontSizes: base.fontSizes,
  spacing: base.spacing,
} as const;

export const darkTheme = {
  colors: {
    typography: "#ffffff",
    background: "#000000",
    primary: "#3498db",
    secondary: "#2ecc71",
    accent: "#e74c3c",
    info: "#3498db",
    success: "#2ecc71",
    warning: "#f39c12",
    error: "#e74c3c",
    darkGrey: "#333333",
    textOnPrimary: "#fff",
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
