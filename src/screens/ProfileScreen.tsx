import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import { COLORS } from 'theme/theme';

const ProfileScreen = () => {

  return (
    <View style={styles.Container}>
      <Text>ProfileScreen</Text>
     </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: COLORS.primaryColor,
        // opacity: 0.5,
    }
});
