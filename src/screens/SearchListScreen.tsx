import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from 'theme/theme';
import {packageType} from 'data/constants';
import Octicons from 'react-native-vector-icons/Octicons';
import RouteItem from 'components/RouteItem';
import axios from 'lib/axios';
import qs from 'query-string';
import {BottomSheetFooter, BottomSheetModal} from '@gorhom/bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSharedValue} from 'react-native-reanimated';
import RouteDetail from 'components/RouteDetail';
import {BlurView} from '@react-native-community/blur';
import { SCREEN_HEIGHT } from 'lib/Dimensions';
// const data: Booking[] = [
//   {
//     id: 936,
//     start_station: {
//       id: 14,
//       name: 'Văn phòng CTCP VTSG TpHCM',
//       address: '379 Lê Hồng Phong, Phường 2, Quận 10, TpHCM',
//       city_code: '79',
//       distance_to_sender: null,
//       partner: {
//         id: 3,
//         name: 'Công ty cổ phần vận tải Sài Gòn',
//         avatar:
//           'https://s3.ap-southeast-2.amazonaws.com/chanhxe-prod/partners/qqMVD8dy48s92saKLI9Ks49h6qezrUsJ850igMd9.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5H6QXVIMG47AX2V7%2F20240103%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20240103T074639Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=7d4a90a71777595bae7eed3723335c1b4b0f29044fb286a4de9b38677be30cad',
//       },
//       latitude: 10.763948140349,
//       longitude: 106.67579692598,
//     },
//     end_station: {
//       id: 149,
//       name: 'Văn phòng Thành Bưởi Cà Mau',
//       address:
//         'Bến xe Đồng Tâm, 369 Quản Lộ - Phụng Hiệp, Phường 5, Cà Mau, Cà Mau 98000',
//       city_code: '96',
//       distance_to_receiver: null,
//       partner: {
//         id: 8,
//         name: 'Nhà Xe Thành Bưởi',
//         avatar:
//           'https://s3.ap-southeast-2.amazonaws.com/chanhxe-prod/partners/ccdTngyoPdFf8iEEz5SaZxC4jT8Jj631KCqQokkN.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5H6QXVIMG47AX2V7%2F20240103%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20240103T074639Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=3babe0adfcbd233c7ec14a9bf0d0d5636e9d64c686c4e34699f1353b12a0f3b4',
//       },
//       latitude: 9.1931277,
//       longitude: 105.1783724,
//     },
//     lowest_price: 25000,
//     total_distance: 308649,
//     note: 'Quãng đường ngắn nhất',
//     acceptable_package_types: [0, 1, 4],
//   },
//   {
//     id: 937,
//     start_station: {
//       id: 14,
//       name: 'Văn phòng CTCP VTSG TpHCM',
//       address: '379 Lê Hồng Phong, Phường 2, Quận 10, TpHCM',
//       city_code: '79',
//       distance_to_sender: null,
//       partner: {
//         id: 3,
//         name: 'Công ty cổ phần vận tải Sài Gòn',
//         avatar:
//           'https://s3.ap-southeast-2.amazonaws.com/chanhxe-prod/partners/qqMVD8dy48s92saKLI9Ks49h6qezrUsJ850igMd9.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5H6QXVIMG47AX2V7%2F20240103%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20240103T074639Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=7d4a90a71777595bae7eed3723335c1b4b0f29044fb286a4de9b38677be30cad',
//       },
//       latitude: 10.763948140349,
//       longitude: 106.67579692598,
//     },
//     end_station: {
//       id: 157,
//       name: 'Văn phòng Thiên Trường ở Cà Mau',
//       address:
//         'Bến xe Đồng Tâm, 369 Quản Lộ - Phụng Hiệp, Phường 5, Cà Mau, Cà Mau 98000',
//       city_code: '96',
//       distance_to_receiver: null,
//       partner: {
//         id: 12,
//         name: 'Nhà xe Thiên Trường',
//         avatar:
//           'https://s3.ap-southeast-2.amazonaws.com/chanhxe-prod/partners/FpXu4Wx2Sq1FkPBNlTO4yev7oDJShkdCjlIDOR29.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5H6QXVIMG47AX2V7%2F20240103%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20240103T074639Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=f24bf7407a7fa0b151f8fc2ceccb4529abc97685b4f3c8d08abed23d8a9d4adc',
//       },
//       latitude: 9.1931277,
//       longitude: 105.1783724,
//     },
//     lowest_price: 25000,
//     total_distance: 308649,
//     note: null,
//     acceptable_package_types: [0, 1, 4],
//   },
//   {
//     id: 938,
//     start_station: {
//       id: 14,
//       name: 'Văn phòng CTCP VTSG TpHCM',
//       address: '379 Lê Hồng Phong, Phường 2, Quận 10, TpHCM',
//       city_code: '79',
//       distance_to_sender: null,
//       partner: {
//         id: 3,
//         name: 'Công ty cổ phần vận tải Sài Gòn',
//         avatar:
//           'https://s3.ap-southeast-2.amazonaws.com/chanhxe-prod/partners/qqMVD8dy48s92saKLI9Ks49h6qezrUsJ850igMd9.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5H6QXVIMG47AX2V7%2F20240103%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20240103T074639Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=7d4a90a71777595bae7eed3723335c1b4b0f29044fb286a4de9b38677be30cad',
//       },
//       latitude: 10.763948140349,
//       longitude: 106.67579692598,
//     },
//     end_station: {
//       id: 146,
//       name: 'Văn phòng Hùng Cường Cà Mau',
//       address: '9 Khóm 6, Khóm 6B, thị trấn Sông Đốc, Trần Văn Thời, Cà Mau',
//       city_code: '96',
//       distance_to_receiver: null,
//       partner: {
//         id: 1,
//         name: 'Công ty xe khách Hùng Cường',
//         avatar:
//           'https://s3.ap-southeast-2.amazonaws.com/chanhxe-prod/partners/A0PkIxFNEwivvhsTqEVNEcvVFdKmXW2ylxg1G6PI.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5H6QXVIMG47AX2V7%2F20240103%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20240103T074639Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=b10972e9354f78ed53c9e3216d63be0b2e9ea3cbde9db21903ee067da7af6838',
//       },
//       latitude: 9.0299022,
//       longitude: 104.8130438,
//     },
//     lowest_price: 28560,
//     total_distance: 356840,
//     note: null,
//     acceptable_package_types: [0, 1, 4],
//   },
//   {
//     id: 935,
//     start_station: {
//       id: 150,
//       name: 'Văn phòng Hùng Cường quận 10',
//       address:
//         'IVAN Vietnam, 656 Sư Vạn Hạnh, Phường 12, Quận 10, Hồ Chí Minh 700000',
//       city_code: '79',
//       distance_to_sender: null,
//       partner: {
//         id: 1,
//         name: 'Công ty xe khách Hùng Cường',
//         avatar:
//           'https://s3.ap-southeast-2.amazonaws.com/chanhxe-prod/partners/A0PkIxFNEwivvhsTqEVNEcvVFdKmXW2ylxg1G6PI.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5H6QXVIMG47AX2V7%2F20240103%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20240103T074638Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=a327bbd715bcd56f354d7c04ed4e750cf5da3847362d704f5fe80acfcda3362b',
//       },
//       latitude: 10.77042,
//       longitude: 106.6705529,
//     },
//     end_station: {
//       id: 146,
//       name: 'Văn phòng Hùng Cường Cà Mau',
//       address: '9 Khóm 6, Khóm 6B, thị trấn Sông Đốc, Trần Văn Thời, Cà Mau',
//       city_code: '96',
//       distance_to_receiver: null,
//       partner: {
//         id: 1,
//         name: 'Công ty xe khách Hùng Cường',
//         avatar:
//           'https://s3.ap-southeast-2.amazonaws.com/chanhxe-prod/partners/A0PkIxFNEwivvhsTqEVNEcvVFdKmXW2ylxg1G6PI.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5H6QXVIMG47AX2V7%2F20240103%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20240103T074639Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=b10972e9354f78ed53c9e3216d63be0b2e9ea3cbde9db21903ee067da7af6838',
//       },
//       latitude: 9.0299022,
//       longitude: 104.8130438,
//     },
//     lowest_price: 30000,
//     total_distance: 575303,
//     note: null,
//     acceptable_package_types: [0, 1, 2, 3, 4, 5],
//   },
// ];

