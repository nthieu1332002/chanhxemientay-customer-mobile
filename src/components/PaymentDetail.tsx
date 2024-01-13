import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from 'theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Divider from './Divider';
import dayjs from 'dayjs';

const PaymentDetail = ({item, dismiss}: any) => {
  return (
    <View style={styles.Container}>
      <View style={styles.Image} onTouchEnd={dismiss}>
        <Image
          source={require('assets/welcome.png')}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: COLORS.primaryOpacity2,
          }}
          resizeMode="center"
        />
        <AntDesign
          name="closecircle"
          size={30}
          color="gray"
          style={styles.CloseButton}
        />
      </View>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 17,
          fontWeight: 'bold',
          color: COLORS.primaryBlack,
          paddingVertical: 5,
        }}>
        Chi tiết giao dịch
      </Text>
      <View style={styles.Body}>
        <View style={styles.Section}>
          <Text style={styles.Label}>Mã đơn hàng:</Text>
          <Text style={styles.Text}>{item.attributes.order_code}</Text>
        </View>
        <Divider marginVertical={0} />
        <View style={styles.Section}>
          <Text style={styles.Label}>Mã VNPay:</Text>
          <Text style={styles.Text}>{item.attributes.vnpay_transaction_code}</Text>
        </View>
        <Divider marginVertical={0} />
        <View style={styles.Section}>
          <Text style={styles.Label}>Trạng thái thanh toán:</Text>
          <Text style={styles.Text}>
            <AntDesign name="checkcircle" size={18} color="#03c04a" /> Đã thanh
            toán
          </Text>
        </View>
        <Divider marginVertical={0} />
        <View style={styles.Section}>
          <Text style={styles.Label}>Thành tiền:</Text>
          <Text style={styles.Text}>
            {new Intl.NumberFormat('en-Us').format(item.attributes.value)}đ
          </Text>
        </View>
        <Divider marginVertical={0} />
        <View style={styles.Section}>
          <Text style={styles.Label}>Thời gian:</Text>
          <Text style={styles.Text}>
            {dayjs(item.attributes.created_at).format('hh:mm - DD/MM/YYYY')}
          </Text>
        </View>
        <Divider marginVertical={0} />
        <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
          {item.attributes.payment_method === 0 ? (
            <Image
              source={require('assets/cash.jpg')}
              style={{height: 30, width: 60}}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require('assets/vnpay.png')}
              style={{height: 30, width: 60}}
              resizeMode="contain"
            />
          )}
          <Text style={styles.Text}>
            {item.attributes.payment_method === 0 ? 'Tiền mặt' : 'VNPay'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PaymentDetail;

const styles = StyleSheet.create({
  Container: {},
  Image: {
    width: '100%',
    height: 150,
  },
  CloseButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  Body: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    gap: 15,
  },
  Section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Label: {
    color: COLORS.primaryGray,
    fontSize: 15,
  },
  Text: {
    color: COLORS.primaryBlack,
    fontSize: 15,
    fontWeight: '500',
  },
});
