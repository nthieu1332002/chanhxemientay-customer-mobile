import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import HeaderBar from 'components/HeaderBar';
import {
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {COLORS} from 'theme/theme';
import Divider from 'components/Divider';
import dayjs from 'dayjs';
import {
  BottomSheetModal,
  SCREEN_WIDTH,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import NotiDetail from 'components/NotiDetail';
import BackDrop from 'components/BackDrop';
import Empty from 'components/Empty';
import axios from 'lib/axios';
export type Notification = {
  id: string;
  type: string;
  attributes: {
    type: string;
    data: {
      content: string;
      order_code: string;
    };
    read_at: string;
    created_at: string;
  };
};

const NotificationScreen = () => {
  const {bottom: bottomSafeArea} = useSafeAreaInsets();
  const notiDetailRef = useRef<BottomSheetModal>(null);
  const {dismissAll} = useBottomSheetModal();
  const [data, setData] = useState<Notification[]>([]);
  const [noti, setNoti] = useState<Notification>();

  const fetchNoti = async () => {
    try {
      const res = await axios.get('/notifications');
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNoti();
  }, []);

  const onRefresh = () => {
    fetchNoti();
  };
  return (
    <View style={styles.ScreenContainer}>
      <HeaderBar title="Thông báo" icon={false} border />

      {data.length < 0 ? (
        <Empty text="Không có thông báo nào" onRefresh={onRefresh} />
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={data}
          refreshControl={
            <RefreshControl
              colors={[COLORS.primaryColor]}
              refreshing={false}
              onRefresh={onRefresh}
            />
          }
          renderItem={({item}) => (
            <>
              <TouchableOpacity
                style={styles.Item}
                onPress={() => {
                  setNoti(item);
                  notiDetailRef.current?.present();
                }}>
                <View style={styles.FlexBox}>
                  <View style={styles.Image}>
                    <Image
                      source={require('assets/welcome.png')}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 10,
                        backgroundColor: COLORS.primaryOpacity2,
                      }}
                      resizeMode="center"
                    />
                  </View>
                  <View style={{width: SCREEN_WIDTH - 80, paddingRight: 5}}>
                    <View style={styles.Header}>
                      <Text style={styles.HeaderText} numberOfLines={2}>
                        Trạng thái đơn hàng {item.attributes.data.order_code}
                      </Text>
                      <Text style={styles.Time}>
                        {dayjs(item.attributes.created_at).format('DD/MM')}
                      </Text>
                    </View>
                    <Text style={styles.ContentText} numberOfLines={2}>
                      {item.attributes.data.content}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <Divider marginVertical={0} />
            </>
          )}
        />
      )}
      <BottomSheetModal
        handleStyle={{display: 'none'}}
        handleIndicatorStyle={{display: 'none'}}
        ref={notiDetailRef}
        key="notiDetail"
        name="notiDetail"
        snapPoints={[440 + bottomSafeArea]}
        backdropComponent={BackDrop}>
        <NotiDetail item={noti} dismiss={dismissAll} />
      </BottomSheetModal>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    paddingBottom: 40,
    backgroundColor: COLORS.primaryWhite,
  },
  Item: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: COLORS.primaryWhite,
  },
  FlexBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 5,
  },
  Image: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Header: {
    marginBottom: 4,
    flexDirection: 'row',
  },
  HeaderText: {
    color: COLORS.primaryBlack,
    fontWeight: '500',
    fontSize: 16,
    width: '90%',
  },
  Time: {
    fontSize: 12.5,
    fontWeight: 'normal',
    marginLeft: 'auto',
    color: COLORS.primaryGray,
  },
  ContentText: {
    fontSize: 13,
    color: COLORS.primaryGray,
  },
});
