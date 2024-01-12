import {StyleSheet, View} from 'react-native';

import React from 'react';

const BackDrop = () => {
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'black',
        opacity: 0.5,
      }}
    />
  );
};

export default BackDrop;
