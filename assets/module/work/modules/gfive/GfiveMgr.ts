import { oops } from '../../../core/Oops';
import { EventMessage_work } from '../../event/EventMessage_work';
import { netChannel } from '../../net/NetChannelManager';
import { Cmd } from '../../net/NetListener';
import { UIID } from '../../ui/UIConfig';
import { cardsmgr } from '../cards/CardDatas';
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
    actmap = {}
    center = {}
    turn = 0
    sumturn = 0
    leftsteps = 0

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
        if (msg.roomdata.actdata) {
            this.SetRoomActData(msg)
        }
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

        oops.gui.open(UIID.Gfive2)
        oops.gui.remove(UIID.Room)
        oops.gui.remove(UIID.Rooms)

        this.roomid = msg.roomdata.roomid
        this.players = msg.roomdata.playerList
        this.owner = msg.roomdata.owner
        this.SetRoomActData(msg)
    }
    SetRoomActData(msg) {
        this.turn = msg.roomdata.actdata.turn
        this.sumturn = msg.roomdata.actdata.sumturn
        this.leftsteps = msg.roomdata.actdata.leftsteps
        this.center = msg.roomdata.actdata.center
        this.actmap = msg.roomdata.actdata.actmap
        Object.values(this.actmap).forEach((card: any) => {
            let cardid = card.cardid
            if (cardid) {
                Object.keys(cardsmgr.cards[cardid]).forEach((key) => {
                    card[key] = cardsmgr.cards[cardid][key]
                })
            }
        })
        oops.log.logBusiness(this.actmap)
    }

    SendMove(coststep, cardpos, targetpos) {
        netChannel.chat.send({
            cmd: Cmd.cardmove,
            coststep: coststep,
            cardpos: cardpos,
            targetpos: targetpos,
        })
    }





}
export var gfivemgr: GfiveMgr = new GfiveMgr()