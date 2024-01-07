import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from 'theme/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAuth} from 'context/AuthContext';
import Avatar from 'components/Avatar';
import SaleSection from 'components/SaleSection';

const HomeScreen = ({navigation}: any) => {
  const {logout} = useAuth();
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryColor} />
      <View style={styles.Header}>
        <Text style={styles.HeaderText}>Xin chào <Text style={{color: COLORS.primaryBlack}}>Trung Hiếu!</Text></Text>
        <Avatar/>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View style={styles.Body}>
          <Text style={styles.ScreenTitle}>
            Đặt chành xe với ChanhXe
            <Text style={{color: COLORS.primaryColor}}>MienTay</Text>
          </Text>
          <TouchableOpacity
            style={styles.InputContainerComponent}
            onPress={() => {
              // navigation.push('Search');
              logout();
            }}>
            <Icon name="search" size={16} />
            <Text
              style={{
                fontSize: 16,
                paddingLeft: 10,
              }}>
              Tìm chuyến xe...
            </Text>
          </TouchableOpacity>
            <SaleSection/>
        </View>
          <Text
            style={styles.SectionTittle}>
            Tìm kiếm gần đây
          </Text>
          <Text
            style={styles.SectionTittle}>
            Nhà xe
          </Text>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryWhite,
    padding: 20,
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  HeaderText: {
    fontSize: 17,
    fontWeight: '500',
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  Body: {
    gap: 20,
  },
  ScreenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primaryBlack,
    marginTop: 10,
  },
  InputContainerComponent: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingVertical: 15,
    borderRadius: 15,
    backgroundColor: COLORS.secondaryGray,
    alignItems: 'center',
  },
  SectionTittle: {
    color: COLORS.primaryBlack,
    fontSize: 21,
    fontWeight: 'bold',
  }
});
