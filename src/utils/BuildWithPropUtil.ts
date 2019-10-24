import {InterfaceBot} from "../model/interface";

export const buildWithProp = (handleProcessing: Function, {bot, peer}: InterfaceBot) => {
    return async (param?: string) => handleProcessing({bot, peer}, param);
};