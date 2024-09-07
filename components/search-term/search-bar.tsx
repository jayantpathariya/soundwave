import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
        <Ionicons
          name="arrow-back"
          size={24}
          color={colors.text.secondary}
          style={{ alignSelf: "flex-end", marginRight: wp(4) }}
        />
      </TouchableOpacity>
      <View style={[styles.inputContainer]}>
        <Ionicons name="search" size={24} color={colors.text.secondary} />
        <TextInput
          style={styles.input}
          placeholder="What do you want to listen to?"
          placeholderTextColor={colors.text.secondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus
        />
        {searchQuery && (
          <TouchableOpacity activeOpacity={0.7} style={styles.clearBtn}>
            <Ionicons name="close" size={26} color={colors.text.secondary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    marginVertical: wp(4),
    marginHorizontal: wp(4),
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: wp(2),
  },
  input: {
    flex: 1,
    marginLeft: wp(2),
    marginRight: wp(10),
    fontSize: fontSizes.md,
    color: colors.text.secondary,
  },
  clearBtn: {
    position: "absolute",
    right: wp(4),
  },
});
