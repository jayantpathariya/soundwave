import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Switch } from "react-native-paper";

import { ScreenWrapper } from "@/components/screen-wrapper";
import { SettingDialog } from "@/components/settings/setting-dialog";
import { SettingItem } from "@/components/settings/setting-item";
import { SettingRadio } from "@/components/settings/setting-radio";
import {
  downloadQualityOptions,
  streamingQualityOptions,
} from "@/constants/options";
import { defaultStyles } from "@/constants/styles";
import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";

export default function Settings() {
  const [lyricsEnabled, setLyricsEnabled] = useState(true);
  const [downloadQuality, setDownloadQuality] = useState("320kbps");
  const [streamingQuality, setStreamingQuality] = useState("high");
  const [downloadDialogVisible, setDownloadDialogVisible] = useState(false);
  const [streamingDialogVisible, setStreamingDialogVisible] = useState(false);

  const router = useRouter();

  const showDownloadDialog = () => setDownloadDialogVisible(true);
  const hideDownloadingDialog = () => setDownloadDialogVisible(false);

  const showStreamingDialog = () => setStreamingDialogVisible(true);
  const hideStreamingDialog = () => setStreamingDialogVisible(false);

  const handleDownloadOptionChange = (value: string) => {
    setDownloadQuality(value);
  };

  const handleStreamingOptionChange = (value: string) => {
    setStreamingQuality(value);
  };

  return (
    <ScreenWrapper style={styles.container}>
      <SettingDialog
        visible={downloadDialogVisible}
        onHideDialog={hideDownloadingDialog}
        title="Download Quality"
        onConfirm={hideDownloadingDialog}
      >
        <SettingRadio
          options={downloadQualityOptions}
          value={downloadQuality}
          onChange={handleDownloadOptionChange}
        />
      </SettingDialog>
      <SettingDialog
        visible={streamingDialogVisible}
        onHideDialog={hideStreamingDialog}
        title="Streaming Quality"
        onConfirm={hideStreamingDialog}
      >
        <SettingRadio
          options={streamingQualityOptions}
          value={streamingQuality}
          onChange={handleStreamingOptionChange}
        />
      </SettingDialog>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Audio Quality</Text>
          <SettingItem
            title="Download Quality"
            description={downloadQuality}
            onPress={showDownloadDialog}
          />
          <SettingItem
            title="Streaming Quality"
            description={streamingQuality}
            onPress={showStreamingDialog}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Audio Quality</Text>
          <SettingItem
            title="Show Lyrics"
            description={lyricsEnabled ? "Enabled" : "Disabled"}
            icon={false}
            content={
              <Switch
                value={lyricsEnabled}
                onValueChange={setLyricsEnabled}
                color={colors.white}
              />
            }
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About us</Text>
          <SettingItem
            title="Version"
            description="v0.1.0"
            onPress={() => {}}
            icon={false}
          />
          <SettingItem
            title="Check for updates"
            description="Last checked at 2 2024-09-09"
            onPress={() => {}}
            icon={false}
          />
          <SettingItem
            title="Author"
            description="jayantpathariya"
            href="https://github.com/jayantpathariya"
            onPress={() => {}}
            icon={false}
          />
          <SettingItem
            title="Buy me a coffee"
            description="If you like this app, consider buying me a coffee"
            href="https://buymeacoffee.com/"
            icon={false}
          />
          <SettingItem
            title="Source code"
            description="View the source code on GitHub"
            href="https://github.com/jayantpathariya/soundwave"
            icon={false}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(3),
    paddingBottom: wp(5),
    elevation: 5,
    ...defaultStyles.paddingHorizontal,
  },
  content: {
    marginTop: wp(3),
    ...defaultStyles.paddingHorizontal,
    ...defaultStyles.paddingBottom,
  },
  title: {
    fontSize: fontSizes.xl,
    fontWeight: "600",
    color: colors.text.primary,
  },
  section: {
    marginBottom: wp(3),
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: "500",
    color: colors.text.primary,
    marginBottom: wp(1),
  },
});
