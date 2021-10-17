import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { Divider } from './Divider';
import { Cell, Header, Row, Table } from './Table';
import { tw } from '../lib';
import { asUsd } from '../lib/formatters';
import { OrderBookType } from '../types';

const FillPercentage = ({
  percent,
  style,
}: {
  percent: number;
  style: ViewStyle;
}) => <View style={[tw`absolute inset-0`, { width: `${percent}%` }, style]} />;

export const OrderBook = ({ orderBook }: { orderBook: OrderBookType }) => {
  return (
    <View style={tw`flex-1`}>
      <Table>
        <Row>
          <Header title="PRICE" />
          <Header title="SIZE" />
          <Header title="TOTAL" />
        </Row>
        <Divider style={tw`border-gray-800`} />
        {orderBook.asks.map(level => (
          <Row key={`${level[0]}-${level[1]}-${level[2]}`}>
            <FillPercentage
              percent={(level[2] / orderBook.maxTotal) * 100}
              style={tw`bg-dark-red`}
            />
            <Cell data={asUsd(level[0])} style={tw`text-red font-bold`} />
            <Cell data={level[1]} style={tw`text-gray-300 font-bold`} />
            <Cell data={level[2]} style={tw`text-gray-300 font-bold`} />
          </Row>
        ))}
      </Table>
      <View style={tw`justify-center self-center py-1 h-8`}>
        <Text
          style={tw`font-mono font-bold text-sm text-gray-500 tracking-tight`}>
          Spread: {orderBook.spread!.toFixed(1)} (
          {((orderBook.spread! / orderBook.maxTotal) * 100).toFixed(3)}
          %)
        </Text>
      </View>
      <Table>
        {orderBook.bids.map(level => (
          <Row key={`${level[0]}-${level[1]}-${level[2]}`}>
            <FillPercentage
              percent={(level[2] / orderBook.maxTotal) * 100}
              style={tw`bg-dark-green`}
            />
            <Cell data={asUsd(level[0])} style={tw`text-green font-bold`} />
            <Cell data={level[1]} style={tw`text-gray-300 font-bold`} />
            <Cell data={level[2]} style={tw`text-gray-300 font-bold`} />
          </Row>
        ))}
      </Table>
    </View>
  );
};
