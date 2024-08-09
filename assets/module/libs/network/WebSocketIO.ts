import { Socket } from "socket.io-client";
import io from "socket.io-client/dist/socket.io.js";
import { Logger } from "../../core/common/log/Logger";

export class WebSocketIO {
    private _sio: Socket | null = null;              // websocket对象
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

        });
        this._sio.on("connect_error", (reason) => {
            Logger.logNet(reason);
        });
        this._sio.on("disconnect", (reason) => {
            Logger.logNet(reason);
        });
        return true;
    }
}