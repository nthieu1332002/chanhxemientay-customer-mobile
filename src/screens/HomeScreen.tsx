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

const HomeScreen = ({navigation}: any) => {
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryColor} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
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
        <Text
          style={{
            fontSize: 16,
            paddingLeft: 10,
          }}>
         Tìm kiếm gần đây
        </Text>
        <Text
          style={{
            fontSize: 16,
            paddingLeft: 10,
          }}>
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
  },
  ScrollViewFlex: {
    flexGrow: 1,
    paddingVertical: 0,
  },
  ScreenTitle: {
    fontSize: 28,
    // fontFamily: FONTFAMILY.poppins_semibold,
    fontWeight: 'bold',
    color: COLORS.primaryBlack,
    padding: 30,
  },
  InputContainerComponent: {
    flexDirection: 'row',
    marginHorizontal: 30,
    paddingLeft: 20,
    paddingVertical: 15,
    borderRadius: 15,
    backgroundColor: COLORS.secondaryGray,
    alignItems: 'center',
  },
});
