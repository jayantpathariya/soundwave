import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export function EmptyResult() {
  return (
    <View style={styles.container}>
      <Ionicons
        name="sad-outline"
        size={wp(25)}
        color={colors.text.secondary}
      />
      <Text style={styles.title}>No results found</Text>
      <Text style={styles.description}>Try searching for something else</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: wp(2),
    marginTop: -wp(25),
  },
  title: {
    color: colors.text.primary,
    fontSize: fontSizes.xl,
    fontWeight: "500",
  },
  description: {
    color: colors.text.secondary,
    fontSize: fontSizes.md,
  },
});
