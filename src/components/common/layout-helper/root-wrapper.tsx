import { cn } from '@/lib';
import React, { type ReactNode } from 'react';
import { View } from 'react-native';

export function RootWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <View className="flex-1 overflow-y-scroll bg-background dark:bg-backgroundDark">
      <View className={cn('ios:pt-16 android:pt-10 pt-5', className)}>
        {children}
      </View>
    </View>
  );
}
