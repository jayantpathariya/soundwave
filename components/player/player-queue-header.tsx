import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors, fontSizes } from "@/constants/tokens";

type PlayerQueueHeaderProps = {
  onClose: () => void;
};

export function PlayerQueueHeader({ onClose }: PlayerQueueHeaderProps) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.backButton}
        onPress={onClose}
      >
        <Ionicons name="chevron-down" size={24} color={colors.text.primary} />
      </TouchableOpacity>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerTitle}>Now Playing</Text>
        <Text style={styles.headerSubtitle}>From Playlist</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
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
