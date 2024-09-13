import { _decorator, Component, EventTouch, Node, NodeEventType, Prefab, UITransform, v3, Vec3 } from 'cc';

import { commonTouchActions } from '../common/commonTouchActions';
import { uigfiveblock } from './uigfiveblock';
const { ccclass, property } = _decorator;

@ccclass('UIGfiveView2')
export class UIGfiveView2 extends Component {
    @property(Node)
    mLayout: Node = null
    @property(uigfiveblock)
    mblocks: uigfiveblock[] = []
    @property(Prefab)
    mcardfab: Prefab = null

    mblocksfind = {}



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
    mstartnode = null
    mnodestartcard = null
    mendnode = null
    mnodeendcard = null
    OnTouchStart(ev: EventTouch) {
        let touchPos = ev.getUILocation()
        this.mstartnode = this.getTouchInboot(touchPos)
        this.mnodestartcard = this.mstartnode.children[0]
        if (this.mnodestartcard) {
            let touchactions = this.mnodestartcard.getComponent(commonTouchActions)
            if (touchactions) {
                touchactions.onTouchStart()
            }
        }
    }
    OnTouchMove(ev) {
        if (this.mnodestartcard) {
            let touchactions = this.mnodestartcard.getComponent(commonTouchActions)
            if (touchactions) {
                touchactions.onTouchMove()
            }
        }
    }
    OnTouchEnd(ev) {
        if (!this.mnodestartcard) { return }
        let touchPos = ev.getUILocation()
        this.mendnode = this.getTouchInboot(touchPos)

        if (this.mnodestartcard) {
            let touchactions = this.mnodestartcard.getComponent(commonTouchActions)
            if (touchactions) {
                touchactions.onTouchEnd(ev, this.mendnode)
            }
        }



        if (!this.mendnode) { return }
        this.mnodeendcard = this.mendnode.children[0]
        if (this.mnodeendcard) {
            let touchactions = this.mnodeendcard.getComponent(commonTouchActions)
            if (touchactions) {
                touchactions.onBeEndTouched(ev, this.mnodestartcard)
            }
        }
        // if (this.actionMode == ActionMode.move) {
        //     this.onMoveAction()
        //     //oops.gui.toast("")
        // }
        // else if (this.actionMode == ActionMode.ready) {

        // }

    }
    OnTouchCancel(ev) {
        if (this.mnodestartcard) {
            let touchactions = this.mnodestartcard.getComponent(commonTouchActions)
            if (touchactions) {
                touchactions.onTouchCancel()
            }
        }
        this.mstartnode = null
        this.mendnode = null
        this.mnodestartcard = null
        this.mnodeendcard = null
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


