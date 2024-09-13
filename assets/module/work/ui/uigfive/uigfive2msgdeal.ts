import { _decorator, Component, instantiate, Layout, Node } from 'cc';
import { oops } from '../../../core/Oops';
import { ViewUtil } from '../../../core/utils/ViewUtil';
import { LanguageData } from '../../../libs/gui/language/LanguageData';
import { EventMessage_work } from '../../event/EventMessage_work';
import { gfivemgr } from '../../modules/gfive/GfiveMgr';
import { userdt } from '../../modules/user/UserDatas';
import { cTouchAction1 } from '../cardactions/cTouchAction1';
import { commonTouchActions } from '../common/commonTouchActions';
import { UIGfiveView2 } from './UIGfiveView2';
import { uigfivecard } from './uigfivecard';
import { uigfivectrls } from './uigfivectrls';
const { ccclass, property } = _decorator;

@ccclass('uigfive2msgdeal')
export class uigfive2msgdeal extends Component {

    start() {
        this.SetRoomActData()
        this.SetPlayers()
        this.SetCtrls()
        oops.message.on(EventMessage_work.OnClickCard, this.SetClickCard, this)
        oops.message.on(EventMessage_work.SetRoomUsers, this.SetPlayers, this)
        oops.message.on(EventMessage_work.SetRoomActData, this.SetRoomActData, this)
        oops.message.on(EventMessage_work.SetRoomEndTurn, this.SetRoomEndTurn, this)
        oops.message.on(EventMessage_work.SetCardMove, this.SetCardMove, this)
    }
    SetClickCard(event, msg) {
        let ctrls: uigfivectrls = this.node.getComponent(uigfivectrls)
        ctrls.SetOnClickCardDetails(msg)
    }
    SetCtrls() {
        let ctrls: uigfivectrls = this.node.getComponent(uigfivectrls)
        ctrls.SetLeftSteps(gfivemgr.players[userdt.userid].data.team, gfivemgr.leftsteps)
    }
    SetPlayers() {
        if (gfivemgr.players[userdt.userid].data.team % 2 == 1) {
            let gf: UIGfiveView2 = this.node.getComponent(UIGfiveView2)
            gf.mLayout.getComponent(Layout).verticalDirection = Layout.VerticalDirection.BOTTOM_TO_TOP
            gf.mLayout.getComponent(Layout).horizontalDirection = Layout.HorizontalDirection.RIGHT_TO_LEFT
        }
        this.SetCtrls()
    }
    SetRoomActData() {
        let gf: UIGfiveView2 = this.node.getComponent(UIGfiveView2)
        //let actmapkeys = Object.keys(gfivemgr.actmap)

        for (let i = 0; i < gf.mLayout.children.length; i++) {
            let block = gf.mLayout.children[i]
            if (!(i in gfivemgr.actmap)) {
                ViewUtil.remdestoryAllChildren(block)
            }
            else {
                if (!block.children[0]) {
                    let nd = instantiate(gf.mcardfab)
                    nd.setParent(block)

                    nd.getComponent(uigfivecard).setInfo(gfivemgr.actmap[i])
                    if (!nd.getComponent(commonTouchActions)) {
                        this.AddTouchActions(nd, gfivemgr.actmap[i])
                    }

                }
                else {
                    let nd = block.children[0]
                    nd.getComponent(uigfivecard).setInfo(gfivemgr.actmap[i])
                    if (!nd.getComponent(commonTouchActions)) {
                        this.AddTouchActions(nd, gfivemgr.actmap[i])
                    }
                }
            }
        }
        this.SetCtrls()
    }

    SetRoomEndTurn(event, msg) {
        oops.gui.toast(LanguageData.getLangByID("turnend"))
        this.SetCtrls()
    }
    SetCardMove(event, msg) {
        this.SetCtrls()
        let gf: UIGfiveView2 = this.node.getComponent(UIGfiveView2)
        let movenode = gf.mLayout.children[msg.cardpos].children[0]
        movenode.removeFromParent()
        movenode.setParent(gf.mLayout.children[msg.targetpos])
    }



    AddTouchActions(nd: Node, card) {
        if (card.cardid == 1) {
            nd.addComponent(cTouchAction1)
        }
        else {
            nd.addComponent(commonTouchActions)
        }

    }

    onBeforeRemove() {
        oops.message.offAll(this)
    }
}


