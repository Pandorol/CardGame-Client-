import { netChannel } from "../../net/NetChannelManager";
import { Cmd } from "../../net/NetListener";

export class GfiveSend {
    static SendMove(coststep, cardpos, targetpos) {
        netChannel.gfive.send({
            cmd: Cmd.cardmove,
            coststep: coststep,
            cardpos: cardpos,
            targetpos: targetpos,
        })
    }
    static SendEndTurn() {
        netChannel.gfive.send({
            cmd: Cmd.endturn
        })
    }
    static SendAtkCard(coststep, cardposbefore, cardposafter, targrtposbefore, targrtposafter, resultatkcard, resulttargetcard) {
        netChannel.gfive.send({
            cmd: Cmd.actatkcard,
            coststep: coststep,
            cardposbefore: cardposbefore,
            cardposafter: cardposafter,
            targrtposbefore: targrtposbefore,
            targrtposafter: targrtposafter,
            resultatkcard: resultatkcard,
            resulttargetcard: resulttargetcard
        })
    }
    static SendAtkCenter(coststep, cardpos, atkscore) {
        netChannel.gfive.send({
            cmd: Cmd.actatkflag,
            coststep: coststep,
            cardpos: cardpos,
            atkscore: atkscore
        })
    }
}