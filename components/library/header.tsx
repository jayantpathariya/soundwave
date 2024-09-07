import { defaultStyles } from "@/constants/styles";
import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function Header() {
  return (
    <View style={[styles.container, defaultStyles.paddingHorizontal]}>
      <Text style={styles.title}>Library</Text>
      <View style={styles.actions}>
        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons name="search" size={24} color={colors.text.secondary} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons name="add-sharp" size={28} color={colors.text.secondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: wp(3),
  },
  title: {
    color: colors.text.primary,
    fontSize: fontSizes.xl,
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(3),
  },
});
