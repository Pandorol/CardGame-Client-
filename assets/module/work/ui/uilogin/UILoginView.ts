import { _decorator, Component, EditBox } from 'cc';
import { oops } from '../../../core/Oops';
import { HttpRouter } from '../../net/HttpRouter';
import { netChannel } from '../../net/NetChannelManager';
import { UIID } from '../UIConfig';
const { ccclass, property } = _decorator;

@ccclass('UILoginView')
export class UILoginView extends Component {
    @property(EditBox)
    editaccount: EditBox = null;
    @property(EditBox)
    editpas: EditBox = null;
    @property(EditBox)
    editnickname: EditBox = null;
    start() {


    }

    onClickReg() {
        oops.http.addHeader("Content-Type", "application/json")
        oops.http.addHeader("Accept", "*/*")
        oops.http.post(HttpRouter.regist, (res) => {
            oops.gui.toast(res.res.msg)

        }, {
            useraccount: this.editaccount.string,
            userpassword: this.editpas.string,
            usernickname: this.editnickname.string
        })
    }
    onClickLogin() {
        oops.http.addHeader("Content-Type", "application/json")
        oops.http.addHeader("Accept", "*/*")
        oops.http.post(HttpRouter.login, (res) => {
            oops.gui.toast(res.res.msg)
            if (res.res.sucess) {
                oops.config.chaturl = res.res.chaturl
                oops.log.logBusiness([res, oops.config])
                this.onClickOpenMain()
            }
        }, {
            useraccount: this.editaccount.string,
            userpassword: this.editpas.string,
        })
    }
    onClickOpenMain() {
        netChannel.chatCreate()
        netChannel.chatConnect()
        oops.gui.open(UIID.Main)
        oops.gui.removeByNode(this.node)
    }
    update(deltaTime: number) {

    }
}


