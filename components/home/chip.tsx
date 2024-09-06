import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";
import { StyleSheet, Text, View } from "react-native";

type ChipProps = {
  title: string;
  selected?: boolean;
};

export function Chip({ title, selected = false }: ChipProps) {
  return (
    <View
      style={[
        styles.container,
        selected && { backgroundColor: colors.surface },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: wp(2),
    paddingHorizontal: wp(4),
    borderRadius: wp(10),
  },
  title: {
    color: colors.text.secondary,
    fontSize: fontSizes.md,
  },
});
