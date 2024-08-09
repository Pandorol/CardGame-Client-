

/**
 * 全局事件监听方法
 * @param event      事件名
 * @param args       事件参数
 */
export type ListenerFunc = (event: string, ...args: any) => void

/** 框架内部全局事件  */
export enum EventMessage {

    GAME_SHOW = "GAME_ENTER",

    GAME_HIDE = "GAME_EXIT",

    GAME_RESIZE = "GAME_RESIZE",

    GAME_FULL_SCREEN = "GAME_FULL_SCREEN",

    GAME_ORIENTATION = "GAME_ORIENTATION"
}
