import { _decorator, CCFloat, Component, Node } from 'cc';
import { moveplayer } from './moveplayer';
const { ccclass, property } = _decorator;

@ccclass('movemap')
export class movemap extends Component {
    @property(moveplayer)
    mplayer: moveplayer = null
    @property({ type: CCFloat })
    maxtop: number = 0
    @property(CCFloat)
    maxbottom = 0
    @property(CCFloat)
    maxleft = 0
    @property(CCFloat)
    maxright = 0

    start() {

        this.mplayer.init({ top: this.maxtop, bottom: this.maxbottom, left: this.maxleft, right: this.maxright })
        this.node.on(Node.EventType.TOUCH_START, this.mplayer.onTouchStart, this.mplayer)
        this.node.on(Node.EventType.TOUCH_MOVE, this.mplayer.onTouchMove, this.mplayer)
        this.node.on(Node.EventType.TOUCH_END, this.mplayer.onTouchEnd, this.mplayer)
        this.node.on(Node.EventType.TOUCH_CANCEL, this.mplayer.onTouchCancel, this.mplayer)
    }

    update(deltaTime: number) {
        this.mplayer.updatePlayer(deltaTime)
    }
}


