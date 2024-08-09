import { DEBUG } from "cc/env";

import { LanguageManager } from "../libs/gui/language/Language";
import { HttpRequest } from "../libs/network/HttpRequest";
import { NetManager } from "../libs/network/NetManager";
import { AudioManager } from "./common/audio/AudioManager";
import { MessageManager } from "./common/event/MessageManager";
import { ResLoader } from "./common/loader/ResLoader";
import { Logger } from "./common/log/Logger";
import { StorageManager } from "./common/storage/StorageManager";
import { TimerManager } from "./common/timer/TimerManager";
import { GameManager } from "./game/GameManager";
import { LayerManager } from "./gui/layer/LayerManager";
export class oops {
    /** ----------核心模块---------- */

    /** 日志管理 */
    static log = Logger;
    static res: ResLoader;
    /** 二维界面管理 */
    static gui: LayerManager;
    /** 本地存储 */
    static storage: StorageManager;
    /** 游戏音乐管理 */
    static audio: AudioManager;
    /** 游戏时间管理 */
    static timer: TimerManager;
    /** 全局消息 */
    static message: MessageManager;
    static game: GameManager;
    /** ----------可选模块---------- */

    /** 多语言模块 */
    static language: LanguageManager = new LanguageManager();

    /** HTTP */
    static http: HttpRequest = new HttpRequest();
    /** WebSocket */
    static tcp: NetManager = new NetManager();

}
// 引入oops全局变量以方便调试
if (DEBUG) {
    //@ts-ignore
    window.oops = oops;
}