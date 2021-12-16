import { DataService } from "./DataService";
import { CoordinatesPosition, Room, UserRoomState } from "../utils/models"

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

	public onSecondUserJoinRoom(callback: () => void): void {
		this.socketRef.on("second user join room", () => callback())
	}

	public onUserPutCoin(callback: (position: CoordinatesPosition) => void): void {
		this.socketRef.on("user put coin", (position: CoordinatesPosition) => callback(position))
	}

	public onUserReset(callback: () => void): void {
		this.socketRef.on("user reset", () => callback())
	}

	public onUserFinish(callback: () => void): void {
		this.socketRef.on("user finish", () => callback())
	}
	public onNotFoundRoom(callback: () => void): void {
		this.socketRef.on("not found room", () => callback())
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
	public emitPutCoin(position: CoordinatesPosition): void {
		this.socketRef.emit("put coin", position);
	}
	public emitFinish(): void {
		this.socketRef.emit("finish");
	}
	public emitReset(): void {
		this.socketRef.emit("reset");
	}
}
