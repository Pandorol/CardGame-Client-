import { _decorator, Component } from 'cc';
import { oops } from '../../../core/Oops';
import { UIID } from '../UIConfig';
const { ccclass, property } = _decorator;

@ccclass('UILoginView')
export class UILoginView extends Component {
    start() {
        oops.gui.open(UIID.Main)
        oops.gui.removeByNode(this.node)
    }

    update(deltaTime: number) {

    }
}


