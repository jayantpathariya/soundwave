import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";
import { StyleSheet, Text, View } from "react-native";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";

export function PlayerProgressBar() {
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);

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
      />

      <View style={styles.timeRow}>
        <Text style={styles.timeText}>02:12</Text>

        <Text style={styles.timeText}>03:45</Text>
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
