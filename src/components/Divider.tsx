import React from 'react';
import { View, ViewStyle } from 'react-native';
import { tw } from '../lib';

export const Divider = ({ style }: { style?: ViewStyle }) => (
  <View style={[tw`border border-t-0 border-gray-700 w-full`, style]} />
);
