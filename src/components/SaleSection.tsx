import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const SaleSection = () => {
  return (
    <View style={styles.Container}>
      <Image
        style={styles.Logo}
        source={require('assets/offer.png')}
        resizeMode="contain"
      />
    </View>
  );
};

export default SaleSection;

const styles = StyleSheet.create({
  Logo: {
    height: '100%',
  },
  Container: {
    height: 170,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
