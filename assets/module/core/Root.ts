import { _decorator, Component, director, JsonAsset, Node } from 'cc';
import { oops } from './Oops';
import { resLoader } from './common/loader/ResLoader';
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


            // 游戏界面管理
            oops.gui = new LayerManager(this.gui);


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
}


