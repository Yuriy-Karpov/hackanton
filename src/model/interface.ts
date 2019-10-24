import Bot from "@dlghq/dialog-bot-sdk/lib";
import Peer from "@dlghq/dialog-bot-sdk/src/entities/Peer";

export interface InterfaceBot {
    bot: Bot,
    peer: Peer
}
