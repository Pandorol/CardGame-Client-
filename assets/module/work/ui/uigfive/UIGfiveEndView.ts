import { _decorator, Component, Label } from 'cc';
import { oops } from '../../../core/Oops';
import { StringUtil } from '../../../core/utils/StringUtil';
import { LanguageData } from '../../../libs/gui/language/LanguageData';
import { gfivemgr } from '../../modules/gfive/GfiveMgr';
import { userdt } from '../../modules/user/UserDatas';
const { ccclass, property } = _decorator;

@ccclass('UIGfiveEndView')
export class UIGfiveEndView extends Component {
    @property(Label)
    mwinner: Label = null
    @property(Label)
    mlbdesc: Label = null
    start() {
        if (userdt.userid == gfivemgr.winner + '') {
            this.mwinner.string = LanguageData.getLangByID("youwin")
        }
        else {
            this.mwinner.string = LanguageData.getLangByID("youlose")
        }
        this.mlbdesc.string = StringUtil.simpleJstr(JSON.stringify(gfivemgr.enddata))
    }

    update(deltaTime: number) {

    }
    onClickClose() {
        oops.gui.removeByNode(this.node)
    }
    onBeforeRemove() {
        oops.message.offAll(this)
    }
}


