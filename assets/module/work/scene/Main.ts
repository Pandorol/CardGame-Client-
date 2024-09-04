import { _decorator, profiler } from 'cc';
import { DEBUG } from 'cc/env';
import { oops } from '../../core/Oops';
import { Root } from '../../core/Root';
import { cardsmgr } from '../modules/cards/CardDatas';
import { UIConfigData, UIID } from '../ui/UIConfig';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Root {
    start() {
        if (DEBUG) profiler.showStats();

        oops.language.setLanguage("zh", () => {
            oops.res.loadDir("common", () => {//加载resources/common的加载动画提示消息组件
                //oops.gui.toast("toast测试");
                Promise.all([
                    cardsmgr.Init()
                ]).then(() => {
                    oops.gui.init(UIConfigData);
                    oops.gui.open(UIID.HotUp)
                })

            });
        });

    }

    update(deltaTime: number) {

    }
}


