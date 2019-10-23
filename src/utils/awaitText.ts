import {randomInteger} from "./microUtils";

const answer = [
    'Подождите...',
    'Подождите',
    'Сейчас',
    'Одно мгновение',
    'Минуту',
    'Сейчас сделаем',
    'Уже иду',
    'Сейчас узнаем',
];

export const getAnswer = ():string => {
    return answer[randomInteger(0, answer.length-1)];
};
