import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Products } from '../constants';

export type RootStackParamList = {
  OrderBook: { productId: Products };
};

export type OrderBookScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'OrderBook'
>;
