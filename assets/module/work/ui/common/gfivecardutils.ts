import { ObjectUtil } from "../../../core/utils/ObjectUtil"

export class gfivecardutils {
    static atkcardaction(fromcard, tocard) {
        let rlt = this.calatkcardscore(fromcard, tocard)
        let fcd = ObjectUtil.deepCopy(fromcard)
        let tcd = ObjectUtil.deepCopy(tocard)
        Object.keys(rlt.r_fromcard).forEach((k) => {
            fcd[k] = rlt.r_fromcard[k]
        })
        Object.keys(rlt.r_tocard).forEach((k) => {
            tcd[k] = rlt.r_tocard[k]
        })
        if (fcd.hp <= 0) {
            fcd.alive = 0
        }
        if (tcd.hp <= 0) {
            tcd.alive = 0
        }
        return { resultatkcard: fcd, resulttargetcard: tcd }
    }
    static atkflagaction(fromcard, tocenter) {
        let damage = this.calatkflagscore(fromcard, tocenter)
        return damage
    }
    static calatkcardscore(fromcard, tocard) {
        return { r_fromcard: { hp: fromcard.hp - fromcard.atk + tocard.dfs }, r_tocard: { hp: tocard.hp - tocard.dfs } }
    }
    static calatkflagscore(fromcard, tocenter) {
        return fromcard.atk - tocenter.dfs
    }
}