import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from 'theme/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {packageType} from 'data/constants';

export const getRecentSearch = async (key: string) => {
  try {
    const array = await AsyncStorage.getItem(key);
    return array ? JSON.parse(array) : [];
  } catch (error) {
    console.error('Error getting array:', error);
    return [];
  }
};

type Props = {
  horizontal?: boolean;
};

const RecentSearch = ({horizontal}: Props) => {
  const [recent, setRecent] = useState<any>([]);
  useEffect(() => {
    const fetRecentSearch = async () => {
      const a = await getRecentSearch('search');
      setRecent(a.reverse());
    };
    fetRecentSearch();
  }, []);
  return (
    <View
      style={[
        styles.Container,
        {
          flex: horizontal ? 0 : 1,
        },
      ]}>
      {recent.length > 0 ? (
        <>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              color: COLORS.primaryBlack,
            }}>
            Tìm kiếm gần đây
          </Text>
          <FlatList
            horizontal={horizontal}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={recent}
            contentContainerStyle={{
              paddingVertical: 8,
              gap: 10,
            }}
            renderItem={({item}) => {
              const packages = item.selected.map((value: number) => {
                const foundItem = packageType.find(a => a.value === value);
                return foundItem ? foundItem.label : undefined;
              });
              return (
                <TouchableOpacity onPress={() => {}}>
                  <View
                    style={[
                      styles.RecentItem,
                      {
                        width: horizontal ? 220 : '100%',
                        height: horizontal ? 140 : 'auto',
                      },
                    ]}>
                    <View
                      style={[
                        styles.Location,
                        {
                          alignItems: horizontal ? 'flex-start' : 'center',
                        },
                      ]}>
                      <FontAwesome6 name="circle-dot" size={15} color="red" />

                      <Text style={styles.textItem} numberOfLines={1}>
                        {item.from.path_with_type}
                      </Text>
                    </View>
                    <View style={{gap: 2}}>
                      <View style={styles.Dot} />
                      <View style={styles.Dot} />
                      <View style={styles.Dot} />
                    </View>

                    <View
                      style={[
                        styles.Location,
                        {
                          alignItems: horizontal ? 'flex-start' : 'center',
                        },
                      ]}>
                      <FontAwesome6
                        name="location-dot"
                        size={18}
                        color="blue"
                      />

                      <Text style={styles.textItem} numberOfLines={1}>
                        {item.to.path_with_type}
                      </Text>
                    </View>
                    <View style={styles.PackageList}>
                      {packages.map((a: string, index: number) => (
                        <View key={index} style={styles.Package}>
                          <Text style={{color: '#1ec853'}}>{a}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      ) : null}
    </View>
  );
};

export default RecentSearch;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: COLORS.primaryWhite,
    gap: 5,
    marginTop: 10,
  },
  RecentItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: COLORS.secondaryColor,
    borderRadius: 10,
    borderColor: COLORS.secondaryGray,
    borderWidth: 0.5,
    overflow: 'hidden',
  },
  Dot: {
    width: 1,
    height: 2.5,
    backgroundColor: COLORS.primaryGray,
    marginLeft: 7,
  },
  Location: {
    flexDirection: 'row',
    gap: 10,
    paddingRight: 13,
  },
  textItem: {
    fontWeight: '500',
    fontSize: 15,
    color: COLORS.primaryBlack,
  },
  PackageList: {
    marginTop: 5,
    flexDirection: 'row',
    gap: 5,
    flexWrap: 'wrap',
  },
  Package: {
    padding: 5,
    backgroundColor: COLORS.secondaryGray,
    borderRadius: 5,
  },
});
