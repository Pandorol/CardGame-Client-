import { _decorator, CCInteger, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('uigfiveblock')
export class uigfiveblock extends Component {
    @property(CCInteger)
    mTagX = 0
    @property(CCInteger)
    mTagY = 0

    mpos = 0
    start() {

    }

    update(deltaTime: number) {

    }
}


