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
        this.editaccount.string = oops.storage.get("useraccount", "")
        this.editpas.string = oops.storage.get("userpassword", "")
        this.editnickname.string = oops.storage.get("usernickname", "")
    }

    onClickReg() {

        oops.http.post(HttpRouter.regist, (res) => {
            oops.gui.toast(res.res.msg)

        }, {
            useraccount: this.editaccount.string,
            userpassword: this.editpas.string,
            usernickname: this.editnickname.string
        })
    }
    onClickLogin() {

        oops.http.post(HttpRouter.login, (res) => {
            oops.gui.toast(res.res.msg)
            if (res.res.sucess) {
                if (res.res.chaturl) {
                    oops.config.chaturl = res.res.chaturl
                }
                oops.storage.set("useraccount", this.editaccount.string)
                oops.storage.set("userpassword", this.editpas.string)
                if (this.editnickname.string.length > 0) {
                    oops.storage.set("usernickname", this.editnickname.string)
                }

                oops.storage.set("userid", res.res.userid || 0)
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


