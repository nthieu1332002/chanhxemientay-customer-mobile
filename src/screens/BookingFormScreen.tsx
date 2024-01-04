import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderBar from 'components/HeaderBar';
import Input from 'components/Input';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  StyleSheet,
  Button,
  Dimensions,
} from 'react-native';
import {COLORS} from 'theme/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import BottomSheet, {BottomSheetFooter} from '@gorhom/bottom-sheet';
import {useSharedValue} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BookingPriceDetail from 'components/BookingPriceDetail';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PaymentOption from 'components/PaymentOption';
type FieldType = {
  email: string;
  fullname: string;
  phone: string;
  password: string;
};
const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const MIN_INSURANCE = 1000000;
const PERCENT_INSURANCE = 0.005;
const BookingFormScreen = ({navigation, route}: any) => {
  const {item} = route.params;
  const [inputs, setInputs] = useState<FieldType>({
    email: '',
    fullname: '',
    phone: '',
    password: '',
  });
  const [payment, setPayment] = useState(0);
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState<FieldType>();
  const [loading, setLoading] = useState(false);

  const priceDetailRef = useRef<BottomSheet>(null);
  const {bottom: bottomSafeArea, top: topSafeArea} = useSafeAreaInsets();

  const animatedRouteDetailIndex = useSharedValue<number>(0);
  const animatedRouteDetailPosition = useSharedValue<number>(SCREEN_HEIGHT);
  const [insurance, setInsurance] = useState(0);
  const [sizePrice, setSizePrice] = useState(0);
  const totalPrice = insurance + sizePrice;

  const onChange = useCallback((value: number) => {
    setInsurance(
      value >= MIN_INSURANCE ? Math.round(value * PERCENT_INSURANCE) : 0,
    );
  }, []);
  const snapPoints = useMemo(
    () => [135 + bottomSafeArea, '35%', '100%'],
    [bottomSafeArea],
  );

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }

    if (!inputs.fullname) {
      handleError('Please input fullname', 'fullname');
      isValid = false;
    }

    if (!inputs.phone) {
      handleError('Please input phone number', 'phone');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError('Min password length of 5', 'password');
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = () => {
    // setLoading(true);
    // setTimeout(() => {
    //   try {
    //     setLoading(false);
    //     AsyncStorage.setItem('userData', JSON.stringify(inputs));
    //     navigation.navigate('LoginScreen');
    //   } catch (error) {
    //     Alert.alert('Error', 'Something went wrong');
    //   }
    // }, 3000);
  };

  const handleOnchange = (text: any, input: string) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error: string | null, input: string) => {
    setErrors(prevState => ({...prevState, [input]: error} as FieldType));
  };

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
                fontSize: 17,
              }}>
              {new Intl.NumberFormat('en-Us').format(totalPrice)}đ
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              priceDetailRef.current?.close();
            }}
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
    [totalPrice],
  );
  return (
    <View
      style={{
        backgroundColor: COLORS.secondaryGray,
        flex: 1,
        paddingBottom: 150 + bottomSafeArea,
      }}>
      <HeaderBar title="Lên đơn hàng" navigation={navigation} />

      <ScrollView
        contentContainerStyle={{paddingTop: 15, paddingHorizontal: 20}}>
        <Text style={styles.SectionTitle}>Thông tin người gửi</Text>
        <View style={styles.Section}>
          <Input
            required
            onChangeText={(text: any) => handleOnchange(text, 'fullname')}
            onFocus={() => handleError(null, 'fullname')}
            iconName="account-outline"
            label="Họ và tên"
            placeholder="Họ và tên người gửi"
            error={errors?.fullname}
          />
          <Input
            required
            // keyboardType="numeric"
            onChangeText={(text: any) => handleOnchange(text, 'phone')}
            onFocus={() => handleError(null, 'phone')}
            iconName="phone-outline"
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            error={errors?.phone}
          />
          <Input
            required
            onChangeText={(text: string) => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors?.email}
          />
        </View>
        <Text style={styles.SectionTitle}>Thông tin người nhận</Text>
        <View style={styles.Section}>
          <Input
            required
            onChangeText={(text: any) => handleOnchange(text, 'fullname')}
            onFocus={() => handleError(null, 'fullname')}
            iconName="account-outline"
            label="Họ và tên"
            placeholder="Họ và tên người nhận"
            error={errors?.fullname}
          />
          <Input
            // keyboardType="numeric"
            required
            onChangeText={(text: any) => handleOnchange(text, 'phone')}
            onFocus={() => handleError(null, 'phone')}
            iconName="phone-outline"
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            error={errors?.phone}
          />
          <Input
            required
            onChangeText={(text: string) => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors?.email}
          />
        </View>
        <Text style={styles.SectionTitle}>Thông tin gói hàng</Text>
        <View style={styles.Section}>
          <Input
            required
            onChangeText={(text: any) => handleOnchange(text, 'fullname')}
            onFocus={() => handleError(null, 'fullname')}
            iconName="account-outline"
            label="Tổng khối lượng (kg)"
            placeholder="Tổng khối lượng"
            error={errors?.fullname}
          />
          <Text style={{color: COLORS.primaryBlack}}>
            Kích thước (cm) <Text style={{color: COLORS.red}}>*</Text>
          </Text>
          <View style={styles.OneLine}>
            <View style={{width: '30%'}}>
              <Input
                keyboardType="numeric"
                onChangeText={(text: any) => handleOnchange(text, 'phone')}
                onFocus={() => handleError(null, 'phone')}
                placeholder="10"
                error={errors?.phone}
              />
            </View>
            <View style={{width: '30%'}}>
              <Input
                keyboardType="numeric"
                onChangeText={(text: any) => handleOnchange(text, 'phone')}
                onFocus={() => handleError(null, 'phone')}
                placeholder="10"
                error={errors?.phone}
              />
            </View>
            <View style={{width: '30%'}}>
              <Input
                keyboardType="numeric"
                onChangeText={(text: any) => handleOnchange(text, 'phone')}
                onFocus={() => handleError(null, 'phone')}
                placeholder="10"
                error={errors?.phone}
              />
            </View>
          </View>
          <Input
            onChangeText={(text: any) => handleOnchange(text, 'fullname')}
            onFocus={() => handleError(null, 'fullname')}
            label="Tổng giá trị hàng hóa - VND"
            placeholder="0"
            error={errors?.fullname}
          />
          <Input
            onChangeText={(text: any) => handleOnchange(text, 'fullname')}
            onFocus={() => handleError(null, 'fullname')}
            label="Ghi chú"
            placeholder="VD: Hàng dễ vỡ."
            error={errors?.fullname}
          />
          <Text style={{color: COLORS.primaryBlack}}>Tùy chọn thanh toán</Text>
          <BouncyCheckbox
            onPress={(isChecked: boolean) => setChecked(isChecked)}
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
          <PaymentOption payment={payment} setPayment={setPayment}/>
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
          <BookingPriceDetail
            insurance={insurance}
            sizePrice={sizePrice}
            totalPrice={totalPrice}
          />
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
