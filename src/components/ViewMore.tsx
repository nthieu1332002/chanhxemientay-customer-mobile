import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from 'theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ViewMore = ({navigation}: any) => {
  return (
    <TouchableOpacity onPress={() => navigation.push('PartnerList')}>
      <Text style={styles.Text}>
        Xem thêm <AntDesign name="right" />
      </Text>
    </TouchableOpacity>
  );
};

export default ViewMore;

const styles = StyleSheet.create({
  Text: {
    color: COLORS.primaryColor,
    fontWeight: '500',
  },
});
