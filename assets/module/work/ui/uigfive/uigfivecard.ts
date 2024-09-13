import { _decorator, color, Component, Label, Sprite } from 'cc';
import { LanguageData } from '../../../libs/gui/language/LanguageData';
import { gfivemgr } from '../../modules/gfive/GfiveMgr';
const { ccclass, property } = _decorator;

@ccclass('uigfivecard')
export class uigfivecard extends Component {
    data: any
    @property(Label)
    mName: Label = null
    @property(Label)
    mHP: Label = null
    @property(Sprite)
    mBG: Sprite = null
    start() {

    }
    setInfo(_dt) {
        this.data = _dt
        this.mName.string = this.data.name
        this.mHP.string = LanguageData.getLangByID("HP") + this.data.hp
        this.SetTeam(gfivemgr.GetTeam(this.data.ownerid))
    }
    SetTeam(team) {
        let colors = [color('#C5B38B'), color('#8BC5C5'), color('#8BA5C5'), color('#A988BB')]
        this.mBG.color = colors[team]
    }
    update(deltaTime: number) {

    }
}


