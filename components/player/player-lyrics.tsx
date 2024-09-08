import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text } from "react-native";
import { AndroidImageColors } from "react-native-image-colors/build/types";

import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";

type PlayerLyricsProps = {
  gradientColors: AndroidImageColors | null;
};

export function PlayerLyrics({ gradientColors }: PlayerLyricsProps) {
  return (
    <LinearGradient
      colors={
        gradientColors
          ? [gradientColors.muted, gradientColors.darkVibrant]
          : [colors.background, colors.background]
      }
      style={styles.container}
    >
      <Text style={styles.title}>Lyrics</Text>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error et libero
        dolores neque! Quos ipsam ab exercitationem voluptates alias hic quis,
        illo at quasi recusandae enim, numquam, quisquam facere labore.
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: wp(6),
    padding: wp(5),
    borderRadius: wp(2),
    elevation: 5,
  },
  title: {
    color: colors.text.primary,
    fontSize: fontSizes.lg,
    fontWeight: "600",
    marginBottom: wp(4),
  },
  text: {
    color: colors.text.primary,
    fontSize: wp(4),
    lineHeight: wp(6),
  },
});
