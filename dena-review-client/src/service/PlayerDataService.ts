import { DataService } from "./DataService";
import { Room } from "../utils/models"

export class PlayerDataService extends DataService {
	//  ------------- LISTEN ------------
	public onUpdateRoomsState(callback: (roomsState: Room[]) => void): void {
		this.socketRef.on("update rooms state", (roomsState: Room[]) => callback(roomsState))
	}

	//  ------------- EMIT --------------
	public emitAccessedUser(userId: string): void {
		this.socketRef.emit("accessed user", userId);
	}
	public emitAddRoom(roomName: string): void {
		this.socketRef.emit("add room", roomName);
	}
}
