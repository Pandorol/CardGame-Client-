import { _decorator, Component, Label } from 'cc';
import { oops } from '../../../core/Oops';
import List from '../../../core/utils/List';
import { EventMessage_work } from '../../event/EventMessage_work';
import { roomsmgr } from '../../modules/room/RoomsMgr';
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
        this.lbroomdetail.string = JSON.stringify(this.roomlist[selectedId], null, 1).replace(/\,|\:|\"|\{|\}/g, "")

    }
    update(deltaTime: number) {

    }
    onClickedCreate() {

    }
    onClickedJoin() {

    }
    onClickClose() {
        oops.gui.removeByNode(this.node)
    }
}


