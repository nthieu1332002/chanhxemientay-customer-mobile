import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderBar from 'components/HeaderBar';

const SearchScreen = ({navigation}: any) => {
  return (
    <View>
      <HeaderBar title="Tìm kiếm tuyến đường" navigation={navigation}/>
      <Text>SearchScreen</Text>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
