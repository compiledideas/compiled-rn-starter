import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { Header, RootWrapper } from '@/components';

export default function Signup() {
  return (
    <RootWrapper>
      <ScrollView className="container">
        <Header />
        <Text>Sign Up</Text>
      </ScrollView>
    </RootWrapper>
  );
}
