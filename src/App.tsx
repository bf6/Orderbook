import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OrderBookScreen } from './screens';
import { Products } from './constants';
import { RootStackParamList } from './types';
import { tw } from './lib';
import { Theme } from './lib';
const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <SafeAreaView style={tw`flex-1 bg-dark-blue`}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer theme={Theme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="OrderBook"
            component={OrderBookScreen}
            initialParams={{ productId: Products.BTC }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
