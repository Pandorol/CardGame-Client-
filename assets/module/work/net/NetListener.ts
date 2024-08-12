import { oops } from '../../core/Oops';
import { EventMessage_work } from '../event/EventMessage_work';


export enum Cmd {
    test1 = 1,
    ChatMsg = 2,
}
export class ChatNetListener {
    onMessage(msg) {
        let cmd = msg.cmd;
        console.log(msg)
        switch (cmd) {
            case Cmd.test1:
                oops.message.dispatchEvent(cmd + '', msg)
                break;
            case Cmd.ChatMsg:
                oops.message.dispatchEvent(EventMessage_work.RecvChatMsg, msg)
                break;
            default:
                break;
        }
    }
}
export var netListener_chat = new ChatNetListener();