import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact } from 'cc';
import { moveplayer } from './moveplayer';
const { ccclass, property } = _decorator;

@ccclass('wall')
export class wall extends Component {
    start() {
        // 注册单个碰撞体的回调函数
        let collider = this.node.getComponent(Collider2D);
        if (collider) {
            console.log("moveplayercollider")
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
            collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
            collider.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        console.log('onBeginContact');
        let action = otherCollider.node.getComponent(moveplayer).maction
        switch (otherCollider.tag) {
            case 1:
                action.setSpeed.top = false
                action.speed.top = 0
                break
            case 2:
                action.setSpeed.bottom = false
                action.speed.bottom = 0
                break
            case 3:
                action.setSpeed.left = false
                action.speed.left = 0
                break
            case 4:
                action.setSpeed.right = false
                action.speed.right = 0
                break
        }
    }
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体结束接触时被调用一次
        console.log('onEndContact');
        let action = otherCollider.node.getComponent(moveplayer).maction
        for (let i in action.setSpeed) {
            action.setSpeed[i] = true
        }
    }
    onPreSolve(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 每次将要处理碰撞体接触逻辑时被调用
        //console.log('onPreSolve');


    }
    onPostSolve(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 每次处理完碰撞体接触逻辑时被调用
        // console.log('onPostSolve');

    }
}


