import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { COLORS } from 'theme/theme';
type Props = {
  status: number;
};

const PaymentStatus = ({status}: Props) => {
  return (
    <View
      style={[
        styles.Container,
        {
          backgroundColor: status === 0 ? COLORS.redOpacity : COLORS.greenOpacity
        },
      ]}>
      <Text style={{ fontWeight: '500',fontSize: 12.5, color: status === 0 ? 'red' : 'green'}}>{status === 0 ?  'Chưa thanh toán': 'Đã thanh toán'}</Text>
    </View>
  );
};

export default PaymentStatus;

const styles = StyleSheet.create({
  Container: {
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: 100,
  },
});
