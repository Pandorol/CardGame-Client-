import { oops } from '../../../core/Oops';
import { EventMessage_work } from '../../event/EventMessage_work';
import { UIID } from '../../ui/UIConfig';
import { cardsmgr } from '../cards/CardDatas';
import { userdt } from '../user/UserDatas';

export class GfiveMgr {
    //3部分，数据，数据方法，消息过渡
    roomid
    players = {}
    owner
    actmap = {}
    center = {}
    turn = 0
    sumturn = 0
    leftsteps = 0

    IsMyTurn() {
        if (this.players[userdt.userid].data.team == this.turn) {
            return true
        }
        return false
    }
    GetTeam(userid) {
        return this.players[userid].data.team
    }




    init() {
        oops.message.on(EventMessage_work.UserJoinRoom, this.RecvUserJoinRoom, this)
        oops.message.on(EventMessage_work.ReUserJoinRoom, this.RecvReUserJoinRoom, this)
        oops.message.on(EventMessage_work.RoomDatas, this.RecvRoomDatas, this)
        oops.message.on(EventMessage_work.UserLeaveRoom, this.RecvUserLeaveRoom, this)
        oops.message.on(EventMessage_work.NewOwner, this.NewOwner, this)
        oops.message.on(EventMessage_work.StartAct, this.RecvStartAct, this)
        oops.message.on(EventMessage_work.EndTurn, this.RecvEndTurn, this)
        oops.message.on(EventMessage_work.CardMove, this.RecvCardMove, this)
    }
    RecvReUserJoinRoom(cmd, msg) {
        this.players[msg.userid] = msg.player
        oops.message.dispatchEvent(EventMessage_work.SetRoomUsers)
        oops.gui.open(UIID.Gfive2)
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
        this.roomid = msg.roomdatas.roomid
        this.players = msg.roomdatas.playerList
        this.owner = msg.roomdatas.owner
        if (Object.keys(msg.roomdatas.actdata).length > 0) {
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

        this.roomid = msg.roomdatas.roomid
        this.players = msg.roomdatas.playerList
        this.owner = msg.roomdatas.owner
        this.SetRoomActData(msg)
    }
    SetRoomActData(msg) {
        this.turn = msg.roomdatas.actdata.turn
        this.sumturn = msg.roomdatas.actdata.sumturn
        this.leftsteps = msg.roomdatas.actdata.leftsteps
        this.center = msg.roomdatas.actdata.center
        this.actmap = msg.roomdatas.actdata.actmap
        Object.values(this.actmap).forEach((card: any) => {
            let cardid = card.cardid
            if (cardid) {
                Object.keys(cardsmgr.cards[cardid]).forEach((key) => {
                    if (!(key in card)) {
                        card[key] = cardsmgr.cards[cardid][key]
                    }
                })
            }
        })
        oops.log.logBusiness(this.actmap)
        oops.message.dispatchEvent(EventMessage_work.SetRoomActData)
    }
    RecvEndTurn(cmd, msg) {
        this.turn = msg.turn
        this.sumturn = msg.sumturn
        this.leftsteps = msg.leftsteps
        oops.message.dispatchEvent(EventMessage_work.SetRoomEndTurn)
    }
    RecvCardMove(cmd, msg) {
        this.turn = msg.turn
        this.leftsteps = msg.leftsteps
        this.actmap[msg.targetpos] = this.actmap[msg.cardpos]
        delete this.actmap[msg.cardpos]
        oops.message.dispatchEvent(EventMessage_work.SetCardMove, msg)
    }

}
export var gfivemgr: GfiveMgr = new GfiveMgr()