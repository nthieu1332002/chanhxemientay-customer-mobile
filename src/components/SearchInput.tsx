import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {LocationType, locationList} from '../data/constants';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {COLORS} from 'theme/theme';
type Props = {
  onChange: (value: LocationType) => void;
  label: string;
  icon: string;
};
const SearchInput = ({onChange, label, icon}: Props) => {
    const initialValue = {
        code: '',
        parent_code: '',
        path_with_type: '',
      };
  const [value, setValue] = useState<LocationType>(initialValue);
  const [isFocus, setIsFocus] = useState(false);
  const renderItem = (item: LocationType) => {
    return (
      <View style={styles.Item}>
        <Ionicons
          style={styles.icon}
          color={COLORS.primaryGray}
          name="location-outline"
          size={18}
        />
        <Text style={styles.textItem}>{item.path_with_type}</Text>
      </View>
    );
  };
  return (
    <Dropdown
      style={[styles.dropdown, isFocus && {borderColor: COLORS.primaryColor}]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={locationList}
      search
      maxHeight={300}
      labelField="path_with_type"
      valueField="code"
      placeholder={label}
      searchPlaceholder="Tìm kiếm"
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={item => {
        setValue(item);
        onChange(item);
        setIsFocus(false);
      }}
      renderLeftIcon={() => (
        <Icon
          style={styles.icon}
          color={COLORS.primaryColor}
          name={icon}
          size={20}
        />
      )}
      renderItem={renderItem}
    />
  );
};

export default SearchInput;

const styles = StyleSheet.create({
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
    color: COLORS.primaryColor,
    paddingLeft: 5,
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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
});
