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
}