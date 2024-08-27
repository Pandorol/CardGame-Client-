import { oops } from '../../../core/Oops';
import { EventMessage_work } from '../../event/EventMessage_work';
import { UIID } from '../../ui/UIConfig';

export class GfiveMgr {
    roomid
    players
    owner
    init() {
        oops.message.on(EventMessage_work.UserJoinRoom, this.RecvUserJoinRoom, this)
        oops.message.on(EventMessage_work.UserLeaveRoom, this.RecvUserLeaveRoom, this)
        oops.message.on(EventMessage_work.NewOwner, this.NewOwner, this)
        oops.message.on(EventMessage_work.StartAct, this.RecvStartAct, this)
    }
    RecvUserJoinRoom(cmd, msg) {
        this.roomid = msg.roomid
        this.players = msg.players
        this.owner = msg.owner
        oops.message.dispatchEvent(EventMessage_work.SetRoomUsers)
        console.log("RecvUserJoinRoom")
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
        if (msg.code == 0) {
            oops.gui.open(UIID.Gfive)
            oops.gui.remove(UIID.Room)
        }
        else {
            oops.log.logBusiness(msg)
            oops.gui.toast("errorcode:" + msg.code)
        }
    }
}
export var gfivemgr: GfiveMgr = new GfiveMgr()