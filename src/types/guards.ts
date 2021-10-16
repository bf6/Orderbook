import { ProductAPIMessage, SnapshotMessage, DeltaMessage } from './index';

export function isSnapshot(
  message: ProductAPIMessage,
): message is SnapshotMessage {
  return (
    message.feed === 'book_ui_1_snapshot' &&
    'bids' in message &&
    'asks' in message
  );
}

export function isDelta(message: ProductAPIMessage): message is DeltaMessage {
  return message.feed === 'book_ui_1' && 'bids' in message && 'asks' in message;
}
