import { Server as ServerHttp } from "http";
import { Server, Socket } from "socket.io";
import { RoomModel, Room, UserRoomModel, UserModel } from "./models";
import { v4 } from "uuid";

const socketToUserId: { [socketId: string]: string } = {};

export async function initSyncService(server: ServerHttp) {
    const io = new Server(server, {cors: {
        origin: "http://localhost:8080"
    }});
    io.on('connection', (s: Socket) => {
        s.on('accessed user', async (userId: string) => {
            socketToUserId[s.id] = userId;
            s.join("accessed");
            console.log("accessed: ", userId)
            await notifyRoomState(io);
        });

        s.on('add room', async (roomName: string) => {
            await addRoom(roomName);
            console.log("addRoom: ", roomName)
            await notifyRoomState(io)
        });

        s.on('join room', async (roomName: string) => {
            const room = await RoomModel.findOne({ name: roomName }).exec();
            if (!room) {
              console.log("error not found room");
              return;
            }
            await UserRoomModel.create({id: v4(), userId: socketToUserId[s.id], roomName: roomName, roomId: room.id, socketId: s.id});
            let userRooms = await UserRoomModel.find().lean().exec();
            s.join(roomName)
            io.to("accessed").emit("user join room", userRooms); //同じ名前のroomNameが二つ以上あれば、表示しない処理をフロントで行う。
            console.log("joinRoom: ", roomName)
            await notifyRoomState(io)
        });

        s.on('leave room', async () => {
            const states = await UserRoomModel.find().lean().exec();
            const state = await UserRoomModel.findOne({socketId: s.id}).exec();
            if (state) {
                const room = await RoomModel.findOne({id: state.roomId}).exec();
                const userNumInRoom: number = states.filter((s) => s.roomId === state!.roomId).length
                console.log(states);
                if (userNumInRoom == 1) {
                    console.log(room, state, userNumInRoom);
                    await RoomModel.deleteOne({id: state.roomId});
                }
                await UserRoomModel.deleteOne({socketId: s.id});
                io.to(state.roomName).emit("user leave room", userNumInRoom)
                await notifyRoomState(io)
            }
        })

        s.on('get room state', async () => {
            console.log("getRoomState: ")
            await notifyRoomState(io)
        })
    });
}

async function addRoom(roomName: string): Promise<void> {
    let room = await RoomModel.findOne({name: roomName}).exec();
    if (!room) {
        await RoomModel.create({id: v4(), name: roomName});
    }
}

async function notifyRoomState(io: Server) {
    let rooms: Room[] = await RoomModel.find().lean().exec();
    io.to("accessed").emit("update rooms state", rooms)
}