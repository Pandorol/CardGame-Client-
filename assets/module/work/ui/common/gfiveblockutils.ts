import { uigfiveblock } from "../uigfive/uigfiveblock"

export class gfiveblockutils {
    static getStartEndNodesDis(mstartnode, mendnode) {
        let startdot: uigfiveblock = mstartnode.getComponent(uigfiveblock)
        let enddot: uigfiveblock = mendnode.getComponent(uigfiveblock)
        return Math.abs(startdot.mTagX - enddot.mTagX) + Math.abs(startdot.mTagY - enddot.mTagY)
    }
    static getpos(nd) {
        let dot: uigfiveblock = nd.getComponent(uigfiveblock)
        return dot.mpos
    }
}