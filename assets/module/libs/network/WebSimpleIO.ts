import { Socket } from "socket.io-client";
import io from "socket.io-client/dist/socket.io.js";
import { Logger } from "../../core/common/log/Logger";
import { MessageFunc, NetData } from "./NetInterface";
export class WebSimpleIO {
    private _sio: Socket | null = null;
    /** 接受到网络数据事件 */
    onMessage: MessageFunc | null = null;
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
            Logger.logNet("connect:sid=" + this._sio.id);
        });
        this._sio.on("connect_error", (reason) => {
            Logger.logNet(reason);
        });
        this._sio.on("disconnect", (reason) => {
            Logger.logNet(reason);
            if (reason === "io server disconnect" || reason === "io client disconnect") {
                // the disconnection was initiated by the server, you need to reconnect manually

            }
            else {

            }
        });
        this._sio.on("message", (msg) => {
            this.onMessage.call(null, msg);
        });
        return true;
    }
    close() {
        this._sio.disconnect();
    }

    send(buffer: NetData, msgid = "message") {
        this._sio.emit(msgid, buffer)
    }

}