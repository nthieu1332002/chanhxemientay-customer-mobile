import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Fragment, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS} from 'theme/theme';
import {packageType} from 'data/constants';
import Octicons from 'react-native-vector-icons/Octicons';

const SearchListScreen = ({navigation, route}: any) => {
  const {from, to, package_types} = route.params;
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.ScreenContainer}>
      <View style={styles.Header}>
        <TouchableOpacity
          style={styles.CloseButton}
          onPress={() => {
            navigation.pop();
          }}>
          <AntDesign
            name="arrowleft"
            color="white"
            size={25}
          />
        </TouchableOpacity>
        <View>
          <View style={styles.SearchContainer}>
            <Text style={styles.Location}>
              {from.path_with_type.split(',')[0]}
            </Text>
            <AntDesign name="arrowright" size={20} color="white" />
            <Text style={styles.Location}>
              {to.path_with_type.split(',')[0]}
            </Text>
          </View>
          <View style={styles.PackageList}>
            {package_types.map((item: number, index: number) => (
              <Fragment key={item}>
                <Text style={styles.Package}>{packageType[item].label}</Text>
                {index !== package_types.length - 1 && (
                  <Octicons name="dot-fill" size={10} color="white" />
                )}
              </Fragment>
            ))}
          </View>
        </View>
      </View>
      <View>
        <Text>{}</Text>
      </View>
    </View>
  );
};

export default SearchListScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.secondaryColor,
  },
  CloseButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    paddingLeft: 15,
    paddingTop: 10,
    zIndex: 1,
  },
  Header: {
    flexDirection: 'row',
    paddingBottom: 10,
    paddingHorizontal: 20,
    gap: 20,
    backgroundColor: COLORS.primaryColor,
    height: 100,
  },
  SearchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    flex: 1,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  Location: {
    color: COLORS.primaryWhite,
    fontWeight: 'bold',
    fontSize: 20,
  },
  PackageList: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  Package: {
    color: COLORS.primaryWhite,
    fontWeight: '500',
    fontSize: 14,
  },
});
