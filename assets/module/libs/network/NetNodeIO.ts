import { error } from "cc";
import { Logger } from "../../core/common/log/Logger";
import { CallbackObject, INetworkTips, IProtocolHelper, ISocket, NetData } from "./NetInterface";
import { NetConnectOptions, NetNode, NetNodeState, NetTipsType } from "./NetNode";

/*
*   CocosCreator网络节点基类，以及网络相关接口定义
*   1. 网络连接、断开、请求发送、数据接收等基础功能
*   2. 心跳机制
*   3. 断线重连 + 请求重发
*   4. 调用网络屏蔽层
*/

type ExecuterFunc = (callback: CallbackObject, buffer: NetData) => void;
type CheckFunc = (checkedFunc: VoidFunc) => void;
type VoidFunc = () => void;
type BoolFunc = () => boolean;

var NetNodeStateStrs = ["已关闭", "连接中", "验证中", "可传输数据"];



/** 网络节点 */
export class NetNodeIO extends NetNode {
    protected _connectOptions: NetConnectOptions | null = null;
    protected _isSocketInit: boolean = false;                               // Socket是否初始化过
    protected _isSocketOpen: boolean = false;                               // Socket是否连接成功过
    protected _state: NetNodeState = NetNodeState.Closed;                   // 节点当前状态
    protected _socket: ISocket | null = null;                               // Socket对象（可能是原生socket、websocket、wx.socket...)

    protected _networkTips: INetworkTips | null = null;                     // 网络提示ui对象（请求提示、断线重连提示等）

    protected _connectedCallback: CheckFunc | null = null;                  // 连接完成回调
    protected _disconnectCallback: BoolFunc | null = null;                  // 断线回调
    protected _callbackExecuter: ExecuterFunc | null = null;                // 回调执行

    /********************** 网络相关处理 *********************/
    init(socket: ISocket, protocol: IProtocolHelper = null, networkTips: INetworkTips | null = null, execFunc: ExecuterFunc | null = null) {
        Logger.logNet(`网络初始化`);
        this._socket = socket;
        this._networkTips = networkTips;
    }

    /**
     * 请求连接服务器
     * @param options 连接参数
     */
    connect(options: NetConnectOptions): boolean {
        if (this._socket && this._state == NetNodeState.Closed) {
            if (!this._isSocketInit) {
                this.initSocket();
            }
            this._state = NetNodeState.Connecting;
            if (!this._socket.connect(options)) {
                this.updateNetTips(NetTipsType.Connecting, false);
                return false;
            }
            if (this._connectOptions == null && typeof options.autoReconnect == "number") {
                this._autoReconnect = options.autoReconnect;
            }
            this._connectOptions = options;
            this.updateNetTips(NetTipsType.Connecting, true);
            return true;
        }
        return false;
    }

    protected initSocket() {
        if (this._socket) {
            this._socket.onConnected = (event) => { this.onConnected(event) };
            this._socket.onMessage = (msg) => { this.onMessage(msg) };
            this._socket.onError = (event) => { this.onError(event) };
            this._socket.onClosed = (event) => { this.onClosed(event) };
            this._isSocketInit = true;
        }
    }

    protected updateNetTips(tipsType: NetTipsType, isShow: boolean) {
        if (this._networkTips) {
            if (tipsType == NetTipsType.Requesting) {
                this._networkTips.requestTips(isShow);
            }
            else if (tipsType == NetTipsType.Connecting) {
                this._networkTips.connectTips(isShow);
            }
            else if (tipsType == NetTipsType.ReConnecting) {
                this._networkTips.reconnectTips(isShow);
            }
        }
    }

    /** 网络连接成功 */
    protected onConnected(event: any) {
        Logger.logNet("网络已连接")
        this._isSocketOpen = true;

        this.onChecked();

        Logger.logNet(`网络已连接当前状态为【${NetNodeStateStrs[this._state]}】`);
    }

    /** 连接验证成功，进入工作状态 */
    protected onChecked() {
        Logger.logNet("连接验证成功，进入工作状态");
        this._state = NetNodeState.Working;
        // 关闭连接或重连中的状态显示
        this.updateNetTips(NetTipsType.Connecting, false);
        this.updateNetTips(NetTipsType.ReConnecting, false);

        // 重发待发送信息
        var requests = this._requests.concat();
        if (requests.length > 0) {
            Logger.logNet(`请求【${this._requests.length}】个待发送的信息`);

        }
    }

    /** 接收到一个完整的消息包 */
    protected onMessage(msg: any): void {
        var json = JSON.parse(msg);

    }

    protected onError(event: any) {
        error(event);
    }

    protected onClosed(event: any) {

    }

    /**
     * 断开网络
     * @param code      关闭码
     * @param reason    关闭原因
     */
    close(code?: number, reason?: string) {
        if (this._socket) {
            this._socket.close(code, reason);
        }
        else {
            this._state = NetNodeState.Closed;
        }
    }

    /**
     * 只是关闭Socket套接字（仍然重用缓存与当前状态）
     * @param code      关闭码
     * @param reason    关闭原因
     */
    closeSocket(code?: number, reason?: string) {
        if (this._socket) {
            this._socket.close(code, reason);
        }
    }

    /**
     * 发起请求，如果当前处于重连中，进入缓存列表等待重连完成后发送
     * @param buf       网络数据
     * @param force     是否强制发送
     */
    send(buf: NetData, force: boolean = false): number {
        if (this._state == NetNodeState.Working || force) {
            return this._socket!.send(buf);
        }
        else if (this._state == NetNodeState.Checking ||
            this._state == NetNodeState.Connecting) {
            this._requests.push({
                buffer: buf,
                rspCmd: "",
                rspObject: null
            });
            Logger.logNet(`当前状态为【${NetNodeStateStrs[this._state]}】,繁忙并缓冲发送数据`);
            return 0;
        }
        else {
            error(`当前状态为【${NetNodeStateStrs[this._state]}】,请求错误`);
            return -1;
        }
    }



}