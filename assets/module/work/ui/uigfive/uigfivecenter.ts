import { _decorator, Component, Label } from 'cc';
import { StringUtil } from '../../../core/utils/StringUtil';
const { ccclass, property } = _decorator;

@ccclass('uigfivecenter')
export class uigfivecenter extends Component {
    @property(Label)
    mlbdesc: Label = null

    data: any
    start() {

    }
    setInfo(_dt: any) {
        this.data = _dt
        this.mlbdesc.string = StringUtil.simpleJstr(JSON.stringify(this.data))
    }
    update(deltaTime: number) {

    }
}


