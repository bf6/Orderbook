import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '.';
import { tw } from '../lib';

export const ReconnectModal = ({ reconnect }: { reconnect(): void }) => (
  <View
    style={tw`absolute flex self-center justify-center items-center inset-0 bg-black bg-opacity-30`}>
    <View
      style={tw`h-1/6 w-3/4 bg-gray-900 rounded-xl justify-evenly items-center`}>
      <Text style={tw`font-body text-lg text-gray-300`}>
        Your connection has been paused.
      </Text>
      <Button title="Reconnect" onPress={reconnect} />
    </View>
  </View>
);
