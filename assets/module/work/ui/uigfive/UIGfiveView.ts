import { _decorator, Component, Node, v3 } from 'cc';
import { oops } from '../../../core/Oops';
import { EventMessage_work } from '../../event/EventMessage_work';
import { gfivemgr } from '../../modules/gfive/GfiveMgr';
import { userdt } from '../../modules/user/UserDatas';
const { ccclass, property } = _decorator;

@ccclass('UIGfiveView')
export class UIGfiveView extends Component {
    players = {}
    @property(Node)
    mineplayer: Node = null
    @property(Node)
    mplayers: Node[] = []

    start() {
        this.InitPlayers()
        oops.message.on(EventMessage_work.UserAtPos, this.SetUserPos, this)
        oops.message.on(EventMessage_work.SetRoomUsers, this.InitPlayers, this)
    }
    InitPlayers() {
        this.players[userdt.userid] = this.mineplayer
        Object.keys(gfivemgr.players).forEach((id, index) => {
            if (id != userdt.userid) {
                this.players[id] = this.mplayers[index]
                this.players[id].active = true
            }
        })
    }
    SetUserPos(event, msg) {
        this.players[msg.userid].position = v3(msg.atpos.x, msg.atpos.y, 0)
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


