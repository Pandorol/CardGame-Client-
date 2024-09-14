import { _decorator, Component, instantiate, Layout } from 'cc';
import { oops } from '../../../core/Oops';
import { ViewUtil } from '../../../core/utils/ViewUtil';
import { LanguageData } from '../../../libs/gui/language/LanguageData';
import { EventMessage_work } from '../../event/EventMessage_work';
import { gfivemgr } from '../../modules/gfive/GfiveMgr';
import { userdt } from '../../modules/user/UserDatas';
import { UIID } from '../UIConfig';
import { addTouchActions } from '../common/addTouchActions';
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
        oops.message.on(EventMessage_work.RefreshAtk2Cards, this.RefreshAtk2Cards, this)
        oops.message.on(EventMessage_work.SetAtkFlag, this.SetAtkFlag, this)
        oops.message.on(EventMessage_work.SetEndAct, this.SetEndAct, this)
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
            if (i == 24) { continue }
            let block = gf.mLayout.children[i]
            if (!(i in gfivemgr.actmap)) {
                ViewUtil.remdestoryAllChildren(block)
            }
            else {
                this.AddOrSetCarrd(block, gfivemgr.actmap[i])

            }
        }
        gf.mCenter.setInfo(gfivemgr.center)
        this.SetCtrls()
    }
    AddOrSetCarrd(blocknode, cardinfo) {
        let gf: UIGfiveView2 = this.node.getComponent(UIGfiveView2)
        if (!blocknode.children[0]) {
            let nd = instantiate(gf.mcardfab)
            nd.setParent(blocknode)

            nd.getComponent(uigfivecard).setInfo(cardinfo)
            if (!nd.getComponent(commonTouchActions)) {
                addTouchActions.AddTouchActions(nd, cardinfo)
            }

        }
        else {
            let nd = blocknode.children[0]
            nd.getComponent(uigfivecard).setInfo(cardinfo)
            if (!nd.getComponent(commonTouchActions)) {
                addTouchActions.AddTouchActions(nd, cardinfo)
            }
        }
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
    RefreshAtk2Cards(event, msg) {
        this.SetCtrls()
        oops.gui.toast(LanguageData.getLangByID("actatk"))

        let gf: UIGfiveView2 = this.node.getComponent(UIGfiveView2)

        if (msg.cardposafter != msg.cardposbefore) {
            ViewUtil.remdestoryAllChildren(gf.mLayout.children[msg.cardposbefore])
        }
        if (msg.targrtposafter != msg.targrtposbefore) {
            ViewUtil.remdestoryAllChildren(gf.mLayout.children[msg.targrtposbefore])
        }

        if (msg.resultatkcard.alive == 0) {
            ViewUtil.remdestoryAllChildren(gf.mLayout.children[msg.cardposafter])
        }
        else {
            this.AddOrSetCarrd(gf.mLayout.children[msg.cardposafter], msg.resultatkcard)
        }

        if (msg.resulttargetcard.alive == 0) {
            ViewUtil.remdestoryAllChildren(gf.mLayout.children[msg.targrtposafter])
        }
        else {
            this.AddOrSetCarrd(gf.mLayout.children[msg.targrtposafter], msg.resulttargetcard)
        }


    }
    SetAtkFlag(event, msg) {
        //msg.cardpos
        this.SetCtrls()
        oops.gui.toast(LanguageData.getLangByID("actflg"))
        let gf: UIGfiveView2 = this.node.getComponent(UIGfiveView2)
        gf.mCenter.setInfo(msg.flagcenter)

    }
    SetEndAct(event, msg) {
        this.onClickClose()
        oops.gui.open(UIID.ActEnd)
    }

    onClickClose() {
        oops.gui.removeByNode(this.node)
    }
    onBeforeRemove() {
        oops.message.offAll(this)
    }
}


