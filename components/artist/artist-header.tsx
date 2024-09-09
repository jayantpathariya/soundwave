import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Artist } from "@/assets/data/aritst";
import { unknownArtistImageUrl } from "@/constants/images";
import { defaultStyles } from "@/constants/styles";
import { colors, fontSizes } from "@/constants/tokens";
import { usePlayerBackground } from "@/hooks/use-player-background";
import { wp } from "@/lib/utils";
import { ScreenWrapper } from "../screen-wrapper";

const HEADER_HEIGHT = wp(25);
const ARTIST_INFO_HEIGHT = wp(70);

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

type ArtistHeaderProps = {
  artist: Artist;
  scrollY: Animated.SharedValue<number>;
};

export function ArtistHeader({ scrollY, artist }: ArtistHeaderProps) {
  const router = useRouter();
  const imageColors = usePlayerBackground(
    artist?.image ?? unknownArtistImageUrl
  );

  // Default fallback colors
  const averageColor = imageColors?.average ?? "255,255,255"; // Default white
  const darkMutedColor = imageColors?.darkMuted ?? "0,0,0"; // Default black

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, ARTIST_INFO_HEIGHT - HEADER_HEIGHT],
      [0, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity,
    };
  });

  const titleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [ARTIST_INFO_HEIGHT - HEADER_HEIGHT, ARTIST_INFO_HEIGHT],
      [0, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity,
    };
  });

  return (
    <View style={styles.header}>
      <AnimatedLinearGradient
        style={[StyleSheet.absoluteFill, animatedStyle]}
        colors={[averageColor, darkMutedColor]}
      />
      <ScreenWrapper
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "transparent",
          ...defaultStyles.paddingHorizontal,
        }}
      >
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Animated.Text style={[styles.headerTitle, titleStyle]}>
          {artist.name}
        </Animated.Text>
      </ScreenWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    height: HEADER_HEIGHT,
    paddingBottom: wp(5),
  },
  headerTitle: {
    color: colors.text.primary,
    fontSize: fontSizes.lg,
    fontWeight: "600",
    marginLeft: wp(4),
  },
});
