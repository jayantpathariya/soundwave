import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { colors } from "@/constants/tokens";
import { wp } from "@/lib/utils";

type PlayerActionsButtonsProps = {
  onOpenPlayerQueue: () => void;
};

export function PlayerActionsButtons({
  onOpenPlayerQueue,
}: PlayerActionsButtonsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7}>
        <Ionicons
          name="share-social-outline"
          size={24}
          color={colors.text.primary}
          style={{ alignSelf: "center" }}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={onOpenPlayerQueue}>
        <MaterialCommunityIcons
          name="playlist-music-outline"
          size={27}
          color={colors.text.primary}
          style={{ alignSelf: "center" }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: wp(4),
  },
});
