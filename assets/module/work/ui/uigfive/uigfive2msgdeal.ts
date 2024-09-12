import { _decorator, Component, instantiate } from 'cc';
import { oops } from '../../../core/Oops';
import { ViewUtil } from '../../../core/utils/ViewUtil';
import { EventMessage_work } from '../../event/EventMessage_work';
import { gfivemgr } from '../../modules/gfive/GfiveMgr';
import { UIGfiveView2 } from './UIGfiveView2';
import { uigfivecard } from './uigfivecard';
const { ccclass, property } = _decorator;

@ccclass('uigfive2msgdeal')
export class uigfive2msgdeal extends Component {

    start() {
        this.SetRoomActData()
        oops.message.on(EventMessage_work.SetRoomActData, this.SetRoomActData, this)
    }
    SetRoomActData() {
        let gf: UIGfiveView2 = this.node.getComponent(UIGfiveView2)
        //let actmapkeys = Object.keys(gfivemgr.actmap)

        for (let i = 0; i < gf.mLayout.children.length; i++) {
            let block = gf.mLayout.children[i]
            if (!(i in gfivemgr.actmap)) {
                ViewUtil.remdestoryAllChildren(block)
            }
            else {
                if (!block.children[0]) {
                    let nd = instantiate(gf.mcardfab)
                    nd.setParent(block)

                    nd.getComponent(uigfivecard).setInfo(gfivemgr.actmap[i])
                }
                else {
                    let nd = block.children[0]
                    nd.getComponent(uigfivecard).setInfo(gfivemgr.actmap[i])
                }
            }
        }



    }

    onBeforeRemove() {
        oops.message.offAll(this)
    }
}


