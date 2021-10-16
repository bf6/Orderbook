import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OrderBookScreen } from './screens';
import { Product } from './constants';
import { RootStackParamList } from './types';
import { tw } from './lib';
import { Theme } from './lib';
import { ProductProvider } from './providers/Products';
const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <SafeAreaView style={tw`h-full bg-dark-blue`}>
      <StatusBar barStyle="light-content" />
      <ProductProvider>
        <NavigationContainer theme={Theme}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="OrderBook"
              component={OrderBookScreen}
              initialParams={{ productId: Product.BTC }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ProductProvider>
    </SafeAreaView>
  );
};

export default App;
