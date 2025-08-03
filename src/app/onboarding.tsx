import React from 'react';
import { Button, RootWrapper, Text } from '@/components';
import { useIsFirstTime } from '@/lib';
import { Image, useWindowDimensions, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function Onboarding() {
  const { setIsFirstTime } = useIsFirstTime();
  const { push } = useRouter();
  const { height } = useWindowDimensions();

  return (
    <RootWrapper className="container">
      <View className="items-center justify-end py-4" style={{ height }}>
        <Image
          source={require('@/assets/images/onboarding.png')}
          className="absolute top-[20%] w-full"
          resizeMode="contain"
        />
        <View className="gap-2">
          <Text className="text-center text-xl font-bold text-tertiary">
            Find German Jobs That Fit You
          </Text>
          <Text className="text-center text-sm">
            We help you find the best German jobs that fit your skills and
            preferences.
          </Text>
        </View>
        <View className="mt-5 w-full">
          <Button
            label="Get Started"
            className="mt-3"
            onPress={() => {
              setIsFirstTime(false);
              push('/');
            }}
          />
        </View>
      </View>
    </RootWrapper>
  );
}
