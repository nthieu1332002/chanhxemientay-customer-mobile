import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { COLORS } from 'theme/theme';

const Avatar = () => {
  return (
    <View style={styles.Circle}>
      <Image
        source={require('assets/welcome.png')}
        style={{width: 35, height: 35}}
      />
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  Circle: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.8,
    borderRadius: 10,
  },
});
