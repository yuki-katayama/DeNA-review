export interface CoordinatesPosition {
  x: number;
  y: number;
}

export interface UserRoomState {
	roomId: string;
	userId: string;
	socketId: string;
	roomName: string;
}

export interface User {
	/* ユーザーuuid */
	id: string;
}

export interface Room {
  /** 部屋ID. url のパスになる文字列。 */
  id: string;
  /** 部屋の名前 */
  name: string;
  user: User[];
}