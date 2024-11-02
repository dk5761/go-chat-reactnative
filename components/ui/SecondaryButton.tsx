// SecondaryButton.tsx
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";

type SecondaryButtonProps = {
  icon: React.ReactNode;
  onPress: () => void;
  index: number;
  total: number;
  rotation: Animated.SharedValue<number>;
  radius: number;
  buttonSize: number;
  secondaryButtonColor: string;
};

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  icon,
  onPress,
  index,
  total,
  rotation,
  radius,
  buttonSize,
  secondaryButtonColor,
}) => {
  const angle = index * (120 / total) + 95; // Adjust angles as needed

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      rotation.value,
      [0, 1],
      [0, -radius * Math.sin((angle * Math.PI) / 180)]
    );
    const translateX = interpolate(
      rotation.value,
      [0, 1],
      [0, radius * Math.cos((angle * Math.PI) / 180)]
    );

    return {
      transform: [{ translateX }, { translateY }],
      opacity: rotation.value,
    };
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View
        style={[
          styles.button,
          {
            backgroundColor: secondaryButtonColor,
            width: buttonSize,
            height: buttonSize,
          },
          animatedStyle,
        ]}
      >
        {icon}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default SecondaryButton;
