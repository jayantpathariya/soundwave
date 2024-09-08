import { StyleSheet, Text, TouchableOpacity } from "react-native";

import type { Browse } from "@/assets/data/browse";
import { colors } from "@/constants/tokens";
import { wp } from "@/lib/utils";

type BrowseCardProps = Browse;

export function BrowseCard({ name, color }: BrowseCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, { backgroundColor: color }]}
    >
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp(44),
    height: wp(30),
    borderRadius: wp(1.5),
    padding: wp(4),
  },
  text: {
    color: colors.text.primary,
    fontSize: wp(5),
    fontWeight: "500",
  },
});
