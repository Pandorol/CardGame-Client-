import { Socket } from "socket.io-client";
import io from "socket.io-client/dist/socket.io.js";
import { Logger } from "../../core/common/log/Logger";
import { ISocket, MessageFunc, NetData, SocketFunc } from "./NetInterface";

export class WebSocketIO implements ISocket {
    private _sio: Socket | null = null;
    onConnected: SocketFunc;
    onMessage: MessageFunc;
    onError: SocketFunc;
    onClosed: SocketFunc;
    send(buffer: NetData): number {
        this._sio.send(buffer);
        throw new Error("Method not implemented.");
    }
    close(code?: number, reason?: string): void {
        this._sio.disconnect();
    }

    connect(options: any) {
        let url = null;
        if (options.url) {
            url = options.url;
        }
        else {
            let ip = options.ip;
            let port = options.port;
            let protocol = options.protocol;
            url = `${protocol}://${ip}:${port}`;
        }
        this._sio = io(url)
        this._sio.on("connect", () => {
            Logger.logNet(this._sio.id);
            this.onConnected.call(null)
        });
        this._sio.on("connect_error", (reason) => {
            Logger.logNet(reason);
            this.onError.call(null, reason);
        });
        this._sio.on("disconnect", (reason) => {
            Logger.logNet(reason);
            if (reason === "io server disconnect" || reason === "io client disconnect") {
                // the disconnection was initiated by the server, you need to reconnect manually

            }
            else {
                this.onClosed.call(null, reason);
            }
        });
        return true;
    }
}