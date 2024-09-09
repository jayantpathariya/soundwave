import { StyleSheet, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";

import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";

type Option = {
  label: string;
  value: string;
};

type SettingRadioProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export function SettingRadio({ options, value, onChange }: SettingRadioProps) {
  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <>
      {options.map((option) => (
        <View key={option.value} style={styles.container}>
          <RadioButton
            color={colors.white}
            value={option.value}
            status={option.value === value ? "checked" : "unchecked"}
            onPress={() => handleChange(option.value)}
          />
          <Text style={styles.label}>{option.label}</Text>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(3),
  },
  label: {
    color: colors.text.secondary,
    fontSize: fontSizes.md,
  },
});
