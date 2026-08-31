import { describe, expect, it } from 'vitest';
import type {
    PlayGameInputBoundary,
    PlayGameRequest,
} from '../../application/ports/PlayGame';
import { Weapon } from '../../domain/entities/Weapon';
import { GameController } from '../GameController';
import type { InvalidInputOutputBoundary } from '../GameController';

class PlayGameInputBoundarySpy implements PlayGameInputBoundary {
    readonly requests: PlayGameRequest[] = [];

    execute(request: PlayGameRequest): void {
        this.requests.push(request);
    }
}

class InvalidInputOutputBoundarySpy implements InvalidInputOutputBoundary {
    presentInvalidSelectionCalls = 0;

    presentInvalidSelection(): void {
        this.presentInvalidSelectionCalls += 1;
    }
}

describe('GameController', () => {
    it.each([
        ['1', Weapon.Rock],
        ['2', Weapon.Paper],
        ['3', Weapon.Scissors],
        ['piedra', Weapon.Rock],
        ['papel', Weapon.Paper],
        ['tijeras', Weapon.Scissors],
    ])('adapta la selección válida %s a %s', (rawSelection, playerWeapon) => {
        const playGame = new PlayGameInputBoundarySpy();
        const invalidInputOutput = new InvalidInputOutputBoundarySpy();
        const controller = new GameController(playGame, invalidInputOutput);

        controller.handle(rawSelection);

        expect(playGame.requests).toEqual([{ playerWeapon }]);
        expect(invalidInputOutput.presentInvalidSelectionCalls).toBe(0);
    });

    it('normaliza mayúsculas y espacios alrededor de una selección válida', () => {
        const playGame = new PlayGameInputBoundarySpy();
        const invalidInputOutput = new InvalidInputOutputBoundarySpy();
        const controller = new GameController(playGame, invalidInputOutput);

        controller.handle('  PiEdRa  ');

        expect(playGame.requests).toEqual([{ playerWeapon: Weapon.Rock }]);
        expect(invalidInputOutput.presentInvalidSelectionCalls).toBe(0);
    });

    it.each(['lagarto', ''])(
        'rechaza la selección inválida %j sin ejecutar el caso de uso',
        (rawSelection) => {
            const playGame = new PlayGameInputBoundarySpy();
            const invalidInputOutput = new InvalidInputOutputBoundarySpy();
            const controller = new GameController(playGame, invalidInputOutput);

            controller.handle(rawSelection);

            expect(playGame.requests).toHaveLength(0);
            expect(invalidInputOutput.presentInvalidSelectionCalls).toBe(1);
        },
    );
});
