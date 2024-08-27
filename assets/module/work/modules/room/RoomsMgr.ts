import { netChannel } from "../../net/NetChannelManager"
import { Cmd } from "../../net/NetListener"

export class RoomsMgr {
    GetRoomList() {
        netChannel.chat.send({ cmd: Cmd.GetRoomlist })
    }
    SendStartAct() {
        netChannel.gfive.send({ cmd: Cmd.startact })
    }
    SendAtPos(posx, posy) {
        netChannel.gfive.send({ cmd: Cmd.atpos, x: posx, y: posy })
    }
}
export var roomsmgr: RoomsMgr = new RoomsMgr()