import { Node } from 'cc';
import { cTouchAction1 } from "../cardactions/cTouchAction1";
import { cTouchAction2 } from '../cardactions/cTouchAction2';
import { commonTouchActions } from './commonTouchActions';
export class addTouchActions {
    static AddTouchActions(nd: Node, card) {
        if (card.cardid == 1) {
            nd.addComponent(cTouchAction1)
        }
        else if (card.cardid == 2) {
            nd.addComponent(cTouchAction2)
        }
        else {
            nd.addComponent(commonTouchActions)
        }
    }
}