import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Product } from '../constants';

export type RootStackParamList = {
  OrderBook: { productId: Product };
};

export type OrderBookScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'OrderBook'
>;

export enum OrderSide {
  BUY = 'BUY',
  SELL = 'SELL',
}

export type Order = [price: number, size: number];
export type TabulatedOrders = [...order: Order, total: number][];

export type OrderBookType = {
  bids: TabulatedOrders;
  asks: TabulatedOrders;
  spread: number | null;
  maxTotal: number;
};

export type OrderBookData = Map<Product, OrderBookType>;

export type ProductContextType = {
  subscribe(productId: Product): void;
  unsubscribeAll(): void;
  data: OrderBookData;
  ready: boolean;
};

export type SubscribeMessage = {
  event: 'subscribed';
  feed: string;
  product_ids: Product[];
};

export type UnsubscribeMessage = {
  event: 'unsubscribed';
  feed: string;
  product_ids: Product[];
};

export type SnapshotMessage = {
  asks: Order[];
  bids: Order[];
  numLevels: number;
  feed: 'book_ui_1_snapshot';
  product_id: Product;
};

export type DeltaMessage = {
  asks: Order[];
  bids: Order[];
  feed: 'book_ui_1';
  product_id: Product;
};

export type ProductAPIMessage =
  | SubscribeMessage
  | UnsubscribeMessage
  | SnapshotMessage
  | DeltaMessage;
