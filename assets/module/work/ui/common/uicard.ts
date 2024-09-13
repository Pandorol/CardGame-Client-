import { _decorator, Component, Label } from 'cc';
import { cardsmgr } from '../../modules/cards/CardDatas';
const { ccclass, property } = _decorator;

@ccclass('uicard')
export class uicard extends Component {
    @property(Label)
    mName: Label = null

    data: any
    start() {

    }
    setInfo(cardid) {
        this.data = cardsmgr.cards[cardid]
        this.mName.string = this.data.name


    }
    update(deltaTime: number) {

    }
}


