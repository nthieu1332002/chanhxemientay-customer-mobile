import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AuthHeader from 'components/AuthHeader';
import {COLORS} from 'theme/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputAuth from 'components/InputAuth';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAuth} from 'context/AuthContext';
import {useToast} from 'react-native-toast-notifications';

const RegisterScreen = ({navigation}: any) => {
  const {register} = useAuth();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [name, setName] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const validate = async () => {
    if (!name || !phone || !email || !password) {
      toast.show('Vui lòng điền đầy đủ thông tin!', {
        type: 'danger',
      });
      return;
    }
    const res = await register(name, phone, email, password);
    if (res.error) {
      toast.show(res.msg, {type: 'danger'});
    } else {
      toast.show('Đăng ký thành công!', {type: 'success'});
    }
  };
  return (
    <View style={styles.Container}>
      <StatusBar backgroundColor={COLORS.primaryColor} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <AuthHeader title="Bắt đầu ngay" info="Tạo tài khoản của bạn" />
        <View style={styles.Body}>
          <InputAuth
            placeholder="Họ và tên"
            icon={
              <AntDesign
                name="user"
                size={20}
                color={COLORS.primaryGray}
                style={{marginRight: 5}}
              />
            }
            value={name}
            onChangeText={(text: string) => setName(text)}
          />
          <InputAuth
            placeholder="Số điện thoại"
            icon={
              <AntDesign
                name="phone"
                size={20}
                color={COLORS.primaryGray}
                style={{marginRight: 5}}
              />
            }
            keyboardType="numeric"
            value={phone}
            onChangeText={(text: string) => setPhone(text)}
          />
          <InputAuth
            placeholder="Email"
            icon={
              <MaterialIcons
                name="alternate-email"
                size={20}
                color={COLORS.primaryGray}
                style={{marginRight: 5}}
              />
            }
            keyboardType="email-address"
            value={email}
            onChangeText={(text: string) => setEmail(text)}
          />
          <InputAuth
            placeholder="Mật khẩu"
            icon={
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={COLORS.primaryGray}
                style={{marginRight: 5}}
              />
            }
            inputType="password"
            fieldButtonLabel={
              <Ionicons
                name={!show ? 'eye-outline' : 'eye-off'}
                size={22}
                color={COLORS.primaryColor}
              />
            }
            secureTextEntry={!show}
            fieldButtonFunction={() => setShow(!show)}
            value={password}
            onChangeText={(text: string) => setPassword(text)}
          />
        </View>
        <TouchableOpacity
          disabled={!name && !phone && !email && !password}
          onPress={validate}
          style={{
            backgroundColor:
              name && phone && email && password
                ? COLORS.primaryColor
                : COLORS.secondaryGray,
            padding: 13,
            borderRadius: 10,
            marginTop: 30,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 17.5,
              color: '#fff',
            }}>
            Đăng ký
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{textAlign: 'center', marginTop: 15, fontSize: 16}}>
            Đã có tài khoản?
            <Text style={{color: COLORS.primaryColor, fontWeight: '700'}}>
              {' '}
              Đăng nhập ngay
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  Container: {
    padding: 20,
    flex: 1,
    backgroundColor: COLORS.primaryWhite,
  },
  Body: {
    gap: 20,
  },
});
