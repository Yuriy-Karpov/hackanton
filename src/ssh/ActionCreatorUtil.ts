import {Action, ActionGroup, Button} from "@dlghq/dialog-bot-sdk/lib";

export const createAction = (name: string): Action =>
    Action.create({
        id: name,
        widget: Button.create({label: name})
    });

export const createActionGroup = (prefix:string, actionNames: string[]): ActionGroup =>
    ActionGroup.create({actions: actionNames.map(actionName => createAction(actionName))});