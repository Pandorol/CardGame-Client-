import { oops } from '../../../core/Oops';
import { EventMessage_work } from '../../event/EventMessage_work';
import { UIID } from '../../ui/UIConfig';
export enum ActionMode {
    move = 1,
    atk = 2,
    dfs = 3,
    ready = 4,
}
export class GfiveMgr {
    roomid
    players = {}
    owner
    init() {
        oops.message.on(EventMessage_work.UserJoinRoom, this.RecvUserJoinRoom, this)
        oops.message.on(EventMessage_work.ReUserJoinRoom, this.RecvReUserJoinRoom, this)
        oops.message.on(EventMessage_work.RoomDatas, this.RecvRoomDatas, this)
        oops.message.on(EventMessage_work.UserLeaveRoom, this.RecvUserLeaveRoom, this)
        oops.message.on(EventMessage_work.NewOwner, this.NewOwner, this)
        oops.message.on(EventMessage_work.StartAct, this.RecvStartAct, this)
    }
    RecvReUserJoinRoom(cmd, msg) {
        this.players[msg.userid] = msg.player
        oops.message.dispatchEvent(EventMessage_work.SetRoomUsers)
        oops.gui.open(UIID.Gfive)
        oops.gui.remove(UIID.Room)
        oops.gui.remove(UIID.Rooms)
    }
    RecvUserJoinRoom(cmd, msg) {
        this.roomid = msg.roomid
        this.players = msg.players
        this.owner = msg.owner
        oops.message.dispatchEvent(EventMessage_work.SetRoomUsers)
    }
    RecvRoomDatas(cmd, msg) {
        this.roomid = msg.datas.roomid
        this.players = msg.datas.playerList
        this.owner = msg.datas.owner
        oops.message.dispatchEvent(EventMessage_work.SetRoomUsers)
    }
    RecvUserLeaveRoom(cmd, msg) {
        delete this.players[msg.userid]
        oops.message.dispatchEvent(EventMessage_work.SetRoomUsers)
    }
    NewOwner(cmd, msg) {
        this.owner = msg.owner
        oops.message.dispatchEvent(EventMessage_work.SetRoomUsers)
    }
    RecvStartAct(cmd, msg) {

        oops.gui.open(UIID.Gfive2, msg)
        oops.gui.remove(UIID.Room)
        oops.gui.remove(UIID.Rooms)

    }
}
export var gfivemgr: GfiveMgr = new GfiveMgr()