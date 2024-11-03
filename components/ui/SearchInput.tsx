import { View } from "react-native";
import Input from "./Input";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Button from "./Button";
interface SearchInputTypes {
  input: string;
  setQ: (v: string) => void;
  setInput: (v: string) => void;
}
export const SearchInput = ({ input, setInput, setQ }: SearchInputTypes) => {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={styles.inputContainer}>
      <Input
        value={input}
        onChangeText={(text) => setInput(text)}
        style={{
          backgroundColor: theme.colors.background,
        }}
        placeholder="Search"
      />
      <Button
        title="Search"
        onPress={() => {
          setQ(input.toLowerCase());
        }}
        style={{
          width: "auto",
        }}
      />
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    gap: theme.spacing[1],
  },
}));
