import { _decorator, CCFloat, v3 } from 'cc';
import JoyPlayer from '../../modules/Joys/JoyPlayer';
import { SpeedType } from '../../modules/Joys/Joystick';
import { roomsmgr } from '../../modules/room/RoomsMgr';
const { ccclass, property } = _decorator;

@ccclass('uigfiveplayer')
export class uigfiveplayer extends JoyPlayer {
    @property({ type: CCFloat })
    maxtop: number = 0
    @property(CCFloat)
    maxbottom = 0
    @property(CCFloat)
    maxleft = 0
    @property(CCFloat)
    maxright = 0
    start() {

    }


    curind = 0
    updateinterval: number = 4
    stopset = false
    override update(dt) {
        this.curind += 1
        if (this._speedType !== SpeedType.STOP) {
            this.stopset = false
            this.move();
            let x = this.node.x
            let y = this.node.y
            if (x > this.maxright) { x = this.maxright }
            if (x < this.maxleft) { x = this.maxleft }
            if (y > this.maxtop) { y = this.maxtop }
            if (y < this.maxbottom) { y = this.maxbottom }
            this.node.setPosition(v3(x, y, 0))
            if (this.curind > this.updateinterval) {
                roomsmgr.SendAtPos(x, y)
                this.curind = 0
            }
            else {

            }
        }
        else if (this._speedType == SpeedType.STOP && !this.stopset) {
            this.stopset = true
            roomsmgr.SendAtPos(this.node.x, this.node.y)
        }

    }
}


