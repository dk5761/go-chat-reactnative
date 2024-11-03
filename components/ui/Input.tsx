import React, { forwardRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
  TextStyle,
  StyleProp,
} from "react-native";

type InputProps = TextInputProps & {
  label?: string;
  style?: StyleProp<TextStyle>;
};

const Input = forwardRef<TextInput, InputProps>(
  ({ label, style, ...props }, ref) => {
    return (
      <View style={styles.container}>
        <TextInput
          ref={ref}
          style={{ ...styles.input, ...(style as any) }}
          {...props}
        />
      </View>
    );
  }
);

export default Input;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    flex: 1,
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    width: "100%",
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});
