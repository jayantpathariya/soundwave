import { StyleSheet, Text, View } from "react-native";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";
import TrackPlayer, { useProgress } from "react-native-track-player";

import { colors, fontSizes } from "@/constants/tokens";
import { formatSecondsToMinutes, wp } from "@/lib/utils";

export function PlayerProgressBar() {
  const { duration, position } = useProgress(250);

  const isSliding = useSharedValue(false);
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);

  const trackElapsedTime = formatSecondsToMinutes(position);
  const trackRemainingTime = formatSecondsToMinutes(duration - position);

  if (!isSliding.value) {
    progress.value = duration > 0 ? position / duration : 0;
  }

  return (
    <View style={styles.container}>
      <Slider
        containerStyle={styles.slider}
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        renderBubble={() => null}
        theme={{
          maximumTrackTintColor: colors.maximumTrackTintColor,
          minimumTrackTintColor: colors.minimumTrackTintColor,
        }}
        onSlidingStart={() => (isSliding.value = true)}
        onValueChange={async (value) => {
          await TrackPlayer.seekTo(value * duration);
        }}
        onSlidingComplete={async (value) => {
          // if the user is not sliding, we should not update the position
          if (!isSliding.value) return;

          isSliding.value = false;

          await TrackPlayer.seekTo(value * duration);
        }}
      />

      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{trackElapsedTime}</Text>

        <Text style={styles.timeText}>-{trackRemainingTime}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: wp(6),
  },
  slider: {
    borderRadius: wp(2),
    height: wp(1),
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: wp(2),
  },
  timeText: {
    color: colors.text.primary,
    fontSize: fontSizes.xs,
  },
});
