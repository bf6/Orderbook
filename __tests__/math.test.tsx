import 'react-native';
import { applyDelta, tabulateOrders } from '../src/lib/math';
import { Order, OrderSide, TabulatedOrders } from '../src/types';

describe('applyDelta', () => {
  let orderBook: TabulatedOrders;
  beforeEach(() => {
    orderBook = [
      [60958.5, 2000, 10500],
      [60957.0, 7000, 8500],
      [60950.0, 1500, 1500],
    ];
  });
  it('removes 0-size deltas from the order book', () => {
    let deltas: Order[] = [[60957.0, 0]];
    let updated: TabulatedOrders = applyDelta(
      orderBook,
      deltas,
      OrderSide.SELL,
    );
    expect(updated).toEqual([
      [60958.5, 2000, 3500],
      [60950.0, 1500, 1500],
    ]);
  });
  it('updates price levels in the order book', () => {
    let deltas: Order[] = [[60957.0, 10000]];
    let updated: TabulatedOrders = applyDelta(
      orderBook,
      deltas,
      OrderSide.SELL,
    );
    expect(updated).toEqual([
      [60958.5, 2000, 13500],
      [60957.0, 10000, 11500],
      [60950.0, 1500, 1500],
    ]);
  });
  it('adds new price levels to the order book', () => {
    let deltas: Order[] = [[60959.0, 3000]];
    let updated: TabulatedOrders = applyDelta(
      orderBook,
      deltas,
      OrderSide.SELL,
    );
    expect(updated).toEqual([
      [60959.0, 3000, 13500],
      [60958.5, 2000, 10500],
      [60957.0, 7000, 8500],
      [60950.0, 1500, 1500],
    ]);
  });
});

describe('tabulateOrder', () => {
  let orders: Order[];
  beforeEach(() => {
    orders = [
      [60958.5, 2000],
      [60957.0, 7000],
      [60950.0, 1500],
    ];
  });
  it('correctly tabulates a buy-side order book', () => {
    let orderBook: TabulatedOrders = tabulateOrders(orders, OrderSide.BUY);
    expect(orderBook).toEqual([
      [60958.5, 2000, 2000],
      [60957.0, 7000, 9000],
      [60950.0, 1500, 10500],
    ]);
  });
  it('correctly tabulates a sell-side order book', () => {
    let orderBook: TabulatedOrders = tabulateOrders(orders, OrderSide.SELL);
    expect(orderBook).toEqual([
      [60958.5, 2000, 10500],
      [60957.0, 7000, 8500],
      [60950.0, 1500, 1500],
    ]);
  });
});