export type Booking = {
  id: number;
  start_station: {
    id: number;
    name: string;
    address: string;
    city_code: string;
    distance_to_sender: number | null;
    partner: {
      id: number;
      name: string;
      avatar: string;
    };
    latitude: number;
    longitude: number;
  };
  end_station: {
    id: number;
    name: string;
    address: string;
    city_code: string;
    distance_to_receiver: number | null;
    partner: {
      id: number;
      name: string;
      avatar: string;
    };
    latitude: number;
    longitude: number;
  };
  lowest_price: number;
  total_distance: number;
  note: string | null;
  acceptable_package_types: number[];
};

const SearchListScreen = ({navigation, route}: any) => {
  const {from, to, package_types} = route.params;
  const [routes, setRoutes] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const routeDetailSheetModalRef = useRef<BottomSheetModal>(null);
  const [detail, setDetail] = useState<Booking>();
  const {bottom: bottomSafeArea, top: topSafeArea} = useSafeAreaInsets();
  const animatedRouteDetailIndex = useSharedValue<number>(0);
  const animatedRouteDetailPosition = useSharedValue<number>(SCREEN_HEIGHT);
  const routeDetailSnapPoints = useMemo(
    () => [320 + bottomSafeArea],
    [bottomSafeArea],
  );
  useEffect(() => {
    const getSearch = async () => {
      setLoading(true);
      try {
        const url = qs.stringifyUrl(
          {
            url: '/route/search',
            query: {
              start_city_code: from.parent_code,
              start_district_code: from.code,
              end_city_code: to.parent_code,
              end_district_code: to.code,
              package_types: package_types.toString(),
              number_of_results: 20,
            },
          },
          {skipNull: true, skipEmptyString: true},
        );
        const res = await axios.get(url);
        setRoutes(res.data.data);
      } catch (error) {
        console.log('Failed to fetch search route', error);
      } finally {
        setLoading(false);
      }
    };
    getSearch();
  }, [package_types, from, to]);

  const onChooseRoute = useCallback(
    (item: Booking) => {
      setDetail(undefined);
      routeDetailSheetModalRef.current?.dismiss();
      navigation.push('BookingForm', {
        item,
      });
    },
    [navigation],
  );
  const handleOpenDetail = useCallback((item: Booking) => {
    setDetail(item);
    routeDetailSheetModalRef.current?.present();
  }, []);

  const renderFooter = useCallback(
    (props: any) => (
      <BottomSheetFooter {...props} bottomInset={24}>
        <View style={styles.Footer}>
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
              {new Intl.NumberFormat('en-Us').format(detail?.lowest_price ?? 0)}
              đ
            </Text>
          </View>
          <TouchableOpacity
            style={styles.ChooseButton}
            onPress={() => {
              if (detail) {
                onChooseRoute(detail);
              }
            }}>
            <Text style={styles.footerText}>Đặt ngay</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetFooter>
    ),
    [detail, onChooseRoute],
  );

  const renderBackdrop = useCallback(
    () => (
      <BlurView
        blurType="dark"
        blurAmount={5}
        style={{...StyleSheet.absoluteFillObject}}
      />
    ),
    [],
  );
  return (
    <View style={styles.ScreenContainer}>
      <View style={styles.Header}>
        <TouchableOpacity
          style={styles.CloseButton}
          onPress={() => {
            navigation.pop();
          }}>
          <AntDesign name="arrowleft" color="white" size={25} />
        </TouchableOpacity>
        <View style={{width: '100%'}}>
          <View style={styles.SearchContainer}>
            <Text style={styles.Location}>
              {from.path_with_type.split(',')[0]}
            </Text>
            <AntDesign name="arrowdown" size={20} color="white" />
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
      <View style={styles.RouteList}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primaryColor} />
        ) : (
          <>
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.primaryBlack,
                fontSize: 16,
              }}>
              {routes.length} kết quả được tìm thấy
            </Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={routes}
              contentContainerStyle={[styles.FlatListContainer]}
              renderItem={({item}) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleOpenDetail(item)}>
                  <RouteItem item={item} onPress={onChooseRoute} />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id.toString()}
            />
          </>
        )}
      </View>
      <BottomSheetModal
        ref={routeDetailSheetModalRef}
        key="routeDetailSheet"
        name="routeDetailSheet"
        snapPoints={routeDetailSnapPoints}
        topInset={topSafeArea}
        animatedIndex={animatedRouteDetailIndex}
        animatedPosition={animatedRouteDetailPosition}
        backdropComponent={renderBackdrop}
        footerComponent={renderFooter}>
        <RouteDetail item={detail} />
      </BottomSheetModal>
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
    padding: 15,
    zIndex: 1,
  },
  Header: {
    flexDirection: 'row',
    paddingBottom: 10,
    paddingHorizontal: 20,
    gap: 20,
    backgroundColor: COLORS.primaryColor,
    height: 140,
  },
  SearchContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    flex: 1,
    borderRadius: 30,
  },
  Location: {
    color: COLORS.primaryWhite,
    fontWeight: 'bold',
    fontSize: 18,
  },
  PackageList: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  Package: {
    lineHeight: 15,
    color: COLORS.primaryWhite,
    fontWeight: '500',
    fontSize: 14,
  },
  RouteList: {
    flex: 1,
    gap: 10,
    padding: 10,
    paddingHorizontal: 20,
  },
  FlatListContainer: {
    gap: 15,
  },
  footerContainer: {
    padding: 12,
  },
  Footer: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'flex-end',
    gap: 30,
  },
  ChooseButton: {
    backgroundColor: COLORS.primaryColor,
    padding: 10,
    borderRadius: 10,
    flex: 1,
  },
  footerText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
