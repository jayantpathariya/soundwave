import { StyleSheet, View } from "react-native";
import LoaderKit from "react-native-loader-kit";

import { hp, wp } from "@/lib/utils";
import { ScreenWrapper } from "./screen-wrapper";

export function Loader() {
  return (
    <ScreenWrapper style={styles.container}>
      <View style={styles.loaderContainer}>
        <LoaderKit name="LineScaleParty" color="#fff" style={styles.loader} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  loaderContainer: {
    marginBottom: hp(15),
  },
  loader: {
    width: wp(12),
    aspectRatio: 1,
  },
});
