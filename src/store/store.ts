/**
 * Вольная реализация хранилища redux.
 * */
import * as types from './types';

interface dataType  {
    context: string,
    users: string,
    peer: any
}
interface Interface {
    actionType: string,
    payload: any
}

let data:dataType = {
    context: '',
    users: '',
    peer: {}
};

function getState():dataType {
    return {...data};
}

function updateState({actionType, payload}: Interface) {
    switch (actionType) {
        case types.USER_CONNECT: {
            data = {
                ...data,
                users: payload,
            };
            break;
        }
        case types.MESSAGE_CONTEXT: {
            data = {
                ...data,
                context: payload,
            };
            break;
        }
        case types.PREV_PEER: {
            data = {
                ...data,
                peer: {
                    ...data.peer,
                    [payload.senderUserId]: payload.peer,
                }

            };
            break;
        }
        default: {
            break;
        }
    }
}

function clearState() {
    data = {
        context: '',
        users: '',
        peer: {}
    };
}

export {clearState, updateState, getState}
