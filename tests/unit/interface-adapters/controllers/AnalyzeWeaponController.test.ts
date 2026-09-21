import { describe, expect, it } from 'vitest';
import type {
    AnalyzeWeaponInputBoundary,
    AnalyzeWeaponRequest,
} from '../../../../src/application/ports/input/AnalyzeWeaponInputBoundary';
import { Weapon } from '../../../../src/domain/Weapon';
import type { InvalidInputOutputBoundary } from '../../../../src/interface-adapters/ports/InvalidInputOutputBoundary';
import { AnalyzeWeaponController } from '../../../../src/interface-adapters/controllers/AnalyzeWeaponController';

class AnalyzeWeaponInputBoundarySpy implements AnalyzeWeaponInputBoundary {
    readonly requests: AnalyzeWeaponRequest[] = [];

    execute(request: AnalyzeWeaponRequest): void {
        this.requests.push(request);
    }
}

class InvalidInputOutputBoundarySpy implements InvalidInputOutputBoundary {
    presentInvalidSelectionCalls = 0;

    presentInvalidSelection(): void {
        this.presentInvalidSelectionCalls += 1;
    }
}

describe('AnalyzeWeaponController', () => {
    it.each([
        ['1', Weapon.Rock],
        ['2', Weapon.Paper],
        ['3', Weapon.Scissors],
        ['piedra', Weapon.Rock],
        ['papel', Weapon.Paper],
        ['tijeras', Weapon.Scissors],
    ])('adapta el arma válida %s a %s', (rawWeapon, weapon) => {
        const analyzeWeapon = new AnalyzeWeaponInputBoundarySpy();
        const invalidInputOutput = new InvalidInputOutputBoundarySpy();
        const controller = new AnalyzeWeaponController(
            analyzeWeapon,
            invalidInputOutput,
        );

        controller.handle(rawWeapon);

        expect(analyzeWeapon.requests).toEqual([{ weapon }]);
        expect(invalidInputOutput.presentInvalidSelectionCalls).toBe(0);
    });

    it('normaliza mayúsculas y espacios alrededor del arma', () => {
        const analyzeWeapon = new AnalyzeWeaponInputBoundarySpy();
        const invalidInputOutput = new InvalidInputOutputBoundarySpy();
        const controller = new AnalyzeWeaponController(
            analyzeWeapon,
            invalidInputOutput,
        );

        controller.handle('  PiEdRa  ');

        expect(analyzeWeapon.requests).toEqual([{ weapon: Weapon.Rock }]);
        expect(invalidInputOutput.presentInvalidSelectionCalls).toBe(0);
    });

    it('rechaza un arma inválida sin ejecutar el caso de uso', () => {
        const analyzeWeapon = new AnalyzeWeaponInputBoundarySpy();
        const invalidInputOutput = new InvalidInputOutputBoundarySpy();
        const controller = new AnalyzeWeaponController(
            analyzeWeapon,
            invalidInputOutput,
        );

        controller.handle('lagarto');

        expect(analyzeWeapon.requests).toHaveLength(0);
        expect(invalidInputOutput.presentInvalidSelectionCalls).toBe(1);
    });
});
