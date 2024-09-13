import { _decorator, EventTouch, Node } from 'cc';
import { oops } from '../../../core/Oops';
import { LanguageData } from '../../../libs/gui/language/LanguageData';
import { EventMessage_work } from '../../event/EventMessage_work';
import { cardsmgr } from '../../modules/cards/CardDatas';
import { gfivemgr } from '../../modules/gfive/GfiveMgr';
import { GfiveSend } from '../../modules/gfive/GfiveSend';
import { userdt } from '../../modules/user/UserDatas';
import { commonTouchActions } from '../common/commonTouchActions';
import { gfiveblockutils } from '../common/gfiveblockutils';
import { uigfivecard } from '../uigfive/uigfivecard';
const { ccclass, property } = _decorator;

@ccclass('cTouchAction1')
export class cTouchAction1 extends commonTouchActions {

    onTouchStart(ev: EventTouch, ...params: any) {
        let startcard = this.node.getComponent(uigfivecard)
        if (startcard) {
            oops.message.dispatchEvent(EventMessage_work.OnClickCard, startcard.data)
        }
    }
    onTouchMove(ev: EventTouch, ...params: any) {

    }
    onTouchEnd(ev: EventTouch, ...params: any) {
        oops.log.logBusiness(params, "cTouchAction1-TouchEnd")
        //let endnode = params[0]
        if (!gfivemgr.IsMyTurn()) {
            oops.gui.toast(LanguageData.getLangByID("noyourturn"))
            return
        }
        let startcard = this.node.getComponent(uigfivecard)
        if (startcard.data.ownerid != userdt.userid) {
            oops.gui.toast(LanguageData.getLangByID("nocardowner"))
            return
        }
        if (gfivemgr.leftsteps < 1) {
            oops.gui.toast(LanguageData.getLangByID("nosteps"))
            return
        }
        let endnode: Node = params[0]
        let startnode: Node = this.node.parent

        let readycamp = startcard.data.readycamp
        if (endnode.children[0]) {

        }
        else {

            if (cardsmgr.readycamps[readycamp].canmove) {
                let nodedis = gfiveblockutils.getStartEndNodesDis(startnode, endnode)
                if (nodedis > startcard.data.moverange) {
                    oops.gui.toast(LanguageData.getLangByID("nomoverange"))
                    return
                }
                else {
                    GfiveSend.SendMove(1, gfiveblockutils.getpos(startnode), gfiveblockutils.getpos(endnode))
                }
            }

        }
    }
    onTouchCancel(ev: EventTouch, ...params: any) {

    }
    onBeEndTouched(ev: EventTouch, ...params: any) {

    }
}


