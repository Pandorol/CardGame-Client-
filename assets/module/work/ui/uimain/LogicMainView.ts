import { _decorator, Component, Node } from 'cc';
import { oops } from '../../../core/Oops';
import { EventMessage_work } from '../../event/EventMessage_work';
import { cardsmgr } from '../../modules/cards/CardDatas';
import { uicard } from '../common/uicard';
const { ccclass, property } = _decorator;

@ccclass('LogicMainView')
export class LogicMainView extends Component {
    @property(Node)
    mDeskCards: Node[] = []
    start() {
        oops.message.on(EventMessage_work.LoginDatasSetted, this.LoginDatasSetted, this)
    }
    LoginDatasSetted(event, msg) {
        oops.log.logBusiness("recvLoginDatasSetted")
        if (!cardsmgr.mydesks) {
            return
        }
        let cds = cardsmgr.mydesks[0]

        for (let i = 0; i < cds.length; i++) {
            if (cds[i] == 0) {
                this.mDeskCards[i].active = false
            }
            else {
                this.mDeskCards[i].getComponent(uicard).setInfo(cds[i])
            }
        }
    }
    update(deltaTime: number) {

    }
}


