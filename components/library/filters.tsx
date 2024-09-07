import { colors } from "@/constants/tokens";
import { wp } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export function Filters() {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <Ionicons name="swap-vertical" size={18} color={colors.text.primary} />
      <Text style={styles.text}>Recents</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(2),
    paddingVertical: wp(2),
    marginBottom: wp(2),
  },
  text: {
    color: colors.text.primary,
    fontSize: wp(3.5),
    fontWeight: "500",
  },
});
