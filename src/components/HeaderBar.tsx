import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY} from '../theme/theme';
// import ProfilePic from './ProfilePic';

interface HeaderBarProps {
  title?: string;
  navigation: any;
}

const HeaderBar: React.FC<HeaderBarProps> = ({title, navigation}) => {
  return (
    <View>
      <TouchableOpacity
        // style={styles.InputContainerComponent}
        onPress={() => {
          navigation.pop();
        }}>
        <Text>X</Text>
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
});

export default HeaderBar;
