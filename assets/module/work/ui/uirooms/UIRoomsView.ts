import { _decorator, Component, Label } from 'cc';
import { oops } from '../../../core/Oops';
import List from '../../../core/utils/List';
import { EventMessage_work } from '../../event/EventMessage_work';
import { roomsmgr } from '../../modules/room/RoomsMgr';
import { userdt } from '../../modules/user/UserDatas';
import { netChannel } from '../../net/NetChannelManager';
import { UIID } from '../UIConfig';
import { uiroomsitem } from './uiroomsitem';
const { ccclass, property } = _decorator;

@ccclass('UIRoomsView')
export class UIRoomsView extends Component {
    roomlist: any;
    @property(List)
    list: List = null;
    @property(Label)
    lbroomdetail: Label = null
    selectedid: number
    start() {
        oops.message.on(EventMessage_work.RecvRoomList, this.RecvRoomList, this)

        roomsmgr.GetRoomList()
    }
    RecvRoomList(event, msg) {
        this.roomlist = msg.roomList
        this.list.numItems = this.roomlist.length
    }
    onListRender(item: any, idx: number) {
        item.getComponent(uiroomsitem).setItem(this.roomlist[idx])
    }
    onListSelected(item: any, selectedId: number, lastSelectedId: number, val: number) {
        //val,多选时的个数
        this.selectedid = selectedId
        this.lbroomdetail.string = JSON.stringify(this.roomlist[this.selectedid], null, 1).replace(/\,|\:|\"|\{|\}/g, "")

    }
    update(deltaTime: number) {

    }
    onClickedCreate() {
        netChannel.gfiveJoin("roomid" + userdt.userid, userdt.userid)
        oops.gui.open(UIID.Room)
    }
    onClickedJoin() {
        netChannel.gfiveJoin(this.roomlist[this.selectedid].roomid, userdt.userid)
        oops.gui.open(UIID.Room)
    }

    onClickClose() {
        oops.gui.removeByNode(this.node)
    }
    onBeforeRemove() {
        oops.message.offAll(this)
    }
}


