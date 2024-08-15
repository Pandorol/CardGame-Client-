import { oops } from '../../../core/Oops';
import { StringUtil } from "../../../core/utils/StringUtil";
import { EventMessage_work } from '../../event/EventMessage_work';
import { StorageKeys } from '../storage/StorageKeys';

export class OneChatMessage {
    userid: string
    username: string
    message: string
    time: string

}
var MaxChatNum: number = 200
export class ChatMessageMgr {
    private _numusers: number = 0
    get numusers() {
        return this._numusers
    }
    private _allmessages: OneChatMessage[] = []
    get allmessages() {
        return this._allmessages;
    }
    constructor() {

    }
    init() {
        this._allmessages = this.StoragePrase()

        oops.message.on(EventMessage_work.RecvChatMsg, this.RecvMsg, this)
        oops.message.on(EventMessage_work.RecvChatNumUsers, this.RecvChatNumUsers, this)
    }
    RecvChatNumUsers(event, msg) {
        this._numusers = msg.numUsers
    }
    RecvMsg(cmd, msg) {
        let o = new OneChatMessage()
        o.userid = msg.userid ? msg.userid : ''
        o.username = msg.username ? msg.username : ''
        o.message = msg.message ? msg.message : ''
        o.time = StringUtil.format(new Date(), "yyyy-MM-dd hh:mm")
        this._allmessages.push(o)
        oops.message.dispatchEvent(EventMessage_work.ChatMsgAdded.toString())
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