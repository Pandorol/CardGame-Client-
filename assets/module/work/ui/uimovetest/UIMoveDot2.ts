import { _decorator, CCInteger, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIMoveDot2')
export class UIMoveDot2 extends Component {
    @property(CCInteger)
    mTagX = 0
    @property(CCInteger)
    mTagY = 0
    start() {

    }

    update(deltaTime: number) {

    }
}


