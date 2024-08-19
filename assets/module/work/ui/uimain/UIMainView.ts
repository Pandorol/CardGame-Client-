import { _decorator, Component, Label } from 'cc';
import { oops } from '../../../core/Oops';
import { StorageKeys } from '../../modules/storage/StorageKeys';
import { UIID } from '../UIConfig';
const { ccclass, property } = _decorator;

@ccclass('UIMainView')
export class UIMainView extends Component {
    @property(Label)
    lb_version: Label = null
    start() {
        this.lb_version.string = oops.storage.get(StorageKeys.versionstr, "nothing")
    }
    onClickChatBtn() {
        oops.gui.open(UIID.Chat)
    }
    onClickPostBtn() {
        oops.gui.open(UIID.Poster)
    }
    update(deltaTime: number) {

    }
}


