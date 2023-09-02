import { BloDClient } from '@/utility/blod-client';
import { Socket as SocketIO } from 'socket.io-client';

type SocketHandler = (client:BloDClient,socket:SocketIO,data: any) => Promise<void>;
type SocketEvent = string;
type SocketData = any;

export type Socket = {
  type: SocketEvent;
  handler: SocketHandler;
}

export type Sockets = {
  [key: string]: Socket;
}