import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('uiuseritem')
export class uiuseritem extends Component {
    @property(Label)
    lbuser: Label = null
    start() {

    }
    setitem(lb: string) {
        this.lbuser.string = lb
    }
    update(deltaTime: number) {

    }
}


