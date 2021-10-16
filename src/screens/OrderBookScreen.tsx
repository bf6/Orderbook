import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '../components';
import { Product } from '../constants';
import { tw } from '../lib';
import { ProductContext } from '../providers/Products';
import { OrderBookScreenProps, TabulatedOrders } from '../types';

type OrderBookProps = {
  bids: TabulatedOrders;
  asks: TabulatedOrders;
};
const OrderBook: React.FC<OrderBookProps> = ({ bids, asks }) => {
  return (
    <View style={tw`max-h-40 overflow-hidden`}>
      <View style={tw`flex items-end w-1/2`}>
        <Text style={tw`text-gray-500 font-bold`}>PRICE</Text>
        {asks.map(priceLevel => (
          <Text style={tw`text-white`}>{priceLevel[0].toFixed(2)}</Text>
        ))}
      </View>
    </View>
  );
};

const OrderBookScreen: React.FC<OrderBookScreenProps> = ({ route }) => {
  const [productId, setProductId] = React.useState<Product>(
    route.params.productId,
  );
  const { subscribe, ready, data } = React.useContext(ProductContext);

  const toggleProduct = () => {
    setProductId(current =>
      current === Product.BTC ? Product.ETH : Product.BTC,
    );
  };

  React.useEffect(() => {
    if (ready) {
      subscribe(productId);
    }
  }, [productId, ready, subscribe]);

  return (
    <View style={tw`flex`}>
      <Text style={tw`text-white text-lg font-body mx-4 my-1 self-start`}>
        Order Book
      </Text>
      <View style={tw`border border-t-0 border-gray-500 w-full`} />
      {ready && data && <OrderBook bids={data?.bids} asks={data?.asks} />}
      <Button onPress={toggleProduct} title="Toggle Feed" />
    </View>
  );
};

export default OrderBookScreen;
