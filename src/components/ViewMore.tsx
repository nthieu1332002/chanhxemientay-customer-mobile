import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from 'theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const ViewMore = ({route}: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(route)}>
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
