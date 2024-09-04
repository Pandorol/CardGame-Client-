import { _decorator, Component, Label } from 'cc';
import { oops } from '../../../core/Oops';
import { chatmgr } from '../../modules/chat/ChatDatas';
import { StorageKeys } from '../../modules/storage/StorageKeys';
import { Cmd } from '../../net/NetListener';
import { UIID } from '../UIConfig';
const { ccclass, property } = _decorator;

@ccclass('UIMainView')
export class UIMainView extends Component {
    @property(Label)
    lb_version: Label = null
    start() {
        this.lb_version.string = oops.storage.get(StorageKeys.versionstr, "nothing")
        //this.onClickTestBtn()
    }
    onClickChatBtn() {
        oops.gui.open(UIID.Chat)
    }
    onClickPostBtn() {
        oops.gui.open(UIID.Poster)
    }
    onClickRoomsBtn() {
        oops.gui.open(UIID.Rooms)
        chatmgr.SendMsg({ cmd: Cmd.GetIsAct })
    }
    update(deltaTime: number) {

    }
    onClickTestBtn() {
        oops.gui.open(UIID.MoveTest)
    }
    onClickTest2Btn() {
        oops.gui.open(UIID.MoveTest2)
    }
    onClickShopCard() {
        oops.gui.open(UIID.ShopCard)
    }
}


