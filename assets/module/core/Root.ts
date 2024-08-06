import { _decorator, Component, director, game, JsonAsset, Node } from 'cc';
import { oops } from './Oops';
import { AudioManager } from './common/audio/AudioManager';
import { EventMessage } from './common/event/EventMessage';
import { message } from './common/event/MessageManager';
import { resLoader } from './common/loader/ResLoader';
import { StorageManager } from "./common/storage/StorageManager";
import { TimerManager } from './common/timer/TimerManager';
import { GUI } from './gui/GUI';
import { LayerManager } from './gui/layer/LayerManager';
const { ccclass, property } = _decorator;


var isInited = false;
/** 框架显示层根节点 */
export class Root extends Component {

    @property({
        type: Node,
        tooltip: "游戏层"
    })
    game: Node = null!;            // 可使用多摄像机自定义二维或三维游戏场景


    @property({
        type: Node,
        tooltip: "界面层"
    })
    gui: Node = null!;

    /** 常驻根节点 */
    private persistRootNode: Node = null!

    onLoad(): void {
        if (!isInited) {
            isInited = true;      // 注：这里是规避cc3.8在编辑器模式下运行时，关闭游戏会两次初始化报错
            this.enabled = false;
            this.loadConfig();
        }
    }
    private async loadConfig() {
        this.persistRootNode = new Node("PersistRootNode");
        director.addPersistRootNode(this.persistRootNode);
        // 资源管理模块
        oops.res = resLoader;

        const config_name = "config";
        const config = await oops.res.loadAsync(config_name, JsonAsset);
        if (config) {
            // oops.config.btc = new BuildTimeConstants();
            // oops.config.query = new GameQueryConfig();
            // oops.config.game = new GameConfig(config);

            // // 本地存储模块
            oops.storage = new StorageManager();
            oops.storage.init("a", "b");
            //oops.storage.init(oops.config.game.localDataKey, oops.config.game.localDataIv);      // 初始化本地存储加密

            // 全局消息
            oops.message = message;

            // 创建音频模块
            oops.audio = this.persistRootNode.addComponent(AudioManager);
            oops.audio.load();

            // 创建时间模块
            oops.timer = this.persistRootNode.addComponent(TimerManager)!;

            // 游戏场景管理
            //oops.game = new GameManager(this.game);

            // 游戏界面管理
            oops.gui = new LayerManager(this.gui);

            // 网络模块
            // oops.http.server = oops.config.game.httpServer;                                      // Http 服务器地址
            // oops.http.timeout = oops.config.game.httpTimeout;                                    // Http 请求超时时间

            //game.frameRate = oops.config.game.frameRate;                                         // 初始化每秒传输帧数

            this.enabled = true;
            this.init();
            this.run();

            oops.res.release(config_name);
        }
        else {
            this.loadConfig();
        }
    }



    /** 加载完引擎配置文件后执行 */
    protected run() {

    }

    protected init() {



        // 添加游戏界面屏幕自适应管理组件
        this.gui.addComponent(GUI)!;
    }
    start() {

    }

    update(deltaTime: number) {

    }
    private onShow() {
        oops.timer.load();              // 处理回到游戏时减去逝去时间
        oops.audio.resumeAll();         // 恢复所有暂停的音乐播放
        director.resume();              // 恢复暂停场景的游戏逻辑，如果当前场景没有暂停将没任何事情发生
        game.resume();                  // 恢复游戏主循环。包含：游戏逻辑，渲染，事件处理，背景音乐和所有音效
        oops.message.dispatchEvent(EventMessage.GAME_SHOW);
    }

    private onHide() {
        oops.timer.save();             // 处理切到后台后记录切出时间
        oops.audio.pauseAll();         // 暂停所有音乐播放
        director.pause();              // 暂停正在运行的场景，该暂停只会停止游戏逻辑执行，但是不会停止渲染和 UI 响应。 如果想要更彻底得暂停游戏，包含渲染，音频和事件
        game.pause();                  // 暂停游戏主循环。包含：游戏逻辑、渲染、输入事件派发（Web 和小游戏平台除外）
        oops.message.dispatchEvent(EventMessage.GAME_HIDE);
    }
}


