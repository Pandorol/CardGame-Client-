import { DEBUG } from "cc/env";

import { ResLoader } from "./common/loader/ResLoader";
import { Logger } from "./common/log/Logger";
export class oops {
    /** ----------核心模块---------- */

    /** 日志管理 */
    static log = Logger;
    static res: ResLoader;

}
// 引入oops全局变量以方便调试
if (DEBUG) {
    //@ts-ignore
    window.oops = oops;
}