import { View, Text } from 'react-native';
import React from 'react';
import { Header, HeaderWithGoBack, RootWrapper } from '@/components';

export default function Article() {
  return (
    <RootWrapper>
      <HeaderWithGoBack />
      <Text>Article</Text>
    </RootWrapper>
  );
}
