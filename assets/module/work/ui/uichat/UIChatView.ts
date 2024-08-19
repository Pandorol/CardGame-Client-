import { _decorator, Component, EditBox, Label } from 'cc';
import { oops } from '../../../core/Oops';
import List from '../../../core/utils/List';
import { LanguageLabel } from '../../../libs/gui/language/LanguageLabel';
import { EventMessage_work } from '../../event/EventMessage_work';
import { chatmgr } from '../../modules/chat/ChatDatas';
import { NetChannelType } from '../../net/NetChannelManager';
const { ccclass, property } = _decorator;

@ccclass('UIChatView')
export class UIChatView extends Component {
    @property(List)
    list: List = null;
    @property(EditBox)
    editmessage: EditBox = null;
    @property(LanguageLabel)
    lb_numusers: LanguageLabel = null;
    protected onLoad(): void {
        this.lb_numusers.dataID = "curnumusers"
    }
    start() {

        this.lb_numusers.params = [{ key: "0", value: chatmgr.numusers.toString() }]

        this.list.numItems = chatmgr.allmessages.length;
        oops.message.on(EventMessage_work.ChatMsgAdded, this.ChatMsgAddded, this)
        oops.message.on(EventMessage_work.RecvChatNumUsers, this.RecvChatNumUsers, this)
    }

    RecvChatNumUsers(event, msg) {

        this.lb_numusers.params = [{ key: "0", value: msg.numUsers }]
    }
    ChatMsgAddded() {
        this.list.numItems = chatmgr.allmessages.length;
    }
    onListRender(item: any, idx: number) {
        item.getComponent(Label).string = chatmgr.allmessages[idx].username + ": " + chatmgr.allmessages[idx].message
    }
    onClickEmit() {
        let message = this.editmessage.string
        this.editmessage.string = ''
        let username = oops.storage.get("usernickname", "No." + chatmgr.no)
        oops.netmgr.send({ username: username, message: message, timestamp: new Date().getTime() }, NetChannelType.Chat)
    }
    update(deltaTime: number) {

    }
    onclickClose() {
        oops.gui.removeByNode(this.node)
    }
    onBeforeRemove() {
        oops.message.offAll(this)

    }
}


