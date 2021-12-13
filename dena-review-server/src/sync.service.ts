import { Server as ServerHttp } from "http";
import { Server, Socket } from "socket.io";
import { RoomModel, Room } from "./models";
import { v4 } from "uuid";

const socketToUserId: { [socketId: string]: string } = {};

export async function initSyncService(server: ServerHttp) {
    const io = new Server(server, {cors: {
        origin: "http://localhost:8080"
    }});
    io.on('connection', (s: Socket) => {
        s.on('accessed user', (data: string) => {
            socketToUserId[s.id] = userId;
            s.join("accessed");
        });
        s.on('add room', (roomName: string) => {
            addRoom(roomName);
        });
        s.on('get room state' () => {
            async notifyRoomState(io)
        })
    });
}

async function addRoom(roomName: string): Promise<Room> {
    let room = await RoomModel.findOne({name: roomName}).exec();
    if (!room) {
        room = await RoomModel.create({id: v4(), name: roomName});
    }
    return room;
}