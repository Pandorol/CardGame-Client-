import { _decorator, Button, Component } from 'cc';
import { oops } from '../../../core/Oops';
import { EventMessage_work } from '../../event/EventMessage_work';
import { gfivemgr } from '../../modules/gfive/GfiveMgr';
import { roomsmgr } from '../../modules/room/RoomsMgr';
import { userdt } from '../../modules/user/UserDatas';
import { netChannel } from '../../net/NetChannelManager';
import { uiuseritem } from './uiuseritem';
const { ccclass, property } = _decorator;

@ccclass('UIRoomView')
export class UIRoomView extends Component {
    @property(uiuseritem)
    users: uiuseritem[] = []
    @property(Button)
    btnstart: Button = null
    start() {
        this.SetRoomUsers()
        oops.message.on(EventMessage_work.SetRoomUsers, this.SetRoomUsers, this)
    }
    SetRoomUsers() {
        if (!gfivemgr.players) return
        let keys = Object.keys(gfivemgr.players)

        for (let i = 0; i < this.users.length; i++) {
            this.users[i].node.active = i < keys.length
            if (this.users[i].node.active) {
                let data = gfivemgr.players[keys[i]]
                this.users[i].setitem(JSON.stringify(data, null, 1).replace(/\,|\:|\"|\{|\}/g, ""))
            }

        }
        this.btnstart.node.active = gfivemgr.owner == userdt.userid
    }
    update(deltaTime: number) {


    }
    onBeforeRemove() {
        oops.message.offAll(this)
    }
    onClickClose() {
        netChannel.gfiveClose()
        oops.gui.removeByNode(this.node)
    }
    onClickStart() {
        roomsmgr.SendStartAct()
    }
}


