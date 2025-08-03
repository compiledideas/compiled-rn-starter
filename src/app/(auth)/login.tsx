import React from 'react';
import {
  Button,
  RootWrapper,
  Text,
  View,
  FieldInput,
  FormContext,
} from '@/components';
import { useIsFirstTime } from '@/lib';
import { Link, useRouter } from 'expo-router';
import { useForm } from '@tanstack/react-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

export default function Login() {
  const { setIsFirstTime } = useIsFirstTime();
  const { replace } = useRouter();

  const form = useForm();

  return (
    <RootWrapper className="mb-7 flex-1 justify-end">
      <KeyboardAvoidingView
        behavior="padding"
        className="container mb-3 rounded-2xl bg-backgroundSecondary p-2 dark:bg-backgroundSecondaryDark">
        <Text className="text-center text-xl font-medium">Welcome back!</Text>
        <FormContext value={form}>
          <FieldInput
            label="Email"
            name="email"
            placeholder="Enter your email"
            className="bg-background dark:bg-backgroundDark"
          />
          <FieldInput
            label="Password"
            name="password"
            placeholder="Enter your password"
            password
            className="bg-background dark:bg-backgroundDark"
          />
        </FormContext>
        <Button
          label="Go Onboarding"
          className="my-2"
          onPress={() => {
            setIsFirstTime(true);
            replace('/onboarding');
          }}
        />
        <Text className="mb-2 text-center text-sm">
          Don't have an account?{' '}
          <Link asChild href="/signup">
            <Text className="text-primary">Sign up</Text>
          </Link>
        </Text>
      </KeyboardAvoidingView>
    </RootWrapper>
  );
}
