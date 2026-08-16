import { RandomNumberGenerator } from '../../ports/RandomNumberGenerator';

// Un Fake que siempre devuelve un valor predeterminado
// Esto es posible GRACIAS a la inyección de dependencias
export class FakeRandomNumberGenerator implements RandomNumberGenerator {
    constructor(private readonly fixedValue: number) {}

    generate(min: number, max: number): number {
        return this.fixedValue;
    }
}
