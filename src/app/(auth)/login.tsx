import React from 'react';
import {
  Button,
  RootWrapper,
  Text,
  FieldInput,
  FormContext,
} from '@/components';
import { useIsFirstTime } from '@/lib';
import { Link, useRouter } from 'expo-router';
import { useForm } from '@tanstack/react-form';
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const { setIsFirstTime } = useIsFirstTime();
  const { replace } = useRouter();

  const form = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      console.log('Login data:', value);
      // TODO: Implement actual login with Convex auth
    },
  });

  return (
    <RootWrapper className="flex-1 px-4">
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-1"
        bounces={false}>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={10}
          className="bg-backgroundSecondary dark:bg-backgroundSecondaryDark flex-1 justify-center rounded-2xl p-5">
          <View className="mb-6">
            <Text className="text-center text-2xl font-bold text-text dark:text-textdark">
              Welcome back!
            </Text>
            <Text className="text-center text-sm text-text/70 dark:text-textdark/70">
              Sign in to continue to AlmaniaLink
            </Text>
          </View>

          <FormContext value={form}>
            <View className="gap-4">
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
            </View>
          </FormContext>

          <TouchableOpacity
            onPress={() => {/* TODO: Implement forgot password */}}
            className="mt-2 self-end">
            <Text className="text-sm text-primary">Forgot password?</Text>
          </TouchableOpacity>

          <View className="mt-6 gap-3">
            <Button
              label="Sign In"
              className="my-2"
              onPress={() => {
                form.handleSubmit();
              }}
            />
            <Text className="text-center text-sm text-text dark:text-textdark">
              Don't have an account?{' '}
              <Link asChild href="/signup">
                <Text className="font-semibold text-primary">Sign up</Text>
              </Link>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </RootWrapper>
  );
}
