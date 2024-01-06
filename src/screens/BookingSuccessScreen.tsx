import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {COLORS} from 'theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';

const BookingSuccessScreen = ({navigation, route}: any) => {
  const {code, email} = route.params;
  return (
    <View style={styles.Container}>
      <View style={styles.Content}>
        <LottieView
          style={styles.LottieView}
          source={require('assets/animation/success.json')}
          autoPlay
          loop={false}
        />
        <Text style={styles.Title}>Tạo đơn thành công!</Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.Text}>Mã vận đơn: </Text>
          <Text
            style={{
              color: COLORS.primaryBlack,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            {code}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.Text}>Email:</Text>
          <Text
            style={{
              color: COLORS.primaryBlack,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            {email}
          </Text>
        </View>
      </View>
      <View style={styles.Content}>
        <Text
          style={{color: COLORS.primaryBlack, fontSize: 16, fontWeight: '500'}}>
          Vui lòng thực hiện các bước cuối cùng để hoàn thành đơn hàng của bạn:
        </Text>
        <View style={styles.Last}>
          <AntDesign
            name="checkcircleo"
            size={13}
            color={COLORS.primaryColor}
          />
          <Text>Mang hàng ra chành xe để thực hiện việc gửi hàng.</Text>
        </View>
        <View style={styles.Last}>
          <AntDesign
            name="checkcircleo"
            size={13}
            color={COLORS.primaryColor}
          />
          <Text>
            Thanh toán đơn hàng sau khi chành xe đã xác nhận kích cỡ và loại của
            đơn hàng.
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'column', gap: 10, marginTop: 'auto'}}>
        <TouchableOpacity onPress={() => {}} style={styles.Button}>
          <Text style={styles.ButtonText}>Theo dõi đơn hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={[styles.Button, {backgroundColor: COLORS.secondaryGray}]}>
          <Text
            style={[
              styles.ButtonText,
              {color: COLORS.primaryBlack, fontWeight: '500'},
            ]}>
            Trang chủ
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingSuccessScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.secondaryColor,
    padding: 20,
    gap: 15,
  },
  Title: {
    textAlign: 'center',
    color: COLORS.primaryBlack,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  Content: {
    backgroundColor: COLORS.primaryWhite,
    padding: 20,
    borderRadius: 10,
  },
  LottieView: {
    height: 150,
  },
  Text: {
    fontSize: 17,
    fontWeight: '500',
  },
  Last: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  Button: {
    backgroundColor: COLORS.primaryWhite,
    padding: 10,
    borderRadius: 5,
  },
  ButtonText: {
    color: COLORS.primaryColor,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});
