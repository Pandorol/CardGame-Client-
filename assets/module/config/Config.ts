import { oops } from "../core/Oops";

export class Config {

    get frameRate(): number {
        return this._data.config.frameRate;
    }
    /** 本地存储内容加密 key */
    get localDataKey(): string {
        return this._data.config.localDataKey;
    }
    /** 本地存储内容加密 iv */
    get localDataIv(): string {
        return this._data.config.localDataIv;
    }
    /** Http 服务器地址 */
    get httpServer(): string {
        return this._data.config.httpServer;
    }
    /** Http 请求超时时间 */
    get httpTimeout(): number {
        return this._data.config.httpTimeout;
    }


    private _data: any = null;
    /** 游戏配置数据 */
    public get data(): any {
        return this._data;
    }

    constructor(config: any) {
        this._data = Object.freeze(config.json);

        oops.log.logConfig(this._data, "配置");
    }
}