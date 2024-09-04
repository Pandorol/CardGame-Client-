
import { _decorator, Component, EventTouch, Node, NodeEventType, UITransform, v3, Vec3 } from 'cc';
import { UIMoveDot2 } from './UIMoveDot2';
const { ccclass, property } = _decorator;

export enum ActionMode {
    move = 1,
    atk = 2,
    dfs = 3,
    ready = 4,
}
@ccclass('UIMoveTestView2')
export class UIMoveTestView2 extends Component {
    @property(Node)
    mLayout: Node = null
    @property(UIMoveDot2)
    mboots: UIMoveDot2[] = []

    mbootsfind = {}

    actionMode = ActionMode.move
    start() {
        for (let i = 0; i < this.mboots.length; i++) {
            let X = Math.floor(i / 7) + 1
            let Y = Math.floor(i % 7) + 1
            this.mboots[i].mTagX = X
            this.mboots[i].mTagY = Y
            if (!this.mbootsfind[X]) {
                this.mbootsfind[X] = {}
            }
            this.mbootsfind[X][Y] = this.mboots[i]
        }
        this.mLayout.on(NodeEventType.TOUCH_START, this.OnTouchStart, this)
        this.mLayout.on(NodeEventType.TOUCH_MOVE, this.OnTouchMove, this)
        this.mLayout.on(NodeEventType.TOUCH_END, this.OnTouchEnd, this)
        this.mLayout.on(NodeEventType.TOUCH_CANCEL, this.OnTouchCancel, this)
    }



    update(deltaTime: number) {

    }
    startnode = null
    endnode = null
    OnTouchStart(ev: EventTouch) {
        let touchPos = ev.getUILocation()
        this.startnode = this.getTouchInboot(touchPos)
    }
    OnTouchMove(ev) {

    }
    OnTouchEnd(ev) {
        if (!this.startnode) { return }
        let touchPos = ev.getUILocation()
        this.endnode = this.getTouchInboot(touchPos)
        if (!this.endnode) { return }

        if (this.actionMode == ActionMode.move) {
            this.onMoveAction()
            //oops.gui.toast("")
        }
        else if (this.actionMode == ActionMode.ready) {

        }

    }
    onMoveAction() {
        if (this.endnode.children[0]) { return }
        let nd = this.startnode.children[0]
        if (!nd) { return }
        if (this.getStartEndNodesDis() > 1) { return }
        nd.removeFromParent()
        nd.setParent(this.endnode)
    }
    getStartEndNodesDis() {
        let startdot: UIMoveDot2 = this.startnode.getComponent(UIMoveDot2)
        let enddot: UIMoveDot2 = this.endnode.getComponent(UIMoveDot2)
        return Math.abs(startdot.mTagX - enddot.mTagX) + Math.abs(startdot.mTagY - enddot.mTagY)
    }
    OnTouchCancel(ev) {
        this.startnode = null
        this.endnode = null
    }
    getTouchInboot(touchPos) {
        for (let i = 0; i < this.mboots.length; i++) {
            let nd = this.mboots[i].node
            let uiTF: UITransform = nd.getComponent(UITransform);
            let nodePos: Vec3 = uiTF.convertToNodeSpaceAR(v3(touchPos.x, touchPos.y, 0));
            if (nodePos.x > -uiTF.width / 2 && nodePos.y > -uiTF.height / 2 && nodePos.x < uiTF.width / 2 && nodePos.y < uiTF.height / 2) {
                return nd;
            }
        }
        return null
    }
}


