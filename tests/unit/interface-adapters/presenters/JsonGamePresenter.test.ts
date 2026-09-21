import { describe, expect, it } from 'vitest';
import { GameResult } from '../../../../src/domain/GameResult';
import { Weapon } from '../../../../src/domain/Weapon';
import { JsonGamePresenter } from '../../../../src/interface-adapters/presenters/JsonGamePresenter';
import { GameViewSpy } from '../../../support/GameViewSpy';

describe('JsonGamePresenter', () => {
    it.each([
        [Weapon.Paper, Weapon.Rock, GameResult.Win, 'papel', 'piedra', '🎉', '¡Ganaste!'],
        [Weapon.Rock, Weapon.Paper, GameResult.Lose, 'piedra', 'papel', '😢', 'Perdiste.'],
        [Weapon.Scissors, Weapon.Scissors, GameResult.Draw, 'tijeras', 'tijeras', '🤝', '¡Empate!'],
    ])(
        'serializa una ronda %s contra %s con resultado %s',
        (
            playerWeapon,
            opponentWeapon,
            result,
            playerWeaponText,
            machineWeaponText,
            resultEmoji,
            resultMessage,
        ) => {
            const view = new GameViewSpy();
            const presenter = new JsonGamePresenter(view);

            presenter.present({ playerWeapon, opponentWeapon, result });

            expect(view.results).toEqual([{
                playerWeaponText,
                machineWeaponText,
                resultEmoji,
                resultMessage,
                fullOutput: JSON.stringify({
                    playerWeapon,
                    opponentWeapon,
                    result,
                }),
            }]);
            expect(view.errors).toHaveLength(0);
        },
    );

    it('serializa una selección inválida', () => {
        const view = new GameViewSpy();
        const presenter = new JsonGamePresenter(view);

        presenter.presentInvalidSelection();

        expect(view.errors).toEqual([{
            errorMessage: '{"error":"invalid_selection"}',
        }]);
        expect(view.results).toHaveLength(0);
    });
});
