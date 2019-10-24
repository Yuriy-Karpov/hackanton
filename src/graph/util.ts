import {InterfaceBot} from "./interface";

export const buildWithProp = (handleProcessing: Function, {bot, peer}: InterfaceBot) => {
    return async () => handleProcessing({bot, peer});
};
