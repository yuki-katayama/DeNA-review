import io, {Socket} from "socket.io-client";

export class DataService {
  public socketRef!: Socket;
  readonly url: string;
  private isConnect: boolean = false;

  constructor(serverUrl: string) {
    this.url = serverUrl;
    this.createConnection();
  }

  // ------------- CONNECT --------------

  private createConnection(): void {
    console.log("connect to data server: ", this.url);
    this.socketRef = io(this.url);
    this.connect();
  }
  public connect() {
    if (this.socketRef && !this.isConnect) {
      this.isConnect = true;
      this.socketRef.connect();
    }
  }
  //  ------------- LISTEN --------------
  public onConnected(callback: () => void): void {
    if (this.socketRef.connected) {
      callback();
    }
    this.socketRef.on("connect", () => {
      console.log("connected to data server: ", this.url);
      callback();
    });
  }

  public onceConnected(callback: () => void): void {
    if (this.socketRef.connected) {
      callback();
    }
    this.socketRef.once("connect", () => {
      console.log("connected to data server: ", this.url);
      callback();
    });
  }
}
