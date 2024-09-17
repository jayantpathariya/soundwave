import { Filter } from "@/assets/data/filters";
import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type ChipProps = Filter & {
  onFilterChange: (filter: string) => void;
  activeFilter: string;
};

export function Chip({
  title,
  value,
  onFilterChange,
  activeFilter,
}: ChipProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        activeFilter === value && { backgroundColor: colors.surface },
      ]}
      activeOpacity={0.7}
      onPress={() => onFilterChange(value)}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
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
