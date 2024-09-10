import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";

import { colors } from "@/constants/tokens";
import { wp } from "@/lib/utils";

export function PlayerControls() {
  const { playing } = useIsPlaying();

  const togglePlayPause = async () => {
    if (playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7}>
        <Ionicons name="shuffle" size={30} color={colors.icon.primary} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7}>
        <Ionicons
          name="play-skip-back-sharp"
          size={34}
          color={colors.icon.primary}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.playButton}
        onPress={togglePlayPause}
      >
        <Ionicons
          name={playing ? "pause-sharp" : "play-sharp"}
          size={36}
          color={colors.background}
          style={[!playing && { transform: [{ translateX: wp(1) }] }]}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7}>
        <Ionicons
          name="play-skip-forward-sharp"
          size={34}
          color={colors.icon.primary}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7}>
        <Ionicons name="repeat-sharp" size={30} color={colors.icon.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: wp(5),
  },
  playButton: {
    backgroundColor: colors.icon.primary,
    borderRadius: wp(20),
    padding: wp(4),
  },
});
