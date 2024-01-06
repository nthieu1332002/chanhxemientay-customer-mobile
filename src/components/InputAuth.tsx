import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardType,
  StyleSheet,
} from 'react-native';
import {COLORS} from 'theme/theme';

type Props = {
  value?: string;
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  inputType?: string;
  keyboardType?: KeyboardType;
  fieldButtonLabel?: React.ReactNode;
  onChangeText: (value: string) => void;
  fieldButtonFunction?: () => void;
  secureTextEntry?: boolean;
};

export default function InputAuth({
  value,
  onChangeText,
  label,
  placeholder,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  secureTextEntry,
}: Props) {
  return (
    <View>
      {label && <Text style={styles.Label}>{label}</Text>}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: '#ccc',
          borderWidth: 1,
          padding: 9,
          borderRadius: 5,
        }}>
        {icon}
        {inputType === 'password' ? (
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            keyboardType={keyboardType}
            style={styles.Input}
            secureTextEntry={secureTextEntry}
          />
        ) : (
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            keyboardType={keyboardType}
            style={styles.Input}
          />
        )}
        <TouchableOpacity onPress={fieldButtonFunction}>
          {fieldButtonLabel}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Label: {
    marginBottom: 3,
    fontSize: 16,
    color: COLORS.primaryGray,
  },
  Input: {
    flex: 1,
    paddingVertical: 0,
    fontSize: 16,
  },
});
