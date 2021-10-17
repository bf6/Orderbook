import { Order, OrderSide, TabulatedOrders } from '../types';

export const tabulateOrders = (
  orders: Order[],
  side: OrderSide,
): TabulatedOrders => {
  let result: TabulatedOrders = orders.slice().map(order => [...order, 0]);
  if (side === OrderSide.BUY) {
    // If buy side, sort bid orders by price descending
    result.sort((a, b) => b[0] - a[0]);
  } else if (OrderSide.SELL) {
    // If sell side, sort ask orders by price ascending
    result.sort((a, b) => a[0] - b[0]);
  }
  // Calculate the totals
  let runningTotal = 0;
  result = result.map(order => [
    order[0],
    order[1],
    (runningTotal += order[1]),
  ]);
  if (side === OrderSide.SELL) {
    result.reverse();
  }
  return result;
};

export const applyDelta = (
  current: TabulatedOrders,
  deltas: Order[],
  side: OrderSide,
): TabulatedOrders => {
  // Remove the totals from the current order book
  let newLevels: Order[] = current
    .slice()
    .map(priceLevel => [priceLevel[0], priceLevel[1]]);

  // Apply the deltas
  for (let delta of deltas) {
    let index = newLevels.findIndex(priceLevel => priceLevel[0] === delta[0]);
    // If the price level exists in the current order book
    if (index !== -1) {
      // Update the price level
      newLevels[index][1] = delta[1];
    } else {
      // Otherwise, add it to the orderbook
      newLevels.push(delta);
    }
  }

  // Filter 0-size levels and return the new order book
  return tabulateOrders(
    newLevels.filter(level => level[1] !== 0),
    side,
  );
};

export const processOrders = ({
  current,
  deltas,
  side,
}: {
  current?: TabulatedOrders;
  deltas: Order[];
  side: OrderSide;
}): TabulatedOrders => {
  if (current) {
    return applyDelta(current, deltas, side);
  } else {
    return tabulateOrders(deltas, side);
  }
};

export const calculateSpread = (
  bids: TabulatedOrders,
  asks: TabulatedOrders,
): number | undefined => {
  if (bids.length && asks.length) {
    // lowest ask - highest bid
    return asks[asks.length - 1][0] - bids[0][0];
  }
};
