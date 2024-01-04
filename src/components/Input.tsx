import React from 'react';
import {View, Text, TextInput, StyleSheet, KeyboardType} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from 'theme/theme';

type Props = {
  label?: string;
  iconName?: string;
  error?: string;
  password?: boolean;
  onFocus?: () => void;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  required?: boolean;
  keyboardType?: KeyboardType;
};

const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  onChangeText,
  placeholder,
  required,
  keyboardType,
  ...props
}: Props) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View>
      {label && (
        <Text style={style.label}>
          {label} {required ? <Text style={{color: COLORS.red}}>*</Text> : null}
        </Text>
      )}
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.primaryColor
              : COLORS.secondaryGray,
            alignItems: 'center',
          },
        ]}>
        {iconName && (
          <Icon
            name={iconName}
            style={{color: COLORS.primaryGray, fontSize: 22, marginRight: 7}}
          />
        )}
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onChangeText={onChangeText}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          placeholder={placeholder}
          style={{
            color: COLORS.primaryGray,
            flex: 1,
            fontSize: 15,
            width: '100%',
          }}
          keyboardType={keyboardType}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{color: COLORS.primaryGray, fontSize: 22}}
          />
        )}
      </View>
      {error && (
        <Text style={{marginTop: 7, color: COLORS.red, fontSize: 12}}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginBottom: 5,
    fontSize: 14,
    color: COLORS.primaryBlack,
  },
  inputContainer: {
    height: 48,
    backgroundColor: COLORS.secondaryGray,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 15,
  },
});

export default Input;
