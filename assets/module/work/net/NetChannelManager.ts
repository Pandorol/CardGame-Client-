import { oops } from '../../core/Oops';
import { WebSimpleIO } from "../../libs/network/WebSimpleIO";
import { chatmgr } from '../modules/chat/ChatDatas';
import { gfivemgr } from '../modules/gfive/GfiveMgr';
import { netListener_chat } from './NetListener';

export enum NetChannelType {

    Chat = 0,
}
export class NetChannelManager {
    public chat: WebSimpleIO;
    public gfive: WebSimpleIO;
    chatCreate() {
        if (!this.chat) {
            this.chat = new WebSimpleIO();
            chatmgr.init()
        }
        oops.netmgr.setNetNode(this.chat, NetChannelType.Chat)
        this.chat.onMessage = (msg) => { netListener_chat.onMessage(msg); }
    }
    chatConnect() {
        oops.netmgr.connect({ url: oops.config.chaturl }, NetChannelType.Chat)
    }
    chatClose() {
        oops.netmgr.close(NetChannelType.Chat)
    }

    gfiveCreate() {
        if (!this.gfive) {
            this.gfive = new WebSimpleIO();
            gfivemgr.init()
        }
    }

}

export var netChannel = new NetChannelManager();