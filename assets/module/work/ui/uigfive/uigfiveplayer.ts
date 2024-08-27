import { _decorator, v3 } from 'cc';
import { moveplayer } from '../../modules/move/moveplayer';
import { roomsmgr } from '../../modules/room/RoomsMgr';
const { ccclass, property } = _decorator;

@ccclass('uigfiveplayer')
export class uigfiveplayer extends moveplayer {
    start() {

    }

    update(deltaTime: number) {

    }
    curind = 0
    updateinterval: number = 6
    override updatePlayer(dt) {
        if (this.maction.active) {
            let x = this.node.x + this.maction.speed.left + this.maction.speed.right
            let y = this.node.y + this.maction.speed.top + this.maction.speed.bottom
            if (x > this.maxright) { x = this.maxright }
            if (x < this.maxleft) { x = this.maxleft }
            if (y > this.maxtop) { y = this.maxtop }
            if (y < this.maxbottom) { y = this.maxbottom }
            this.node.setPosition(v3(x, y, 0))
            if (this.curind < this.updateinterval) {
                roomsmgr.SendAtPos(x, y)
            }
            else {
                this.curind = 0
            }
        }

    }
}


