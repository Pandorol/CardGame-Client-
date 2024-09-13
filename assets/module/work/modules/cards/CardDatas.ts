import { oops } from '../../../core/Oops';
import { JsonUtil } from "../../../core/utils/JsonUtil";
import { EventMessage_work } from '../../event/EventMessage_work';

export class CardDatas {
    cards = {}
    mycards
    mydesks
    readycamps = {}
    async Init() {
        oops.message.on(EventMessage_work.LoginDatas, this.RecvLoginDatas, this)

        let cds: any = await JsonUtil.loadAsync("cards")
        for (let i = 0; i < cds.length; i++) {
            this.cards[cds[i].cardid] = cds[i]
        }
        oops.log.logBusiness(this.cards)
        let rds: any = await JsonUtil.loadAsync("readycamps")
        for (let i = 0; i < rds.length; i++) {
            this.readycamps[rds[i].readyid] = rds[i]
        }
        oops.log.logBusiness(this.readycamps)
    }
    RecvLoginDatas(event, msg) {
        this.mydesks = JSON.parse(msg.logindatas.desks)
        this.mycards = new Set(JSON.parse(msg.logindatas.cards))
        oops.message.dispatchEvent(EventMessage_work.LoginDatasSetted)
    }
}
export var cardsmgr: CardDatas = new CardDatas()