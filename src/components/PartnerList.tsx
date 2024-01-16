import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from 'theme/theme';
import dayjs from 'dayjs';
import axios from 'lib/axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ViewMore from './ViewMore';

type Partner = {
  id: string;
  type: string;
  attributes: {
    name: string;
    avatar_url: string;
    created_at: string;
  };
};

type Props = {
  refreshing?: boolean;
  setRefreshing?:(value: boolean) => void
};
const PartnerList = ({refreshing, setRefreshing} : Props) => {
  const [partners, setPartners] = useState<Partner[]>();
  const fetchPartners = async () => {
    try {
      const res = await axios.get('/partners');
      setPartners(res.data.data.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (refreshing && setRefreshing) {
      fetchPartners();
      setRefreshing(false);
    }
  }, [refreshing, setRefreshing]);
  useEffect(() => {
    fetchPartners();
  }, []);
  return (
    <>
      {partners && partners?.length > 0 && (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.SectionTittle}>Nhà xe</Text>
            <ViewMore route="Partners" />
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={partners}
            contentContainerStyle={{
              paddingVertical: 10,
              gap: 15,
            }}
            maxToRenderPerBatch={5}
            renderItem={({item}) => (
              <TouchableOpacity>
                <View style={styles.Item}>
                  <View style={styles.ImageWrapper}>
                    <Image
                      source={{
                        uri:
                          item.attributes.avatar_url ||
                          'https://res.cloudinary.com/dad0fircy/image/upload/v1702828398/capstone/icon_we9y8a.png',
                      }}
                      style={styles.Image}
                    />
                  </View>
                  <View style={styles.Content}>
                    <Text
                      numberOfLines={1}
                      style={{
                        flex: 1,
                        flexWrap: 'wrap',
                        fontWeight: 'bold',
                        color: COLORS.primaryBlack,
                      }}>
                      {item.attributes.name}
                    </Text>
                    <Text>
                      Ngày tham gia:{' '}
                      <Text style={{fontWeight: 'bold'}}>
                        {dayjs(item.attributes.created_at).format('DD/MM/YYYY')}
                      </Text>
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </>
  );
};

export default PartnerList;

const styles = StyleSheet.create({
  Item: {
    width: 230,
    backgroundColor: COLORS.secondaryGray,
    borderRadius: 10,
  },
  ImageWrapper: {
    padding: 10,
  },

  Image: {
    borderRadius: 10,
    height: 90,
    width: '100%',
  },
  Content: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    gap: 5,
  },
  SectionTittle: {
    color: COLORS.primaryBlack,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
