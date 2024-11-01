import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

type LabelProps = TextProps & {
  text: string;
};

const Label: React.FC<LabelProps> = ({ text, style, ...props }) => {
  return (
    <Text style={[styles.label, style]} {...props}>
      {text}
    </Text>
  );
};

export default Label;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
});
