import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {Fragment, useCallback, useEffect, useState} from 'react';

import HeaderBar from 'components/HeaderBar';
import {COLORS} from 'theme/theme';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Divider from 'components/Divider';
import axios from 'lib/axios';
import {convertUnit} from 'lib/transfer-unit';
import {OrderStatus, packageType} from 'data/constants';
import PaymentStatus from 'components/PaymentStatus';
import Octicons from 'react-native-vector-icons/Octicons';
import Example from 'components/TimeLine';
import Loading from 'components/Loading';
import QRCode from 'react-qr-code';
import {RefreshControl} from 'react-native-gesture-handler';
export type OrderDetail = {
  start_station: {
    id: number;
    name: string;
    address: string;
    imageUrl: string | null;
    partnerPhones: string[];
  };
  end_station: {
    id: number;
    name: string;
    address: string;
    imageUrl: string | null;
    partnerPhones: string[];
  };
  code: string;
  sender_name: string;
  sender_phone: string;
  sender_email: string;
  receiver_name: string;
  receiver_phone: string;
  receiver_email: string;
  note: string;
  package_value: number;
  delivery_price: number;
  weight: number;
  height: number;
  length: number;
  width: number;
  collect_on_delivery: boolean;
  payment_method: number;
  package_types: number[];
  is_paid: boolean;
  is_confirmed: boolean;
  is_cancelled: boolean;
  cancelled_at: string | null;
  cancelled_reason: string | null;
  checkpoints: Array<{
    name: string;
    address: string;
    status: number;
    achieved_at: string;
  }>;
};

