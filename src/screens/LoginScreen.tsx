import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AuthHeader from 'components/AuthHeader';
import {COLORS} from 'theme/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputAuth from 'components/InputAuth';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAuth} from 'context/AuthContext';
import {useToast} from 'react-native-toast-notifications';

const LoginScreen = ({navigation}: any) => {
  const {login, isLoading} = useAuth();
  const toast = useToast();
  const [show, setShow] = useState(false);

  const [indentifier, setIndentifier] = useState<string>();
  const [password, setPassword] = useState<string>();
  const validate = async () => {
    if (!indentifier || !password) {
      toast.show('Vui lòng điền đầy đủ thông tin!', {
        type: 'danger',
      });
      return;
    }
    const res = await login(indentifier, password);
    if (res.error) {
      toast.show(res.msg, {type: 'danger'});
    } else {
      toast.show('Đăng nhập thành công!', {type: 'success'});
    }
  };
  return (
    <View style={styles.Container}>
      <StatusBar backgroundColor={COLORS.primaryColor} />

      <AuthHeader
        title="Chào mừng quay lại"
        info="Đăng nhập vào tài khoản của bạn"
      />
      <View style={styles.Body}>
        <InputAuth
          label="Email / Số điện thoại"
          placeholder="ex@gmail.com hoặc 0123456789"
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color={COLORS.primaryGray}
              style={{marginRight: 5}}
            />
          }
          keyboardType="email-address"
          value={indentifier}
          onChangeText={(text: string) => setIndentifier(text)}
        />

        <InputAuth
          label="Mật khẩu"
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
        disabled={isLoading || (!indentifier && !password)}
        onPress={validate}
        style={{
          backgroundColor:
            indentifier && password
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
          Đăng nhập
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={{textAlign: 'center', marginTop: 15, fontSize: 16}}>
          Bạn chưa có tài khoản?
          <Text style={{color: COLORS.primaryColor, fontWeight: '700'}}>
            {' '}
            Tạo ngay
          </Text>
        </Text>
      </TouchableOpacity>
      <View style={styles.Circle}>
        <Image
          source={require('assets/welcome.png')}
          style={{width: 200, height: 200}}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  Container: {
    padding: 20,
    flex: 1,
    backgroundColor: COLORS.primaryWhite,
  },
  Body: {
    gap: 20,
  },
  Circle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
