import {InterfaceBot} from "./interface";

export const buildWithProp = (handleProcessing: Function, {bot, peer}: InterfaceBot) => {
    return async (param?: string) => {
        return handleProcessing({bot, peer}, param);
    }
};
