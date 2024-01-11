import {Keyboard, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import HeaderBar from 'components/HeaderBar';
import {COLORS} from 'theme/theme';
import Input from 'components/Input';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'lib/axios';
import {useToast} from 'react-native-toast-notifications';
type FieldType = {
  password: string;
  new_password: string;
  new_password_confirmation: string;
};
const ChangePasswordScreen = () => {
  const toast = useToast();
  const [inputs, setInputs] = useState<FieldType>({
    password: '',
    new_password: '',
    new_password_confirmation: '',
  });
  const [errors, setErrors] = useState<FieldType>();
  const [loading, setLoading] = useState(false);
  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.put('/auth/password', inputs);
      if (res.status === 200) {
        toast.show('Đổi mật khẩu thành công', {type: 'success'});
      }
    } catch (error: any) {
      toast.show(error.response.data.message, {type: 'danger'});
    } finally {
      setLoading(false);
    }
  }, [inputs, toast]);

  const validate = useCallback(() => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs?.password) {
      handleError('Mật khẩu hiện tại không được bỏ trống.', 'password');
      isValid = false;
    }
    if (!inputs?.new_password) {
      handleError('Mật khẩu không được bỏ trống.', 'new_password');
      isValid = false;
    } else if (inputs?.new_password.length < 8) {
      handleError('Mật khẩu phải có ít nhất 8 ký tự.', 'new_password');
      isValid = false;
    }
    if (!inputs?.new_password_confirmation.match(inputs?.new_password)) {
      handleError('Mật khẩu bạn nhập không khớp!', 'new_password_confirmation');
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
      <HeaderBar title="Đổi mật khẩu" type="back" />
      <View style={styles.Body}>
        <View style={styles.Form}>
          <Input
            required
            onChangeText={(text: any) => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            label="Mật khẩu hiện tại"
            placeholder="Mật khẩu hiện tại"
            password
            error={errors?.password}
          />
          <Input
            required
            onChangeText={(text: string) =>
              handleOnchange(text, 'new_password')
            }
            onFocus={() => handleError(null, 'new_password')}
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            password
            error={errors?.new_password}
          />
          <Input
            required
            onChangeText={(text: any) =>
              handleOnchange(text, 'new_password_confirmation')
            }
            onFocus={() => handleError(null, 'new_password_confirmation')}
            label="Nhập lại mật khẩu"
            placeholder="Nhập lại mật khẩu"
            error={errors?.new_password_confirmation}
            password
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

export default ChangePasswordScreen;

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
