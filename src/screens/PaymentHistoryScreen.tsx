import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import HeaderBar from 'components/HeaderBar';
import {
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {COLORS} from 'theme/theme';
import dayjs from 'dayjs';
import {BottomSheetModal, useBottomSheetModal} from '@gorhom/bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import PaymentDetail from 'components/PaymentDetail';
import BackDrop from 'components/BackDrop';
import Empty from 'components/Empty';
import axios from 'lib/axios';
const data = [
  {
    id: 1,
    payment_method: 0,
    vnpay_transaction_code: 0,
    order_code: 'CD1A7E9169',
    value: 312122,
    created_at: '2023-12-17T16:05:46.000000Z',
  },
  {
    id: 2,
    payment_method: 0,
    vnpay_transaction_code: null,
    order_code: '48D9B7EFB2',
    value: 312122,
    created_at: '2023-12-17T16:05:46.000000Z',
  },
  {
    id: 3,
    payment_method: 0,
    vnpay_transaction_code: 0,
    order_code: 'CD1A7E9169',
    value: 312122,
    created_at: '2023-12-17T16:05:46.000000Z',
  },
  {
    id: 4,
    payment_method: 0,
    vnpay_transaction_code: 0,
    order_code: '48D9B7EFB2',
    value: 312122,
    created_at: '2023-12-17T16:05:46.000000Z',
  },
  {
    id: 5,
    payment_method: 0,
    vnpay_transaction_code: 0,
    order_code: 'CD1A7E9169',
    value: 312122,
    created_at: '2023-12-17T16:05:46.000000Z',
  },
  {
    id: 6,
    payment_method: 0,
    vnpay_transaction_code: 0,
    order_code: '48D9B7EFB2',
    value: 312122,
    created_at: '2023-12-17T16:05:46.000000Z',
  },
  {
    id: 7,
    payment_method: 0,
    vnpay_transaction_code: 0,
    order_code: '48D9B7EFB2',
    value: 312122,
    created_at: '2023-12-17T16:05:46.000000Z',
  },
  {
    id: 8,
    payment_method: 0,
    vnpay_transaction_code: 0,
    order_code: '48D9B7EFB2',
    value: 312122,
    created_at: '2023-12-17T16:05:46.000000Z',
  },
  {
    id: 9,
    payment_method: 0,
    vnpay_transaction_code: 0,
    order_code: '48D9B7EFB2',
    value: 312122,
    created_at: '2023-12-17T16:05:46.000000Z',
  },
];
type Payment = {
  id: string;
  type: string;
  attributes: {
    payment_method: number;
    vnpay_transaction_code: string;
    order_code: string;
    value: number;
    created_at: string;
  };
};

const PaymentHistoryScreen = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Payment[]>([]);
  const {bottom: bottomSafeArea} = useSafeAreaInsets();
  const paymentDetailRef = useRef<BottomSheetModal>(null);
  const {dismissAll} = useBottomSheetModal();
  const [payment, setPayment] = useState();
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/payments');
      setData(res.data.data);
    } catch (error: any) {
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {};
  return (
    <View style={styles.ScreenContainer}>
      <HeaderBar title="Lịch sử giao dịch" border />

      {data.length < 0 ? (
        <Empty text="Không có giao dịch nào" onRefresh={onRefresh} />
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={data}
          refreshControl={
            <RefreshControl
              colors={[COLORS.primaryColor]}
              refreshing={false}
              onRefresh={onRefresh}
            />
          }
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={[
                styles.Item,
                {
                  backgroundColor:
                    index % 2 === 0
                      ? COLORS.primaryWhite
                      : COLORS.secondaryColor,
                },
              ]}
              onPress={() => {
                setPayment(item as any);
                paymentDetailRef.current?.present();
              }}>
              <View style={styles.FlexBox}>
                <View style={styles.Image}>
                  <Image
                    source={require('assets/welcome.png')}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 50,
                      backgroundColor: COLORS.primaryOpacity2,
                      borderWidth: 1,
                      borderColor: COLORS.primaryOpacity,
                    }}
                    resizeMode="center"
                  />
                </View>
                <View style={{gap: 3}}>
                  <Text style={styles.HeaderText}>
                    Thanh toán đơn hàng #{item.attributes.order_code}
                  </Text>
                  <Text style={styles.Time}>
                    {dayjs(item.attributes.created_at).format('hh:mm - DD/MM/YYYY')}
                  </Text>
                  <Text style={styles.ContentText}>
                    {new Intl.NumberFormat('en-Us').format(item.attributes.value)}đ
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      <BottomSheetModal
        handleStyle={{display: 'none'}}
        handleIndicatorStyle={{display: 'none'}}
        ref={paymentDetailRef}
        key="paymentDetail"
        name="paymentDetail"
        snapPoints={[500 + bottomSafeArea]}
        backdropComponent={BackDrop}>
        <PaymentDetail item={payment} dismiss={dismissAll} />
      </BottomSheetModal>
    </View>
  );
};

export default PaymentHistoryScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    paddingBottom: 40,
    backgroundColor: COLORS.primaryWhite,
  },
  Item: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: COLORS.primaryWhite,
  },
  FlexBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  Image: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

  HeaderText: {
    color: COLORS.primaryBlack,
    fontWeight: '500',
    fontSize: 15,
  },
  Time: {
    fontSize: 12.5,
    fontWeight: 'normal',
    color: COLORS.primaryGray,
  },
  ContentText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primaryBlack,
  },
});
