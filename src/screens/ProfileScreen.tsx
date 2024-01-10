import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import { COLORS } from 'theme/theme';
import HeaderBar from 'components/HeaderBar';

const ProfileScreen = ({navigation}: any) => {

  return (
    <View style={styles.Container}>
      <HeaderBar
        title="Tìm kiếm tuyến đường"
        type="back"
      />
      <Text>ProfileScreen</Text>
     </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: COLORS.primaryWhite
        // opacity: 0.5,
    }
});
