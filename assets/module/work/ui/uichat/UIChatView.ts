import { _decorator, Component, EditBox, Label } from 'cc';
import { oops } from '../../../core/Oops';
import List from '../../../core/utils/List';
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
    start() {



        this.list.numItems = chatmgr.allmessages.length;
        oops.message.on(EventMessage_work.ChatMsgAdded, this.ChatMsgAddded, this)
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
        oops.netmgr.send(JSON.stringify({ "message": message }), NetChannelType.Chat)
    }
    update(deltaTime: number) {

    }
}


