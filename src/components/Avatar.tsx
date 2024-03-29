import {Image, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';

const Avatar = () => {
  return (
    <Pressable onPress={() => {}}>
      <View style={styles.Circle}>
        <Image
          source={require('assets/welcome.png')}
          style={{width: 35, height: 35}}
        />
      </View>
    </Pressable>
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
