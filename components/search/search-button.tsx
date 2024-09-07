import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { colors } from "@/constants/tokens";
import { wp } from "@/lib/utils";

export function SearchButton() {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.navigate("/(tabs)/search/search-term")}
      style={styles.container}
      activeOpacity={0.7}
    >
      <Ionicons name="search" size={24} color={colors.text.secondary} />
      <Text style={styles.text}>What do you want to listen?</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: wp(2),
    marginVertical: wp(4),
    marginHorizontal: wp(4),
  },
  text: {
    marginLeft: wp(2),
    fontSize: 16,
    color: colors.text.secondary,
  },
});
