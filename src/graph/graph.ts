import Bot, {Action, ActionEvent, ActionGroup, Button} from "@dlghq/dialog-bot-sdk/lib";
import Peer from "@dlghq/dialog-bot-sdk/src/entities/Peer";
import {
    mesGetJob,
    mesJenkinsBuild,
    mesJenkinsStream,
    messageJenkinsInfo,
    messageOne,
    rootMessage
} from "./messages";
import {ServerListMenuAndHandler} from '../ssh/ServerListBotMenu'
import {buildWithProp} from "./util";
import {InterfaceBot} from "./interface";


export function graphTree({bot, peer}: InterfaceBot) {
    return {
        message: buildWithProp(rootMessage, {bot, peer}),
        children: {
            id_1: {
                message: buildWithProp(messageOne, {bot, peer}),
                children: {
                    id_1_1: {
                        message: buildWithProp(mesJenkinsBuild, {bot, peer}),
                        children: {
                            id_stream: {
                                message: buildWithProp(mesJenkinsStream, {bot, peer})
                            }
                        }
                    },
                    id_1_2: {
                        message: buildWithProp(mesGetJob, {bot, peer})
                    },
                }
            },
            id_2: {
                message: buildWithProp(messageJenkinsInfo, {bot, peer})
                // message: buildWithProp(mesGetJob, {bot, peer})
            },
            shhMenu: ServerListMenuAndHandler({bot,peer})
        },
    }
}

