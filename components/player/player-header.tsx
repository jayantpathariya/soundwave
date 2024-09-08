import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors, fontSizes } from "@/constants/tokens";

export function PlayerHeader() {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.7}>
        <Ionicons name="chevron-down" size={24} color={colors.text.primary} />
      </TouchableOpacity>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerTitle}>Now Playing</Text>
        <Text style={styles.headerSubtitle}>From Playlist</Text>
      </View>
      <TouchableOpacity activeOpacity={0.7}>
        <Ionicons
          name="ellipsis-vertical"
          size={24}
          color={colors.text.primary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTextContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    color: colors.text.primary,
    fontSize: fontSizes.sm,
    textTransform: "uppercase",
  },
  headerSubtitle: {
    color: colors.text.primary,
    fontSize: fontSizes.md,
  },
});
