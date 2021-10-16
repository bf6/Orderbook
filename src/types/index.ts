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

export type OrderBook = {
  bids: TabulatedOrders;
  asks: TabulatedOrders;
  spread: number;
};

export type TProductContext = {
  subscribe(productId: Product): void;
  data: OrderBook | null;
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
  productId: Product;
};

export type DeltaMessage = {
  asks: Order[];
  bids: Order[];
  feed: 'book_ui_1';
  productId: Product;
};

export type ProductAPIMessage =
  | SubscribeMessage
  | UnsubscribeMessage
  | SnapshotMessage
  | DeltaMessage;
