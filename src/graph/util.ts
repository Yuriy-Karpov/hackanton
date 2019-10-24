import Bot from "@dlghq/dialog-bot-sdk/lib";
import Peer from "@dlghq/dialog-bot-sdk/src/entities/Peer";
import {InterfaceBot} from "./interface";

export const buildWithProp = (handleProcessing: Function, {bot, peer}: InterfaceBot) => {
    return async () => handleProcessing({bot, peer});
};