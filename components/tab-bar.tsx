import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs";
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";

type RouteName = "(home)" | "search" | "library";

type TabBarProps = {
  state: TabNavigationState<ParamListBase>;
  descriptors: {
    [key: string]: {
      options: {
        tabBarAccessibilityLabel?: string;
        title?: string;
      };
    };
  };
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
};

type IconProps = {
  focused: boolean;
  color: string;
  size: number;
};

export function TabBar({ state, descriptors, navigation }: TabBarProps) {
  // Map routes to icons
  const icons: Record<RouteName, (props: IconProps) => JSX.Element> = {
    "(home)": ({ focused, color, size }) => (
      <Ionicons
        name={focused ? "home" : "home-outline"}
        color={color}
        size={size}
      />
    ),
    search: ({ focused, color, size }) => (
      <Ionicons
        name={focused ? "search" : "search-outline"}
        color={color}
        size={size}
      />
    ),
    library: ({ focused, color, size }) => (
      <MaterialCommunityIcons
        name={focused ? "music-box-multiple" : "music-box-multiple-outline"}
        color={color}
        size={size}
      />
    ),
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.transparent]}
      style={styles.container}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const label = options.title ?? route.name;

        const routeName = route.name as RouteName;
        const IconComponent = icons[routeName];

        if (!IconComponent) {
          console.warn(`No icon found for route: ${routeName}`);
          return null;
        }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            key={route.key}
            onPress={onPress}
            style={styles.button}
            activeOpacity={0.7}
          >
            <IconComponent
              focused={isFocused}
              color={isFocused ? colors.text.primary : colors.text.secondary}
              size={24}
            />
            <Text
              style={[
                styles.text,
                {
                  color: isFocused
                    ? colors.text.primary
                    : colors.text.secondary,
                },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: wp(5),
  },
  button: {
    padding: wp(2),
    alignItems: "center",
  },
  text: {
    fontSize: fontSizes.sm,
    marginTop: wp(1),
    fontWeight: "500",
  },
});
