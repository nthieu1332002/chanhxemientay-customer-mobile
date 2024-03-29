import {Keyboard, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import HeaderBar from 'components/HeaderBar';
import {COLORS} from 'theme/theme';
import {useAuth} from 'context/AuthContext';
import Input from 'components/Input';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {emailPattern, phoneNumberPattern} from 'data/constants';
import axios from 'lib/axios';
import {useToast} from 'react-native-toast-notifications';
type FieldType = {
  name: string;
  phone: string;
  email: string;
};
const ProfileScreen = () => {
  const {userInfo, update} = useAuth();
  const toast = useToast();
  const [inputs, setInputs] = useState<FieldType>({
    name: userInfo?.name || '',
    phone: userInfo?.phone || '',
    email: userInfo?.email || '',
  });
  const [errors, setErrors] = useState<FieldType>();
  const [loading, setLoading] = useState(false);
  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.put('/profile/me', inputs);
      if (res.status === 200) {
        update(inputs.email, inputs.name, inputs.phone);
        toast.show('Cập nhật thông tin thành công', {type: 'success'});
      }
    } catch (error: any) {
      toast.show(error.response.data.message, {type: 'danger'});
    } finally {
      setLoading(false);
    }
  }, [inputs, toast, update]);

  const validate = useCallback(() => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs?.name) {
      handleError('Họ và tên không được bỏ trống.', 'name');
      isValid = false;
    }
    if (!inputs?.email) {
      handleError('Email không được bỏ trống.', 'email');
      isValid = false;
    } else if (!inputs?.email.match(emailPattern)) {
      handleError('Email không đúng định dạng.', 'email');
      isValid = false;
    }
    if (!inputs?.phone) {
      handleError('Số điện thoại không được bỏ trống.', 'phone');
      isValid = false;
    } else if (!inputs?.phone.match(phoneNumberPattern)) {
      handleError('Số điện thoại không đúng định dạng.', 'phone');
      isValid = false;
    }
    if (isValid) {
      handleSubmit();
    }
  }, [inputs, handleSubmit]);

  const handleOnchange = (text: any, input: string) => {
    setInputs(prevState => ({...prevState, [input]: text} as FieldType));
  };
  const handleError = (error: string | null, input: string) => {
    setErrors((prevState: any) => ({...prevState, [input]: error}));
  };

  return (
    <View style={styles.Container}>
      <HeaderBar title="Cập nhật thông tin" type="back" />
      <View style={styles.Body}>
        <Text
          style={{fontSize: 20, fontWeight: '500', color: COLORS.primaryBlack}}>
          Thông tin cá nhân
        </Text>
        <Text>Quản lý thông tin hồ sơ</Text>
        <View style={styles.Form}>
          <Input
            required
            defaultValue={userInfo?.name}
            onChangeText={(text: any) => handleOnchange(text, 'name')}
            onFocus={() => handleError(null, 'name')}
            iconName="account-outline"
            label="Họ và tên"
            placeholder="Họ và tên"
            error={errors?.name}
          />
          <Input
            required
            defaultValue={userInfo?.email}
            onChangeText={(text: string) => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Nhập email"
            error={errors?.email}
          />
          <Input
            required
            keyboardType="numeric"
            defaultValue={userInfo?.phone}
            onChangeText={(text: any) => handleOnchange(text, 'phone')}
            onFocus={() => handleError(null, 'phone')}
            iconName="phone-outline"
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            error={errors?.phone}
          />
        </View>
        <TouchableOpacity
          onPress={validate}
          disabled={loading}

          style={{
            backgroundColor: loading
              ? COLORS.primaryOpacity
              : COLORS.primaryColor,
            padding: 13,
            borderRadius: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 16,
              color: '#fff',
            }}>
            Cập nhật
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: COLORS.secondaryGray,
    flex: 1,
  },
  Body: {
    justifyContent: 'center',
    padding: 20,
    gap: 20,
  },
  Form: {
    padding: 20,
    gap: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primaryWhite,
  },
});
