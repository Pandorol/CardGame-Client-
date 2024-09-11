import { _decorator, Component, EventTouch, Node, NodeEventType, UITransform, v3, Vec3 } from 'cc';
import { ActionMode } from '../../modules/gfive/GfiveMgr';
import { uigfiveblock } from './uigfiveblock';
const { ccclass, property } = _decorator;

@ccclass('UIGfiveView2')
export class UIGfiveView2 extends Component {
    @property(Node)
    mLayout: Node = null
    @property(uigfiveblock)
    mblocks: uigfiveblock[] = []

    mblocksfind = {}

    actionMode = ActionMode.move

    start() {
        for (let i = 0; i < this.mLayout.children.length; i++) {
            let X = Math.floor(i / 7) + 1
            let Y = Math.floor(i % 7) + 1
            let block = this.mLayout.children[i].getComponent(uigfiveblock)
            block.mTagX = X
            block.mTagY = Y
            block.mpos = i
            if (!this.mblocksfind[X]) {
                this.mblocksfind[X] = {}
            }
            this.mblocksfind[X][Y] = block
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
        if (this.endnode.children[0]) { this.onMoveAtkAction(); return }
        let nd = this.startnode.children[0]
        if (!nd) { return }
        if (this.getStartEndNodesDis() > 1) { return }


        //nd.removeFromParent()
        //nd.setParent(this.endnode)
    }
    onMoveAtkAction() {

    }
    getStartEndNodesDis() {
        let startdot: uigfiveblock = this.startnode.getComponent(uigfiveblock)
        let enddot: uigfiveblock = this.endnode.getComponent(uigfiveblock)
        return Math.abs(startdot.mTagX - enddot.mTagX) + Math.abs(startdot.mTagY - enddot.mTagY)
    }
    OnTouchCancel(ev) {
        this.startnode = null
        this.endnode = null
    }
    getTouchInboot(touchPos) {
        for (let i = 0; i < this.mLayout.children.length; i++) {
            let nd = this.mLayout.children[i]
            let uiTF: UITransform = nd.getComponent(UITransform);
            let nodePos: Vec3 = uiTF.convertToNodeSpaceAR(v3(touchPos.x, touchPos.y, 0));
            if (nodePos.x > -uiTF.width / 2 && nodePos.y > -uiTF.height / 2 && nodePos.x < uiTF.width / 2 && nodePos.y < uiTF.height / 2) {
                return nd;
            }
        }
        return null
    }
}


