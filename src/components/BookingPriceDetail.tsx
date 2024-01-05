import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Booking} from 'screens/SearchListScreen';
import {COLORS} from 'theme/theme';

type Props = {
  insurance: number;
  sizePrice: number;
};

const BookingPriceDetail = ({insurance, sizePrice}: Props) => {
  return (
    <View style={styles.Container}>
      <View style={styles.Header}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: COLORS.primaryBlack,
          }}>
          Chi tiết giá
        </Text>
      </View>
      <View>
        <View style={styles.Detail}>
          <Text style={styles.PriceName}>Giá theo khối lượng</Text>
          <Text style={styles.text}>{new Intl.NumberFormat('en-Us').format(sizePrice)} đ</Text>
        </View>
        <View style={styles.Detail}>
          <Text style={styles.PriceName}>Phí khai giá</Text>
          <Text style={styles.text}>{new Intl.NumberFormat('en-Us').format(insurance)} đ</Text>
        </View>
      </View>
    </View>
  );
};

export default BookingPriceDetail;

const styles = StyleSheet.create({
  Container: {
    paddingHorizontal: 15,
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Detail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 50,
  },
  PriceName: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.primaryBlack,
  },
  text: {
    fontSize: 16,
    color: COLORS.primaryBlack,
  },
});
