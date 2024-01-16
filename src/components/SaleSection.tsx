import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { COLORS } from 'theme/theme';

const SaleSection = () => {
  return (
    <View style={styles.Container}>
      <Image
        style={styles.Logo}
        source={require('assets/offer.png')}
        resizeMode="cover"
      />
    </View>
  );
};

export default SaleSection;

const styles = StyleSheet.create({
  Container: {
    height: 150,
    borderRadius: 20,
    width: '100%',
    overflow: 'hidden',
    shadowColor: COLORS.primaryGray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.41,
    elevation: 2,
  },
  Logo: {
    height: '100%',
    width: '100%',

  },
});
