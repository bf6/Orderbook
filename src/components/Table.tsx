import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { tw } from '../lib';

export const Header = ({ title }: { title: string }) => (
  <Cell data={title} style={tw`text-gray-500 font-bold`} />
);

export const Cell = ({
  data,
  style,
}: {
  data: string | number;
  style: ViewStyle;
}) => (
  <View style={tw`flex-1 items-end px-5`}>
    <Text style={[tw`font-mono`, style]}>{data}</Text>
  </View>
);

export const Row = ({ children }: { children: React.ReactNode }) => (
  <View style={tw`flex-row py-0.5`}>{children}</View>
);

export const Table = ({ children }: { children: React.ReactNode }) => (
  <View style={tw`my-2 flex-1 overflow-hidden flex-col justify-start`}>
    {children}
  </View>
);
