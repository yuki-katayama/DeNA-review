import { model, Schema, Types } from "mongoose";

export interface Room {
	/* 部屋のID, urlのパスになる */
	id: string;
	/* 部屋名 */
	name: string
}

const RoomSchema = new Schema(
	{
		id: {type: String, required: true, unique: true},
		name: {type: String, trim: true}
	}
)

export const RoomModel = model<Room>("Room", RoomSchema);