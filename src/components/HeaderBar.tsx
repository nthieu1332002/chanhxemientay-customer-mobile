import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY} from '../theme/theme';
// import ProfilePic from './ProfilePic';
import Icon from 'react-native-vector-icons/AntDesign';

interface HeaderBarProps {
  title?: string;
  navigation: any;
}

const HeaderBar: React.FC<HeaderBarProps> = ({title, navigation}) => {
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
          name="close"
          size={16}
          style={{
            fontSize: 24,
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
    color: COLORS.primaryBlack,
    textAlign: 'center',
  },
  CloseButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    paddingLeft: 10,
    paddingTop: 10,
    zIndex: 1,
  },
});

export default HeaderBar;
