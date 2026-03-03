import React from 'react';
import { View, Text, StyleSheet, ViewStyle, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../context/ThemeContext';

export interface PickerOption {
  label: string;
  value: string;
}

interface PickerFieldProps {
  label?: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  options: PickerOption[];
  style?: ViewStyle;
}

const PickerField: React.FC<PickerFieldProps> = ({
  label,
  selectedValue,
  onValueChange,
  options,
  style,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]}>
      {label ? (
        <Text style={[styles.label, { color: colors.heading_text }]}>{label}:</Text>
      ) : null}
      <View
        style={[
          styles.pickerWrapper,
          { borderColor: colors.borderColor, backgroundColor: colors.card },
        ]}
      >
        <Picker
          selectedValue={selectedValue}
          onValueChange={(value) => onValueChange(value as string)}
          style={[styles.picker, { color: colors.heading_text }]}
          mode="dialog"
          itemStyle={{ fontSize: 14, color: colors.muted_text }}
        >
          {options.map((opt) => (
            <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    minHeight: 42,
    paddingVertical: 2,
    justifyContent: 'center',
  },
  picker: {
    // height: 38,
    width: '100%',
    fontSize: 13,
  },
});

export default PickerField;

