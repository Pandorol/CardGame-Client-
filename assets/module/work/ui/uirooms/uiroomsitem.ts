import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('uiroomsitem')
export class uiroomsitem extends Component {
    @property(Label)
    lbroomname: Label = null
    @property(Label)
    lbroomstatus: Label = null
    @property(Label)
    lbroomcurnums: Label = null
    start() {

    }
    setItem(item: any) {
        this.lbroomname.string = '' + item.roomid
        if (item.acting) {
            this.lbroomstatus.string = 'playing'
        }
        else {
            this.lbroomstatus.string = 'reading'
        }
        this.lbroomcurnums.string = Object.keys(item.playerList).length + '/4'
    }
    update(deltaTime: number) {

    }
}


