import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Divider = ({
  text,
  marginVertical = 20,
}: {
  text?: string;
  marginVertical?: number;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: marginVertical,
      }}>
      <View style={styles.Line} />
      {text && (
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
      )}
      <View style={styles.Line} />
    </View>
  );
};

export default Divider;

const styles = StyleSheet.create({
  Line: {
    flex: 1,
    height: 0.8,
    backgroundColor: 'gray',
    opacity: 0.2
  },
});
