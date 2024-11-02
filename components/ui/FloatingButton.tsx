// FloatingButton.tsx
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  runOnJS,
} from "react-native-reanimated";
import SecondaryButton from "./SecondaryButton"; // Adjust the path as needed

type ButtonConfig = {
  icon: React.ReactNode;
  onPress: () => void;
};

type FloatingButtonProps = {
  mainButtonColor?: string;
  secondaryButtonColor?: string;
  buttonSize?: number;
  radius?: number;
  buttonConfigs: ButtonConfig[];
};

const FloatingButton: React.FC<FloatingButtonProps> = ({
  mainButtonColor = "#F02A4B",
  secondaryButtonColor = "#F02A4B",
  buttonSize = 60,
  radius = 90,
  buttonConfigs,
}) => {
  const rotation = useSharedValue(0);
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleMenu = () => {
    if (open) {
      // Closing: animate to 0, then set isVisible to false
      //@ts-ignore
      rotation.value = withSpring(0, { damping: 10, duration: 400 }, () => {
        runOnJS(setIsVisible)(false);
      });
      setOpen(false);
    } else {
      // Opening: set isVisible to true, then animate to 1
      setIsVisible(true);
      //@ts-ignore
      rotation.value = withSpring(1, { damping: 10, duration: 300 });
      setOpen(true);
    }
  };

  const rotationStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(rotation.value, [0, 1], [0, 360])}deg`,
      },
    ],
  }));

  return (
    <>
      {/* Overlay to capture taps outside the FAB */}
      {isVisible && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={toggleMenu}
          activeOpacity={1}
          accessible={false} // Prevents accessibility tools from focusing this overlay
        />
      )}

      {/* FAB Container */}
      <View style={styles.container}>
        {/* Secondary Buttons */}
        {isVisible &&
          buttonConfigs.map((config, index) => (
            <SecondaryButton
              key={index}
              icon={config.icon}
              onPress={config.onPress}
              index={index}
              total={buttonConfigs.length}
              rotation={rotation}
              radius={radius}
              buttonSize={buttonSize}
              secondaryButtonColor={secondaryButtonColor}
            />
          ))}

        {/* Main FAB */}
        <TouchableOpacity
          onPress={toggleMenu}
          accessibilityRole="button"
          accessibilityLabel={open ? "Close menu" : "Open menu"}
        >
          <Animated.View
            style={[
              styles.button,
              {
                backgroundColor: mainButtonColor,
                width: buttonSize,
                height: buttonSize,
              },
              rotationStyle,
            ]}
          >
            <AntDesign name="plus" size={24} color="#FFF" />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "rgba(0,0,0,0)", // Transparent
    zIndex: 1, // Ensure the overlay is below the FAB
  },
  container: {
    position: "absolute",
    bottom: 50, // Adds padding from the bottom edge
    right: 50, // Adds padding from the right edge
    padding: 10, // Optional: additional padding for larger screens
    zIndex: 2, // Ensure the FAB is above the overlay
  },
  button: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    shadowRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
});

export default FloatingButton;
