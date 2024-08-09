import { oops } from '../../core/Oops';
import { INetworkTips } from "../../libs/network/NetInterface";

export class NetSimpleTips implements INetworkTips {
    connectTips(isShow: boolean): void {
        oops.log.logNet("connectTips")
    }
    reconnectTips(isShow: boolean): void {
        oops.log.logNet("reconnectTips")
    }
    requestTips(isShow: boolean): void {
        oops.log.logNet("requestTips")
    }
    responseErrorCode(code: number): void {
        oops.log.logNet("responseErrorCode:" + code)
    }

}