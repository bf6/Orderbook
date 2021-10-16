import React from 'react';
import { Product } from '../constants';
import Config from 'react-native-config';
import { TProductContext, OrderSide } from '../types';
import { isDelta, isSnapshot } from '../types/guards';
import { processOrders } from '../lib/math';

export const ProductContext = React.createContext<TProductContext>({
  subscribe: () => {},
  data: null,
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
    let conn = new WebSocket(Config.PRODUCTS_API_URL);

    conn.onopen = () => {
      console.log('Socket connection opened');
      setProductContext(prev => ({ ...prev, ready: true }));
    };

    conn.onclose = () => {
      console.log('Socket connection closed');
      setProductContext(prev => ({ ...prev, ready: false }));
    };

    conn.onmessage = event => {
      // Parse the event data and update the order books
      const message = JSON.parse(event.data);
      if (isSnapshot(message) || isDelta(message)) {
        setProductContext(prev => {
          let asks = processOrders({
            current: prev.data?.asks,
            deltas: message.asks,
            side: OrderSide.SELL,
          });
          let bids = processOrders({
            current: prev.data?.bids,
            deltas: message.bids,
            side: OrderSide.BUY,
          });
          return {
            ...prev,
            data: {
              spread: asks[0][0] - bids[0][0],
              asks,
              bids,
            },
          };
        });
      }
    };

    socketConn.current = conn;

    return () => {
      socketConn.current?.close();
    };
  }, []);

  const initialContext = {
    subscribe,
    data: null,
    ready: false,
  };
  const [productContext, setProductContext] =
    React.useState<TProductContext>(initialContext);

  return (
    <ProductContext.Provider value={productContext}>
      {children}
    </ProductContext.Provider>
  );
};
