import { GameResult } from '../../domain/GameResult';
import { Weapon } from '../../domain/Weapon';
import type {
    InvalidInputOutputBoundary,
} from '../../application/ports/output/InvalidInputOutputBoundary';
import type {
    PlayGameOutputBoundary,
    PlayGameResponse,
} from '../../application/ports/output/PlayGameOutputBoundary';
import type { GameView } from './GameView';

export class GamePresenter
    implements PlayGameOutputBoundary, InvalidInputOutputBoundary
{
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

    presentInvalidSelection(): void {
        this.view.showError({
            errorMessage: '❌ Error: Opción inválida. Elige 1, 2 o 3.',
        });
    }
}
