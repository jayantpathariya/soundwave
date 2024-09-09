import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Dialog, Portal } from "react-native-paper";

import { colors, fontSizes } from "@/constants/tokens";
import { wp } from "@/lib/utils";

type SettingDialogProps = {
  visible: boolean;
  title: string;
  children: React.ReactNode;
  onHideDialog: () => void;
  onConfirm: () => void;
};

export function SettingDialog({
  visible,
  title,
  children,
  onHideDialog,
  onConfirm,
}: SettingDialogProps) {
  return (
    <Portal>
      <Dialog
        style={styles.container}
        visible={visible}
        onDismiss={onHideDialog}
      >
        <Dialog.Title style={styles.title}>{title}</Dialog.Title>
        <Dialog.Content>{children}</Dialog.Content>
        <Dialog.Actions style={styles.actions}>
          <TouchableOpacity onPress={onHideDialog}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onConfirm}>
            <Text style={styles.btnText}>Confirm</Text>
          </TouchableOpacity>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
  },
  title: {
    color: colors.text.primary,
  },
  actions: {
    gap: wp(3),
  },
  btnText: {
    color: colors.text.primary,
    fontSize: fontSizes.md,
  },
});
