import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Button, Divider, OrderBook } from '../components';
import { Product } from '../constants';
import { tw } from '../lib';
import { ProductContext } from '../providers/Products';
import { OrderBookScreenProps } from '../types';

const OrderBookScreen: React.FC<OrderBookScreenProps> = ({ route }) => {
  const [productId, setProductId] = React.useState<Product>(
    route.params.productId,
  );
  const { subscribe, ready, data, unsubscribeAll } =
    React.useContext(ProductContext);

  const toggleProduct = () => {
    setProductId(current =>
      current === Product.BTC ? Product.ETH : Product.BTC,
    );
  };

  const showOrderBook = React.useMemo(() => {
    return data?.get(productId) && data.get(productId)!.spread;
  }, [data, productId]);

  React.useEffect(() => {
    if (ready) {
      subscribe(productId);
    }
    return () => {
      unsubscribeAll();
    };
  }, [productId, ready, subscribe, unsubscribeAll]);

  return (
    <View style={tw`relative flex-1 justify-between`}>
      <View>
        <Text
          style={tw`text-gray-300 text-lg font-body mx-4 my-1 self-start tracking-tight font-semibold`}>
          Order Book
        </Text>
        <Divider style={tw`mb-2`} />
      </View>
      {showOrderBook ? (
        <OrderBook orderBook={data.get(productId)!} />
      ) : (
        <ActivityIndicator />
      )}
      <View style={tw`flex flex-row justify-center py-3 bg-dark-blue`}>
        <Button onPress={toggleProduct} title="Toggle Feed" />
      </View>
    </View>
  );
};

export default OrderBookScreen;
