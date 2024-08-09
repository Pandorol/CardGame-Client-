import { oops } from '../../../core/Oops';
import { StringUtil } from "../../../core/utils/StringUtil";
import { Cmd } from "../../net/NetListener";
import { StorageKeys } from '../storage/StorageKeys';

export class OneChatMessage {
    userid: string
    username: string
    message: string
    time: string

}
var MaxChatNum: number = 200
export class ChatMessageMgr {
    private _allmessages: OneChatMessage[] = []
    get allmessages() {
        return this._allmessages;
    }
    constructor() {

    }
    init() {
        this._allmessages = this.StoragePrase()

        oops.message.on(Cmd.ChatMsg.toString(), this.RecvMsg, this)
    }
    RecvMsg(cmd, msg) {
        let o = new OneChatMessage()
        o.userid = msg.userid ? msg.userid : ''
        o.username = msg.username ? msg.username : ''
        o.message = msg.message ? msg.message : ''
        o.time = StringUtil.format(new Date(), "yyyy-MM-dd hh:mm")
        this._allmessages.push(o)
        oops.message.dispatchEvent(Cmd.ChatMsgAdded.toString())
    }
    StoragePrase() {
        let all = []
        let jstr = oops.storage.getJson(StorageKeys.chathistorys, [])
        if (jstr.length) {
            for (let i = 0; i < jstr.length; i++) {
                let msg = jstr[i]
                let o = new OneChatMessage()
                o.userid = msg.userid ? msg.userid : ''
                o.username = msg.username ? msg.username : ''
                o.message = msg.message ? msg.message : ''
                o.time = msg.time ? msg.time : ''
                all.push()
            }
        }

        return all;
    }
}
export var chatmgr: ChatMessageMgr = new ChatMessageMgr()