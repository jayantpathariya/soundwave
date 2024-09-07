import { wp } from "@/lib/utils";
import { StyleSheet } from "react-native";
import { colors } from "./tokens";

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingBottom: wp(22),
    backgroundColor: colors.background,
  },
  paddingHorizontal: {
    paddingHorizontal: wp(5),
  },
  paddingBottom: {
    paddingBottom: wp(22),
  },
});
