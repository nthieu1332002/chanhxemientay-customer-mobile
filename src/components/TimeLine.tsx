import {OrderStatusMap} from 'data/constants';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import dayjs from "dayjs";
import {COLORS} from 'theme/theme';

export default function Example({items}: any) {
  console.log('item', items);
  return (
    <View>
      {items
        ?.reverse()
        .map(({name, address, status, achieved_at}: any, index: any) => {
          const orderStatus = OrderStatusMap[status];

          return (
            <View key={index}>
              <>
                <View style={styles.card}>
                  <View style={styles.cardDelimiter}>
                    {index !== items.length - 1 && (
                      <View style={styles.cardDelimiterLine} />
                    )}

                    <View style={[styles.cardDelimiterInset]} />
                  </View>

                  <View style={styles.cardBody}>
                    <View style={styles.cardBodyContent}>
                      <Text style={styles.cardDates}> Ngày {dayjs(achieved_at).format("DD/MM/YYYY lúc HH:mm:ss")}</Text>
                      <View
                        style={{
                          backgroundColor: COLORS.secondaryColor,
                          padding: 5,
                          paddingHorizontal: 10,
                          borderRadius: 10,
                        }}>
                        <Text style={styles.cardTitle}>
                          Đơn hàng{' '}
                          <Text
                            style={{
                              color: status === 5 ? 'red' : COLORS.primaryColor,
                            }}>
                            {orderStatus}{' '}
                          </Text>
                          <Text>{name}</Text>
                        </Text>
                        <Text style={styles.cardSubtitle}>{address}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </>
            </View>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardDelimiter: {
    marginTop: 5,
    position: 'relative',
    width: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  cardDelimiterInset: {
    width: 12,
    height: 12,
    borderWidth: 3,
    borderRadius: 9999,
    borderColor: 'red',
    zIndex: 9,
    position: 'relative',
  },
  cardDelimiterLine: {
    position: 'absolute',
    left: 13,
    borderLeftWidth: 3,
    borderStyle: 'dotted',
    borderColor: '#eee',
    height: '100%',
    zIndex: 1,
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    marginBottom: 3,
  },
  cardBodyContent: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    gap: 10,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#2a2a2a',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#464646',
    marginBottom: 3,
  },
  cardDates: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3c4360',
  },
});
