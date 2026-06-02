import React from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type ExpoDateTimePickerChangeEvent = {
  nativeEvent: { timestamp: number; utcOffset: number };
  type?: "set" | "dismissed";
};

export interface TextFieldDatePickerModalProps {
  visible: boolean;
  date: Date;
  onConfirm: (date: Date) => void;
  onCancel: () => void;
}

export default function TextFieldDatePickerModal({
  visible,
  date,
  onConfirm,
  onCancel,
}: TextFieldDatePickerModalProps) {
  let ExpoDateTimePicker:
    | React.ComponentType<{
        value: Date;
        mode?: "date" | "time" | "datetime";
        presentation?: "inline" | "dialog";
        onValueChange?: (
          event: ExpoDateTimePickerChangeEvent,
          selectedDate: Date,
        ) => void;
        onDismiss?: () => void;
      }>
    | null = null;

  try {
    ExpoDateTimePicker =
      require("@expo/ui/community/datetime-picker").default ?? null;
  } catch {
    ExpoDateTimePicker = null;
  }

  if (ExpoDateTimePicker) {
    if (!visible) return null;
    return (
      <ExpoDateTimePicker
        value={date}
        mode="date"
        presentation="dialog"
        onValueChange={(_event, selectedDate) => {
          onConfirm(selectedDate);
        }}
        onDismiss={onCancel}
      />
    );
  }

  return (
    <DateTimePickerModal
      isVisible={visible}
      mode="date"
      date={date}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
