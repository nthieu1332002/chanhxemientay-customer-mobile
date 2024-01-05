import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from 'theme/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Props = {
  payment: number;
  setPayment: (amount: number) => void;
  checked: boolean;
};

const PaymentOption = ({payment, setPayment, checked}: Props) => {
  return (
    <View style={styles.Container}>
      <TouchableOpacity
        style={[
          styles.ImageWrapper,
          {
            borderColor:
              payment === 0 ? COLORS.primaryColor : COLORS.secondaryColor,
          },
        ]}
        onPress={() => {
          setPayment(0);
        }}>
        <Image style={styles.Logo} source={require('assets/cash.jpg')} />
      </TouchableOpacity>
      <TouchableOpacity
        disabled={checked}
        style={[
          styles.ImageWrapper,
          {
            borderColor:
              payment === 1 ? COLORS.primaryColor : COLORS.secondaryColor,
          },
          {backgroundColor: checked ? COLORS.primaryGray : COLORS.primaryWhite},
        ]}
        onPress={() => {
          setPayment(1);
        }}>
        <Image style={styles.Logo} source={require('assets/vnpay.png')} />
      </TouchableOpacity>
    </View>
  );
};

export default PaymentOption;

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  ImageWrapper: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  Logo: {
    width: 120,
    height: 30,
  },
});
