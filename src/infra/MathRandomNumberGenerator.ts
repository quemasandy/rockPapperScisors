import { RandomNumberGenerator } from "../domain/ports/RandomNumberGenerator";

export class MathRandomNumberGenerator implements RandomNumberGenerator {
    generate(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
