import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY} from '../theme/theme';
// import ProfilePic from './ProfilePic';
import Icon from 'react-native-vector-icons/AntDesign';

type TypeProps = 'close' | 'back';

type Props = {
  title?: string;
  navigation: any;
  type?: TypeProps;
};

const HeaderBar = ({title, navigation, type = 'back'}: Props) => {
  return (
    <View
      style={{
        paddingVertical: 10,
        backgroundColor: COLORS.primaryWhite,
      }}>
      <TouchableOpacity
        style={styles.CloseButton}
        onPress={() => {
          navigation.pop();
        }}>
        <Icon
          name={type === 'close' ? 'close' : 'arrowleft'}
          size={16}
          style={{
            fontSize: 25,
          }}
        />
      </TouchableOpacity>
      <Text style={styles.HeaderText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryColor,
    textAlign: 'center',
  },
  CloseButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 10,
    zIndex: 1,
  },
});

export default HeaderBar;
