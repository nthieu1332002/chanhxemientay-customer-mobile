import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import HeaderBar from 'components/HeaderBar';
import SearchInput from 'components/SearchInput';
import {COLORS} from 'theme/theme';
import {LocationType, packageType} from 'data/constants';
import {MultiSelect} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchScreen = ({navigation}: any) => {
  const initialValue = {
    code: '',
    parent_code: '',
    path_with_type: '',
  };
  const [from, setFrom] = useState<LocationType>(initialValue);
  const [to, setTo] = useState<LocationType>(initialValue);
  const [selected, setSelected] = useState<string[]>([]);
  console.log('from', from);
  console.log('to', to);
  console.log('selected', selected);

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };
  const handleSearch = () => {
    if (from.code === '' || to.code === '' || selected.length === 0) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
    } else {
      const data = {
        from: from,
        to: to,
        selected: selected,
      };
      AsyncStorage.setItem('search', JSON.stringify(data));
      navigation.push('SearchList', {
        from,
        to,
        package_types: selected,
      });
    }
  };
  return (
    <View style={styles.ScreenContainer}>
      <HeaderBar title="Tìm kiếm tuyến đường" navigation={navigation} />
      <View style={styles.Container}>
        <SearchInput
          onChange={value => setFrom(value)}
          label="Chọn điểm xuất phát"
          icon="location-dot"
        />
        <SearchInput
          onChange={value => setTo(value)}
          label="Chọn điểm đến"
          icon="location-arrow"
        />
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={packageType}
          labelField="label"
          valueField="value"
          placeholder="Chọn loại hàng"
          value={selected}
          onChange={item => {
            setSelected(item);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={COLORS.primaryColor}
              name="inbox"
              size={20}
            />
          )}
          renderItem={renderItem}
        />
      </View>
      <TouchableOpacity
        style={{
          marginHorizontal: 10,
          backgroundColor: COLORS.primaryColor,
          padding: 15,
          borderRadius: 15,
          alignItems: 'center',
        }}
        onPress={() => handleSearch()}>
        <Text
          style={{
            color: '#fff',
            fontWeight: '600',
          }}>
          Tìm kiếm
        </Text>
      </TouchableOpacity>
      <View style={styles.Container}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            color: COLORS.primaryGray,
          }}>
          Tìm kiếm gần đây
        </Text>
        <View>
          <Text>Item</Text>
          <Text>Item</Text>
          <Text>Item</Text>
          <Text>Item</Text>
          <Text>Item</Text>
        </View>
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    backgroundColor: COLORS.secondaryColor,
    flex: 1,
  },
  Container: {
    gap: 10,
    padding: 20,
    marginVertical: 10,
    backgroundColor: COLORS.primaryWhite,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  placeholderStyle: {
    paddingLeft: 5,
    fontSize: 16,
  },
  selectedTextStyle: {
    paddingLeft: 5,
    fontSize: 16,
    color: COLORS.primaryColor,
  },
  Item: {
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  textItem: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});
