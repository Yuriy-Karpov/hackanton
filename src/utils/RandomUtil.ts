export function getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function getRandomPercent(): number {
    return getRandomArbitrary(0, 100);
}

export function getRandomPercentString(): string {
    return String(getRandomPercent());
}