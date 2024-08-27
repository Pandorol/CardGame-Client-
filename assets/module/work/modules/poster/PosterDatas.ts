import { oops } from '../../../core/Oops';
import { LanguageData } from '../../../libs/gui/language/LanguageData';
import { EventMessage_work } from '../../event/EventMessage_work';
import { HttpRouter } from '../../net/HttpRouter';
import { chatmgr } from '../chat/ChatDatas';
import { userdt } from '../user/UserDatas';
export class PosterDataMgr {
    private _allmessagescacheid = {}
    private _ptstotalNo: number = 0
    private _allpts = []
    private _minidx: number = 99999
    private _maxidx: number = 0
    get allpts() {
        return this._allpts;
    }
    InitMessage() {
        oops.http.post(HttpRouter.getposterlist, (ret) => {
            postersmgr.AddMessage(ret.res)
        }, { page: 0, pagenum: 10 })
    }
    AddMessage(res) {
        if (res.total) {
            this._ptstotalNo = res.total
        }
        if (res.data.length == 0) {
            oops.gui.toast(LanguageData.getLangByID("nomore"))
            return
        }

        for (let i = 0; i < res.data.length; i++) {
            let uid = res.data[i].id
            if (!this._allmessagescacheid[uid]) {
                this._allmessagescacheid[uid] = true
                let idx = this._ptstotalNo - uid
                this._allpts.splice(idx, 0, res.data[i])
                if (uid > this._maxidx) {
                    this._maxidx = uid
                }
                if (uid < this._minidx) {
                    this._minidx = uid
                }
            }
            else {

            }
        }
        oops.message.dispatchEvent(EventMessage_work.PosterAdded)
    }
    EndNew() {
        oops.http.post(HttpRouter.getpostermorebefore, (ret) => {
            postersmgr.AddMessage(ret.res)
        }, { id: this._minidx - 1 })
    }
    TopNew() {
        oops.http.post(HttpRouter.getpostermorenew, (ret) => {
            postersmgr.AddMessage(ret.res)
        }, { id: this._maxidx + 1 })
    }
    PostOne(title: string, des: string) {
        oops.http.post(HttpRouter.uploadposter, (ret) => {
            oops.gui.toast(ret.res.msg)
        }, {
            userid: userdt.userid, username: oops.storage.get("usernickname", "No." + chatmgr.no),
            title: title, description: des
        })
    }
}
export var postersmgr: PosterDataMgr = new PosterDataMgr()