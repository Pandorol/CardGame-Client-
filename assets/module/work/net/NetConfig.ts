/** 网络配置 */
class NetConfig {
    public protocol: string = "ws"
    public chatIp: string = "192.168.3.22";
    public chatPort: string = "3000";
    public chaturl: string = "ws://192.168.3.22:3000"
    // public dbid!: number;
    // public sdkUid!: string;
    // public serverId!: number;
    // public sessionKey!: string;
    // public channelid!: number;
}

export var netConfig = new NetConfig();