import {
  ActivityIndicator,
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
import { SCREEN_HEIGHT } from 'lib/Dimensions';
import BackDrop from 'components/BackDrop';
import { RefreshControl } from 'react-native-gesture-handler';

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
  const getSearch = async () => {
    try {
      setLoading(true);
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
  useEffect(() => {
    getSearch();
  }, []);

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
  const onRefresh = () => {
    getSearch();
  };
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
              refreshControl={
                <RefreshControl
                  colors={[COLORS.primaryColor]}
                  refreshing={false}
                  onRefresh={onRefresh}
                />
              }
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
        backdropComponent={BackDrop}
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
