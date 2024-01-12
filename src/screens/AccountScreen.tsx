import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from 'theme/theme';
import HeaderBar from 'components/HeaderBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ExchangeSVG from 'assets/icons/exchange.svg';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Divider from 'components/Divider';
import {useAuth} from 'context/AuthContext';

const utilitiesItem = [
  {
    id: 1,
    name: 'Lịch sử đơn hàng',
    icon: (
      <MaterialCommunityIcons
        name="file-document-outline"
        size={28}
        color="#d87811"
      />
    ),
    root: 'Tab',
    screen: 'Orders',
  },
  {
    id: 2,
    name: 'Điều khoản',
    icon: (
      <MaterialCommunityIcons
        name="file-percent-outline"
        size={28}
        color="#b57cee"
      />
    ),
    root: '',
    screen: '',
  },
  {
    id: 3,
    name: 'Lịch sử giao dịch',
    icon: <ExchangeSVG height={30} width={30} />,
    root: '',
    screen: '',
  },
  {
    id: 4,
    name: 'Bảng giá CXMT',
    icon: <MaterialIcons name="attach-money" size={25} color="#b57cee" />,
    root: '',
    screen: '',
  },
];

const accountItem = [
  {
    id: 1,
    name: 'Thông tin cá nhân',
    icon: 'user',
    root: 'Profile',
    screen: '',
  },
  {
    id: 2,
    name: 'Đổi mật khẩu',
    icon: 'lock',
    root: 'ChangePassword',
    screen: '',
  },
  {
    id: 3,
    name: 'Đăng xuất',
    icon: 'log-out',
    route: 'log-out',
  },
];
const supportItem = [
  {
    id: 1,
    name: 'Đánh giá đơn hàng',
    icon: 'star',
    route: '',
  },
  {
    id: 2,
    name: 'Liên hệ và góp ý',
    icon: 'message-square',
    route: '',
  },
];
const AccountScreen = ({navigation}: any) => {
  const {logout} = useAuth();
  const createTwoButtonAlert = () =>
    Alert.alert('Bạn có chắc chắn muốn đăng xuất?', '', [
      {
        text: 'Hủy',
      },
      {
        text: 'Xác nhận',
        onPress: () => logout(),
      },
    ]);
  return (
    <View style={styles.Container}>
      <HeaderBar
        title="Tài khoản"
        // type="back"
        icon={false}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        >
        <View style={styles.Body}>
          <View style={styles.Section}>
            <Text style={styles.SectionTitle}>Tiện ích</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: '100%',
                height: 180,
              }}>
              {utilitiesItem.map(item => (
                <View
                  key={item.id}
                  style={styles.Utilities}
                  onTouchEnd={() =>
                    navigation.navigate(item.root, {screen: item.screen})
                  }>
                  <View style={styles.Inner}>
                    <View style={styles.Icon}>{item.icon}</View>
                    <Text style={styles.UtilitiesText}>{item.name}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.Section}>
            <Text style={styles.SectionTitle}>Tài khoản</Text>

            <View style={styles.MenuContainer}>
              {accountItem.map(item => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    if (item.route === 'log-out') {
                      createTwoButtonAlert();
                    } else {
                      navigation.push(item.root, {screen: item.screen});
                    }
                  }}>
                  <View style={styles.Item}>
                    <View style={styles.Icon}>
                      <Feather name={item.icon} size={17} color="black" />
                    </View>
                    <Text style={{color: COLORS.primaryBlack, fontSize: 15}}>
                      {item.name}
                    </Text>
                    <FontAwesome
                      name="angle-right"
                      size={18}
                      color="black"
                      style={{marginLeft: 'auto'}}
                    />
                  </View>
                  {accountItem.length !== item.id && (
                    <View style={{paddingLeft: 16}}>
                      <Divider marginVertical={0} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.Section}>
            <Text style={styles.SectionTitle}>Hỗ trợ</Text>
            <View style={styles.MenuContainer}>
              {supportItem.map(item => (
                <TouchableOpacity key={item.id}>
                  <View style={styles.Item}>
                    <View style={styles.Icon}>
                      <Feather name={item.icon} size={17} color="black" />
                    </View>
                    <Text style={{color: COLORS.primaryBlack, fontSize: 15}}>
                      {item.name}
                    </Text>
                    <FontAwesome
                      name="angle-right"
                      size={18}
                      color="black"
                      style={{marginLeft: 'auto'}}
                    />
                  </View>
                  {supportItem.length !== item.id && (
                    <View style={{paddingLeft: 16}}>
                      <Divider marginVertical={0} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.secondaryGray,
  },
  Body: {
    padding: 15,
    gap: 25,
  },
  Section: {
    gap: 12,
  },
  SectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryBlack,
  },
  Utilities: {
    height: '50%',
    width: '50%',
    padding: 3.5,
  },
  Inner: {
    flex: 1,
    justifyContent: 'center',
    padding: 18,
    borderRadius: 10,
    backgroundColor: COLORS.primaryWhite,
    gap: 5,
    shadowColor: COLORS.primaryGray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.41,
    elevation: 2,
  },
  Icon: {
    height: 30,
    width: 35,
    justifyContent: 'center',
  },
  UtilitiesText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.primaryBlack,
  },
  MenuContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: COLORS.primaryGray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.41,
    elevation: 2,
  },
  Item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingRight: 10,
    paddingLeft: 16,
  },
});
