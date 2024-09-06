import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { colors } from "@/constants/tokens";
import { wp } from "@/lib/utils";

export function Header() {
  return (
    <View style={styles.container}>
      <View>
        {/* <Text style={styles.welcomeText}>Welcome Back,</Text>
        <Text style={styles.timeText}>Good Evening</Text> */}
        <Image
          source={require("@/assets/images/logo-sm.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={colors.onBackground}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            name="settings-outline"
            size={24}
            color={colors.onBackground}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    height: wp(7),
    width: wp(7),
  },
  welcomeText: {
    fontSize: wp(4),
    color: colors.text.primary,
  },
  timeText: {
    fontSize: wp(3),
    color: colors.text.secondary,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: wp(3),
  },
});
