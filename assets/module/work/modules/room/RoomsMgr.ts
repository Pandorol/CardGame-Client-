import { netChannel } from "../../net/NetChannelManager"
import { Cmd } from "../../net/NetListener"

export class RoomsMgr {
    GetRoomList() {
        netChannel.chat.send({ cmd: Cmd.GetRoomlist })
    }

}
export var roomsmgr: RoomsMgr = new RoomsMgr()