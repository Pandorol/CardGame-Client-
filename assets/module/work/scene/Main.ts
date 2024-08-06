import { _decorator, profiler } from 'cc';
import { DEBUG } from 'cc/env';
import { oops } from '../../core/Oops';
import { Root } from '../../core/Root';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Root {
    start() {
        if (DEBUG) profiler.showStats();

        oops.language.setLanguage("zh", () => {
            oops.res.loadDir("common", () => {//加载resources/common的加载动画提示消息组件
                oops.gui.toast("加载组件完成");
            });
        });

    }

    update(deltaTime: number) {

    }
}


