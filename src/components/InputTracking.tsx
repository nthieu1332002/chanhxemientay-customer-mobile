import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {COLORS} from 'theme/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type Props = {
  onChangeText: (value: string) => void;
};

const InputTracking = ({onChangeText}: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 17,
        paddingVertical: 4,
        marginTop: 15,
        borderRadius: 15,
        backgroundColor: COLORS.primaryWhite,
        alignItems: 'center',
        gap: 10,
      }}>
      <FontAwesome name="search" size={16} />

      <TextInput
        onChangeText={onChangeText}
        placeholderTextColor={COLORS.primaryGray}
        placeholder="Mã vận đơn..."
        style={{
          fontSize: 15,
          paddingVertical: 10,
          color: 'black',
          width: '100%',
        }}
      />
    </View>
  );
};

export default InputTracking;

const styles = StyleSheet.create({});
