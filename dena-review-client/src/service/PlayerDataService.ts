import { DataService } from "./DataService";
import { Room, UserRoomState } from "../utils/models"

export class PlayerDataService extends DataService {
	//  ------------- LISTEN ------------
	public onUpdateRoomsState(callback: (roomsState: Room[]) => void): void {
		this.socketRef.on("update rooms state", (roomsState: Room[]) => callback(roomsState))
	}

	public onUserJoinRoom(callback: (roomsState: UserRoomState[]) => void): void {
		this.socketRef.on("user join room", (roomsState: UserRoomState[]) => callback(roomsState))
	}

	public onUserLeaveRoom(callback: (numPlayer: number) => void): void {
		this.socketRef.on("user leave room", (numPlayer: number) => callback(numPlayer))
	}
	//  ------------- EMIT --------------
	public emitAccessedUser(userId: string): void {
		this.socketRef.emit("accessed user", userId);
	}
	public emitJoinRoom(roomName: string): void {
		this.socketRef.emit("join room", roomName);
	}
	public emitAddRoom(roomName: string): void {
		this.socketRef.emit("add room", roomName);
	}
	public emitLeaveRoom(): void {
		this.socketRef.emit("leave room");
	}
}
