import { describe, expect, it, vi } from 'vitest';
import type { AnalyzeWeaponInputBoundary } from '../../../src/application/ports/input/AnalyzeWeaponInputBoundary';
import { AnalyzeWeaponInteractor } from '../../../src/application/use-cases/AnalyzeWeaponInteractor';
import { Game } from '../../../src/domain/Game';
import { Weapon } from '../../../src/domain/Weapon';
import { AnalyzeWeaponOutputBoundarySpy } from '../../support/AnalyzeWeaponOutputBoundarySpy';

describe('AnalyzeWeaponInteractor', () => {
    it.each([
        {
            weapon: Weapon.Rock,
            winsAgainst: [Weapon.Scissors],
            losesAgainst: [Weapon.Paper],
            drawsAgainst: [Weapon.Rock],
        },
        {
            weapon: Weapon.Paper,
            winsAgainst: [Weapon.Rock],
            losesAgainst: [Weapon.Scissors],
            drawsAgainst: [Weapon.Paper],
        },
        {
            weapon: Weapon.Scissors,
            winsAgainst: [Weapon.Paper],
            losesAgainst: [Weapon.Rock],
            drawsAgainst: [Weapon.Scissors],
        },
    ])(
        'clasifica las relaciones de $weapon usando las reglas del dominio',
        ({ weapon, winsAgainst, losesAgainst, drawsAgainst }) => {
            const game = new Game();
            const playSpy = vi.spyOn(game, 'play');
            const outputBoundary = new AnalyzeWeaponOutputBoundarySpy();
            const interactor: AnalyzeWeaponInputBoundary = new AnalyzeWeaponInteractor(
                game,
                outputBoundary,
            );

            const returnedValue = interactor.execute({ weapon });

            expect(returnedValue).toBeUndefined();
            expect(playSpy.mock.calls).toEqual([
                [weapon, Weapon.Rock],
                [weapon, Weapon.Paper],
                [weapon, Weapon.Scissors],
            ]);
            expect(outputBoundary.responses).toEqual([
                {
                    weapon,
                    winsAgainst,
                    losesAgainst,
                    drawsAgainst,
                },
            ]);
        },
    );
});
