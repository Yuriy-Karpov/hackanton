
export function sleep (time:number = 1000): Promise<void> {
    return new Promise(r => setTimeout(() => r(), time));
}


export function randomInteger (min: number, max: number):number {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}
