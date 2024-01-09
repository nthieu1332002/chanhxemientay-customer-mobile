import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from 'theme/theme';

const data = [
  {
    id: '3',
    type: 'partner',
    attributes: {
      name: 'Công ty cổ phần vận tải Sài Gòn',
      avatar_url:
        'https://s3.ap-southeast-2.amazonaws.com/chanhxe-prod/partners/qqMVD8dy48s92saKLI9Ks49h6qezrUsJ850igMd9.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5H6QXVIMG47AX2V7%2F20240108%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20240108T112907Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=f8b900b153dfc6960163b8b44cf34f157b7d1c378bca7b0df8fd835d230e0c5a',
      created_at: '2023-12-17T16:05:46.000000Z',
    },
  },
  {
    id: '4',
    type: 'partner',
    attributes: {
      name: 'Nhà xe Huệ Nghĩa',
      avatar_url: null,
      created_at: '2023-12-17T16:06:16.000000Z',
    },
  },
  {
    id: '6',
    type: 'partner',
    attributes: {
      name: 'Nhà Xe Phúc Thuận Thảo',
      avatar_url: null,
      created_at: '2023-12-17T16:19:10.000000Z',
    },
  },
  {
    id: '2',
    type: 'partner',
    attributes: {
      name: 'Xe Thịnh Phát',
      avatar_url:
        'https://s3.ap-southeast-2.amazonaws.com/chanhxe-prod/partners/z7KDKQtXsGivtIkDwLCU290HMEd4jxvYwfJe3IiS.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5H6QXVIMG47AX2V7%2F20240108%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20240108T112908Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=c7770d883aee9247c5b0296c379ec40b91df506c93068d815057ca6fdf1698ce',
      created_at: '2023-12-17T16:05:40.000000Z',
    },
  },
  {
    id: '11',
    type: 'partner',
    attributes: {
      name: 'Nhà Xe Phúc Thuận Thảo',
      avatar_url: null,
      created_at: '2023-12-18T02:17:52.000000Z',
    },
  },
];

const PartnerList = () => {
  return (
    <View style={{}}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        contentContainerStyle={{
          paddingVertical: 10,
          gap: 15,
        }}
        renderItem={({item}) => (
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
                  {item.attributes.created_at}
                </Text>
              </Text>
            </View>
          </View>
        )}
      />
    </View>
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
});
