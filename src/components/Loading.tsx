import {View, ActivityIndicator} from 'react-native';
import React from 'react';
import { COLORS } from 'theme/theme';

const Loading = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={COLORS.primaryColor} />
    </View>
  );
};

export default Loading;
