import { GameResult } from '../domain/entities/Game';
import { Weapon } from '../domain/entities/Weapon';
import {
    PlayGameOutputBoundary,
    PlayGameResponse,
} from '../application/ports/PlayGame';
import { GameViewModel, ErrorViewModel } from './GameViewModel';

export interface GameView {
    showResult(viewModel: GameViewModel): void;
    showError(viewModel: ErrorViewModel): void;
}

export class GamePresenter implements PlayGameOutputBoundary {
    private readonly weaponTextMap: Record<Weapon, string> = {
        [Weapon.Rock]: 'piedra',
        [Weapon.Paper]: 'papel',
        [Weapon.Scissors]: 'tijeras',
    };

    constructor(private readonly view: GameView) {}

    present(response: PlayGameResponse): void {
        const playerWeaponText = this.weaponTextMap[response.playerWeapon];
        const machineWeaponText = this.weaponTextMap[response.opponentWeapon];

        const emojiMap: Record<GameResult, string> = {
            [GameResult.Win]: '🎉',
            [GameResult.Lose]: '😢',
            [GameResult.Draw]: '🤝',
        };

        const messageMap: Record<GameResult, string> = {
            [GameResult.Win]: '¡Ganaste!',
            [GameResult.Lose]: 'Perdiste.',
            [GameResult.Draw]: '¡Empate!',
        };

        const resultEmoji = emojiMap[response.result];
        const resultMessage = messageMap[response.result];

        const fullOutput = [
            `\nTú elegiste: ${playerWeaponText}`,
            `La máquina eligió: ${machineWeaponText}`,
            `${resultEmoji} ${resultMessage}`,
        ].join('\n');

        this.view.showResult({
            playerWeaponText,
            machineWeaponText,
            resultEmoji,
            resultMessage,
            fullOutput,
        });
    }

    presentError(message: string): void {
        this.view.showError({
            errorMessage: `❌ Error: ${message}`,
        });
    }
}
