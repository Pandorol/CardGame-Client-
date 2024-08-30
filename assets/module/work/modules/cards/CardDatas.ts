import { oops } from '../../../core/Oops';
import { JsonUtil } from "../../../core/utils/JsonUtil";

export class CardDatas {
    cards = {}
    async Init() {
        let cds = await JsonUtil.loadAsync("cards")
        oops.log.logBusiness(cds)
    }
}
export var cardsmgr: CardDatas = new CardDatas()