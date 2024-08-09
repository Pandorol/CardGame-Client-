import { _decorator, Component } from 'cc';
import { oops } from '../../../core/Oops';
import { netChannel } from '../../net/NetChannelManager';
import { UIID } from '../UIConfig';
const { ccclass, property } = _decorator;

@ccclass('UILoginView')
export class UILoginView extends Component {
    start() {
        this.OpenMain()
    }
    OpenMain() {
        oops.gui.open(UIID.Main)
        oops.gui.removeByNode(this.node)
        netChannel.chatCreate()
        netChannel.chatConnect()
    }
    update(deltaTime: number) {

    }
}


