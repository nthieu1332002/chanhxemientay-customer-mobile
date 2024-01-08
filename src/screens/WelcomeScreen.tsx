import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';
import {COLORS} from 'theme/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SCREEN_WIDTH} from 'lib/Dimensions';
import {SCREEN_HEIGHT} from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeScreen = ({onStart}: {onStart: () => void}) => {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + 10)),
      100,
    );
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + 40)),
      300,
    );
  }, [ring1padding, ring2padding]);
  return (
    <View style={styles.Container}>
      <StatusBar backgroundColor={COLORS.primaryColor} />
      <Animated.View style={[styles.Circle, {padding: ring2padding}]}>
        <Animated.View style={[styles.Circle, {padding: ring1padding}]}>
          <Image
            source={require('assets/welcome.png')}
            style={{width: 200, height: 200}}
          />
        </Animated.View>
      </Animated.View>

      <View style={{justifyContent: 'center', gap: 20, paddingHorizontal: 25}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 28,
            fontWeight: '700',
            color: COLORS.primaryWhite,
          }}>
          Tìm kiếm sự hoàn hảo của riêng bạn!
        </Text>
        <Text
          style={{
            paddingHorizontal: 20,
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '500',
            color: COLORS.primaryWhite,
          }}>
          Hãy khám phá chuyến xe phù hợp với bạn!
        </Text>
      </View>
      <TouchableOpacity
        onPress={onStart}
        style={{
          paddingVertical: 15,
          paddingHorizontal: 90,
          backgroundColor: COLORS.primaryWhite,
          borderRadius: 30,
        }}>
        <Text
          style={{
            color: COLORS.primaryColor,
            fontSize: 19,
            fontWeight: '500',
          }}>
          Bắt đầu ngay!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
  },
  Circle: {
    borderRadius: Math.round(SCREEN_WIDTH + SCREEN_HEIGHT) / 2,
    backgroundColor: COLORS.whiteOpacity,
  },
});
