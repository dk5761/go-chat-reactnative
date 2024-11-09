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
    primary: "#6200EE", // Purple (Default primary)
    background: "#FFFFFF", // White
    surface: "#F5F5F5", // Light Gray for surfaces
    accent: "#03DAC6", // Teal for accent
    border: "#E0E0E0", // Light Gray border
    success: "#4CAF50", // Green
    warning: "#FB8C00", // Orange
    error: "#F44336",
    primaryText: "#212121", // Almost Black for main text
    secondaryText: "#757575", // Medium Gray for secondary text
    placeholderText: "#9E9E9E", // Light Gray for placeholder text
    linkText: "#6200EE", // Same as primary for links
    timestampText: "#BDBDBD",
  },
  margins: base.margins,
  fontSizes: base.fontSizes,
  spacing: base.spacing,
} as const;

export const darkTheme = {
  colors: {
    primary: "#BB86FC", // Light Purple (Default primary for dark mode)
    background: "#121212", // Dark background
    surface: "#1E1E1E", // Slightly lighter for surfaces
    accent: "#03DAC6", // Teal for accent
    border: "#333333", // Dark Gray border
    success: "#66BB6A", // Bright Green for success
    warning: "#FFA726", // Bright Orange for warning
    error: "#EF5350",
    primaryText: "#FFFFFF", // White for primary text
    secondaryText: "#B0B0B0", // Light Gray for secondary text
    placeholderText: "#757575", // Medium Gray for placeholders
    linkText: "#BB86FC", // Light Purple for links
    timestampText: "#9E9E9E",
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
