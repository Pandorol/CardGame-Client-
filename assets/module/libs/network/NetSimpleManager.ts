
import { NetData, NetSimpleConnectOptions } from "./NetInterface";
import { WebSimpleIO } from "./WebSimpleIO";

export class NetSimpleManager {
    private static _instance: NetSimpleManager;
    protected _channels: { [key: number]: WebSimpleIO } = {};

    /** 网络管理单例对象 */
    static getInstance(): NetSimpleManager {
        if (!this._instance) {
            this._instance = new NetSimpleManager();
        }
        return this._instance;
    }
    setNetNode(node: WebSimpleIO, channelId: number = 0) {
        this._channels[channelId] = node;
    }

    /** 移除Node */
    removeNetNode(channelId: number) {
        delete this._channels[channelId];
    }
    connect(url: NetSimpleConnectOptions, channelId: number = 0): boolean {
        if (this._channels[channelId]) {
            return this._channels[channelId].connect(url);
        }
        return false;
    }
    close(channelId: number = 0) {
        if (this._channels[channelId]) {
            return this._channels[channelId].close();
        }
    }
    send(buf: NetData, channelId: number = 0): number {
        let node = this._channels[channelId];
        if (node) {
            node!.send(buf);
            return 0;
        }
        return -1;
    }
}