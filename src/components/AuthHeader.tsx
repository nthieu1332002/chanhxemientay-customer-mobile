import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from 'theme/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import GoogleSVG from 'assets/icons/google.svg';
import {SCREEN_WIDTH} from 'lib/Dimensions';
import Divider from './Divider';

type Props = {
  title: string;
  info: string;
};
const AuthHeader = ({title, info}: Props) => {
  return (
    <View>
      <Image
        style={styles.Logo}
        source={require('assets/ChanhXeMienTay.png')}
        resizeMode="contain"
      />
      <Text style={styles.Title}>{title}</Text>
      <Text style={styles.Info}>{info}</Text>
      <TouchableOpacity
        onPress={() => {}}
        style={{
          borderColor: '#ddd',
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: 30,
          paddingVertical: 10,
          alignItems: 'center',
          marginTop: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
          }}>
          <GoogleSVG height={20} width={20} />
          <Text style={{fontSize: 16, color: COLORS.primaryBlack}}>
            Đăng nhập với Google
          </Text>
        </View>
      </TouchableOpacity>
      <Divider text="hoặc"/>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  Logo: {
    width: 0.7 * SCREEN_WIDTH,
  },
  Title: {
    fontWeight: 'bold',
    fontSize: 28,
    color: COLORS.primaryBlack,
    marginTop: 10,
  },
  Info: {
    fontSize: 19,
    color: COLORS.primaryBlack,
    marginTop: 3,
  },
});
