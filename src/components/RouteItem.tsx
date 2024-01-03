import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from 'theme/theme';
import Octicons from 'react-native-vector-icons/Octicons';
import {Booking} from 'screens/SearchListScreen';
import { convertUnit } from 'lib/transfer-unit';

type Props = {
  onPress: (item: Booking) => void;
  item: Booking;
};

const RouteItem = ({onPress, item}: Props) => {
  const image =
    item.start_station.partner.avatar ||
    'https://res.cloudinary.com/dad0fircy/image/upload/v1702828398/capstone/icon_we9y8a.png';
  return (
    <View style={styles.RouteItem}>
      {item.note && (
        <View style={styles.Badge}>
          <Text style={styles.BadgeText}>{item.note}</Text>
        </View>
      )}
      <View style={styles.RouteWrapper}>
        <Image
          style={styles.Logo}
          source={{
            uri: image,
          }}
        />
        <View>
          <Text
            style={{
              color: COLORS.primaryBlack,
              fontSize: 16,
              fontWeight: '500',
              flex: 1,
              flexWrap: 'wrap',
            }}>
            {item.start_station.partner.name}
          </Text>
          <View style={styles.Address}>
            <View style={styles.StationName}>
              <Octicons name="dot-fill" size={10} />
              <Text style={{color: COLORS.primaryBlack}}>
              {item.start_station.name.length > 30
                  ? item.start_station.name.substring(0, 30) +
                    '...'
                  : item.start_station.name}
              </Text>
            </View>
            <Text
              style={{
                borderLeftWidth: 0.8,
                borderStyle: 'dotted',
                marginLeft: 2,
                paddingLeft: 10,
              }}>
             {convertUnit(item.total_distance)} km
            </Text>
            <View style={styles.StationName}>
              <Octicons name="dot-fill" size={10} />
              <Text style={{color: COLORS.primaryBlack}}>
                {item.end_station.name.length > 30
                  ? item.end_station.name.substring(0, 30) +
                    '...'
                  : item.end_station.name}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.ButtonContainer}>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text style={{color: COLORS.primaryBlack, fontWeight: '500'}}>
            Giá chỉ từ
          </Text>
          <Text
            style={{
              color: COLORS.primaryColor,
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            {new Intl.NumberFormat('en-Us').format(item.lowest_price)}đ
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primaryColor,
              padding: 10,
              borderRadius: 15,
              marginTop: 'auto',
            }}
            onPress={() => onPress(item)}>
            <Text
              style={{
                color: '#fff',
                fontWeight: '600',
                fontSize: 14.5,
              }}>
              Chọn chuyến
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RouteItem;

const styles = StyleSheet.create({
  RouteItem: {
    backgroundColor: COLORS.primaryWhite,
    borderRadius: 10,
    padding: 10,
    paddingTop: 17,
  },
  RouteWrapper: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    borderBottomWidth: 0.8,
    paddingBottom: 17,
    borderStyle: 'dashed',
  },
  Badge: {
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    position: 'absolute',
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 5,
    top: 0,
    right: 0,
  },
  BadgeText: {
    color: COLORS.primaryWhite,
    fontWeight: '500',
  },
  Address: {
    marginTop: 5,
    marginLeft: 5,
    flexDirection: 'column',
    gap: 3,
  },
  StationName: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    flexWrap: 'wrap',
  },
  Logo: {
    height: 70,
    width: 70,
    borderWidth: 1,
    borderColor: COLORS.primaryGray,
    borderRadius: 10,
  },
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});
