import { afterEach, describe, expect, it, vi } from "vitest";
import { MathRandomNumberGenerator } from "../MathRandomNumberGenerator";

describe("MathRandomNumberGenerator", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("devuelve el mínimo cuando Math.random devuelve 0", () => {
        vi.spyOn(Math, "random").mockReturnValue(0);
        const generator = new MathRandomNumberGenerator();

        expect(generator.generate(0, 2)).toBe(0);
    });

    it("devuelve el máximo cuando Math.random devuelve un valor cercano a 1", () => {
        vi.spyOn(Math, "random").mockReturnValue(0.999999);
        const generator = new MathRandomNumberGenerator();

        expect(generator.generate(0, 2)).toBe(2);
    });

    it("respeta ambos límites en un rango desplazado", () => {
        vi.spyOn(Math, "random")
            .mockReturnValueOnce(0)
            .mockReturnValueOnce(0.999999);
        const generator = new MathRandomNumberGenerator();

        expect(generator.generate(4, 7)).toBe(4);
        expect(generator.generate(4, 7)).toBe(7);
    });
});

