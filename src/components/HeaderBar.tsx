import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY} from '../theme/theme';
// import ProfilePic from './ProfilePic';
import Icon from 'react-native-vector-icons/AntDesign';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
type TypeProps = 'close' | 'back';

type Props = {
  title?: string;
  type?: TypeProps;
  icon?: boolean;
};

const HeaderBar = ({title, type = 'back', icon = true}: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <View
      style={{
        paddingVertical: 10,
        backgroundColor: COLORS.primaryWhite,
      }}>
      {icon && (
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
      )}
      <Text style={styles.HeaderText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.primaryBlack,
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
