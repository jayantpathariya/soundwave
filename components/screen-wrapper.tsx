import { StyleProp, View, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@/constants/tokens";
import { wp } from "@/lib/utils";

type ScreenWrapperProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function ScreenWrapper({ children, style }: ScreenWrapperProps) {
  const { top } = useSafeAreaInsets();

  const paddingTop = top > 0 ? top + 5 : 30;

  return (
    <View
      style={[
        {
          flex: 1,
          paddingTop,
          paddingHorizontal: wp(5),
          backgroundColor: colors.background,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
