import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Divider = ({text}: {text?: string}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 20}}>
      <View
        style={styles.Line}
      />
      <View>
        <Text
          style={{
            width: 50,
            textAlign: 'center',
            color: 'black',
            fontSize: 15,
          }}>
          {text}
        </Text>
      </View>
      <View
        style={styles.Line}
      />
    </View>
  );
};

export default Divider;

const styles = StyleSheet.create({
  Line: {
    flex: 1,
    height: 0.5,
    backgroundColor: 'gray',
    opacity: 0.5,
  },
});
