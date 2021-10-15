import React from 'react';
import { Button, Text, View } from 'react-native';
import { Products } from '../constants';
import { tw } from '../lib';
import { OrderBookScreenProps } from '../types';

const OrderBookScreen: React.FC<OrderBookScreenProps> = ({ route }) => {
  const [product, setProduct] = React.useState<Products>(
    route.params.productId,
  );

  const toggleProduct = () => {
    setProduct(current =>
      current === Products.BTC ? Products.ETH : Products.BTC,
    );
  };

  return (
    <View>
      <Text style={tw`white`}>{product}</Text>
      <Button onPress={toggleProduct} title="Toggle Product" />
    </View>
  );
};

export default OrderBookScreen;
