import React from 'react';
import { Product } from '../constants';
import Config from 'react-native-config';
import { ProductContextType, OrderSide } from '../types';
import { isDelta, isSnapshot } from '../types/guards';
import { calculateSpread, processOrders } from '../lib/math';

export const ProductContext = React.createContext<ProductContextType>({
  subscribe: () => {},
  unsubscribeAll: () => {},
  data: new Map(),
  ready: false,
});

export const ProductProvider: React.FC = ({ children }) => {
  const socketConn = React.useRef<WebSocket | null>(null);

  const unsubscribeAll = () => {
    if (!socketConn.current) {
      return;
    }

    socketConn.current.send(
      JSON.stringify({
        event: 'unsubscribe',
        feed: 'book_ui_1',
        product_ids: Object.values(Product),
      }),
    );
  };

  const subscribe = (productId: Product) => {
    if (!socketConn.current) {
      console.log('Socket connection is not ready.');
      return;
    }

    unsubscribeAll();
    socketConn.current.send(
      JSON.stringify({
        event: 'subscribe',
        feed: 'book_ui_1',
        product_ids: [productId],
      }),
    );
  };

  React.useEffect(() => {
    const initialize = () => {
      let conn = new WebSocket(Config.PRODUCTS_API_URL);

      conn.onopen = () => {
        console.log('Socket connection opened');
        setProductContext(prev => ({ ...prev, ready: true }));
      };

      conn.onclose = () => {
        console.log('Socket connection closed');
        setProductContext(prev => ({ ...prev, ready: false }));
        initialize();
      };

      conn.onmessage = event => {
        // Parse the event data and update the order books
        const message = JSON.parse(event.data);
        if (isSnapshot(message) || isDelta(message)) {
          let product = message.product_id;
          setProductContext(prev => {
            let asks = processOrders({
              current: prev.data.get(product)?.asks,
              deltas: message.asks,
              side: OrderSide.SELL,
            }).slice(-12);

            let bids = processOrders({
              current: prev.data.get(product)?.bids,
              deltas: message.bids,
              side: OrderSide.BUY,
            }).slice(0, 12);

            let spread = calculateSpread(bids, asks);
            // Max of all totals on both sides
            let maxTotal = Math.max(
              ...bids.map(o => o[2]),
              ...asks.map(o => o[2]),
            );
            let data = new Map();
            data.set(product, { asks, bids, spread, maxTotal });
            return {
              ...prev,
              data,
            };
          });
        }
      };

      socketConn.current = conn;
    };

    initialize();

    return () => {
      unsubscribeAll();
    };
  }, []);

  const initialContext = {
    subscribe,
    unsubscribeAll,
    data: new Map(),
    ready: false,
  };
  const [productContext, setProductContext] =
    React.useState<ProductContextType>(initialContext);

  return (
    <ProductContext.Provider value={productContext}>
      {children}
    </ProductContext.Provider>
  );
};
