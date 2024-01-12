import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PackageSVG from 'assets/icons/package.svg';
import {COLORS} from 'theme/theme';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';

type Props = {
  text: string;
  onRefresh?: () => void;
};

const Empty = ({text, onRefresh}: Props) => {
  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      refreshControl={
        <RefreshControl
          colors={[COLORS.primaryColor]}
          refreshing={false}
          onRefresh={onRefresh}
        />
      }>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <PackageSVG height={80} width={80} />

        <Text
          style={{
            color: COLORS.primaryBlack,
            fontSize: 16,
            fontWeight: '500',
          }}>
          {text}
        </Text>
      </View>
    </ScrollView>
  );
};

export default Empty;

const styles = StyleSheet.create({});
