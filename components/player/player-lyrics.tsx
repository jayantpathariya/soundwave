import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text } from "react-native";
import { AndroidImageColors } from "react-native-image-colors/build/types";

import { colors, fontSizes } from "@/constants/tokens";
import { useGetSongLyrics } from "@/hooks/api/use-get-song-lyrics";
import { wp } from "@/lib/utils";
import { decode } from "html-entities";

type PlayerLyricsProps = {
  gradientColors: AndroidImageColors | null;
  songId: string;
  duration?: number;
};

export function PlayerLyrics({
  gradientColors,
  songId,
  duration,
}: PlayerLyricsProps) {
  const { data, isLoading } = useGetSongLyrics(songId, {
    enabled: !!songId,
  });

  if (isLoading || !data) return null;

  const lyrics = decode(data.lyrics).split("<br>");

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
        {lyrics.map((line, index) => (
          <Text key={index} style={styles.text}>
            {line.trim()}
            {/* Add a new line after each line except the last one */}
            {index !== lyrics.length - 1 && "\n"}
          </Text>
        ))}
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
