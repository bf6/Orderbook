import { throttle } from 'lodash';
import React from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  AppState,
  AppStateStatus,
  NativeEventSubscription,
} from 'react-native';
import { Button, Divider, OrderBook, ReconnectModal } from '../components';
import { Product } from '../constants';
import { tw } from '../lib';
import { ProductContext } from '../providers/Products';
import { OrderBookData, OrderBookScreenProps } from '../types';

const OrderBookScreen: React.FC<OrderBookScreenProps> = ({ route }) => {
  const appStateSubscription = React.useRef<NativeEventSubscription | null>(
    null,
  );
  const [showReconnectModal, setShowReconnectModal] =
    React.useState<boolean>(false);
  const [productId, setProductId] = React.useState<Product>(
    route.params.productId,
  );
  const { subscribe, ready, data, unsubscribeAll } =
    React.useContext(ProductContext);
  // Keep a local copy of the order data to throttle renders
  const [localData, setLocalData] = React.useState<OrderBookData>(data);

  const toggleProduct = () => {
    setProductId(current =>
      current === Product.BTC ? Product.ETH : Product.BTC,
    );
  };

  const reconnect = () => {
    subscribe(productId);
    setShowReconnectModal(false);
  };

  const showOrderBook = React.useMemo(() => {
    return localData?.get(productId);
  }, [localData, productId]);

  const throttledSetLocalData = React.useMemo(() => {
    return throttle(updated => setLocalData(updated), 100);
  }, []);

  // Throttle updates
  React.useEffect(() => {
    throttledSetLocalData(data);

    return () => {
      throttledSetLocalData.cancel();
    };
  }, [data, throttledSetLocalData]);

  // Subscribe on mount and product toggle
  React.useEffect(() => {
    if (ready) {
      subscribe(productId);
    }
    return () => {
      unsubscribeAll();
    };
  }, [productId, ready, subscribe, unsubscribeAll]);

  // Unsubscribe, and show reconnect modal on app background
  React.useEffect(() => {
    appStateSubscription.current = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        if (nextAppState === 'background') {
          unsubscribeAll();
          setShowReconnectModal(true);
        }
      },
    );

    return () => {
      appStateSubscription.current?.remove();
    };
  }, [unsubscribeAll]);

  return (
    <View style={tw`flex-1 justify-between`}>
      <View>
        <Text
          style={tw`text-gray-300 text-lg font-body mx-4 my-1 self-start tracking-tight font-semibold`}>
          Order Book
        </Text>
        <Divider style={tw`mb-2`} />
      </View>
      {showOrderBook ? (
        <OrderBook orderBook={localData.get(productId)!} />
      ) : (
        <ActivityIndicator />
      )}
      <View style={tw`flex flex-row justify-center py-3 bg-dark-blue`}>
        <Button onPress={toggleProduct} title="Toggle Feed" />
      </View>
      {showReconnectModal && <ReconnectModal reconnect={reconnect} />}
    </View>
  );
};

export default OrderBookScreen;
