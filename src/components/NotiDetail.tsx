import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from 'theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign'
const NotiDetail = ({item, dismiss}: any) => {
  return (
    <View>
      <View style={styles.Image} onTouchEnd={dismiss}>
        <Image
          source={require('assets/welcome.png')}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: COLORS.primaryOpacity2,
          }}
          resizeMode="center"
        />
        <AntDesign name="closecircle" size={30} color="gray" style={styles.CloseButton}/>

      </View>
      <View style={styles.Body}>

      <Text style={styles.Header}>{item.header}</Text>
      <Text style={styles.Content}>{item.content}</Text>
      </View>
    </View>
  );
};

export default NotiDetail;

const styles = StyleSheet.create({
  Image: {
    width: '100%',
    height: 200,
  },
  CloseButton:{
    position: 'absolute',
    right: 10,
    top: 10,
  },
  Body: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    gap: 25,

  },
  Header: {
    color: COLORS.primaryBlack,
    fontWeight: '500',
    fontSize: 17,
  },
  Content: {
    fontSize: 14.5,
    color: COLORS.primaryBlack,
  },
});
