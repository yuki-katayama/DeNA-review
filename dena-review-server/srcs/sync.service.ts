import { Server } from "http";
import socket, {Socket} from "socket.io";

export async function initSyncService(server: Server) {
    // const socket = io(server);
    server.on('connection', (socket: Socket) => {
        socket.on('SEND_MESSAGE', (data: any) => {
            socket.emit('MESSAGE', data)
        });
    });
}