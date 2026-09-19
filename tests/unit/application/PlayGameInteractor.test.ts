import { describe, expect, it, vi } from 'vitest';
import { Game } from '../../../src/domain/Game';
import { GameResult } from '../../../src/domain/GameResult';
import { Weapon } from '../../../src/domain/Weapon';
import { PlayGameInteractor } from '../../../src/application/use-cases/PlayGameInteractor';
import type { PlayGameInputBoundary } from '../../../src/application/ports/input/PlayGameInputBoundary';
import { FakeOpponentWeaponProvider } from '../../support/FakeOpponentWeaponProvider';
import { OutputBoundarySpy } from '../../support/OutputBoundarySpy';

describe('PlayGameInteractor', () => {
    it('envía una sola respuesta con ambas armas y el resultado del dominio', () => {
        const opponentWeaponProvider = new FakeOpponentWeaponProvider(Weapon.Rock);
        const game = new Game();
        const playSpy = vi.spyOn(game, 'play');
        const outputBoundary = new OutputBoundarySpy();
        const interactor = new PlayGameInteractor(
            game,
            opponentWeaponProvider,
            outputBoundary,
        );

        interactor.execute({ playerWeapon: Weapon.Paper });

        expect(playSpy).toHaveBeenCalledExactlyOnceWith(Weapon.Paper, Weapon.Rock);
        expect(outputBoundary.responses).toEqual([
            {
                playerWeapon: Weapon.Paper,
                opponentWeapon: Weapon.Rock,
                result: GameResult.Win,
            },
        ]);
        expect(opponentWeaponProvider.chooseCalls).toBe(1);
    });

    it.each([
        [Weapon.Scissors, GameResult.Lose],
        [Weapon.Rock, GameResult.Draw],
    ])('presenta el resultado %s calculado por el dominio', (playerWeapon, result) => {
        const outputBoundary = new OutputBoundarySpy();
        const interactor = new PlayGameInteractor(
            new Game(),
            new FakeOpponentWeaponProvider(Weapon.Rock),
            outputBoundary,
        );

        interactor.execute({ playerWeapon });

        expect(outputBoundary.responses).toEqual([
            {
                playerWeapon,
                opponentWeapon: Weapon.Rock,
                result,
            },
        ]);
    });

    it('implementa el input boundary y no retorna un DTO', () => {
        const outputBoundary = new OutputBoundarySpy();
        const interactor: PlayGameInputBoundary = new PlayGameInteractor(
            new Game(),
            new FakeOpponentWeaponProvider(Weapon.Rock),
            outputBoundary,
        );

        const returnedValue = interactor.execute({ playerWeapon: Weapon.Paper });

        expect(returnedValue).toBeUndefined();
        expect(outputBoundary.responses).toHaveLength(1);
    });
});
