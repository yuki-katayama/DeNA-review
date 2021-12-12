import express from "express";
import { initSyncService } from "./sync.service";

const PORT = process.env.PORT || 8081;

async function initializeServer() {
	const app = express();
	const server = app.listen(8081, () => console.log('server running on port ', PORT));
	await initSyncService(server);
}

initializeServer().then(() => console.log("started zawa data server."));