const OrderDetailScreen = ({route, navigation}: any) => {
  const {code} = route.params;
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<OrderDetail>();

  const qr = 'AE11I23JJDO21JHC';
  const fetchOrderDetail = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/orders/${code}`);
      // console.log(res.data.data.attributes);
      setDetail(res.data.data.attributes);
    } catch (error: any) {
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }, [code]);
  useEffect(() => {
    fetchOrderDetail();
  }, []);
  const onRefresh = useCallback(() => {
    fetchOrderDetail();
  }, [fetchOrderDetail]);
  return (
    <View style={styles.Container}>
      <HeaderBar title={`#${code}`} type="back" />
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl colors={[COLORS.primaryColor]} refreshing={false} onRefresh={onRefresh} />
          }>
          <View style={styles.Content}>
            <View style={styles.Row}>
              <Text style={styles.Label}>Trạng thái: </Text>

              {OrderStatus.map(item => {
                return (
                  <Fragment key={item.id}>
                    {item.id ===
                    detail?.checkpoints[detail?.checkpoints.length - 1]
                      .status ? (
                      <Text style={{fontWeight: '500'}}>
                        <Octicons name="dot-fill" color={item.color} />{' '}
                        {item.status}
                      </Text>
                    ) : null}
                  </Fragment>
                );
              })}
            </View>
            <View style={styles.Row}>
              <View>
                <Text style={styles.Label}>Số tiền: </Text>
                <Text style={styles.Text}>
                  {new Intl.NumberFormat('en-Us').format(
                    detail?.delivery_price ?? 0,
                  )}
                  đ
                </Text>
              </View>
              <PaymentStatus status={detail?.is_paid ? 1 : 0} />
            </View>
            <View style={styles.QRContainer}>
              <QRCode
                value={qr}
                size={164}
                style={{height: 'auto', maxWidth: '100%', width: '100%'}}
                viewBox={`0 0 164 164`}
              />
              <Text style={{color: COLORS.primaryBlack}}>{qr}</Text>
            </View>
            <View style={styles.Section}>
              <View
                style={[
                  styles.Location,
                  {
                    alignItems: 'flex-start',
                  },
                ]}>
                <FontAwesome6 name="circle-dot" size={15} color="red" />

                <Text style={styles.textItem} numberOfLines={1}>
                  {detail?.start_station.address}
                </Text>
              </View>
              <View style={{gap: 3}}>
                <View style={styles.Dot} />
                <View style={styles.Dot} />
                <View style={styles.Dot} />
                <View style={styles.Dot} />
              </View>

              <View
                style={[
                  styles.Location,
                  {
                    alignItems: 'flex-start',
                  },
                ]}>
                <FontAwesome6 name="location-dot" size={18} color="blue" />

                <Text style={styles.textItem} numberOfLines={1}>
                  {detail?.end_station.address}
                </Text>
              </View>
            </View>
            <View style={styles.Section}>
              <Text
                style={{
                  textTransform: 'uppercase',
                  fontWeight: '500',
                  fontSize: 15,
                  marginBottom: 10,
                  color: COLORS.primaryBlack,
                }}>
                Khách hàng
              </Text>
              <Text style={styles.Text}>Người gửi</Text>

              <Text style={styles.Label}>{detail?.sender_name}</Text>
              <Text style={styles.Label}>{detail?.sender_email}</Text>
              <Text style={styles.Label}>{detail?.sender_phone}</Text>
              <Divider />
              <Text style={styles.Text}>Người nhận</Text>

              <Text style={styles.Label}>{detail?.receiver_name}</Text>
              <Text style={styles.Label}>{detail?.receiver_email}</Text>
              <Text style={styles.Label}>{detail?.receiver_phone}</Text>
            </View>
            <View style={styles.Section}>
              <Text
                style={{
                  textTransform: 'uppercase',
                  fontWeight: '500',
                  fontSize: 15,
                  marginBottom: 10,
                  color: COLORS.primaryBlack,
                }}>
                Thông tin gói hàng
              </Text>
              <View style={styles.Row}>
                <Text style={styles.Label}>Khối lượng</Text>
                <Text style={styles.Text}>
                  {convertUnit(detail?.weight ?? 0)} kg
                </Text>
              </View>
              <View style={styles.Row}>
                <Text style={styles.Label}>Chiều dài</Text>
                <Text style={styles.Text}>
                  {convertUnit(detail?.length ?? 0)} m
                </Text>
              </View>
              <View style={styles.Row}>
                <Text style={styles.Label}>Chiều rộng</Text>
                <Text style={styles.Text}>
                  {convertUnit(detail?.width ?? 0)} m
                </Text>
              </View>
              <View style={styles.Row}>
                <Text style={styles.Label}>Chiều cao</Text>
                <Text style={styles.Text}>
                  {convertUnit(detail?.height ?? 0)} m
                </Text>
              </View>
              <View style={styles.Row}>
                <View>
                  <Text style={styles.Label}>Trị giá</Text>
                </View>
                <View>
                  <Text style={styles.Text}>
                    {new Intl.NumberFormat('en-Us').format(
                      detail?.package_value ?? 0,
                    )}
                    đ
                  </Text>
                </View>
              </View>
              <View style={styles.PackageList}>
                {detail?.package_types.map((value: number, index: number) => {
                  return (
                    <View key={index} style={styles.Package}>
                      <Text style={{color: 'blue'}}>
                        {packageType.find(type => type.value === value)?.label}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
            <View>
              <Text
                style={{
                  textTransform: 'uppercase',
                  fontWeight: '500',
                  fontSize: 15,
                  marginBottom: 10,
                  color: COLORS.primaryBlack,
                }}>
                Hoạt động
              </Text>
              <Example items={detail?.checkpoints} />
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: COLORS.primaryWhite,
    flex: 1,
    paddingHorizontal: 20,
  },
  Content: {
    marginTop: 20,
    gap: 10,
  },
  QRContainer: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  Row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Label: {
    fontWeight: '500',
    fontSize: 14,
  },
  Text: {
    fontWeight: '500',
    fontSize: 14,
    color: COLORS.primaryBlack,
  },
  Section: {
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: COLORS.secondaryGray,
    borderRadius: 10,
    borderColor: COLORS.secondaryGray,
    borderWidth: 1,
    overflow: 'hidden',
  },
  Dot: {
    width: 1,
    height: 2.5,
    backgroundColor: COLORS.primaryGray,
    marginLeft: 7,
  },
  Location: {
    flexDirection: 'row',
    gap: 10,
    paddingRight: 13,
  },
  textItem: {
    fontWeight: '500',
    fontSize: 14,
    color: COLORS.primaryBlack,
  },
  PackageList: {
    marginTop: 5,
    flexDirection: 'row',
    gap: 5,
    flexWrap: 'wrap',
  },
  Package: {
    padding: 3,
    backgroundColor: 'rgba(0,101,247,0.2)',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'blue',
  },
  Activity: {
    width: '100%',
    height: 'auto',
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: COLORS.secondaryGray,
    borderRadius: 10,
    borderColor: COLORS.secondaryGray,
    borderWidth: 1,
    overflow: 'hidden',
  },
});
