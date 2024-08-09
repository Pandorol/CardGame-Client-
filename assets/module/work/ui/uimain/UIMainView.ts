import { _decorator, Component } from 'cc';
import { oops } from '../../../core/Oops';
import { UIID } from '../UIConfig';
const { ccclass, property } = _decorator;

@ccclass('UIMainView')
export class UIMainView extends Component {
    start() {

        oops.gui.open(UIID.Chat)
    }

    update(deltaTime: number) {

    }
}


