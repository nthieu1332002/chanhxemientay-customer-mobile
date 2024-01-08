import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

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
  },
  Logo: {
    height: '100%',
    width: '100%',
  },
});
