import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback } from 'react';
import {COLORS} from 'theme/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import Avatar from 'components/Avatar';
import SaleSection from 'components/SaleSection';
import RecentSearch from './RecentSearch';
import {useAuth} from 'context/AuthContext';
import PartnerList from 'components/PartnerList';
import {RefreshControl} from 'react-native-gesture-handler';

const HomeScreen = ({navigation}: any) => {
  const {userInfo} = useAuth();
  const onRefresh = useCallback(() => {

  }, []);
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryColor} />
      <View style={styles.Header}>
        <Text style={styles.HeaderText} numberOfLines={1}>
          Xin chào{' '}
          <Text style={{color: COLORS.primaryBlack}}>{userInfo?.name}!</Text>
        </Text>
        <Avatar />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
        refreshControl={
          <RefreshControl
            colors={[COLORS.primaryColor]}
            refreshing={false}
            onRefresh={onRefresh}
          />
        }>
        <View style={styles.Body}>
          <Text style={styles.ScreenTitle}>
            Đặt chành xe với ChanhXe
            <Text style={{color: COLORS.primaryColor}}>MienTay</Text>
          </Text>
          <TouchableOpacity
            style={styles.InputContainerComponent}
            onPress={() => {
              navigation.push('Search');
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
          <SaleSection />
        </View>
        <RecentSearch horizontal />
        <PartnerList />
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
    maxWidth: 270,
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
});
