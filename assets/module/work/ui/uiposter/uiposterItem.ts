import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('uiposterItem')
export class uiposterItem extends Component {
    @property(Label)
    lbusername: Label = null
    @property(Label)
    lbtitle: Label = null
    @property(Label)
    lbdes: Label = null
    @property(Label)
    lbpublishtime: Label = null
    start() {

    }
    setItem(data: any) {
        this.lbusername.string = data.username
        this.lbtitle.string = data.title
        this.lbdes.string = data.description
        this.lbpublishtime.string = data.publishtime
    }
    update(deltaTime: number) {

    }
}


