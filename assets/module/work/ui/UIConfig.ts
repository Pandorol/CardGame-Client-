import { LayerType, UIConfig } from "../../core/gui/layer/LayerManager";

/** 界面唯一标识（方便服务器通过编号数据触发界面打开） */
export enum UIID {
    /** 资源加载界面 */
    Loading = 1,
    /** 弹窗界面 */
    Window,
    /** 加载与延时提示界面 */
    Netinstable,
    HotUp,
    Login,
    Main,
    Chat,
    Poster,
    Rooms,
    Room,
    Gfive,
    MoveTest,
    ShopCard,
}

/** 打开界面方式的配置数据 */
export var UIConfigData: { [key: number]: UIConfig } = {
    [UIID.Loading]: { layer: LayerType.UI, prefab: "loading/prefab/loading", bundle: "resources" },
    [UIID.Netinstable]: { layer: LayerType.PopUp, prefab: "common/prefab/netinstable" },
    [UIID.Window]: { layer: LayerType.Dialog, prefab: "common/prefab/window" },
    [UIID.HotUp]: { layer: LayerType.UI, prefab: "ui/uihotup/uihotupview" },
    [UIID.Login]: { layer: LayerType.UI, prefab: "ui/uilogin/uiloginview" },
    [UIID.Main]: { layer: LayerType.UI, prefab: "ui/uimain/uimainview" },
    [UIID.Chat]: { layer: LayerType.UI, prefab: "ui/uichat/uichatview" },
    [UIID.Poster]: { layer: LayerType.UI, prefab: "ui/uiposter/uiposterview" },
    [UIID.Rooms]: { layer: LayerType.UI, prefab: "ui/uirooms/uiroomsview" },
    [UIID.Room]: { layer: LayerType.UI, prefab: "ui/uirooms/uiroomview" },
    [UIID.Gfive]: { layer: LayerType.UI, prefab: "ui/uigfive/uigfiveview" },
    [UIID.MoveTest]: { layer: LayerType.UI, prefab: "ui/uimovetest/uimovetestview" },
    [UIID.ShopCard]: { layer: LayerType.UI, prefab: "ui/uishop/uishopcardview" },
}