import { _decorator, Component, EditBox } from 'cc';
import { oops } from '../../../core/Oops';
import List from '../../../core/utils/List';
import { EventMessage_work } from '../../event/EventMessage_work';
import { postersmgr } from '../../modules/poster/PosterDatas';
import { uiposterItem } from './uiposterItem';
const { ccclass, property } = _decorator;

@ccclass('UIPosterView')
export class UIPosterView extends Component {
    @property(EditBox)
    edittitle: EditBox = null
    @property(EditBox)
    editdesc: EditBox = null
    @property(List)
    list: List = null;
    start() {
        oops.message.on(EventMessage_work.PosterAdded, this.onPosterAdded, this)
        postersmgr.InitMessage()
        this.list.onScrollEnded = this.ListFreshBeforeItem
        this.list.onScrollToped = this.ListFreshNewestItem
    }
    ListFreshBeforeItem() {
        postersmgr.EndNew()
    }
    ListFreshNewestItem() {
        postersmgr.TopNew()
    }
    update(deltaTime: number) {

    }
    onPosterAdded() {
        this.list.numItems = postersmgr.allpts.length
    }
    onListRender(item: any, idx: number) {
        item.getComponent(uiposterItem).setItem(postersmgr.allpts[idx])
    }



    onClickEmit() {
        postersmgr.PostOne(this.edittitle.string, this.editdesc.string)
    }
    onClickClose() {
        oops.gui.removeByNode(this.node)
    }
    onBeforeRemove() {
        oops.message.offAll(this)
    }
}


