import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { tw } from '../lib';

type Props = {
  onPress(): void;
  title: string;
};

export const Button: React.FC<Props> = ({ onPress, title }) => (
  <TouchableOpacity
    style={tw`bg-lavender rounded-md`}
    onPress={onPress}
    activeOpacity={0.7}>
    <Text
      style={tw`text-base text-white font-body font-semibold tracking-wide py-1 px-4`}>
      {title}
    </Text>
  </TouchableOpacity>
);
