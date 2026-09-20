import { describe, expect, it } from 'vitest';
import { GameResult } from '../../../../src/domain/GameResult';
import { Weapon } from '../../../../src/domain/Weapon';
import { JsonGamePresenter } from '../../../../src/interface-adapters/presenters/JsonGamePresenter';

describe('JsonGamePresenter', () => {
    it.each([
        [Weapon.Paper, Weapon.Rock, GameResult.Win],
        [Weapon.Rock, Weapon.Paper, GameResult.Lose],
        [Weapon.Scissors, Weapon.Scissors, GameResult.Draw],
    ])(
        'serializa una ronda %s contra %s con resultado %s',
        (playerWeapon, opponentWeapon, result) => {
            const lines: string[] = [];
            const presenter = new JsonGamePresenter((line) => lines.push(line));

            presenter.present({ playerWeapon, opponentWeapon, result });

            expect(lines).toEqual([
                JSON.stringify({ playerWeapon, opponentWeapon, result }),
            ]);
        },
    );

    it('serializa una selección inválida', () => {
        const lines: string[] = [];
        const presenter = new JsonGamePresenter((line) => lines.push(line));

        presenter.presentInvalidSelection();

        expect(lines).toEqual(['{"error":"invalid_selection"}']);
    });
});
