import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Booking} from 'screens/SearchListScreen';
import {COLORS} from 'theme/theme';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

type Props = {
  item?: Booking;
};
const RouteDetail = ({item}: Props) => {
  return (
    <View style={styles.Container}>
      <View style={styles.Header}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: COLORS.primaryBlack,
          }}>
          Chi tiết tuyến đường
        </Text>
        {item?.note && <View style={styles.Price}>
          <Text style={{color: COLORS.primaryWhite, fontWeight: 'bold'}}>
            {item?.note}
          </Text>
        </View>}
      </View>

      <View style={styles.Detail}>
        <View style={styles.Icon}>
          <EvilIcons name="location" size={30} color={COLORS.primaryColor} />
        </View>
        <View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '500',
              color: COLORS.primaryBlack,
              marginBottom: 2,
            }}>
            {item?.start_station.name}
          </Text>
          <Text>{item?.start_station.address}</Text>
        </View>
      </View>
      <View style={styles.Detail}>
        <View style={styles.Icon}>
          <EvilIcons name="location" size={30} color={COLORS.primaryColor} />
        </View>
        <View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '500',
              color: COLORS.primaryBlack,
              marginBottom: 2,
            }}>
            {item?.end_station.name}
          </Text>
          <Text>{item?.end_station.address}</Text>
        </View>
      </View>
    </View>
  );
};

export default RouteDetail;

const styles = StyleSheet.create({
  Container: {
    paddingHorizontal: 15,
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Price: {
    backgroundColor: COLORS.primaryColor,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 50,
  },
  Detail: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 80,
    borderBottomWidth: 0.2,
    paddingRight: 15,
  },
  Icon: {
    width: '10%',
  },
});
