import { Ionicons } from "@expo/vector-icons";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";

type SettingItemProps = {
  title: string;
  description?: string;
  onPress?: () => void;
  icon?: boolean;
  content?: React.ReactNode;
  href?: string;
};

export function SettingItem({
  title,
  description,
  onPress,
  icon = true,
  content,
  href,
}: SettingItemProps) {
  const handlePress = () => {
    if (href) {
      Linking.openURL(href);
      return;
    }

    onPress?.();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.itemContainer}
      activeOpacity={0.7}
    >
      <View>
        <Text style={styles.itemTitle}>{title}</Text>
        {description && (
          <Text style={styles.itemDescription}>{description}</Text>
        )}
      </View>
      {icon && (
        <Ionicons
          name="chevron-forward-outline"
          size={24}
          color={colors.icon.primary}
        />
      )}
      {content}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: wp(2),
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    marginLeft: wp(3),
  },
  itemTitle: {
    fontSize: fontSizes.md,
    color: colors.text.primary,
    fontWeight: "500",
  },
  itemDescription: {
    fontSize: fontSizes.sm,
    color: colors.text.secondary,
  },
});
