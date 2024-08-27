import { _decorator, Component, EventTouch, v3 } from 'cc';
import { moveaction } from './moveaction';
const { ccclass, property } = _decorator;

@ccclass('moveplayer')
export class moveplayer extends Component {

    maction: moveaction
    maxtop: number
    maxbottom: number
    maxleft: number
    maxright: number
    start() {


    }
    init(border) {
        this.maction = new moveaction()
        this.maxtop = border.top
        this.maxbottom = border.bottom
        this.maxleft = border.left
        this.maxright = border.right
    }
    update(deltaTime: number) {

    }
    onTouchStart(ev: EventTouch) {
        this.maction.active = true
        console.log(ev)
    }
    onTouchMove(ev: EventTouch) {
        let startpos = ev.getStartLocation()
        let curpos = ev.getLocation()
        let ex = curpos.x - startpos.x
        if (ex >= 0) {
            this.maction.speed.left = 0
            if (this.maction.setSpeed.right)
                this.maction.speed.right = this.maction.speedratio * ex
        }
        else {
            this.maction.speed.right = 0
            if (this.maction.setSpeed.left)
                this.maction.speed.left = this.maction.speedratio * ex
        }
        let ey = curpos.y - startpos.y
        if (ey >= 0) {
            this.maction.speed.bottom = 0
            if (this.maction.setSpeed.top)
                this.maction.speed.top = this.maction.speedratio * ey
        }
        else {
            this.maction.speed.top = 0
            if (this.maction.setSpeed.bottom)
                this.maction.speed.bottom = this.maction.speedratio * ey
        }
    }
    onTouchEnd(ev) {
        this.maction.active = false
        for (let i in this.maction.speed) {
            this.maction.speed[i] = 0
        }

    }
    onTouchCancel(ev) {
        this.maction.active = false
        for (let i in this.maction.speed) {
            this.maction.speed[i] = 0
        }

    }
    updatePlayer(dt) {
        if (this.maction.active) {
            let x = this.node.x + this.maction.speed.left + this.maction.speed.right
            let y = this.node.y + this.maction.speed.top + this.maction.speed.bottom
            if (x > this.maxright) { x = this.maxright }
            if (x < this.maxleft) { x = this.maxleft }
            if (y > this.maxtop) { y = this.maxtop }
            if (y < this.maxbottom) { y = this.maxbottom }
            this.node.setPosition(v3(x, y, 0))

        }

    }


}


