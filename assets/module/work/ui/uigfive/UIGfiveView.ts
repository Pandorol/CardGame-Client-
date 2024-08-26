import { _decorator, Component } from 'cc';
import { oops } from '../../../core/Oops';
const { ccclass, property } = _decorator;

@ccclass('UIGfiveView')
export class UIGfiveView extends Component {
    start() {

    }

    update(deltaTime: number) {

    }
    onClickClose() {
        oops.gui.removeByNode(this.node)
    }
}


