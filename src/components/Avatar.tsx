import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from 'theme/theme';
import { useAuth } from 'context/AuthContext';
import { DrawerActions, useNavigation } from '@react-navigation/native';

const Avatar = () => {
  const {logout} = useAuth();
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
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
