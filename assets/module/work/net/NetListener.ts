import { oops } from '../../core/Oops';
import { EventMessage_work } from '../event/EventMessage_work';


export enum Cmd {
    test1 = 1,
    ChatMsg = 2,
    ChatNumUsers = 3,
    GetRoomlist = 4,
    joinroomsuc = "joinroomsuc",
    leaveroom = "leaveroom",
    rejoinroomsuc = "rejoinroomsuc",
    roomdatas = "roomdatas",
    newOwner = "newOwner",
    startact = "startact",
    endact = "endact",
    getroomlist = "getroomlist",
    readystatus = "readystatus",
    kickpos = "kickpos",
    atpos = "atpos",
}
export class ChatNetListener {
    onMessage(msg) {
        let cmd = msg.cmd;
        console.log(msg)
        switch (cmd) {
            case Cmd.test1:
                oops.message.dispatchEvent(cmd + '', msg)
                break;
            case Cmd.ChatMsg:
                oops.message.dispatchEvent(EventMessage_work.RecvChatMsg, msg)
                break;
            case Cmd.ChatNumUsers:
                oops.message.dispatchEvent(EventMessage_work.RecvChatNumUsers, msg)
                break;
            case Cmd.GetRoomlist:
                oops.message.dispatchEvent(EventMessage_work.RecvRoomList, msg)
                break;
            default:
                break;
        }
    }
}
export class GfiveNetListener {
    onMessage(msg) {
        let cmd = msg.cmd;
        console.log(msg)
        switch (cmd) {
            case Cmd.test1:
                oops.message.dispatchEvent(cmd + '', msg)
                break;
            case Cmd.joinroomsuc:
                oops.message.dispatchEvent(EventMessage_work.UserJoinRoom, msg)
                break;
            case Cmd.leaveroom:
                oops.message.dispatchEvent(EventMessage_work.UserLeaveRoom, msg)
                break;
            case Cmd.startact:
                oops.message.dispatchEvent(EventMessage_work.StartAct, msg)
                break;
            case Cmd.atpos:
                oops.message.dispatchEvent(EventMessage_work.UserAtPos, msg)
                break;
            case Cmd.newOwner:
                oops.message.dispatchEvent(EventMessage_work.NewOwner, msg)
                break;
            default:
                break;
        }
    }
}
export var netListener_chat = new ChatNetListener();
export var netListener_gfive = new GfiveNetListener();