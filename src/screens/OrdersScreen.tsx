import {FlatList, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {COLORS} from 'theme/theme';
import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Octicons from 'react-native-vector-icons/Octicons';
import axios from 'lib/axios';
import qs from 'query-string';
import {OrderStatus} from 'data/constants';
import PaymentStatus from 'components/PaymentStatus';
import Loading from 'components/Loading';
import InputTracking from 'components/InputTracking';
import {debounce} from 'lib/debounce';
type Order = {
  code: string;
  created_at: string;
  delivery_price: number;
  payment_status: number;
  receiver_name: string;
  latest_order_status: number;
  is_confirmed: boolean;
  is_cancelled: boolean;
  cancelled_at: string | null;
  can_be_updated: boolean;
  can_be_cancelled: boolean;
};
const OrdersScreen = ({navigation}: any) => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>();
  const [status, setStatus] = useState('');
  const [code, setCode] = useState('');
  useEffect(() => {
    const fetchOrders = debounce(async () => {
      setLoading(true);
      try {
        const url = qs.stringifyUrl(
          {
            url: '/orders',
            query: {
              'filter[code]': code,
              'filter[status]': status,
              page: 1,
              per_page: 10,
            },
          },
          {skipNull: true},
        );
        const res = await axios.get(url);
        setOrders(res.data.data);
      } catch (error: any) {
        console.log(error.response.data.message);
      } finally {
        setLoading(false);
      }
    });
    fetchOrders();
  }, [code, status]);
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryOpacity} />

      <View style={styles.ScreenHeader}>
        <Text style={styles.ScreenTitle}>Theo dõi đơn hàng của bạn</Text>
        <Text style={styles.SubTitle}>Tra cứu vận đơn với chúng tôi</Text>

        <InputTracking
          onChangeText={(text: string) => {
            setCode(text);
          }}
        />
      </View>
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: COLORS.primaryWhite,
        }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 18,
          }}
          data={[
            {
              id: '',
              status: 'Tất cả',
            },
            ...OrderStatus,
          ]}
          renderItem={({item}) => (
            <View
              onStartShouldSetResponder={event => true}
              onTouchEnd={e => {
                e.stopPropagation();
              }}>
              <TouchableOpacity onPress={() => setStatus(item.id.toString())}>
                <Text
                  style={{
                    fontWeight:
                      item.id.toString() === status.toString()
                        ? 'bold'
                        : 'normal',
                    color:
                      item.id === status.toString()
                        ? COLORS.primaryBlack
                        : COLORS.primaryGray,
                    fontSize: 15,
                  }}>
                  {item.status}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <View style={{paddingHorizontal: 20, flex: 1}}>
        {loading ? (
          <Loading />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={orders}
            contentContainerStyle={{
              gap: 10,
            }}
            style={{backgroundColor: COLORS.primaryWhite}}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('OrderDetail', {code: item.code})
                }>
                <View style={styles.Item}>
                  <View style={{gap: 5}}>
                    <Text style={styles.Code}>#{item.code}</Text>
                    <Text
                      style={[styles.Receiver, {maxWidth: 200}]}
                      numberOfLines={1}>
                      Số tiền:
                      <Text style={{fontWeight: '500'}}>
                        {' '}
                        {new Intl.NumberFormat('en-Us').format(
                          item.delivery_price,
                        )}
                        đ{' '}
                      </Text>
                    </Text>
                    <Text
                      style={[styles.Receiver, {maxWidth: 200}]}
                      numberOfLines={1}>
                      Đến:
                      <Text style={{fontWeight: '500'}}>
                        {' '}
                        {item.receiver_name}
                      </Text>
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{marginLeft: 'auto'}}>
                      <PaymentStatus status={item.payment_status} />
                    </View>
                    <View style={styles.Status}>
                      {OrderStatus.map(o => (
                        <Fragment key={o.id}>
                          {o.id === item.latest_order_status && (
                            <Text style={{fontWeight: '500'}}>
                              <Octicons name="dot-fill" color={o.color} />{' '}
                              {o.status}
                            </Text>
                          )}
                        </Fragment>
                      ))}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryWhite,
  },
  ScreenHeader: {
    backgroundColor: COLORS.primaryOpacity,
    padding: 20,
  },
  ScreenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primaryBlack,
    marginTop: 10,
    width: SCREEN_WIDTH - 100,
  },
  SubTitle: {
    fontWeight: '500',
    fontSize: 16,
    marginTop: 10,
  },
  InputContainerComponent: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingVertical: 17,
    marginTop: 15,
    borderRadius: 15,
    backgroundColor: COLORS.primaryWhite,
  },
  Item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.secondaryGray,
    padding: 10,
    borderRadius: 5,
  },
  Code: {
    color: COLORS.primaryBlack,
    fontSize: 16,
    fontWeight: 'bold',
  },
  Receiver: {},
  Status: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
