import { _decorator, Component, game, native, sys } from 'cc';
// import * as crypto from 'crypto';
// import * as fs from 'fs';
import { oops } from '../../../core/Oops';
import { UIID } from '../UIConfig';
import { UpdatePanel } from './UpdatePanel';
const { ccclass, property } = _decorator;

@ccclass('UIHotUpView')
export class UIHotUpView extends Component {
    @property(UpdatePanel)
    panel: UpdatePanel = null!;
    private manifest: string = "";
    private storagePath: string = "";
    private assetsMgr: native.AssetsManager = null!;
    private state = UIHotUpView.State.None;
    static State = {
        None: 0,
        Check: 1,
        Update: 2,
    }

    start() {
        if (!sys.isNative) {
            return;
        }


        oops.res.load('project', (err: Error | null, res: any) => {
            if (err) {
                this.panel.info.string = "【热更新界面】缺少热更新配置文件";

                return;
            }
            this.manifest = res.nativeUrl;
            this.storagePath = `${native.fileUtils.getWritablePath()}remote`;
            this.assetsMgr = new native.AssetsManager(this.manifest, this.storagePath, (versionA, versionB) => {
                this.panel.info.string = "【热更新】客户端版本: " + versionA + ', 当前最新版本: ' + versionB;
                let vA = versionA.split('.');
                let vB = versionB.split('.');
                for (let i = 0; i < vA.length; ++i) {
                    let a = parseInt(vA[i]);
                    let b = parseInt(vB[i] || '0');
                    if (a !== b) {
                        return a - b;
                    }
                }

                if (vB.length > vA.length) {
                    return -1;
                }
                else {
                    return 0;
                }
            });

            // 设置验证回调，如果验证通过，则返回true，否则返回false
            this.assetsMgr.setVerifyCallback((path: string, asset: jsb.ManifestAsset) => {
                // 压缩资源时，我们不需要检查其md5，因为zip文件已被删除
                var compressed = asset.compressed;
                // 检索正确的md5值
                var expectedMD5 = asset.md5;
                // 资源路径是相对路径，路径是绝对路径
                var relativePath = asset.path;
                // 资源文件的大小，但此值可能不存在
                var size = asset.size;

                return true;
            });
            var localManifest = this.assetsMgr.getLocalManifest();
            this.panel.info.string = '【热更新】热更资源存放路径: ' + this.storagePath;
            this.panel.info.string = '【热更新】本地资源配置路径: ' + this.manifest;
            this.panel.info.string = '【热更新】本地包地址: ' + localManifest.getPackageUrl();
            this.panel.info.string = '【热更新】远程 project.manifest 地址: ' + localManifest.getManifestFileUrl();
            this.panel.info.string = '【热更新】远程 version.manifest 地址: ' + localManifest.getVersionFileUrl();

            this.checkUpdate();
        })
    }
    // 检查更新
    checkUpdate() {
        this.panel.info.string = ' checkUpdate() ';
        if (!this.assetsMgr) {
            this.panel.info.string = '【热更新】请先初始化';
            return;
        }
        if (this.assetsMgr.getState() === jsb.AssetsManager.State.UNINITED) {
            this.panel.info.string = '【热更新】未初始化';
            return;
        }
        if (!this.assetsMgr.getLocalManifest().isLoaded()) {
            this.panel.info.string = '【热更新】加载本地 manifest 失败 ...';
            return;
        }
        this.assetsMgr.setEventCallback(this.onHotUpdateCallBack.bind(this));
        this.state = UIHotUpView.State.Check;
        // 下载version.manifest，进行版本比对
        this.assetsMgr.checkUpdate();
    }
    private onHotUpdateCallBack(event: native.EventAssetsManager) {
        let code = event.getEventCode();
        switch (code) {
            case native.EventAssetsManager.ALREADY_UP_TO_DATE:
                this.panel.info.string = "【热更新】当前版本与远程版本一致且无须更新";
                this.onClickGotoLogin();
                break;
            case native.EventAssetsManager.NEW_VERSION_FOUND:
                this.panel.info.string = '【热更新】发现新版本,请更新';
                this.onClickUpdate();
                break;
            case native.EventAssetsManager.ASSET_UPDATED:
                this.panel.info.string = '【热更新】资产更新';
                break;
            case native.EventAssetsManager.UPDATE_PROGRESSION:
                if (this.state === UIHotUpView.State.Update) {

                    this.panel.info.string = '【热更新】更新中...';

                    this.panel.byteProgress.progress = event.getPercent();
                    this.panel.fileProgress.progress = event.getPercentByFile();

                    this.panel.fileLabel.string = event.getDownloadedFiles() + ' / ' + event.getTotalFiles();
                    this.panel.byteLabel.string = event.getDownloadedBytes() + ' / ' + event.getTotalBytes();
                }
                break;
            case native.EventAssetsManager.UPDATE_FINISHED:
                this.onUpdateFinished();
                break;
            default:
                this.onUpdateFailed(code);
                break;
        }

    }
    private onUpdateFailed(code: any) {
        this.assetsMgr.setEventCallback(null!)
    }
    private onUpdateFinished() {
        this.assetsMgr.setEventCallback(null!);
        let searchPaths = native.fileUtils.getSearchPaths();
        this.panel.info.string = 'native.fileUtils.getSearchPaths:' + JSON.stringify(searchPaths);
        let newPaths = this.assetsMgr.getLocalManifest().getSearchPaths();
        this.panel.info.string = 'this.assetsMgr.getLocalManifest().getSearchPaths():' + JSON.stringify(newPaths);
        Array.prototype.unshift.apply(searchPaths, newPaths);
        this.panel.info.string = 'native.fileUtils.getSearchPaths:' + JSON.stringify(searchPaths);
        localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
        native.fileUtils.setSearchPaths(searchPaths);

        this.panel.info.string = '【热更新】更新成功';
        ;
        // restart game.
        setTimeout(() => {
            game.restart();
        }, 1000)
    }


    onClickGotoLogin() {
        oops.gui.removeByNode(this.node, true);
        oops.gui.open(UIID.Login);
    }
    onClickUpdate() {
        this.clearHotUpdateStorage();
        this.hotUpdate()
    }
    /** 删除热更所有存储文件 */
    clearHotUpdateStorage() {
        native.fileUtils.removeDirectory(this.storagePath);
    }
    /** 开始更热 */
    hotUpdate() {
        if (!this.assetsMgr) {
            this.panel.info.string = '【热更新】请先初始化';

            return
        }
        this.assetsMgr.setEventCallback(this.onHotUpdateCallBack.bind(this));
        this.state = UIHotUpView.State.Update;
        this.assetsMgr.update();
    }
    update(deltaTime: number) {

    }
}


