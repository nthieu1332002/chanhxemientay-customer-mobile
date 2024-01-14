import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderBar from 'components/HeaderBar';
import Input from 'components/Input';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View, Text, Keyboard, ScrollView, StyleSheet} from 'react-native';
import {COLORS} from 'theme/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import BottomSheet, {BottomSheetFooter} from '@gorhom/bottom-sheet';
import {useSharedValue} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BookingPriceDetail from 'components/BookingPriceDetail';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PaymentOption from 'components/PaymentOption';
import {emailPattern, phoneNumberPattern} from 'data/constants';
import qs from 'query-string';
import axios from 'lib/axios';
import {debounce} from 'lib/debounce';
import {useAuth} from 'context/AuthContext';
import {SCREEN_HEIGHT} from 'lib/Dimensions';
import { useToast } from 'react-native-toast-notifications';

type FieldType = {
  sender_name?: string;
  sender_phone?: string;
  sender_email?: string;
  receiver_name: string;
  receiver_phone: string;
  receiver_email: string;
  weight: number;
  height: number;
  length: number;
  width: number;
  package_value: number; // giá trị hàng hóa
  note: string;
};
type ErrorType = {
  sender_name: string;
  sender_phone: string;
  sender_email: string;
  receiver_name: string;
  receiver_phone: string;
  receiver_email: string;
  package_size: string;
  package_value: string;
  weight: string;
};
const MIN_INSURANCE = 1000000;
const PERCENT_INSURANCE = 0.005;
const BookingFormScreen = ({navigation, route}: any) => {
  const {userInfo} = useAuth();
  const {item} = route.params;
  const [inputs, setInputs] = useState<FieldType>({
    sender_name: userInfo?.name || '',
    sender_phone: userInfo?.phone || '',
    sender_email: userInfo?.email || '',
    receiver_name: '',
    receiver_phone: '',
    receiver_email: '',
    weight: 0,
    height: 0,
    length: 0,
    width: 0,
    package_value: 0,
    note: '..',
  });

  const [payment, setPayment] = useState(0);
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState<ErrorType>();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const priceDetailRef = useRef<BottomSheet>(null);
  const {bottom: bottomSafeArea, top: topSafeArea} = useSafeAreaInsets();

  const animatedRouteDetailIndex = useSharedValue<number>(0);
  const animatedRouteDetailPosition = useSharedValue<number>(SCREEN_HEIGHT);
  const [insurance, setInsurance] = useState(0);
  const [sizePrice, setSizePrice] = useState(0);
  const totalPrice = insurance + sizePrice;
  const snapPoints = useMemo(
    () => [135 + bottomSafeArea, '30%', '100%'],
    [bottomSafeArea],
  );

  const onChange = useCallback((value: number) => {
    setInsurance(
      value >= MIN_INSURANCE ? Math.round(value * PERCENT_INSURANCE) : 0,
    );
  }, []);

  const handleOnchange = (text: any, input: string) => {
    setInputs(prevState => ({...prevState, [input]: text} as FieldType));
  };
  const handleError = (error: string | null, input: string) => {
    setErrors((prevState: any) => ({...prevState, [input]: error}));
  };

  useEffect(() => {
    const fetchPrice = debounce(async () => {
      try {
        setLoading(true);
        if (
          inputs?.length &&
          inputs?.width &&
          inputs?.height &&
          inputs?.weight
        ) {
          const url = qs.stringifyUrl({
            url: '/package-price',
            query: {
              height: inputs?.height * 10,
              width: inputs?.width * 10,
              length: inputs?.length * 10,
              weight: inputs?.weight * 1000,
              distance: item.total_distance,
            },
          });
          const res = await axios.get(url);
          setSizePrice(res.data.data.total_price);
          handleError('', 'package_size');
        }
      } catch (error: any) {
        console.log('error', error.response.data.message);
        handleError(error.response.data.message, 'package_size');
      } finally {
        setLoading(false);
      }
    });
    fetchPrice();
  }, [
    inputs?.height,
    inputs?.length,
    inputs?.weight,
    inputs?.width,
    item.total_distance,
  ]);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const data = {
        ...inputs,
        height: inputs.height * 10,
        width: inputs.width * 10,
        length: inputs.length * 10,
        weight: inputs.weight * 1000,
        order_route_id: item.id,
        collect_on_delivery: checked,
        package_types: item.acceptable_package_types,
        payment_method: payment,
      };
      console.log(data);
      const res = await axios.post('/orders', data);

      if (res.data.data) {
        navigation.replace('BookingSuccess', {
          code: res.data.data.code,
          email: res.data.data.email,
        });
      }
    } catch (error: any) {
      toast.show('Có lỗi xảy ra, tạo đơn hàng thất bại!', {type: 'danger'});
      toast.show(error.response.data.message, {type: 'danger'});

    } finally {
      setLoading(false);
    }
  }, [checked, inputs, item.acceptable_package_types, item.id, navigation, payment, toast]);

  const validate = useCallback(() => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs?.sender_name) {
      handleError('Họ và tên không được bỏ trống.', 'sender_name');
      isValid = false;
    }
    if (!inputs?.sender_email) {
      handleError('Email không được bỏ trống.', 'sender_email');
      isValid = false;
    } else if (!inputs?.sender_email.match(emailPattern)) {
      handleError('Email không đúng định dạng.', 'sender_email');
      isValid = false;
    }
    if (!inputs?.sender_phone) {
      handleError('Số điện thoại không được bỏ trống.', 'sender_phone');
      isValid = false;
    } else if (!inputs?.sender_phone.match(phoneNumberPattern)) {
      handleError('Số điện thoại không đúng định dạng.', 'sender_phone');
      isValid = false;
    }

    if (!inputs?.receiver_name) {
      handleError('Họ và tên không được bỏ trống.', 'receiver_name');
      isValid = false;
    }
    if (!inputs?.receiver_email) {
      handleError('Email không được bỏ trống.', 'receiver_email');
      isValid = false;
    } else if (!inputs?.receiver_email.match(emailPattern)) {
      handleError('Email không đúng định dạng.', 'receiver_email');
      isValid = false;
    }
    if (!inputs?.receiver_phone) {
      handleError('Số điện thoại không được bỏ trống.', 'receiver_phone');
      isValid = false;
    } else if (!inputs?.receiver_phone.match(phoneNumberPattern)) {
      handleError('Số điện thoại không đúng định dạng.', 'receiver_phone');
      isValid = false;
    }
    if (!inputs?.weight) {
      handleError('Khối lượng không được bỏ trống.', 'weight');
      isValid = false;
    }
    if (!inputs?.package_value) {
      handleError('Giá trị không được bỏ trống.', 'package_value');
      isValid = false;
    }
    if (isValid) {
      handleSubmit();
    }
  }, [inputs, handleSubmit]);

  const renderFooter = useCallback(
    (props: any) => (
      <BottomSheetFooter {...props} bottomInset={0}>
        <View style={styles.Footer}>
          <View style={styles.TotalPrice}>
            <Text style={styles.PriceName}>Tổng cộng</Text>
            <Text
              style={{
                color: COLORS.primaryColor,
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              {new Intl.NumberFormat('en-Us').format(totalPrice)} đ
            </Text>
          </View>
          <TouchableOpacity
            disabled={loading}
            onPress={validate}
            style={{
              backgroundColor: COLORS.primaryColor,
              paddingVertical: 10,
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <Text style={{color: COLORS.primaryWhite, fontWeight: 'bold'}}>
              Xác nhận
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetFooter>
    ),
    [totalPrice, loading, validate],
  );
  return (
    <View
      style={{
        backgroundColor: COLORS.secondaryGray,
        flex: 1,
        paddingBottom: 150 + bottomSafeArea,
      }}>
      <HeaderBar title="Lên đơn hàng" />

      <ScrollView
        contentContainerStyle={{paddingTop: 15, paddingHorizontal: 20}}>
        <Text style={styles.SectionTitle}>Thông tin người gửi</Text>
        <View style={styles.Section}>
          <Input
            required
            defaultValue={userInfo?.name}
            onChangeText={(text: any) => handleOnchange(text, 'sender_name')}
            onFocus={() => handleError(null, 'sender_name')}
            iconName="account-outline"
            label="Họ và tên"
            placeholder="Họ và tên người gửi"
            error={errors?.sender_name}
          />
          <Input
            required
            defaultValue={userInfo?.email}
            onChangeText={(text: string) =>
              handleOnchange(text, 'sender_email')
            }
            onFocus={() => handleError(null, 'sender_email')}
            iconName="email-outline"
            label="Email"
            placeholder="Nhập email"
            error={errors?.sender_email}
          />
          <Input
            required
            keyboardType="numeric"
            defaultValue={userInfo?.phone}
            onChangeText={(text: any) => handleOnchange(text, 'sender_phone')}
            onFocus={() => handleError(null, 'sender_phone')}
            iconName="phone-outline"
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            error={errors?.sender_phone}
          />
        </View>
        <Text style={styles.SectionTitle}>Thông tin người nhận</Text>
        <View style={styles.Section}>
          <Input
            required
            onChangeText={(text: any) => handleOnchange(text, 'receiver_name')}
            onFocus={() => handleError(null, 'receiver_name')}
            iconName="account-outline"
            label="Họ và tên"
            placeholder="Họ và tên người nhận"
            error={errors?.receiver_name}
          />
          <Input
            required
            onChangeText={(text: string) =>
              handleOnchange(text, 'receiver_email')
            }
            onFocus={() => handleError(null, 'receiver_email')}
            iconName="email-outline"
            label="Email"
            placeholder="Nhập email"
            error={errors?.receiver_email}
          />
          <Input
            keyboardType="numeric"
            required
            onChangeText={(text: any) => handleOnchange(text, 'receiver_phone')}
            onFocus={() => handleError(null, 'receiver_phone')}
            iconName="phone-outline"
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            error={errors?.receiver_phone}
          />
        </View>
        <Text style={styles.SectionTitle}>Thông tin gói hàng</Text>
        <View style={styles.Section}>
          <Input
            required
            keyboardType="numeric"
            onChangeText={(text: any) => handleOnchange(text, 'weight')}
            onFocus={() => handleError(null, 'weight')}
            label="Tổng khối lượng (kg)"
            placeholder="0"
            error={errors?.weight}
            // min={0}
            // max={50}
          />
          <Text style={{color: COLORS.primaryBlack}}>
            Kích thước (cm) <Text style={{color: COLORS.red}}>*</Text>
          </Text>
          <View style={styles.OneLine}>
            <View style={{width: '30%'}}>
              <Input
                keyboardType="numeric"
                onChangeText={(text: any) => handleOnchange(text, 'length')}
                onFocus={() => handleError(null, 'length')}
                placeholder="10"
              />
            </View>
            <View style={{width: '30%'}}>
              <Input
                keyboardType="numeric"
                onChangeText={(text: any) => handleOnchange(text, 'width')}
                onFocus={() => handleError(null, 'width')}
                placeholder="10"
              />
            </View>
            <View style={{width: '30%'}}>
              <Input
                keyboardType="numeric"
                onChangeText={(text: any) => handleOnchange(text, 'height')}
                onFocus={() => handleError(null, 'height')}
                placeholder="10"
              />
            </View>
          </View>
          {errors?.package_size && (
            <Text style={{marginTop: 7, color: COLORS.red, fontSize: 12}}>
              {errors?.package_size}
            </Text>
          )}
          <Input
            required
            keyboardType="numeric"
            onChangeText={(text: any) => {
              handleOnchange(text, 'package_value');
              onChange(text);
            }}
            onFocus={() => handleError(null, 'package_value')}
            label="Tổng giá trị hàng hóa - VND"
            placeholder="0"
            error={errors?.package_value}
          />
          <Input
            onChangeText={(text: any) => handleOnchange(text, 'note')}
            onFocus={() => handleError(null, 'note')}
            label="Ghi chú"
            placeholder="VD: Hàng dễ vỡ."
          />
          <Text style={{color: COLORS.primaryBlack}}>Tùy chọn thanh toán</Text>
          <BouncyCheckbox
            onPress={(isChecked: boolean) => {
              setChecked(isChecked);
              setPayment(0);
            }}
            text="Bên nhận trả phí?"
            size={20}
            fillColor={COLORS.primaryColor}
            textStyle={{
              textDecorationLine: 'none',
            }}
          />
        </View>
        <Text style={styles.SectionTitle}>Phương thức thanh toán</Text>
        <View style={styles.Section}>
          <PaymentOption
            payment={payment}
            setPayment={setPayment}
            checked={checked}
          />
        </View>
      </ScrollView>
      <BottomSheet
        ref={priceDetailRef}
        key="priceDetail"
        index={0}
        snapPoints={snapPoints}
        animateOnMount={true}
        topInset={topSafeArea}
        animatedIndex={animatedRouteDetailIndex}
        animatedPosition={animatedRouteDetailPosition}
        footerComponent={renderFooter}>
        <View>
          <BookingPriceDetail insurance={insurance} sizePrice={sizePrice} />
        </View>
      </BottomSheet>
    </View>
  );
};

export default BookingFormScreen;

const styles = StyleSheet.create({
  SectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.primaryColor,
    marginBottom: 5,
  },
  Section: {
    padding: 15,
    backgroundColor: COLORS.primaryWhite,
    borderRadius: 10,
    flexDirection: 'column',
    gap: 10,
    marginBottom: 10,
  },
  OneLine: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  TotalPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: COLORS.primaryWhite,
    borderTopWidth: 0.5,
  },
  PriceName: {
    fontWeight: 'bold',
    fontSize: 17,
    color: COLORS.primaryBlack,
  },
  Footer: {
    paddingHorizontal: 15,
    backgroundColor: COLORS.primaryWhite,
  },
});
