import { describe, expect, it } from 'vitest';
import { GameResult } from '../../domain/entities/Game';
import { Weapon } from '../../domain/entities/Weapon';
import { GamePresenter, GameView } from '../GamePresenter';
import { ErrorViewModel, GameViewModel } from '../GameViewModel';

class GameViewSpy implements GameView {
    readonly results: GameViewModel[] = [];
    readonly errors: ErrorViewModel[] = [];

    showResult(viewModel: GameViewModel): void {
        this.results.push(viewModel);
    }

    showError(viewModel: ErrorViewModel): void {
        this.errors.push(viewModel);
    }
}

describe('GamePresenter', () => {
    it.each([
        [Weapon.Rock, 'piedra'],
        [Weapon.Paper, 'papel'],
        [Weapon.Scissors, 'tijeras'],
    ])('traduce %s como %s y llama una sola vez a la vista', (weapon, expectedText) => {
        const view = new GameViewSpy();
        const presenter = new GamePresenter(view);

        presenter.present({
            playerWeapon: weapon,
            opponentWeapon: weapon,
            result: GameResult.Draw,
        });

        expect(view.results).toHaveLength(1);
        expect(view.results[0].playerWeaponText).toBe(expectedText);
        expect(view.results[0].machineWeaponText).toBe(expectedText);
        expect(view.results[0].fullOutput).not.toMatch(/\b(?:rock|paper|scissors)\b/);
        expect(view.errors).toHaveLength(0);
    });

    it.each([
        [GameResult.Win, '🎉', '¡Ganaste!'],
        [GameResult.Lose, '😢', 'Perdiste.'],
        [GameResult.Draw, '🤝', '¡Empate!'],
    ])('transforma el resultado %s en su presentación', (result, emoji, message) => {
        const view = new GameViewSpy();
        const presenter = new GamePresenter(view);

        presenter.present({
            playerWeapon: Weapon.Paper,
            opponentWeapon: Weapon.Rock,
            result,
        });

        expect(view.results).toEqual([
            {
                playerWeaponText: 'papel',
                machineWeaponText: 'piedra',
                resultEmoji: emoji,
                resultMessage: message,
                fullOutput: `\nTú elegiste: papel\nLa máquina eligió: piedra\n${emoji} ${message}`,
            },
        ]);
        expect(view.errors).toHaveLength(0);
    });

    it('presenta errores formateados a través de la vista', () => {
        const view = new GameViewSpy();
        const presenter = new GamePresenter(view);

        presenter.presentError('Opción inválida');

        expect(view.errors).toEqual([
            { errorMessage: '❌ Error: Opción inválida' },
        ]);
        expect(view.results).toHaveLength(0);
    });
});
