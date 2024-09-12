import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('uigfivecard')
export class uigfivecard extends Component {
    data: any
    start() {

    }
    setInfo(_dt) {
        this.data = _dt
    }
    update(deltaTime: number) {

    }
}


