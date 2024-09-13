import { _decorator, Button, Component, Label } from 'cc';
import { StringUtil } from '../../../core/utils/StringUtil';
import { LanguageData } from '../../../libs/gui/language/LanguageData';
import { GfiveSend } from '../../modules/gfive/GfiveSend';
const { ccclass, property } = _decorator;

@ccclass('uigfivectrls')
export class uigfivectrls extends Component {
    @property(Button)
    mEndTurnBtn: Button = null

    @property(Label)
    mLeftSteps: Label[] = []
    @property(Label)
    mlbDetails: Label = null
    start() {

    }
    SetLeftSteps(team, left) {
        for (let i = 0; i < this.mLeftSteps.length; i++) {
            this.mLeftSteps[i].node.active = false
        }
        this.mLeftSteps[team].node.active = true
        this.mLeftSteps[team].string = LanguageData.getLangByID("leftsteps") + left
    }
    SetOnClickCardDetails(data) {
        this.mlbDetails.string = StringUtil.simpleJstr(JSON.stringify(data))
    }
    SetTurn() {

    }
    onClickEndTurn() {
        GfiveSend.SendEndTurn()
    }
    update(deltaTime: number) {

    }
}


